let logoutTimer = null;
const API_KEY = '';

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

    if (mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || '认证失败，请检查邮箱和密码'
      );
      throw error;
    }

    const intervalPeroid = +responseData.expiresIn * 1000;
    // just for testing func of auto logout
    // const intervalPeroid = 5000;
    const expireDateInMS = intervalPeroid + new Date().getTime();

    // set a auto log out timer
    logoutTimer = setTimeout(() => {
      context.dispatch('timeoutLogout');
    }, intervalPeroid);

    // set user so that we have a sign in status
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('expiresIn', expireDateInMS);
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expiresIn = localStorage.getItem('expiresIn');
    const timeTillExpire = +expiresIn - new Date().getTime();
    // console.log("will expires in: " + timeTillExpire);
    if (timeTillExpire < 100000) {
      // console.log("less than 100000");
      return;
    } else {
      logoutTimer = setTimeout(() => {
        context.dispatch('timeoutLogout');
      }, timeTillExpire);
    }
    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId
      });
      // console.log('logged in');
    }
  },
  logout(context) {
    context.state.token = null;
    context.state.userId = null;

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiresIn');
    clearTimeout(logoutTimer);
    context.commit('setUser', {
      userId: null,
      token: null
    });
  },
  async timeoutLogout(context) {
    await context.dispatch('logout');
    context.commit('setTimeoutLogout');
  }
};

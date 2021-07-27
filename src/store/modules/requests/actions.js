const BASE_URL = '';

export default {
  async contactCoach(context, payload) {
    const requestToBeAdded = {
      // id: new Date().toISOString(),
      // coachId: payload.coachId,
      wechatAccount: payload.wechatAccount,
      message: payload.message
    };
    const response = await fetch(
      `${BASE_URL}requests/${payload.coachId}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestToBeAdded)
      }
    );
    if (!response.ok) {
      const error = new Error(response.message || '留言发送失败');
      throw error;
    }
    const responseData = await response.json();
    requestToBeAdded.id = responseData.name;
    context.commit('addRequest', requestToBeAdded);
  },
  async fetchRequests(context) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `${BASE_URL}requests/${userId}.json?auth=${token}`
    );
    if (!response.ok) {
      const error = new Error(response.message || '留言获取失败');
      throw error;
    }
    const responseData = await response.json();
    const allRequests = [];
    // console.log(responseData);
    for (const requestId in responseData) {
      allRequests.push({
        id: requestId,
        wechatAccount: responseData[requestId].wechatAccount,
        message: responseData[requestId].message
      });
    }
    context.commit('setRequests', allRequests);
  }
};

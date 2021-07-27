<template>
  <div class='whole-form'>
    <base-dialog :show='!!error' title='出错啦！' @close='handleError'>
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show='isLoading' title='认证中...' fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent='submitForm'>
        <div class='form-control'>
          <label for='email'>邮箱</label>
          <input
            type='email'
            id='email'
            autocomplete='username'
            v-model.trim='email'
          />
        </div>
        <div class='form-control'>
          <label for='password'>密码</label>
          <input
            type='password'
            id='password'
            autocomplete='current-password'
            v-model.trim='password'
          />
        </div>
        <p v-if='formIsinValid'>
          请输入有效的电子邮件和密码（长度必须至少为 6 个字符）。
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type='button' mode='flat' @click='switchAuthMode'>{{
            switchModeButtonCaption
          }}
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const email = ref('');
    const password = ref('');
    const formIsinValid = ref(false);
    const mode = ref('login');
    const isLoading = ref(false);
    const error = ref(null);

    const submitButtonCaption = computed(function() {
      return mode.value === 'login' ? '登录' : '注册';
    });
    const switchModeButtonCaption = computed(function() {
      return mode.value === 'login' ? '马上注册' : '马上登录';

    });

    async function submitForm() {
      formIsinValid.value = false;
      if (email.value === '' || !email.value.includes('@') || password.value.length < 6) {
        formIsinValid.value = true;
        return;
      }
      isLoading.value = true;

      const payload = { email: email.value, password: password.value };
      try {
        if (mode.value === 'login') {
          await store.dispatch('login', payload);
        } else if (mode.value === 'signup') {
          console.log('sign up now');
          await store.dispatch('signup', payload);
        }

        const redirectUrl = '/' + (route.query.redirect || 'coaches');
        await router.replace(redirectUrl);
      } catch (error) {
        error.value = error.message || '请重试';
      }

      isLoading.value = false;
    }

    const switchAuthMode = function() {
      mode.value = mode.value === 'login' ? 'signup' : 'login';
    }

    const handleError = function() {
      error.value = null;
    }

    return {
      email,
      password,
      formIsinValid,
      mode,
      isLoading,
      error,
      submitButtonCaption,
      switchModeButtonCaption,
      submitForm,
      switchAuthMode,
      handleError,
    };
  },

  // data() {
  //   return {
  //     email: '',
  //     password: '',
  //     formIsNotValid: false,
  //     mode: 'login',
  //     isLoading: false,
  //     error: null
  //   };
  // },
  // computed: {
  //   submitButtonCaption() {
  //     return this.mode === 'login' ? '登录' : '注册';
  //   },
  //   switchModeButtonCaption() {
  //     return this.mode === 'login' ? '马上注册' : '马上登录';
  //   }
  // },
  // methods: {
    // async submitForm() {
    //   this.formIsValid = false;
    //   if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
    //     this.formIsValid = true;
    //     return;
    //   }
    //   this.isLoading = true;
    //
    //   const payload = { email: this.email, password: this.password };
    //   try {
    //     if (this.mode === 'login') {
    //       await this.$store.dispatch('login', payload);
    //     } else if (this.mode === 'signup') {
    //       console.log('sign up now');
    //       await this.$store.dispatch('signup', payload);
    //     }
    //
    //     const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
    //     await this.$router.replace(redirectUrl);
    //   } catch (error) {
    //     this.error = error.message || '请重试';
    //   }
    //
    //   this.isLoading = false;
    // },
    // switchAuthMode() {
    //   this.mode = this.mode === 'login' ? 'signup' : 'login';
    // },
    // handleError() {
    //   this.error = null;
    // }
  // }
};
</script>

<style scoped>
.whole-form {
  width: 400px;
  margin: 200px auto;
}


form {
  margin: 1rem;
  padding: 1rem;

}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
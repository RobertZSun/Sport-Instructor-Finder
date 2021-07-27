<template>
    <h1>请留下你的微信联系方式</h1>
    <form @submit='submitForm'>
      <div
        class='form-control'
        :class='{ errors: !formIsValid }'
      >
        <label for='wechatAccount'>你的微信号</label>
        <input type='text' name='text' id='wechatAccount' v-model.trim='wechatAccount' />
      </div>
      <div class='form-control' :class='{ errors: !formIsValid }'>
        <label for='message'>Message</label>
        <textarea
          type='text'
          name='message'
          id='message'
          rows='5'
          v-model.trim='message'
        />
      </div>
      <p class='errors' v-if='!formIsValid'>
        微信号与留言内容均不能为空哦~
      </p>
      <div class='actions'>
        <base-button @click='submitForm'>留言</base-button>
      </div>
    </form>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      wechatAccount: '',
      message: '',
      formIsValid: true
    };
  },
  methods: {
    validForm() {
      if (this.wechatAccount === '' || this.message === '') {
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.formIsValid = true;
      this.validForm();
      if (!this.formIsValid) {
        return;
      }
      // console.log(this.$route);
      // console.log(this.$route.params);
      const formData = {
        wechatAccount: this.wechatAccount,
        message: this.message,
        coachId: this.$route.params.id
      };
      this.isLoading = true;
      try {
        this.$store.dispatch('requests/contactCoach', formData);
      } catch (e) {
        this.error = e.message || '发送留言失败';
      }
      this.isLoading = false;
      this.$router.replace('/coaches');
    }
  }
};
</script>

<style scoped>
.container {
  padding: 0;
  margin: 0;
}
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
<template>
  <nav>
    <el-menu
      :default-active="activeIndex"
      :router='true'
      class="el-menu-demo"
      mode="horizontal"

      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-link class='logo' type="info" :underline="false" href='/'>找到属于你的教练</el-link>
      <el-menu-item index="/auth" v-if='!isLoggedIn'>注册/登录</el-menu-item>
      <el-menu-item v-if='isLoggedIn' @click="logout">退出</el-menu-item>
      <el-menu-item index="/request" v-if='isLoggedIn && isAlreadyaCoach'>消息中心</el-menu-item>
      <el-menu-item index="/coaches">所有教练</el-menu-item>
    </el-menu>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '/coaches',
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isAlreadyaCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('timeoutLogout');
      // this.$store.dispatch('logout');
      // this.$router.replace('/coaches');
    }
  },
};
</script>

<style scoped>
.el-menu .logo {
  float: left;
  margin: 0;
  padding-left: 15px;
  color: white;
  font-size: 20px;
  line-height: 60px;
}



.el-menu--horizontal .el-menu-item {
  float: right;
}
</style>
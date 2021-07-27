<template>
  <el-container>
    <el-header>
      <the-header />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>


<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    'the-header': TheHeader
  },
  computed: {
    isAutoLogout() {
      return this.$store.getters.isAutoLogout;
    }
  },
  watch: {
    isAutoLogout(cur, old) {
      if (cur && cur !== old) {
        this.$router.replace('/coaches');
      }
    }
  },
  created() {
    this.$store.dispatch('tryLogin');
  }
};

</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: 'lucida grande', 'lucida sans unicode', lucida, helvetica,
    'Hiragino Sans GB', 'MicrosoftYaHei', 'WenQuanYi Micro Hei', sans-serif;
}

body {
  margin: 0;
}

.el-container .el-header,
.el-container .el-main {
  padding: 0;
}
</style>
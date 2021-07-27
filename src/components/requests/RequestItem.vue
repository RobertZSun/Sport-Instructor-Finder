<template>
  <li>
    <div>
      <span class="wechatTag">微信号：</span>
      <span :id='id'>{{ wechatAccount }}</span>
      <button @click='copy' class='copyBtn'>复制</button>
      <input :id="'temp'+id" style="opacity: 0; cursor: default">
    </div>
    <p>信息：{{ message }}</p>
  </li>
</template>

<script>

export default {
  props: ['id','wechatAccount', 'message'],
  methods:{
    copy(){
      const accountInfo =document.getElementById(this.id).innerText;
      const inputTemp = document.getElementById("temp"+this.id);
      inputTemp.value = accountInfo;
      // 修改文本框的内容
      console.log(accountInfo);
      inputTemp.select(); // 选中文本
      document.execCommand("Copy"); // 执行浏览器复制命令
      alert("复制成功");
    }
  }

}
</script>

<style scoped>
.wechatTag{
  color: #1989fa;
}
.copyBtn {
  margin-left: 10px;
}
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
<template>
  <router-link v-if="link" :to="to" :class="mode">
    <slot></slot>
  </router-link>
  <button v-else :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
  }

}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.35rem 1.5rem;
  font: inherit;
  background-color: #ecf5ff;
  border: 1px solid #b3d8ff;
  color: #409eff;
  cursor: pointer;
  border-radius: 15px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #409eff;
  border-color: #409eff;
  color:#fff;

}

.flat {
  background-color: #fff;
  color: #606266;
  border: 1px solid #dcdfe6;
}

.outline {
  background-color: #409eff;
  border-color: #409eff;
  color: #ecf5ff;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #ecf5ff;
  border-color: #c6e2ff;
  color: #409eff;
}
</style>
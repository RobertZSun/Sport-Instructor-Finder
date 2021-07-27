<template>
  <span class="badge" :class="type">
    {{ area }}
  </span>
</template>

<script>
export default {
  props: ['type', 'area'],
}
</script>
 
<style scoped>
.badge {
  background-color: #ccc;
  font-size: 0.8rem;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.basketball {
  background-color: #c26a12;
  color: white;
}

.soccer {
  background-color: #006c0f;
  color: white;
}

.badminton {
  background-color: #a1fd93;
  color: #000000;
}

.fitness {
  background-color: #ffe7c4;
  color: #000000;
}
</style>
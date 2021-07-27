<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>{{ hourlyRate }}￥/小时</h4>
    <img class="avatar" :src="avatar" alt="头像" />
    <div>
      <base-badge
        v-for="area in areas"
        :key="area.class"
        :type="area.class"
        :area="area.name"
      ></base-badge>
    </div>
    <div class="actions">
      <!-- <base-button link :to="coachContactLink" mode="outline">
        Contact
      </base-button>
      <base-button link :to="coachDetailLink">View Detail</base-button> -->
      <base-button mode="outline" link :to="coachContactLink">
        联系我吧
      </base-button>
      <base-button link :to="coachDetailLink">详细介绍</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'fullName','avatar', 'areas', 'hourlyRate'],
  computed: {
    coachContactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
    coachDetailLink() {
      //   return '/coaches/' + this.id;
      return this.$route.path + '/' + this.id;
    }
  }
}
</script>


<style scoped>
.avatar {
  width: 100px;
  height:100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 3px;
  position: absolute;
  right: 1rem;
  top: 1rem;
}
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  position: relative;

}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
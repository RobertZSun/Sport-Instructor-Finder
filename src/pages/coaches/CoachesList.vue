<template>
  <base-dialog :show="!!error" title="出错了！！" @close="handleError">
    <!-- error(string -> boolean)-->
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <CoachFilter @change-filter="setFilter" />
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="flat" @click="loadCoaches(true)">刷新</base-button>
        <base-button v-if="!isLoggedIn" link to="/auth?redirect=register"
          >注册成为教练</base-button
        >
        <base-button
          v-if="isLoggedIn && !isAlreadyaCoach && !isLoading"
          link
          to="/register"
          >登记成为教练</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <CoachItem
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :avatar="coach.avatar"
          :fullName="coach.fullName"
          :areas="coach.areas"
          :hourlyRate="coach.hourlyRate"
        />
      </ul>
      <h3 v-else>当前没有找到任何教练，敬请期待！</h3>
    </base-card>
  </section>
</template>

<script>
// import { mapGetters } from 'vuex';

import CoachItem from '@/components/coaches/coachItem';
import CoachFilter from '@/components/coaches/CoachFilter';

import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: { CoachFilter, CoachItem },
  setup() {
    const store = useStore();

    const isLoading = ref(false);
    const error = ref(null);
    const activeFilter = reactive({
      basketball: true,
      soccer: true,
      badminton: true,
      fitness: true
    });

    const isAlreadyaCoach = computed(function () {
      return store.getters['coaches/isCoach'];
    });
    const isLoggedIn = computed(function () {
      return store.getters.isAuthenticated;
    });
    const filteredCoaches = computed(function () {
      const allCoaches = store.getters['coaches/coaches'];
      const filteredCoaches = allCoaches.filter(coach => {
        if (activeFilter.basketball && coach.areas.findIndex((area) => area.class === 'basketball') !== -1) {
          return true;
        } else if (activeFilter.soccer && coach.areas.findIndex((area) => area.class === 'soccer') !== -1) {
          return true;
        } else if (activeFilter.badminton && coach.areas.findIndex((area) => area.class === 'badminton') !== -1) {
          return true;
        } else if (activeFilter.fitness && coach.areas.findIndex((area) => area.class === 'fitness') !== -1) {
          return true;
        } else {
          return false;
        }
      });
      return filteredCoaches;
    });
    const hasCoaches = computed(function () {
      return !isLoading.value && store.getters['coaches/hasCoaches'];
    });

    function setFilter(filter) {
      activeFilter.basketball = filter.basketball;
      activeFilter.soccer = filter.soccer;
      activeFilter.badminton = filter.badminton;
      activeFilter.fitness = filter.fitness;
      // activeFilter = filter;
    }

    async function loadCoaches(forceUpdate = false) {
      isLoading.value = true;
      try {
        await store.dispatch('coaches/loadCoaches', { forceUpdate: forceUpdate });
      } catch (e) {
        error.value = e.message || '获取教练数据失败';
      }
      isLoading.value = false;
    }

    function handleError() {
      error.value = null;
    }


    loadCoaches();

    return {
      isLoading,
      error,
      activeFilter,
      isAlreadyaCoach,
      isLoggedIn,
      filteredCoaches,
      hasCoaches,
      setFilter,
      loadCoaches,
      handleError
    }
  },


  // data() {
  //   return {
  //     isLoading: false,
  //     error: null,
  //     activeFilter: {
  //       basketball: true,
  //       soccer: true,
  //       badminton: true,
  //       fitness: true
  //     }
  //   };
  // },
  // computed: {
  //   isAlreadyaCoach() {
  //     return this.$store.getters['coaches/isCoach'];
  //   },
  //   isLoggedIn() {
  //     return this.$store.getters.isAuthenticated;
  //   },
  //   filteredCoaches() {
  //     const allCoaches = this.$store.getters['coaches/coaches'];
  //     const filteredCoaches = allCoaches.filter(coach => {
  //       if (this.activeFilter.basketball && coach.areas.findIndex((area) => area.class === 'basketball') !== -1) {
  //         return true;
  //       } else if (this.activeFilter.soccer && coach.areas.findIndex((area) => area.class === 'soccer') !== -1) {
  //         return true;
  //       } else if (this.activeFilter.badminton && coach.areas.findIndex((area) => area.class === 'badminton') !== -1) {
  //         return true;
  //       } else if (this.activeFilter.fitness && coach.areas.findIndex((area) => area.class === 'fitness') !== -1) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //     return filteredCoaches;
  //   },
  //   hasCoaches() {
  //     return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
  //   }
  // },
  // methods: {
  //   setFilter(filter) {
  //     this.activeFilter = filter;
  //   },
  //   async loadCoaches(forceUpdate = false) {
  //     this.isLoading = true;
  //     try {
  //       await this.$store.dispatch('coaches/loadCoaches', { forceUpdate: forceUpdate });
  //     } catch (e) {
  //       this.error = e.message || '获取教练数据失败';
  //     }
  //     this.isLoading = false;
  //   },
  //   handleError() {
  //     this.error = null;
  //   }
  // },
  // created() {
  //   this.loadCoaches();
  // }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>{{ hourlyRate }}￥/小时</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>感兴趣吗？马上联系我吧！</h2>
          <base-button v-if='commentBtnAvailable' @click='leaveComment'>留言</base-button>
          <base-button v-if='!commentBtnAvailable' @click='goBack'>取消</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for='area in selectedCoach.areas'
          :key='area.class'
          :type='area.class'
          :area='area.name'
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default {
  props: ['id'],
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const selectedCoach = ref(null);
    const commentBtnAvailable = ref(true);
    const detailPage = ref(null);

    const fullName = computed(function() {
      return selectedCoach.value.fullName;
    });

    const contactLink = computed(function() {
      return route.path + '/contact';

    });
    const hourlyRate = computed(function() {
      return selectedCoach.value.hourlyRate;
    });
    const description = computed(function() {
      return selectedCoach.value.description;
    });

    function leaveComment() {
      detailPage.value = route.path;
      router.replace(detailPage.value + '/contact');
      commentBtnAvailable.value = false;
    }

    function goBack() {
      router.replace(detailPage.value);
      commentBtnAvailable.value = true;
    }

    selectedCoach.value = store.getters['coaches/coaches'].find(coach => coach.id === props.id);
    if (route.path.includes('contact')) {
      commentBtnAvailable.value = false;
      detailPage.value = route.path.slice(0, -8);
    }


    return {
      selectedCoach,
      commentBtnAvailable,
      detailPage,
      fullName,
      contactLink,
      hourlyRate,
      description,
      leaveComment,
      goBack
    };
  },
  // data() {
  //   return {
  //     selectedCoach: null,
  //     commentBtnAvailable: true,
  //     detailPage: null
  //   };
  // },
  // created() {
  //   this.selectedCoach = this.$store.getters['coaches/coaches'].find(coach => coach.id === this.id);
  //   if (this.$route.path.includes('contact')) {
  //     this.commentBtnAvailable = false;
  //     this.detailPage = this.$route.path.slice(0, -8);
  //   }
  // },
  // computed: {
    // fullName() {
    //   return this.selectedCoach.fullName;
    // },
    // contactLink() {
    //   return this.$route.path + '/contact';
    // },
    // hourlyRate() {
    //   return this.selectedCoach.hourlyRate;
    // },
    // description() {
    //   return this.selectedCoach.description;
    // }
  // },
  // methods: {
    // leaveComment() {
    //   this.detailPage = this.$route.path;
    //   this.$router.replace(this.detailPage + '/contact');
    //   this.commentBtnAvailable = false;
    // },
    // goBack() {
    //   this.$router.replace(this.detailPage);
    //   this.commentBtnAvailable = true;
    // }
  // }
};
</script>
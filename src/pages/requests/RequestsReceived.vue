<template>
  <div>
    <base-dialog :show="!!error" title="出现一个错误！" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>收到的留言</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests">
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :id="req.id"
            :wechatAccount="req.wechatAccount"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>未收到任何留言</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem'

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    "request-item": RequestItem
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/allRequests'];
    },
    hasRequests() {
      return !this.isLoading && this.$store.getters['requests/hasRequests'];
    }
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        this.error = error || '没能成功取得数据';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadRequests();
  },
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
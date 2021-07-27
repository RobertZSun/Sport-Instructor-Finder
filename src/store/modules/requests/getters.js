export default {
  allRequests(state) {
    return state.requests;
  },
  hasRequests(_, getters) {
    return getters.allRequests?.length > 0;
  }
};
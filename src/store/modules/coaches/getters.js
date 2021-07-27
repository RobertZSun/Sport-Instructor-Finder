export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches?.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const allCoaches = getters.coaches;
    const userId = rootGetters.userId;
    return allCoaches.some(coach => coach.id === userId);
  },
  mayUpdateCoachData(state) {
    const lastTimeUpdatedTimeStamp = state.lastFetched;
    if (!lastTimeUpdatedTimeStamp) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    const lockTimePeriod = 60 * 1000; // ms
    return (currentTimeStamp - lastTimeUpdatedTimeStamp > lockTimePeriod);
  }
};


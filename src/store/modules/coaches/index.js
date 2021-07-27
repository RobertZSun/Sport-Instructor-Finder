import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default {
  namespaced:true,
  state() {
    return {
      lastFetched: null,   // the time stamp when we fetch the coach data
      userIsCoach: false,
      coaches: []
    }
  },
  getters,
  mutations,
  actions,

}
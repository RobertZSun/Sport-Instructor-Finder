const baseUrl = '';
export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      ...data
    };
    const token = context.rootGetters.token;
    const response = await fetch(
      `${baseUrl}coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    if (!response.ok) {
      alert('注册失败');
    }
    // const responseData = await response.json();
    // console.log(coachData);
    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceUpdate && !context.getters.mayUpdateCoachData) {
      return;
    }
    const response = await fetch(`${baseUrl}coaches.json`);
    if (!response.ok) {
      const error = new Error(response.message || '获取教练数据失败');
      throw error;
    }
    context.commit('setFetchTimeStamp');
    const responseData = await response.json();
    const coaches = [];
    for (const coachId in responseData) {
      const coachInfo = responseData[coachId];
      const coachInfoToBeAppended = {
        id: coachId,
        fullName: coachInfo.fullName,
        avatar: coachInfo.avatar,
        areas: coachInfo.areas,
        hourlyRate: coachInfo.hourlyRate,
        description: coachInfo.description
      };
      coaches.push(coachInfoToBeAppended);
    }
    context.commit('setCoaches', coaches);
  }
};

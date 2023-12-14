export default {
  async SET_STATISTIC({commit}) {
    try {
      const {data: {statistics}} = await this.$axios.$get(this.$api.statistics);
      commit('CHANGE_STATISTIC', statistics);
    } catch (error) {
      console.log(error);
    }
  },
}
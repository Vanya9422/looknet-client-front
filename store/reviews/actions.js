export default {
  async SET_USER_REVIEWS({ state, commit }, { userId, fake, advertiseId } = {}) {
    console.log('SET_USER_REVIEWS', userId, fake, advertiseId )
    if (state.userId !== userId) {
      commit("RESET_REVIEWS_STATE");
    }

    const searchParams = [];

    if (fake){
      searchParams.push(`advertise_id:${advertiseId}`)
    }else{
      searchParams.push(`user_id:${userId}`)
    }

    try {
      const reviews = await this.$axios.$get(
        `/reviews?page=${state.page}&per_page=${state.per_page}&search=${searchParams.join(';')}`,
      );
      const nextPage = reviews.meta.current_page + 1;
      const isReviewsLoaded =
        reviews.meta.current_page === reviews.meta.last_page;

      commit("CHANGE_REVIEWS", { reviews, userId });
      commit("CHANGE_PAGE", nextPage);
      commit("CHANGE_LOADED", isReviewsLoaded);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
   SET_STATISTIC({commit}, statistic) {
    commit('CHANGE_STATISTIC', statistic)
  },
  async SET_DETAIL({ commit }, detail) {
      commit('CHANGE_DETAIL', null);
    if (detail && typeof detail === "string") {
      try {
        const { data } = await this.$axios.$get(`${this.$api.advertises.index}/${detail}?with=category;author.avatar;gallery;city;answers.filter`);
        commit('CHANGE_DETAIL', data);
      } catch (error) {
        commit('CHANGE_DETAIL', null);
        console.error(error);
      }
    }
  },
  async SET_MODAL_DETAIL({commit}, detail) {
      commit('CHANGE_MODAL_DETAIL', null)
      await this.$axios.$get(`${this.$api.advertises.index}/${detail}?with=category;author.avatar;gallery;city;answers`)
        .then(({data}) => commit('CHANGE_MODAL_DETAIL', data))
  },
  async SET_RECOMEND({ commit, state }, category_id) {
    const sort = 'orderBy=updated_at&sortedBy=desc'
    try {
      const { data, meta } = await this.$axios.$get(`${this.$api.advertises.index}?${sort}&searchJoin=and&with=category;author;gallery;city;answers&page=1&per_page=6&search=status:0,1;category_id:${category_id}`);
      commit('CHANGE_RECOMEND', data);
      commit('CHANGE_CURRENT_PAGE_RECOMEND', meta.current_page);
      commit('CHANGE_LAST_PAGE_RECOMEND', meta.last_page);
    } catch (error) {
      console.error(error);
    }
  },
  async SET_MORE_RECOMEND({commit, state},category_id) {
    const sort = 'orderBy=updated_at&sortedBy=desc'
    await this.$axios.$get(`${this.$api.advertises.index}?${sort}&searchJoin=and&with=category;author;gallery;city;answers&page=${state.currentPageRecomend + 1}&per_page=6&search=status:0,1;category_id:${category_id}`)
      .then(({data,meta}) => {
        commit('CHANGE_MORE_RECOMEND', data)
        commit('CHANGE_CURRENT_PAGE_RECOMEND', meta.current_page)
        commit('CHANGE_LAST_PAGE_RECOMEND', meta.last_page)
      })
  },
  async SET_USER_PRODUCTS({ commit, state }) {
    try {
      const { data } = await this.$axios.$get(`${this.$api.advertises.index}?page=1&with=city;author;gallery;category&search=user_id:${state.detail.author.id}`);
      commit('CHANGE_USER_PRODUCTS', data);
    } catch (error) {
      console.error(error);
    }
  },
   SET_DETAIL_LIST({commit},list) {
    commit('CHANGE_DETAIL_LIST', list)
  },
   SET_DETAIL_ACTIVE({commit},index) {
    commit('CHANGE_DETAIL_ACTIVE', index)
  },
  SET_PRODUCT_CART_TYPE({commit}, type) {
    commit("CHANGE_PRODUCT_CART_TYPE", type);
  },
}

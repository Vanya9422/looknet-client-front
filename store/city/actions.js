import {filter, withField} from "~/mixins/helpers/products";

export default {
  SET_CITIES({commit, state}, search = '') {
    return new Promise((resolve, reject) => {
      let loaded = undefined;
      const filter= "filter=id;name;order;state_id"
      let api = `/search-cities?search=${search}&orderBy=order;id&sortedBy=desc;asc&with=state_minimal_select&searchJoin=and&page=${state.page}&per_page=${state.per_page}&${filter}`
      this.$axios.$get(api)
          .then(({data, meta: {current_page, last_page}}) => {
            commit('CHANGE_CITIES', {data,current_page})
            commit('CHANGE_PAGE', current_page + 1)
            commit('CHANGE_LAST_PAGE', last_page)
            loaded = current_page < last_page
            resolve(loaded);
          })
          .catch(error => reject(error));
    });

  },
  SET_CITIES_RECOMMENDATION({commit, state}, search = '') {
    return new Promise((resolve, reject) => {
      const filter= "filter=id;name;order;state_id"
      let api = `/search-cities?search=order:0,6&orderBy=order;id&sortedBy=desc;asc&with=state_minimal_select&${filter}`
      this.$axios.$get(api)
          .then(({data}) => {
            commit('CHANGE_CITIES_RECOMMENDATION', {data})
          })
          .catch(error => reject(error));
    });

  },
  SET_CITIES_PAGE({commit}, page) {
    commit('CHANGE_PAGE', page)
    return true
  },
}

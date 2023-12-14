import { filter, withField, vip, noVip } from "~/mixins/helpers/products";

export default {
  async SET_VIP_PRODUCTS({ commit }, city = null) {
    const sort = "orderBy=id&sortedBy=desc";
    let api = `${this.$api.products}?per_page=10&page=1&${vip}&${sort}&searchJoin=and&search=status:0,1`;
    // let api = `${this.$api.products}?per_page=10&page=1&${vip}&${sort}&${withField}&searchJoin=and&search=status:0,1`;
    if (city && city.id !== "c1") {
      if (!city.state_id && city.state_code) {
        api += `;city.state.state_code:${city.state_code}`
      } else {
        api += `;city_id:${city.id};mil:50`;
      }
    }
    try {
      const { data } = await this.$axios.$get(api);
      commit("CHANGE_VIP_PRODUCTS", data);
    } catch (error) {
      console.error(error);
    }
  },
  SET_PRODUCTS_PAGE({ commit }) {
    commit("CHANGE_PAGE", 1);
  },
  SET_PRODUCTS_NULL({ commit }) {
    commit("CHANGE_PRODUCTS_NULL");
  },
  SET_PRODUCTS({ commit, state }, city = null) {
    return new Promise((resolve, reject) => {
      let loaded = undefined;
      const sort = "orderBy=id&sortedBy=desc";
      // let api = `${this.$api.products}?per_page=${state.per_page || 10}&page=${state.page}&${sort}&${withField}&searchJoin=and&search=status:0,1`;
      let api = `${this.$api.products}?per_page=${state.per_page || 10}&page=${state.page}&${sort}&searchJoin=and&search=status:0,1`;
      if (city && city.id !== "c1")  {
        if (!city.state_id && city.state_code) {
          api += `;city.state.state_code:${city.state_code}`
        } else {
          api += `;city_id:${city.id};mil:50`;
        }
        // api += &${noVip}`;
      }
      this.$axios.$get(api)
        .then(({ data, meta: { current_page, last_page } }) => {
          commit("CHANGE_PRODUCTS", data, current_page);
          commit("CHANGE_PAGE", current_page + 1);
          commit("CHANGE_LAST_PAGE", last_page);
          loaded = current_page < last_page;
          resolve(loaded);
        })
        .catch((error) => {
          if (this.$axios.isCancel(error)) resolve(false);
          reject(error);
        });
    });
  },
  async SET_BANNERS({ commit }) {
    try {
      const { data } = await this.$axios.$get(this.$api.commercialBusCart);
      commit("CHANGE_BANNERS", data);
    } catch (error) {

    }
  },
  SET_USER_BANNERS({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(this.$api.commercialUserBusCart).then(({ data }) => {
        commit("CHANGE_USER_BANNERS", data);
        resolve(true);
      });
    });
  },
};

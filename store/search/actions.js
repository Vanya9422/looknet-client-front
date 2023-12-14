import { withField } from "~/mixins/helpers/products";
import { cloneDeep } from "lodash";

export default {
  SET_SEARCH_MIL({ commit }, mil) {
    commit("CHANGE_SEARCH_MIL", mil);
  },
  SET_SEARCH_CATEGORY({ commit }, categoryId) {
    commit("CHANGE_SEARCH_CATEGORY", categoryId);
  },
  SET_SEARCH_CATEGORY_ID({ commit }, category) {
    commit("CHANGE_SEARCH_CATEGORY_ID", category?.id !== undefined
      ? category
      : { id: '' }
    );
    return true;
  },
  SET_SEARCH_ANSWERS_IDS({ commit }, { value, index }) {
    if (!value.checked) {
      commit("ADD_SEARCH_ANSWERS_IDS", { value, index });
    } else {
      commit("REMOVE_SEARCH_ANSWERS_IDS", { value, index });
    }
    // commit('CHANGE_SEARCH_ANSWERS_IDS', {value, index})
  },

  SET_SEARCH_CITY({ commit }, city) {
    commit("CHANGE_SEARCH_CITY", city);
  },
  SET_GLOBAL_SEARCH_ANSWERS({ commit }, filters) {
    commit("CHANGE_GLOBAL_SEARCH_ANSWERS", filters);
  },
  SET_SEARCH_PRODUCTS({ commit, state }) {
    // let search = cloneDeep(state.search)
    let search = {};
    if (state.searchText) {
      search.search_text = cloneDeep(state.searchText);
    }
    if (state.city && (state.city.id !== 0 || state.city.id !== "c1")) {
      if (!state.city.state_id && state.city.state_code) {
        search.state_code = cloneDeep(state.city.state_code);
      } else {
        search.city_id = cloneDeep(state.city.id);
        if (state.search.mil) {
          search.mil = cloneDeep(state.search.mil.key);
        }
      }
    }
    if (state.search.costFrom === 0 && state.search.costTo === 0) {
      search.price = "";
    } else if (state.search.costFrom === state.search.costTo) {
      search.price = state.search.costFrom;
    } else {
      if (
        state.search.costTo === undefined ||
        state.search.costTo === 0 ||
        state.search.costTo === ""
      ) {
        search.price = state.search.costFrom || "";
      } else {
        search.price = `${state.search.costFrom || 0},${state.search.costTo}`;
      }
    }
    if (state.search.answersFiltersIds)
      search.answersFiltersIds = JSON.stringify(
        cloneDeep(state.search.answersFiltersIds)
      );
    search.page = 1;
    return search;
    // this.$router.push({query: {...search}})
  },
  async SEARCH_PRODUCTS({ commit, state }, categoryId) {
    if (!state.productsLoading) {
      commit("CHANGE_PRODUCTS_LOADING", true);
      let search = {};
      let searchQuery = "";

      let productSort = state.sorts[state.sort];
      search.search_text = state.searchText;

      if (state.search.costFrom === 0 && state.search.costTo === 0) {
        search.price = "";
      } else if (state.search.costFrom === state.search.costTo) {
        search.price = state.search.costFrom;
      } else {
        if (
          state.search.costTo === undefined ||
          state.search.costTo === 0 ||
          state.search.costTo === ""
        ) {
          search.price = state.search.costFrom || "";
        } else {
          search.price = `${state.search.costFrom || 0},${state.search.costTo}`;
        }
      }

      if (
        state.search.mil.key !== "all" &&
        state.search.city?.id &&
        state.search.city.id !== "c1"
      ) {
        if (!state.search.city.state_id && state.search.city.state_code) {
          // search.state_code = state.search.city.state_code;
          searchQuery += `;city.state.state_code:${state.city.state_code}`;
        } else {
          search.city_id = state.search.city.id;
          search.mil = state.search.mil.key;
        }
      }
      let filters = null;
      if (state.search.answersFiltersIds) {
        const answersFiltersIdsClone = JSON.parse(JSON.stringify(state.search.answersFiltersIds));
        const filtersValues = answersFiltersIdsClone?.filters_values || {};
        const filtersHierarchy = answersFiltersIdsClone?.filters || {};
        filters = {}
        filters.filters_values = JSON.parse(JSON.stringify(filtersValues));
        filters.filters = JSON.parse(JSON.stringify(filtersHierarchy));
        // filters.filters = {};

        // for (const filterId in filtersHierarchy) {
        //   const currentFilterSelection = filtersHierarchy[filterId];
        //   for (const answerID in currentFilterSelection) {
        //     filters.filters[answerID] = currentFilterSelection[answerID]
        //   }
        // }

        if(!Object.keys(filters.filters_values).length) delete filters.filters_values;
        if(!Object.keys(filters.filters).length) delete filters.filters;

        filters = Object.keys(filters).map(key => key + '=' + JSON.stringify(filters[key])).join('&');
      }
      // if (state.search.answersFiltersIds) search.answersFiltersIds = JSON.stringify(state.search.answersFiltersIds)
      // let api = `${this.$api.products}?page=${state.page}&per_page=${state.per_page}&${withField}&searchJoin=and`;
      let api = `${this.$api.products}?page=${state.page}&per_page=${state.per_page}&is_top=1&searchJoin=and`;
      const $getQuery = this.$getQuery(search, true);
      api += "&search=status:1,0";
      if ($getQuery !== "") {
        api += `;${$getQuery}`;
      }
      if (searchQuery.length) {
        api += searchQuery;
      }
      if (productSort) api += `&${productSort}`;
      if (categoryId) {
        api += `&category_id=${categoryId}`;
        // if (filters && filters !== "[]") api += `&filters=${filters}`;
        if (filters && filters !== "{}") api += `&${filters}`;

      }
      try {
        const { data, meta: { current_page, last_page }, top_advertises } = await this.$axios.$get(api);
        commit("SEARCH_PRODUCTS", data,);
        commit("SEARCH_TOP_PRODUCTS", top_advertises,);
        commit("CHANGE_TOTAL_PAGE", last_page);
      } catch (error) {
        console.log(error)
      } finally {
        commit("CHANGE_PRODUCTS_LOADING", false);
      }
      return true;
    }
  },
  SEARCH_PRODUCTS_NULL({ commit }) {
    commit("SEARCH_PRODUCTS", []);
  },
};

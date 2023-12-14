import { cloneDeep, without, has } from "lodash";
import {
  updateAnswerIds,
  removeAnswerIds,
  addAnswersToGlobalArray,
} from "@/mixins/helpers/search";

export default {
  CHANGE_SEARCH(state, search) {
    state.search = search;
  },
  CHANGE_MIL(state, mil) {
    state.mil = mil;
  },
  CHANGE_CITY_SEARCH(state, search) {
    state.citySearch = search;
  },
  CHANGE_SEARCH_TEXT(state, search) {
    state.searchText = search;
  },
  CHANGE_SEARCH_PRODUCTS_LIST(state, list) {
    state.searchProductsList = list;
  },
  CHANGE_SEARCH_MIL(state, mil) {
    state.search.mil = mil;
  },
  CHANGE_SEARCH_CATEGORY_ID(state, category) {
    state.search.category_id = category.id;
    state.category = category;
  },

  SEARCH_CATEGORY(state, category) {
    state.category = category;
  },

  GET_SEARCH_ANSWERS_IDS(state, obj) {
    // state.answersFiltersIds = obj;
    state.search.answersFiltersIds = obj;
    // state.answersIds = addAnswersToGlobalArray(obj, []);
  },
  CHANGE_ITEM_SEARCH_ANSWERS_IDS(state, obj) {
    // const { value, index } = obj;
    // if (!state.answersFiltersIds) {
    //   state.answersFiltersIds = [];
    //   state.search.answersFiltersIds = [];
    // }
    // state.answersFiltersIds[index] = value;
    // state.search.answersFiltersIds[index] = value;
    // state.answersIds = addAnswersToGlobalArray(state.answersFiltersIds, []);
  },
  ADD_SEARCH_ANSWERS_IDS(state, obj) {
    // const { value, index } = obj;
    // if (!state.answersFiltersIds) {
    //   state.answersFiltersIds = [];
    //   state.search.answersFiltersIds = [];
    // }
    // let answersFiltersIds = cloneDeep(state.answersFiltersIds);
    // state.answersFiltersIds = updateAnswerIds(
    //   answersFiltersIds,
    //   value.id,
    //   index
    // );
    // state.answersIds = addAnswersToGlobalArray(state.answersFiltersIds, []);
  },
  REMOVE_SEARCH_ANSWERS_IDS(state, obj) {
    // const { value, index } = obj;
    // if (!state.answersFiltersIds) {
    //   state.answersFiltersIds = [];
    //   state.search.answersFiltersIds = [];
    // }
    // let answersFiltersIds = cloneDeep(state.answersFiltersIds || []);
    // state.answersFiltersIds = removeAnswerIds(
    //   answersFiltersIds,
    //   value.id,
    //   index
    // );
    // state.answersIds = addAnswersToGlobalArray(state.answersFiltersIds, []);
  },
  CHANGE_SEARCH_CITY(state, city) {
    if (!city) city = { id: 0, name: "" };
    state.search.city = city;
    state.city = city;
  },
  CHANGE_PRODUCTS_LOADING(state, loading) {
    state.productsLoading = loading;
  },
  CHANGE_GLOBAL_SEARCH_ANSWERS(state, filters) {
    state.search.answersFiltersIds = filters;
  },
  CHANGE_SORT(state, sort) {
    state.sort = sort;
  },
  SEARCH_PRODUCTS(state, products) {
    state.products = products;
  },
  SEARCH_TOP_PRODUCTS(state, products = []) {
    state.top_products = products.map((product) => ({
      ...product,
      is_top:true,
    }));
  },
  CHANGE_PAGE(state, page) {
    state.page = page;
  },
  CHANGE_TOTAL_PAGE(state, page) {
    state.total = page;
  },
  CHANGE_OPEN_PAGE(state, page) {
    state.openPage = page;
  },
  CHANGE_GET_PRODUCTS(state, page) {
    state.getProducts = page;
  },
  CHANGE_COST_FROM(state, cost) {
    state.costFrom = cost;
    state.search.costFrom = cost;
  },
  CHANGE_COST_TO(state, cost) {
    state.costTo = cost;
    state.search.costTo = cost;
  },
};

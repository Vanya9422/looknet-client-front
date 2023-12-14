export default {
  CHANGE_CATEGORIES(state, categories) {
    state.categories = categories
  },
  CHANGE_CATEGORY(state, category) {
    state.category = category
  },
  CHANGE_FILTERS(state, filters) {
    state.filters = filters
  },
  CHANGE_CATEGORY_NUMBER(state, number) {
    state.active = number >= 0 ? number : 0
  },
  CHANGE_CATEGORY_PRODUCTS(state, data) {
    if (state.page === 1 || state.page === 2) state.categoryProducts = data
    else state.categoryProducts.push(...data)
  },
  CHANGE_PAGE(state, page) {
    if (state.page === 1) state.categoryProducts = []
    state.page = page
  },
  CHANGE_LAST_PAGE(state, page) {
    state.lastPage = page
  },
  CHANGE_ALL_FILTERS(state, filters) {
    state.allFilters = filters
  },
  CHANGE_FILTERS_PRELOADER(state, loading = false) {
    state.filtersPreloader = loading
  }
}


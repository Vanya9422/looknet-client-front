export default {
  SET_SEO_HOME(state, payload) {
    state.home = payload;
  },
  SET_SEO_CATALOG(state, payload) {
    state.catalog = payload;
  },
  SET_SEO_CONTACTS(state, payload) {
    state.contacts = payload;
  },
  SET_SEO_SUPPORT(state, payload) {
    state.support = payload;
  },
  SET_SEO_PRODUCT(state, payload) {
    state.product = payload;
  },
  CHANGE_TEXT_LOADING_STATE(state, { key, value }) {
    if (!state[key]) {
      state[key] = {};
    }
    state[key].loadingLocale = value;
  },
}


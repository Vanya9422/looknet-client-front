import addProduct from "~/misc/pages/addProduct";

export default {
  CHANGE_PAGE_REGISTRATION(state, data) {
    state.registration = data;
  },
  CHANGE_PAGE_SETTINGS(state, data) {
    state.settings = data;
  },
  CHANGE_PAGE_DONE(state, data) {
    state.registerDone = data;
  },
  CHANGE_PAGE_REGISTRATION_CONFIRM(state, data) {
    state.registerConfirm = data;
  },
  CHANGE_PAGE_RESET(state, data) {
    state.reset = data;
  },
  CHANGE_PAGE_FAVORITE(state, data) {
    state.favorite = data;
  },
  CHANGE_MY_ADVERTISES(state, data) {
    state.myAdvertises = data;
  },
  CHANGE_PAGE_HOME(state, data) {
    state.home = data;
  },
  CHANGE_PAGE_CATALOG(state, data) {
    state.catalog = data;
  },
  CHANGE_PAGE_PRODUCT_DETAILS(state, data) {
    // TODO rename DETAILS ?
    state.productDetails = data;
  },
  CHANGE_PAGE_MENU_DEFAULT(state, data) {
    state.menuDefault = data;
  },
  CHANGE_PAGE_MENU_AUTH(state, data) {
    state.menuAuth = data;
  },
  CHANGE_PAGE_ADD_PRODUCT(state, data) {
    state.addProduct = data;
  },
  CHANGE_PAGE_MODAL_TARIFF(state, data) {
    state.modalTariff = data;
  },
  CHANGE_PAGE_MODAL_STATISTIC(state, data) {
    state.modalStatistic = data;
  },
  CHANGE_PAGE_NOTIFICATIONS(state, data) {
    state.notifications = data;
  },
  CHANGE_PAGE_MODAL_MENU(state, data) {
    state.modalMenu = data;
  },
  CHANGE_PAGE_PASSWORD_ERROR(state, data) {
    state.passwordError = data;
  },
  CHANGE_PAGE_FOOTER(state, data) {
    state.footer = data;
  },
  CHANGE_PAGE_LOGOUT(state, data) {
    state.logout = data;
  },
  CHANGE_PAGE_CHAT(state, data) {
    state.chat = data;
  },
  CHANGE_PAGE_POPUP(state, data) {
    state.popup = data;
  },
  CHANGE_PAGE_SMALL_FOOTER(state, data) {
    state.smallFooter = data;
  },
  CHANGE_PAGE_ERRORS(state, data) {
    state.errors = data;
  },
  CHANGE_TEXT_LOADING_STATE(state, { key, value }) {
    if (!state[key]) {
      state[key] = {};
    }
    state[key].loadingLocale = value;
  },
};

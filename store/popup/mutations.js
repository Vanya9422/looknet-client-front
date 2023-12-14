export default {
  CHANGE_POPUP_GLOBAL(state, global) {
    state.global = global
  },
  CHANGE_POPUP_LOCAL(state, info) {
    state.localModal = info
  },
  CHANGE_POPUP_AVATAR(state, info) {
    state.avatarModal = info
  },
  CHANGE_POPUP_LANG(state, info) {
    state.lang = info
  },
  CHANGE_POPUP_CONTACTS(state, info) {
    state.contacts = info
  },
  CHANGE_POPUP_SUPPORT(state, info) {
    state.support = info
  },
  CHANGE_POPUP_THANK(state, info) {
    state.thank = info
  },
  CHANGE_POPUP_ERROR(state, info) {
    state.error = info
  },
  CHANGE_POPUP_COOKIE(state, info) {
    state.cookie = info
  },
  CHANGE_POPUP_LOGIN(state, info) {
    state.LOGIN = info
  },
  CHANGE_POPUP_CONFIRM(state, info) {
    state.confirm = info;
  },
  CHANGE_POPUP_COMING_SOON(state, info) {
    state.comingSoon = info;
  },
  CHANGE_POPUP_NOT_FOUND(state, info) {
    state.notFound = info;
  },
  CHANGE_POPUP_USER_ADS(state, info) {
    state.userAds = info;
  },
  CHANGE_TEXT_LOADING_STATE(state, { key, value }) {
    if (!state[key]) {
      state[key] = {};
    }
    state[key].loadingLocale = value;
  },
}


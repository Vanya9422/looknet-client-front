export default {
  CHANGE_USER(state, user) {
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    state.user = user
  },
  CHANGE_TRANSLATE(state, translate) {
    if (process.client) {
      localStorage.setItem('translate', JSON.stringify(translate));
    }
    state.translate = translate
  }
}


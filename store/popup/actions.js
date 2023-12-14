export default {
  async getPopup({ state, commit }, { page_key, type = 'popup', stateKey, commitKey }) {
    try {
      const currentLocale = this.$i18n.localeProperties.code;
      if (
        state[stateKey]?.localeCode === currentLocale
        || state[stateKey]?.loadingLocale === currentLocale
      ) return;
      if (process.client) {
        commit('CHANGE_TEXT_LOADING_STATE', {
          key: stateKey,
          value: currentLocale,
        });
      }
      const url = this.$getQuery({ page_key, type });
      let { data: { content } } = await this.$axios.$get(`${this.$api.page}?${url}`);
      if (!content) {
        throw new Error(`Popup '${page_key}' not found`);
      }
      content = JSON.parse(content);
      content.localeCode = currentLocale;
      commit(commitKey, content);
    } catch (error) {
      if (process.client) {
        commit('CHANGE_TEXT_LOADING_STATE', {
          key: stateKey,
          value: null,
        });
      }
      console.error(error);
    }
  },
  async SET_POPUP_GLOBAL({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'modal-global',
      stateKey: 'global',
      commitKey: 'CHANGE_POPUP_GLOBAL',
    });
  },
  async SET_POPUP_LOCAL({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'city',
      stateKey: 'localModal',
      commitKey: 'CHANGE_POPUP_LOCAL',
    });
  },
  async SET_POPUP_AVATAR({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'picture',
      stateKey: 'avatarModal',
      commitKey: 'CHANGE_POPUP_AVATAR',
    });
  },
  async SET_POPUP_LANG({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'lang',
      stateKey: 'lang',
      commitKey: 'CHANGE_POPUP_LANG',
    });
  },
  async SET_POPUP_CONTACTS({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'modal-contacts',
      stateKey: 'contacts',
      commitKey: 'CHANGE_POPUP_CONTACTS',
    });
  },
  async SET_POPUP_SUPPORT({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'modal-support',
      stateKey: 'support',
      commitKey: 'CHANGE_POPUP_SUPPORT',
    });
  },
  async SET_POPUP_THANK({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'modal-thanks',
      stateKey: 'thank',
      commitKey: 'CHANGE_POPUP_THANK',
    });
  },
  async SET_POPUP_ERROR({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'modal-error',
      stateKey: 'error',
      commitKey: 'CHANGE_POPUP_ERROR',
    });
  },
  async SET_POPUP_COOKIE({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'modal-cookie',
      stateKey: 'cookie',
      commitKey: 'CHANGE_POPUP_COOKIE',
    });
  },
  async SET_POPUP_LOGIN({ dispatch }) {
    await dispatch('getPopup', {
      type: 'front_design',
      page_key: 'login',
      stateKey: 'LOGIN',
      commitKey: 'CHANGE_POPUP_LOGIN',
    });
  },
  async SET_POPUP_CONFIRM({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'modal-confirm',
      stateKey: 'confirm',
      commitKey: 'CHANGE_POPUP_CONFIRM',
    });
  },
  async SET_POPUP_COMING_SOON({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'modal-coming-soon',
      stateKey: 'comingSoon',
      commitKey: 'CHANGE_POPUP_COMING_SOON',
    });
  },
  async SET_POPUP_NOT_FOUND({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'modal-not-found',
      stateKey: 'notFound',
      commitKey: 'CHANGE_POPUP_NOT_FOUND',
    });
  },
  async SET_POPUP_USER_ADS({ dispatch }) {
    await dispatch('getPopup', {
      page_key: 'modal-user-ads',
      stateKey: 'userAds',
      commitKey: 'CHANGE_POPUP_USER_ADS',
    });
  },
};

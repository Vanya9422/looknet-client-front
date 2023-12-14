export default {
  async getPage({ state, commit }, { page_key, stateKey, commitKey }) {
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
      const url = this.$getQuery({ page_key });
      let { data: { content } } = await this.$axios.$get(`${this.$api.page}?${url}`);
      if (!content) {
        throw new Error(`Page '${page_key}' not found`);
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
  async SET_PAGE_REGISTRATION({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'register',
      stateKey: 'registration',
      commitKey: 'CHANGE_PAGE_REGISTRATION',
    });
  },
  async SET_PAGE_PAGE_SETTINGS({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'settings',
      stateKey: 'settings',
      commitKey: 'CHANGE_PAGE_SETTINGS',
    });
  },
  async SET_PAGE_DONE({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'other-register-done',
      stateKey: 'registerDone',
      commitKey: 'CHANGE_PAGE_DONE',
    });
  },
  async SET_PAGE_REGISTRATION_CONFIRM({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'other-confirm',
      stateKey: 'registerConfirm',
      commitKey: 'CHANGE_PAGE_REGISTRATION_CONFIRM',
    });
  },
  async SET_PAGE_LOGOUT({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'logout',
      stateKey: 'logout',
      commitKey: 'CHANGE_PAGE_LOGOUT',
    });
  },
  async SET_PAGE_RESET({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'other-reset',
      stateKey: 'reset',
      commitKey: 'CHANGE_PAGE_RESET',
    });
  },
  async SET_PAGE_PASSWORD_ERROR({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'other-password-error',
      stateKey: 'passwordError',
      commitKey: 'CHANGE_PAGE_PASSWORD_ERROR',
    });
  },
  async SET_PAGE_FOOTER({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'other-footer',
      stateKey: 'footer',
      commitKey: 'CHANGE_PAGE_FOOTER',
    });
  },
  async SET_PAGE_FAVORITE({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'favorites',
      stateKey: 'favorite',
      commitKey: 'CHANGE_PAGE_FAVORITE',
    });
  },
  async SET_PAGE_HOME({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'home',
      stateKey: 'home',
      commitKey: 'CHANGE_PAGE_HOME',
    });
  },
  async SET_PAGE_CATALOG({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'catalog',
      stateKey: 'catalog',
      commitKey: 'CHANGE_PAGE_CATALOG',
    });
  },
  async SET_PAGE_PRODUCT_DETAILS({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'product-details',
      stateKey: 'productDetails',
      commitKey: 'CHANGE_PAGE_PRODUCT_DETAILS',
    });
  },
  async SET_PAGE_MENU_DEFAULT({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'menu-default',
      stateKey: 'menuDefault',
      commitKey: 'CHANGE_PAGE_MENU_DEFAULT',
    });
  },
  async SET_PAGE_MENU_AUTH({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'menu-auth',
      stateKey: 'menuAuth',
      commitKey: 'CHANGE_PAGE_MENU_AUTH',
    });
  },
  async SET_MY_ADVERTISES({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'my-advertises',
      stateKey: 'myAdvertises',
      commitKey: 'CHANGE_MY_ADVERTISES',
    });
  },
  async SET_PAGE_ADD_PRODUCT({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'add-product',
      stateKey: 'addProduct',
      commitKey: 'CHANGE_PAGE_ADD_PRODUCT',
    });
  },
  async SET_PAGE_MODAL_TARIFF({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'modal-tariffs',
      stateKey: 'modalTariff',
      commitKey: 'CHANGE_PAGE_MODAL_TARIFF',
    });
  },
  async SET_PAGE_MODAL_STATISTIC({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'modal-statistics',
      stateKey: 'modalStatistic',
      commitKey: 'CHANGE_PAGE_MODAL_STATISTIC',
    });
  },
  async SET_PAGE_MODAL_MENU({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'menu-mobile',
      stateKey: 'modalMenu',
      commitKey: 'CHANGE_PAGE_MODAL_MENU',
    });
  },
  async SET_PAGE_NOTIFICATIONS({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'notifications',
      stateKey: 'notifications',
      commitKey: 'CHANGE_PAGE_NOTIFICATIONS',
    });
  },
  async SET_PAGE_CHAT({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'chat',
      stateKey: 'chat',
      commitKey: 'CHANGE_PAGE_CHAT',
    });
  },
  async SET_PAGE_POPUP({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'popup',
      stateKey: 'popup',
      commitKey: 'CHANGE_PAGE_POPUP',
    });
  },
  async SET_PAGE_SMALL_FOOTER({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'reset-footer',
      stateKey: 'smallFooter',
      commitKey: 'CHANGE_PAGE_SMALL_FOOTER',
    });
  },
  async SET_PAGE_ERRORS({ dispatch }) {
    await dispatch('getPage', {
      page_key: 'errors',
      stateKey: 'errors',
      commitKey: 'CHANGE_PAGE_ERRORS',
    });
  },
};

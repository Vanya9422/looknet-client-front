export default {
  async getSeo({ state, commit }, { code, stateKey, commitKey }) {
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
      const url = this.$getQuery({ page_key: code });
      let { data: { content } } = await this.$axios.$get(`${this.$api.page}?${url}`);
      if (!content) {
        throw new Error(`Seo '${code}' not found`);
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
  async GET_SEO_HOME({ dispatch }) {
    await dispatch('getSeo', {
      code: 'seo-home',
      stateKey: 'home',
      commitKey: 'SET_SEO_HOME',
    });
  },
  async GET_SEO_CONTACTS({ dispatch }) {
    await dispatch('getSeo', {
      code: 'seo-contacts',
      stateKey: 'contacts',
      commitKey: 'SET_SEO_CONTACTS',
    });
  },
  async GET_SEO_SUPPORT({ dispatch }) {
    await dispatch('getSeo', {
      code: 'seo-support',
      stateKey: 'support',
      commitKey: 'SET_SEO_SUPPORT',
    });
  },
};

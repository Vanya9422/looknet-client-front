<template lang="pug">
  main.main
    section-catalog

</template>

<script>
import { mapActions } from 'vuex';

export default {
  async asyncData({ store, route, error: renderError }) {
    let page = 1;
    let category = null;
    if (route?.query?.page) {
      page = route.query.page;
    }
    store.commit('search/CHANGE_PAGE', page);
    await Promise.all([
      store.dispatch('category/SET_CATEGORIES'),
      store.dispatch('pages/SET_PAGE_CATALOG'),
      new Promise(async (resolve, reject) => {
      try {
        const routeParams = route.params.pathMatch || route.params.slug;
        if (routeParams) {
          const slug = routeParams.split('/');
          category = await store.dispatch('category/SET_CATEGORY', slug.length > 1 ? slug[slug.length - 1] : slug[0]);
          if (!category) {
            renderError('Category not found');
            resolve();
            return;
          }
          await store.dispatch('search/SEARCH_PRODUCTS_NULL');
          await store.dispatch('search/SEARCH_PRODUCTS', category.id);
        } else {
          await store.dispatch('search/SEARCH_PRODUCTS_NULL');
          await store.dispatch('search/SEARCH_PRODUCTS');
        }
        resolve();
      } catch (error) {
        if (!category) {
          renderError('Category not found');
          resolve();
          return;
        }
        reject(error);
      }
    })
    ]);
  },
  methods: {
    ...mapActions({
      SEARCH_PRODUCTS_NULL: 'search/SEARCH_PRODUCTS_NULL',
    }),
  },
  beforeRouteLeave (to, from, next) {
    if (to.path.search('catalog') === -1) {
      this.$once('hook:destroyed', () => {
        this.SEARCH_PRODUCTS_NULL();
      });
    }
    next();
  }
};
</script>

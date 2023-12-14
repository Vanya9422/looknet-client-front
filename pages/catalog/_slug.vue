<template lang="pug">
  main.main
    h1.hidden-h1(v-if="customSEO" ) {{ `Looknet in ${city} - Free Advertising Web Site - ${searchText}` }}
    h1.hidden-h1(v-else-if="catalogPageSeo?.h1" ) {{ catalogPageSeo.h1 }}
    section-catalog
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { decodeQuery } from "~/mixins/helpers/search";
import shortCodes from "~/mixins/shortCodes";

export default {
  async asyncData({ store, route, error: renderError }) {
    let category = null;
    let page = 1;
    if (route?.query?.page) {
      page = route.query.page;
    }
    if (route?.query?.data) {
      const query = decodeQuery(route.query);
      if (query?.page) {
        page = query.page;
      }
      store.commit('search/CHANGE_SEARCH_TEXT', query.search_text || '');
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
              resolve(false);
              return;
            }
            await store.dispatch('search/SEARCH_PRODUCTS_NULL');
            await store.dispatch('search/SEARCH_PRODUCTS', category.id);
          } else {
            await store.dispatch('search/SEARCH_PRODUCTS_NULL');
            await store.dispatch('search/SEARCH_PRODUCTS');
          }
          resolve(true);
        } catch (error) {
          if (!category) {
            renderError('Category not found');
            resolve(false);
            return;
          }
          reject(error);
        }
      })
    ]);
    if (category && category.seo_description) {
      store.commit('seo/SET_SEO_CATALOG',
        {
          description: category.seo_description || '',
          title: category.seo_title || '',
          keywords: category.seo_keywords || '',
        });
    }
  },
  mixins: [shortCodes],
  head() {
    let title = this.catalogPageSeo?.title;
    let description = this.catalogPageSeo?.description;
    if (this.customSEO) {
      title = `Free Advertising Web Site - ${this.searchText} in ${this.city}`;
      description = `Buy, Sell, Search ${this.searchText} in ${this.city}.`;
    }
    return {
      title: title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        }
      ]
    };
  },
  computed: {
    searchText() {
      return this.$route.query.search_text || '';
    },
    customSEO() {
      const path = this.$route.path.replace(/\//g, '');
      return path === 'catalog' && this.city && this.searchText;
    }
  },
  methods: {
    ...mapActions({
      SEARCH_PRODUCTS_NULL: 'search/SEARCH_PRODUCTS_NULL',
    }),
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.search('catalog') === -1) {
      this.$once('hook:destroyed', () => {
        this.SEARCH_PRODUCTS_NULL();
      });
    }
    next();
  }
};
</script>

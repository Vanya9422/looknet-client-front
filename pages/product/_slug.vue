<template>
  <main class="main">
    <part-loader v-show="loading" />
    <section-single v-show="!loading" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ store, route, error }) {
    await store.dispatch("pages/SET_PAGE_CHAT");
    if (typeof route.params.slug !== 'string' || route.params.slug === '[object Object]') {
      if (process.env.NODE_ENV !== 'production') {
        console.trace('No slug');
      }
      return;
    }
    await store.dispatch("product/SET_DETAIL", route.params.slug);
    const detail = store.getters["product/DETAIL"];
    if (!detail) {
      error('Product not found');
      return;
    }
    store.commit('seo/SET_SEO_PRODUCT', {
      title: detail.name,
      description: detail.description,
    });
    await store.dispatch("product/SET_RECOMEND", detail.category.id);
    await store.dispatch("product/SET_USER_PRODUCTS");
  },
  head() {
    return {
      title: this.SEO_PRODUCT.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.SEO_PRODUCT.description
        }
      ]
    }
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters({
      SEO_PRODUCT: 'seo/SEO_PRODUCT',
    }),
  },
  mounted() {
    if (process.client) {
      this.loading = false;
    }
  },
};
</script>

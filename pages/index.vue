<template>
  <main class="main home">
    <h1 class="hidden-h1">
      {{ `Looknet in ${city} - Free Advertising Web Site` }}
    </h1>
    <section-search :content="PAGE_HOME"></section-search>
    <section class="section-categories">
      <section-categories
        class="big"
        :category="{ title: PAGE_HOME.recommend.title, list: products }"
        isRecommend
        @fetchMoreData="handleLoadMore"
        :showSkeleton="showSkeleton"
      >
      </section-categories>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import pageTranslate from "@/mixins/pageTranslate";
import shortCodes from "~/mixins/shortCodes";

export default {
  mixins: [pageTranslate, shortCodes],
  async asyncData({ store }) {
    const other = [
      store.dispatch('seo/GET_SEO_HOME'),
      store.dispatch('pages/SET_PAGE_HOME'),
      store.dispatch('home/SET_BANNERS'),
      store.dispatch('category/SET_CATEGORIES'),
    ];
    // main
    await store.dispatch('home/SET_PRODUCTS_NULL');
    await store.dispatch('home/SET_VIP_PRODUCTS', store.getters['location/LOCATION']);
    await store.dispatch('home/SET_PRODUCTS_PAGE');
    await store.dispatch('home/SET_PRODUCTS', store.getters['location/LOCATION']);
    await Promise.all(other);
  },
  head() {
    let title = this.homePageSeo?.title;
    let description = this.homePageSeo?.description;
    if (this.city) {
      title = `Free Advertising Web Site: Boost Visibility in ${this.city}`;
      description = `Buy, Sell, Search in ${this.city}. New and Pre-owned, Everything You Need is on Looknet. Take action now for maximum impact.`;
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
  data() {
    return {
      showSkeleton: false
    };
  },
  computed: {
    ...mapGetters({
      PAGE_HOME: "pages/PAGE_HOME",
      VIP_PRODUCTS: "home/VIP_PRODUCTS",
      PRODUCTS: "home/PRODUCTS",
      LOCATION: "location/LOCATION",
    }),
    locationText() {
      if (this.LOCATION?.name && this.LOCATION?.state_code) {
        return `${this.LOCATION.name}, ${this.LOCATION.state_code}`;
      }
      return 'USA';
    },
    products() {
      const vipProducts = this.VIP_PRODUCTS.map((product) => ({
        ...product,
        is_vip: true,
      }));
      const products = this.PRODUCTS.map((product) => ({
        ...product,
        is_vip: false,
      }));
      return [...vipProducts, ...products];
    },
  },
  watch: {
    LOCATION(newValue, oldValue) {
      const defaultLocation = { id: "c1", name: this.PAGE_HOME.search.city };
      const newLocation = { ...defaultLocation, ...newValue };
      const oldLocation = { ...defaultLocation, ...oldValue };
      if (
        (newLocation.name === oldLocation.name
          && newLocation.state_code === oldLocation.state_code)
        || newLocation.id === oldLocation.id
      ) return;
      this.openPage();
    },

  },
  methods: {
    ...mapActions({
      SET_PAGE_HOME: "pages/SET_PAGE_HOME",
      SET_VIP_PRODUCTS: "home/SET_VIP_PRODUCTS",
      SET_PRODUCTS_PAGE: "home/SET_PRODUCTS_PAGE",
      SET_PRODUCTS: "home/SET_PRODUCTS",
      SET_PRODUCTS_NULL: "home/SET_PRODUCTS_NULL",
    }),
    getPageTranslate() {
      this.SET_PAGE_HOME();
    },
    openPage() {
      this.$axios.requestManager.cancel('products');
      this.SET_VIP_PRODUCTS(this.LOCATION);
      this.SET_PRODUCTS_PAGE();
      this.SET_PRODUCTS_NULL();
      this.SET_PRODUCTS(this.LOCATION);
    },
    async handleLoadMore($state) {
      if (!this.PRODUCTS.length) return;
      this.showSkeleton = true;
      const loadState = await this.SET_PRODUCTS(this.LOCATION);
      if (loadState) {
        $state.loaded();
      } else {
        $state.complete();
      }
      this.showSkeleton = false;
    },
  },
};
</script>

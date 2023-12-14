<template lang="pug">
  section.favorites-ad
    h1.favorites-ad__title.h3 {{ PAGE_FAVORITE.title }}
    part-back-nav.favorites-ad__nav(:nav="PAGE_FAVORITE.nav")
      .back-nav__buttons.flex
        .back-nav__sort
          //form-select-array.favorites-ad__select(:label="PAGE_FAVORITE.sortBy" :items="sortList" v-model="sort" @input="changeSort" :value="sort" noBorder)
          form-select-sort-index.favorites-ad__select(
            :label="PAGE_FAVORITE.sortBy"
            :items="sortList"
            v-model="sort"
            @input="changeSort"
            :value="sort"
            noBorder)
        module-grid-switch.back-nav__grid-switch
    .section-categories__list.favorites-ad__list.flex(:class="{'list-inline':PRODUCT_CART_TYPE}")
      item-card.favorites-ad__item(
        v-for="(item, i) in FAVOURITES_PRODUCT"
        :key="i"
        :name="item.name"
        :city="item.city_name"
        :coordinates="{longitude:item.longitude,latitude:item.latitude}"
        :date="item.created_at"
        :phoneNumber="item.contact_phone"
        :desc="item.description"
        :price="item.price"
        :pricePolicy="item.price_policy",
        :to="item.slug"
        :id="item.id"
        favoritesProduct
        :author_id="item.user_id"
        :gallery="item.gallery"
        @show="openProductModal(i,FAVOURITES_PRODUCT)"
        :inline="PRODUCT_CART_TYPE"
      )
    client-only
      infinite-loading(
        :distance="20"
        :identifier="infiniteId"
        ref="infiniteLoading"
        @infinite="loadMore"
        v-if="!loadingPage"
      )
        .section-notifications__center(slot="no-results")
          part-not-notification.section-notifications__not-notification(v-if="FAVOURITES_PRODUCT && !FAVOURITES_PRODUCT.length")

        .section-notifications__center(slot="spinner")
          loader.white

        div(slot="no-more" v-if="!FAVOURITES_PRODUCT" )

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import openProductModal from "@/mixins/openProductModal";
import pageTranslate from "@/mixins/pageTranslate";

export default {
  fetch() {
    return Promise.all([
      this.getPageTranslate(),
      this.getPage(),
    ]);
  },
  data() {
    return {
      infiniteId: 0,
      loadingPage: true,
      list: [],
      sort: 0,
    };
  },
  mixins: [openProductModal,pageTranslate],
  computed: {
    ...mapGetters({
      FAVOURITES: 'favourites/FAVOURITES',
      FAVOURITES_PRODUCT: 'favourites/FAVOURITES_PRODUCT',
      PAGE_FAVORITE: 'pages/PAGE_FAVORITE',
      PRODUCT_CART_TYPE: 'product/PRODUCT_CART_TYPE'
    }),
    sortList() {
      return [
        {
          label: this.PAGE_FAVORITE.sortList[0].label,
          text: this.PAGE_FAVORITE.sortList[0].text,
          value: 'orderBy=id&sortedBy=desc',
        },
        {
          label: this.PAGE_FAVORITE.sortList[1].label,
          text: this.PAGE_FAVORITE.sortList[1].text,
          value: 'orderBy=id&sortedBy=asc',
        },
        {
          label: this.PAGE_FAVORITE.sortList[2].label,
          text: this.PAGE_FAVORITE.sortList[2].text,
          value: 'orderBy=price&sortedBy=desc',
        },
        {
          label: this.PAGE_FAVORITE.sortList[3].label,
          text: this.PAGE_FAVORITE.sortList[3].text,
          value: 'orderBy=price&sortedBy=asc',
        },
      ];
    },
  },
  beforeDestroy() {
    this.SET_FAVOURITES__NULL();
  },
  methods: {
    ...mapActions({
      SET_PAGE_FAVORITE: 'pages/SET_PAGE_FAVORITE',
      SET_FAVOURITES__NULL: 'favourites/SET_FAVOURITES__NULL',
      SET_FAVOURITES_PRODUCT: 'favourites/SET_FAVOURITES_PRODUCT',
      SET_FAVOURITES_PAGE: 'favourites/SET_FAVOURITES_PAGE',
    }),
    async getPageTranslate(){
      await this.SET_PAGE_FAVORITE();
    },
    async changeSort() {
      this.infiniteId += 1;
      await this.getPage();
    },
    async getPage() {
      this.loadingPage = true;
      await this.SET_FAVOURITES_PAGE();
      await this.SET_FAVOURITES__NULL();
      await this.getProducts();
      this.loadingPage = false;
    },
    async getProducts() {
      const sort = this.PAGE_FAVORITE.sortList[this.sort]
      try {
        const { data } = await this.SET_FAVOURITES_PRODUCT(sort.value);
        return !!data.length;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async loadMore($state) {
      const result = await this.getProducts();
      if (result) {
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  }
}
</script>


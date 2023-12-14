<template lang="pug">
form.search-form(@submit.prevent="searchProducts()", content="search-form")
  .search-form__row
    .search-form__options
      slot(name="left")
    .search-form__field
      input.search-form__input(
        ref="input",
        name="search",
        v-model="searchValue",
        :placeholder="placeholder",
        autocomplete="off",
        @keyup="showList"
      )
      button-action.search-form__btn-search(icon="search")
      div(v-if="search.length > 2 && searchListOn")
        .search-form__list.css-scrollbar(
          v-if="searchList && searchList.data && searchList.data.length > 0",
          v-click-outside="closeList"
        )
          .search-form__item(
            v-if="searchList.data && searchList.data.length > 0",
            v-for="(item, i) in searchList.data",
            :key="i.id"
          )
            span.search-form__link(
              @click="changePage(getRouter(item), { search_text: item.product_name })"
            )
              span
                span.search-form__link-name
                  | {{ item.product_name }}
                  //span.search-form__link-counter ({{item.advertises_count}})
                span.search-form__link-category {{ item.name }}
              svg-icon.search-form__link-arrow(name="arrowRight")
          .search-form__item(
            v-if="searchList.advertises && typeof searchList.advertises === 'object' && Object.values(searchList.advertises).length > 0",
            v-for="(item, i) in Object.values(searchList.advertises)",
            :key="i"
          )
            span.search-form__link(
              @click="changePage($locationPath(`/catalog`), { search_text: item.product_name })"
            )
              span
                span.search-form__link-name
                  | {{ item.product_name }}
                  span.search-form__link-counter ({{ item.total }})
              svg-icon.search-form__link-arrow(name="arrowRight")
          .search-form__item(
            v-if="searchList.data && searchList.data.length > 0"
          )
            span.search-form__link(
              @click="changePage($locationPath(`/catalog`), { search_text: search })"
            )
              span
                span.search-form__link-name
                  | {{ PAGE_HOME.allCategories }}
                  span.search-form__link-counter ({{ totalCategories(Object.values(searchList.advertises)) }})
              svg-icon.search-form__link-arrow(name="arrowRight")
        .search-form__list.css-scrollbar(v-else, v-click-outside="closeList")
          .search-form__item
            span.search-form__link(
              @click="changePage($locationPath(`/catalog`), { search_text: search })"
            )
              span.search-form__link-name {{ search }}
              svg-icon.search-form__link-arrow(name="arrowRight")
    .search-form__options
      slot
  button.search-form__btn(@click.prevent="searchProducts()") {{ btn }}
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import sendSearchProducts from "@/mixins/search/sendSearchProducts";
export default {
  props: {
    placeholder: {
      type: String,
      default: "Search for ads",
    },
    btn: {
      type: String,
      default: "Search",
    },
    white: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Boolean,
      default: false,
    },
    searchList: {
      type: [Array, Object],
      default: () => ({
        advertises: {},
        data: [],
      }),
    },
    search: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      searchListOn: false,
      searchValue: this.search,
    };
  },
  mixins: [sendSearchProducts],
  create() {
    if (process.client) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  watch: {
    searchValue: _.debounce(function (newVal, oldVal) {
      if (newVal === this.SEARCH_TEXT) return;
      this.CHANGE_SEARCH_TEXT(newVal);
    }, 500),
    SEARCH_TEXT(value) {
      this.searchValue = value;
    },
  },
  computed: {
    ...mapGetters({
      SEARCH_TEXT: "search/SEARCH_TEXT",
      PAGE_HOME: "pages/PAGE_HOME",
    }),
    // search: {
    //   get() {
    //     return this.SEARCH_TEXT
    //   },
    //   set:_.debounce(function(val) {
    //   }, 500),
    // },
  },
  methods: {
    ...mapMutations({
      CHANGE_SEARCH_TEXT: "search/CHANGE_SEARCH_TEXT",
    }),
    ...mapActions({
      SET_SEARCH_PRODUCTS: "search/SET_SEARCH_PRODUCTS",
    }),
    showList() {
      this.searchListOn = true;
    },
    closeList() {
      this.searchListOn = false;
    },
    totalCategories(data) {
      let count = 0;
      data.forEach((i) => (count += +i.total));
      return count;
    },
    getRouter(item) {
      let slug = item.slug;
      let parentCategories = item.parentCategories;
      while (parentCategories.length > 0) {
        let parentCategory = parentCategories[0];
        slug = `${parentCategory.slug}/${slug}`;
        parentCategories = parentCategory.parentCategories;
      }
      return this.$locationPath(`/catalog/${slug}`);
    },
    changePage(path, obj) {
      if (obj.search_text) {
        this.$emit('searchText', obj.search_text);
      }
      this.searchProducts(path);
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/сss/components/search-form.scss";
</style>

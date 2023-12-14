<template lang="pug">
part-search-form.section-catalog__form(
  ref="searchForm",
  :key="searchKey",
  :searchList="searchList",
  :placeholder="PAGE_HOME.search.placeholder",
  :btn="PAGE_HOME.search.search",
  :search="search",
  @searchText="search = $event || ''"
)
  template(v-if="!withOutCategory && CATEGORIES.length > 0", v-slot:left)
    button-select.search-form__select(
      borderRight,
      name="tippyCategories"
      :is-open="isCategoriesModalShowed"
      ) {{ $route.path === "/catalog" ? PAGE_HOME.allCategories : CATEGORY.name || PAGE_HOME.searchModal.categories }}
    client-only
      tippy.tippy-hide(
        to="tippyCategories",
        placement="bottom-start",
        trigger="click"
        ref="myTippy"
        @show="tippyShow"
        @hide="tippyHide"
      )
        part-modal-categories(
          :categories="CATEGORIES",
          :active="CATEGORY_ACTIVE",
          @active="changeActive"
        )
  client-only
    form-select-search.search-form__select(
      v-if="!withOutCity && $screen.st",
      @input="cityTextChange",
      @change="changeCityItem",
      @infinite="infinite",
      @open="openCities",
      @clear="clearCities",
      :citySearch="citySearch",
      :placeholder="PAGE_HOME.search.city",
      @isOpened="(val) => (this.openSearchList = val)",
      :value="citySearch",
      :loading="loading",
      name="city",
      :active="CITY",
      :items="CITIES",
      :recomendation="CITIES_RECOMMENDATION"
    )
      template(#input)
        input(
          @focus="openSearchList = true",
          @blur="openSearchList = false",
          :value="citySearch ? `${citySearch}${cityItem?.state_code ? `, ${cityItem.state_code}` : ''}` : ''",
          :placeholder="PAGE_HOME.search.city"
        )
      infinite-loading(
        v-if="CITIES.length > 0",
        ref="infiniteLoading",
        @distance="100",
        @infinite="infinite"
      )
        div(slot="no-results")
        div(slot="no-more")
        div(slot="spinner")
  form-select.search-form__select.search-form__select-mils(
    v-if="!withOutMil && cityItem?.id !== 'c1' && cityItem?.state_id",
    :value="mil || '50 mi'",
    @input="changeMil",
    name="distanse",
    :items="MILS"
  )
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import partSearch from "~/mixins/search/part-search";

export default {
  async fetch() {
    await this.getPageTranslate();
  },
  mixins: [partSearch],
  props: {
    withOutCategory: {
      type: Boolean,
      default: false,
    },
    withOutMil: {
      type: Boolean,
      default: false,
    },
    withOutCity: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchList: [],
      loading: false,
      cityItem: null,
      cityItemSelect: null,
      categories: [],
      category: {},
      // mil: '50 mi',
      searchKey: 1,
      page: 1,
      cityIdQuery: null,
      scrollPosition: 0,
      isCategoriesModalShowed: false
    };
  },
  computed: {
    ...mapGetters({
      LOCATION: "location/LOCATION",
      CITIES: "city/CITIES",
      CITIES_RECOMMENDATION: "city/CITIES_RECOMMENDATION",
      CATEGORIES: "category/CATEGORIES",
      CATEGORY: "category/CATEGORY",
      CATEGORY_ACTIVE: "category/CATEGORY_ACTIVE",
      PAGE_HOME: "pages/PAGE_HOME",
    }),
  },
  created() {
    this.getQuery();
    if (process.client) {
      window.addEventListener("scroll", this.handleScroll);
    }
    this.getDefaultCity();
  },
  watch: {
    CATEGORIES() {
      const number = this.CATEGORIES.findIndex(
        (item) => item.slug === this.CATEGORY.slug
      );
      this.SET_CATEGORIES_ACTIVE(number);
    },
    CATEGORY() {
      const number = this.CATEGORIES.findIndex(
        (item) => item.slug === this.CATEGORY.slug
      );
      this.SET_CATEGORIES_ACTIVE(number);
    },
    LOCATION(newValue, oldValue) {
      this.getDefaultCity();
      const defaultLocation = { id: "c1", name: this.PAGE_HOME.search.city };
      const newLocation = { ...defaultLocation, ...newValue };
      const oldLocation = { ...defaultLocation, ...oldValue };
      if (
        (newLocation.name === oldLocation.name
        && newLocation.state_code === oldLocation.state_code)
        || newLocation.id === oldLocation.id
      ) return;
      this.SET_SEARCH_CITY(newValue).then(() => {
        this.getProducts(this.$route);
      });
    },
    search(val) {
      this.searchWithText(val);
    },
    "$i18n.locale"() {
      this.getPageTranslate();
    },
  },
  methods: {
    ...mapActions({
      SET_PAGE_HOME: "pages/SET_PAGE_HOME",
      SET_POPUP_GLOBAL: "popup/SET_POPUP_GLOBAL",
    }),
    tippyShow() {
      this.isCategoriesModalShowed = true
    },
    tippyHide() {
      this.isCategoriesModalShowed = false
    },
    getPageTranslate() {
      return Promise.all([
        this.SET_PAGE_HOME(),
        this.SET_POPUP_GLOBAL(),
      ]);
    },
    cityTextChange(val) {
      // console.log(val, 'val')
      this.citySearch = val;
      this.cityItemSelect = val;
    },
    getDefaultCity() {
      if (!this.LOCATION) return;
      const city = { ...this.LOCATION };
      city.name = city.name || this.PAGE_HOME.search.city;
      if (this.citySearch !== city.name) {
        this.citySearch = city.name;
      }
      if (JSON.stringify(city) !== JSON.stringify(this.cityItem)) {
        this.cityItem = city;
      } else {
        return;
      }
      this.cityItemSelect = city;
      this.searchKey++;
    },
    handleScroll() {
      const newScrollPosition = document.documentElement.scrollTop;
      if (this.$refs.searchForm && this.$refs.searchForm.$refs && this.scrollPosition < newScrollPosition) {
        this.$refs.searchForm.$refs.input.blur();
      }
      this.scrollPosition = newScrollPosition;
    },
    openCities() {
      this.SET_CITIES_PAGE(1);
      this.loading = true;
      let str =
        this.CITY.name !== this.citySearch &&
        this.citySearch !== this.PAGE_HOME.search.city
          ? this.citySearch
          : "";
      this.SET_CITIES(`name:${str}`).then(() => {
        this.loading = false;
      });
      this.SET_CITIES_RECOMMENDATION();
    },

    getQuery() {
      const query = this.$route.query;
      // if (query.mil) {
      //   const item = this.mils.find(item => query.mil === item.key)
      //   this.mil = item.text
      // }
      // if (query.city_id) {
      //   this.cityIdQuery = query.city_id
      //   this.$axios.$get(`/search-cities?search=id:${query.city_id}&searchJoin=and&with=state_minimal_select`)
      //     .then(({data}) => {
      //       this.cityItem = data[0]
      //       this.cityItemSelect = data[0]
      //       this.citySearch = data[0].name
      //     })
      // }
    },
    ...mapActions({
      SET_CITIES: "city/SET_CITIES",
      SET_CITIES_RECOMMENDATION: "city/SET_CITIES_RECOMMENDATION",
      SET_CITIES_PAGE: "city/SET_CITIES_PAGE",
      SET_CATEGORIES: "category/SET_CATEGORIES",
      SET_CATEGORY: "category/SET_CATEGORY",
      SET_CATEGORIES_ACTIVE: "category/SET_CATEGORIES_ACTIVE",
    }),
    infinite($state) {
      let str = this.CITY.name !== this.citySearch ? this.citySearch : "";
      this.SET_CITIES(`name:${str}`).then((loadState) => {
        if (loadState) $state.loaded();
        else $state.complete();
      });
    },
    changeActive(number) {
      this.SET_CATEGORIES_ACTIVE(number);
    },
    searchWithText(val = "") {
      if (val.length < 3) {
        this.searchList = [];
        return false;
      }
      this.search = val;
      let api = `${this.$api.search}${val}`;
      if (this.LOCATION && this.LOCATION.id !== "c1") {
        api += `&city_id=${this.LOCATION.id}`;
      }
      this.$axios.$get(`${this.$api.searchText}${val}`);
      this.$axios.$get(api).then((res) => (this.searchList = res));
    },
    searchForm(val) {
      // if (this.mil !== '') {
      //   const mil = this.mils.find(item => item.text === this.mil)
      //   filter.mil = mil ? mil.key : ''
      // }
      // if (this.cityItem) {
      //   filter.city_id = this.cityItem.id
      //   filter.city_name = this.cityItem.name
      // }
      // filter.search_text = this.search
      // this.$emit('search', filter)
    },
  },
  destroyed() {
    this.SET_CITIES_PAGE(1);
    if (process.client) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
};
</script>

<style lang="scss">
.search-form__select-mils {
  @include large-mobile {
    width: 100%;
  }
}
</style>

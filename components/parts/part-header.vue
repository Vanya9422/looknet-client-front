<template>
  <header class="header"
          :class="Mods">
    <div class="header__inner"
         :class="[{ active }, { 'border-header': hasBorder }]">
      <div class="header__wrap wrap">
        <div class="header__row flex flex_vertical flex_justify">
          <div class="header__column header__column_left flex flex_vertical">
            <NuxtLink
              class="header__logo no-select"
              :to="$locationPath('/')"
              style="cursor: pointer"
            >
              <img src="~/assets/img/logo.svg">
            </NuxtLink>
            <div
              class="select__head header__lang"
              v-b-modal.modal-location
            >
              <svg-icon
                class="button-primary__icon"
                name="location"
                :class="`button-primary__icon_location`"
              />
              <span>{{ locationText }}</span>
            </div>
          </div>
          <div class="header__colum header__colum-full header-search">
            <div>
              <part-search-category
                class="section-search__form search-form-header"
                @search="searchProducts"
                withOutCategory
                withOutMil
                withOutCity />
            </div>
          </div>
          <div class="header__column header__column_right flex flex_vertical">
            <button-action
              class="header__favorite"
              :class="favColor"
              :to="$locationPath('/favorites')"
              :content="`<strong>${PAGE_FAVORITE.title}</strong>`"
              v-tippy
            />
            <item-profile class="header__profile"
                          name="profileMenu"></item-profile>
            <client-only>
              <tippy
                class="tippy-hide"
                to="profileMenu"
                interactive
                :animate-fill="false"
                distant="7"
                theme="light"
                animation="fade"
                trigger="mouseenter"
                arrow
                placement="bottom-start"
              >
                <part-profile-menu></part-profile-menu>
              </tippy>
            </client-only>
            <button-primary class="header__add"
                            @click.native.prevent="addAdvert"
                            light>{{ PAGE_MENU_DEFAULT.menu1[0].items[1].text }}
            </button-primary>
          </div>
        </div>
      </div>
    </div>
    <modal-detect class="header__detect"></modal-detect>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import favorite from "@/mixins/favorite";
import pageTranslate from "@/mixins/pageTranslate";
import { decodeQuery, encodeQuery } from "@/mixins/helpers/search";

export default {
  async fetch() {
    await this.getPageTranslate();
  },
  props: {
    back: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [favorite, pageTranslate],
  data() {
    return {
      scrolled: false,
      hasBorder: false,
      isMobile: process.client ? window.innerWidth < 581 : false,
    };
  },
  computed: {
    Mods() {
      return {
        header_back: this.back,
        header_small: this.small,
        header_fixed: this.fixed,
        header_show_search: this.showSearch,
      };
    },
    ...mapGetters({
      POPUP_LOCAL: "popup/POPUP_LOCAL",
      PAGE_HOME: "pages/PAGE_HOME",
      LOCATION: "location/LOCATION",
      FAVOURITES: "favourites/FAVOURITES",
      PAGE_FAVORITE: "pages/PAGE_FAVORITE",
      PAGE_MENU_DEFAULT: 'pages/PAGE_MENU_DEFAULT',
    }),
    locationText() {
      let text = this.POPUP_LOCAL.title;
      if (this.LOCATION) {
        if (this.LOCATION.id === "c1") {
          text = this.PAGE_HOME.search.city;
        } else {
          text = this.LOCATION.name;
        }
      }
      return text;
    },
    active() {
      const splittedRoute = this.$route.path.split("/");
      return (
        this.scrolled ||
        ["contacts", "support", "favorites"].includes(splittedRoute[splittedRoute.length - 1]) // не использовать .at(-1) в ssr
      );
    },
  },
  mounted() {
    if (!process.client) return;
    if (navigator.platform.match("Mac") !== null) {
      document.body.setAttribute("class", "OSX");
    }
    if (process.client && this.fixed) {
      window.addEventListener("scroll", () => {
        this.hasBorder = document.documentElement.scrollTop > 0;
        this.scrolled = document.documentElement.scrollTop >= 400;
      });
    }

    // if (this.$auth.loggedIn) this.SET_USER_LOCATION(this.$auth.user)
  },
  methods: {
    ...mapActions({
      SET_POPUP_GLOBAL: "popup/SET_POPUP_GLOBAL",
      SET_USER_LOCATION: "location/SET_USER_LOCATION",
      SET_PAGE_PRODUCT_DETAILS: "pages/SET_PAGE_PRODUCT_DETAILS",
      SET_PAGE_FAVORITE: "pages/SET_PAGE_FAVORITE",
    }),
    getPageTranslate() {
      return Promise.all([
        this.SET_POPUP_GLOBAL(),
        this.SET_PAGE_PRODUCT_DETAILS(),
        this.SET_PAGE_FAVORITE(),
      ]);
    },
    searchProducts(filter) {
      const query = decodeQuery(this.$route.query);
      if (!query.search_text) {
        this.$router.push(
          `${this.$locationPath("/catalog")}?${encodeQuery(filter)}`
        );
      }
    },
    addAdvert() {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show("modal-login");
      }
      this.$router.push(this.$locationPath("/create-ad"));
    },
  },
};
</script>


<template>
  <div class="container container-page" :class="[{ 'kmg-fix': !categoryScroll }, { catalogPage: catalogPage }]">
    <template v-if="loading">
      <client-only>
        <infinite-loading></infinite-loading>
      </client-only>
    </template>
    <template v-else>
      <part-header class="header-web" fixed :small="$auth.loggedIn" :categoryScroll="categoryScroll"></part-header>
      <div class="container-page__content">
        <Nuxt v-if="!loading"></Nuxt>
      </div>
      <part-footer></part-footer>
      <part-mobile-menu></part-mobile-menu>
      <modal-card></modal-card>
      <client-only>
        <modal-search v-if="!$screen.st"></modal-search>
      </client-only>
      <modal-location v-if="!loading"></modal-location>
      <modal-languages></modal-languages>
      <template v-if="$auth.loggedIn">
        <modal-logout-confirm></modal-logout-confirm>
      </template>
      <template v-if="!$auth.loggedIn">
        <modal-login></modal-login>
      </template>
      <client-only>
        <transition name="slide-fade-slow">
          <modal-cookie v-if="!acceptedCookies" @close="acceptedCookies = true"></modal-cookie>
        </transition>
      </client-only>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  head() {
    let url = this.GET_BASE_URL || `www.${process.env.SERVER_URL}`
    let path = this.$route.path;
    let newPath = path.replace(/^\/(?:en|ru|es)?\/?(.*)$/, '$1');

    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      link: [
        { rel: 'canonical', href: `https://${url}${path}` },
        { rel: 'alternate', href: `https://${url}/${newPath}`, hreflang: 'en-us' },
        { rel: 'alternate', href: `https://${url}/es/${newPath}`, hreflang: 'es-us' },
        { rel: 'alternate', href: `https://${url}/ru/${newPath}`, hreflang: 'ru-us' }
      ]
    };
  },
  data() {
    return {
      categoryScroll: true,
      catalogPage: false,
      loading: true,
      acceptedCookies: true,
    };
  },
  computed:{
    ...mapGetters({
      GET_BASE_URL: 'location/GET_BASE_URL'
    })
  },
  async created() {
    this.categoryPage();
    this.loading = false;
    if (process.client) {
      const acceptedCookies = !!localStorage.getItem("acceptedCookies");
      if (!acceptedCookies) {
        this.acceptedCookies = false;
      }
    }
  },
  watch: {
    $route: {
      handler: async function (slug) {
        let res = this.$route.path;
        let catalog = res.match("catalog");
        if (catalog) this.catalogPage = true;
        else this.catalogPage = false;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    categoryPage() {
      let res = this.$route.path;
      let catalog = res.match("catalog");
      if (catalog) {
        this.catalogPage = true;
        let lastScrollTop = 0;
        if (!process.client) return;
        window.addEventListener("scroll", () => {
          const currentScrollTop = window.scrollY || window.pageYOffset;
          if (currentScrollTop > 50 && currentScrollTop > lastScrollTop) {
            this.categoryScroll = false;
          } else {
            this.categoryScroll = true;
          }
          lastScrollTop = currentScrollTop;
        });
      }
    },
  },
};
</script>

<style lang="scss">
.header.header_fixed .header__inner {
  transition: 0.3s all;

  @include large-mobile {
    height: 61px;
  }
}

.container-page {
  min-height: 100vh !important;
  display: flex;
  flex-direction: column;
  &__content {
    flex-grow: 1;
    display: flex;
    > * {
      flex-grow: 1;
    }
  }

  > .infinite-loading-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &.kmg-fix.catalogPage {
    .header.header_fixed .header__inner {
      top: -87px;

      @include large-mobile {
        top: -60px;
      }
    }

    .section-catalog__fixed {
      top: 0;
    }
  }
}
</style>

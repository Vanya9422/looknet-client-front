<template>
  <section class="section-annoucements">
    <part-analytics-box class="section-annoucements__analytics" :key="pageKey" :slides="slides" />
    <part-annoucements class="section-annoucements__section" :content="PAGE_MY_ADVERTISES" />
    <modal-statistic />
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import pageTranslate from "@/mixins/pageTranslate";

export default {
  async fetch() {
    await this.getPageTranslate();
  },
  data() {
    return {
      items: [],
      pageKey: 0,
    };
  },
  mixins: [pageTranslate],
  computed: {
    ...mapGetters({
      STATISTIC: "statistic/STATISTIC",
      PAGE_MY_ADVERTISES: "pages/PAGE_MY_ADVERTISES",
      USER_BANNERS: "home/USER_BANNERS",
    }),

    slides() {
      const slider = [
        {
          title: `${this.PAGE_MY_ADVERTISES.banner.name}, ${this.$auth.user.first_name}!`,
          desc: `${this.PAGE_MY_ADVERTISES.banner.description}`,
          showText: true,
          class: "first-banner",
          statistics: [
            {
              icon: "favorites",
              name: `${this.PAGE_MY_ADVERTISES.banner.favorites}`,
              number: this.STATISTIC.added_favorites_count,
            },
            {
              icon: "view",
              name: `${this.PAGE_MY_ADVERTISES.banner.view}`,
              number: this.STATISTIC.show_details_count,
            },
            {
              icon: "call",
              name: `${this.PAGE_MY_ADVERTISES.banner.call}`,
              number: this.STATISTIC.show_phone_count,
            },
          ],
        },
      ];
      if (process.client && this.$screen.lt) slider.push(...this.USER_BANNERS);
      return slider;
    },
  },
  async created() {
    await this.getBanners();
    await this.getStatistic();
  },
  methods: {
    ...mapActions({
      SET_STATISTIC: "statistic/SET_STATISTIC",
      SET_MY_ADVERTISES: "pages/SET_MY_ADVERTISES",
      SET_USER_BANNERS: "home/SET_USER_BANNERS",
    }),
    async getPageTranslate() {
      await this.SET_MY_ADVERTISES();
    },
    async getBanners() {
      await this.SET_USER_BANNERS().then(() => this.pageKey++);
    },
    async getStatistic() {
      await this.SET_STATISTIC();
    },
  },
};
</script>

<style lang="scss">
.section-annoucements {
  &__analytics {
    margin-top: 20rem;

    @include large-mobile {
      margin-top: 15rem;
    }
  }

  &__section {
    margin-top: 60rem;

    @include large-mobile {
      margin-top: 35rem;
    }
  }
}
</style>

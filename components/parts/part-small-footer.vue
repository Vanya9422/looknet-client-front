<template lang="pug">
  footer.small-footer
    .small-footer__wrap.wrap
      modal-safety(:title="PAGE_CHAT?.safety?.title || ''")
        p {{ PAGE_CHAT?.safety?.message1 || ''}}
        p {{ PAGE_CHAT?.safety?.message2 || ''}}
      .small-footer__row.flex.flex_vertical.flex_justify
        .small-footer__column.small-footer__column_left
          ul.small-footer__nav.flex.p.color-gray
            li.small-footer__nav-item
              NuxtLink.small-footer__nav-link.link(to="/support") {{ PAGE_SMALL_FOOTER.support }}
            li.small-footer__nav-item
              div.small-footer__nav-link.link( @click="showSafetyModal") {{ PAGE_SMALL_FOOTER.beware }}
            li.small-footer__nav-item
              NuxtLink.small-footer__nav-link.link(to="/contacts")  {{ PAGE_SMALL_FOOTER.contact }}
        .small-footer__column.small-footer__column_right
          part-footer-apps
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PartFooterApps from "~/components/parts/footer/part-footer-apps.vue";
import { withScope } from "@sentry/browser";

export default {
  components: { PartFooterApps },
  data() {
    return {
      socials: {
        fb: "https://facebook.com/",
        instagram2: "https://www.instagram.com",
        in: "https://ca.linkedin.com/",
        telegram: "https://www.telegram.com",
        whatsapp: "https://www.whatsapp.com/",
        youtube2: "https://www.youtube.com",
      },
    };
  },
  computed: {
    ...mapGetters({
      PAGE_SMALL_FOOTER: "pages/PAGE_SMALL_FOOTER",
      PAGE_CHAT: "pages/PAGE_CHAT",
    }),
  },
  async mounted() {
    if(process.client) {
      await this.SET_PAGE_CHAT();
    }
  },
  methods: {
    ...mapActions({
      SET_PAGE_CHAT: "pages/SET_PAGE_CHAT",
      SET_PAGE_SMALL_FOOTER: "pages/SET_PAGE_SMALL_FOOTER",
    }),
    showSafetyModal() {
      console.log('saasd');
      this.$bvModal.show('modal-safety');
    },
  },
  watch: {
    "$i18n.locale"() {
      this.SET_PAGE_SMALL_FOOTER();
    },
  },
  created() {
    this.SET_PAGE_SMALL_FOOTER();
  },
};
</script>

<style lang="scss">
.small-footer {
  width: 100%;
  padding: 35rem 0;

  @include small-tablet {
    display: none;
  }

  &__nav {
    list-style: none;

    &-link {
      font-weight: 500;
      cursor: pointer;
    }

    &-item {
      &:not(:last-child) {
        margin-right: 56rem;
      }
    }
  }
}
</style>

<template lang="pug">
  main.main
    section-settings(:title="PAGE_SETTINGS.title" :nav="PAGE_SETTINGS.nav")
      .settings__list
        .settings__item
          .settings__item-title.h3 {{PAGE_SETTINGS.safety}}
            user-change-password(:content="PAGE_SETTINGS")
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import pageTranslate from "@/mixins/pageTranslate";
export default {
  async asyncData({ store }) {
    await store.dispatch('pages/SET_PAGE_PAGE_SETTINGS');
  },
  layout: 'back',
  mixins: [pageTranslate],
  computed: {
    ...mapGetters({
      PAGE_SETTINGS: 'pages/PAGE_SETTINGS'
    })
  },
  methods: {
    ...mapActions({
      SET_PAGE_PAGE_SETTINGS: 'pages/SET_PAGE_PAGE_SETTINGS'
    }),
    getPageTranslate() {
      this.SET_PAGE_PAGE_SETTINGS()
    },
  }
}
</script>

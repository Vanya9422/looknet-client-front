<template lang="pug">
main.main
  section-settings(:title="PAGE_SETTINGS.title", :nav="PAGE_SETTINGS.nav")
    template(v-if="loadingProducts")
      .settings__blacklist(v-if="blacklist.length > 0")
        item-blacklist.settings__blacklist-item(
          v-for="(item, i) in blacklist",
          :key="i",
          :avatar="item.avatar",
          :removed="item.removed",
          :name="item.full_name",
          @delete="unBlockUser(i)",
          @remove="removeItem(i)"
        )
      .section-notifications__center.flex-column(v-else)
        part-not-notification.section-notifications__not-notification(
          style="margin-top: 20px"
        )
        template
          .content.d-flex.justify-content-center
            p {{ PAGE_ERRORS.notFound }}
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import pageTranslate from "@/mixins/pageTranslate";

export default {
  async asyncData({ store }) {
    await store.dispatch('pages/SET_PAGE_PAGE_SETTINGS');
    await store.dispatch('pages/SET_PAGE_ERRORS');
  },
  layout: "back",
  data() {
    return {
      type: "back_design",
      page_key: "settings",
      blacklist: [],
      loadingProducts: false,
    };
  },
  mixins: [pageTranslate],
  async created() {
    await this.getBlockedUsers();
  },
  computed: {
    ...mapGetters({
      PAGE_SETTINGS: "pages/PAGE_SETTINGS",
      PAGE_ERRORS: "pages/PAGE_ERRORS",
    }),
  },
  methods: {
    ...mapActions({
      SET_PAGE_PAGE_SETTINGS: "pages/SET_PAGE_PAGE_SETTINGS",
      SET_PAGE_ERRORS: "pages/SET_PAGE_ERRORS",
    }),
    getPageTranslate() {
      this.SET_PAGE_PAGE_SETTINGS();
      this.SET_PAGE_ERRORS();
    },
    async getBlockedUsers() {
      const { data } = await this.$axios.$get(
        `${this.$api.user.blockList}?with=avatar`
      );
      data.forEach((i) => (i.removed = false));
      this.blacklist = data;
      this.loadingProducts = true;
    },
    unBlockUser(index) {
      this.blacklist.splice(index, 1);
    },
    removeItem(index) {
      this.$axios
        .$post(`${this.$api.user.unblocked}`, {
          unblock_id: this.blacklist[index].id,
        })
        .then((res) => {
          this.$bvModal.show('modal-thank-settings');
          this.blacklist[index].removed = true;
        });
    },
  },
};
</script>

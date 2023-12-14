<template>  
  <section-chat v-if="PAGE_CHAT.localeCode" :sidebarTitle="PAGE_CHAT.title" :mobileNoMessage="PAGE_CHAT.noMessages" :noMessage="PAGE_CHAT.notHaveNotifications"></section-chat>
  <part-loader v-else-if="$fetchState.pending"></part-loader>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  async fetch() {
    await this.SET_PAGE_CHAT();
  },
  layout: "chat-layout",
  middleware: ["chat"],
  computed: {
    ...mapGetters({
      PAGE_CHAT: "pages/PAGE_CHAT",
    }),
  },
  methods: {
    ...mapActions({
      SET_PAGE_CHAT: "pages/SET_PAGE_CHAT",
    }),
  },
};
</script>

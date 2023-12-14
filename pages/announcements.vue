<template>
  <main class="main">
    <section-annoucements></section-annoucements>
    <modal-tariff-status :status="status" @close="closeModal"></modal-tariff-status>
  </main>
</template>

<script>
export default {
  layout: "back",
  data() {
    return {
      status: null,
    };
  },
  mounted() {
    this.getStatus();
  },
  methods: {
    closeModal() {
      this.$router.push(this.$locationPath("/announcements"));
    },
    getStatus() {
      const status = this.$route.query.status;
      if (status) {
        this.status = status;
        this.$root.$emit("bv::show::modal", "modal-tariff-status");
      }
    },
  },
};
</script>

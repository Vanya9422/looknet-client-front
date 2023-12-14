<template lang="pug">
.container
  part-header(small)
  Nuxt
  part-small-footer
  part-mobile-menu
  modal-location
  modal-languages
  modal-login
  client-only
    transition(name="slide-fade-slow")
      modal-cookie(
        v-if="!acceptedCookies"
        @close="acceptedCookies = true"
      )
</template>

<script>
export default {
  data: () => ({
    acceptedCookies: true,
  }),
  created() {
    if (process.client) {
      const acceptedCookies = !!localStorage.getItem("acceptedCookies");
      if (!acceptedCookies) {
        this.acceptedCookies = false;
      }
    }
  }
};
</script>

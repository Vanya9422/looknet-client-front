<template lang="pug">
main.main
  h1.hidden-h1(v-if="supportPageSeo?.h1" ) {{ supportPageSeo.h1 }}
  section-support(
    v-if="loading",
    :content="content",
    :background_images="background_images"
  )
</template>

<script>
import getConstructorPage from "@/mixins/getConstructorPage";
import shortCodes from "~/mixins/shortCodes";

export default {
  async asyncData({ store }) {
    await store.dispatch('seo/GET_SEO_SUPPORT');
  },
  head() {
    return {
      title: this.supportPageSeo?.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.supportPageSeo?.description
        }
      ]
    }
  },
  data() {
    return {
      type: "front_design",
      page_key: "support",
    };
  },
  mixins: [getConstructorPage, shortCodes],
};
</script>

<template lang="pug">
  NuxtLink.item-category(:to="$locationPath(to)")
    span.item-category__img
      //img(v-if="img.original_full_url" :src="img.original_full_url")
      set-img(v-if="img && img.original_full_url" :src="img" :default-img="img.original_full_url" small)
      .item-category__icon(v-else)
        //- svg-icon(name="grid")
        set-img(:default-img="require('~/assets/img/All-Cat.png')")
    span.item-category__text.p(v-html="text || PAGE_HOME.allCategories")
    slot
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    img: {
      type: Object,
      default: () =>({})
    },
    to: {
      type: String,
      default: "#"
    },
    text: {
      type: String,
    },
  },
  computed: {
    ...mapGetters({
      PAGE_HOME: "pages/PAGE_HOME",
    }),
  },
}
</script>

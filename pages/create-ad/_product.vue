<template lang="pug">
  main.main
    section-create-ad(:content="PAGE_ADD_PRODUCT" )
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  layout: 'back',
  computed: {
    ...mapGetters({
      PAGE_ADD_PRODUCT: 'pages/PAGE_ADD_PRODUCT'
    })
  },
  created() {
    this.SET_TARIFFS()
    this.SET_PAGE_ADD_PRODUCT(this.$i18n.lang)
  },
  watch:{
    '$i18n.locale'(){
      this.SET_PAGE_ADD_PRODUCT(this.$i18n.lang)
    }
  },
  methods: {
    ...mapActions({
      SET_TARIFFS: 'tariffs/SET_TARIFFS',
      SET_PAGE_ADD_PRODUCT: 'pages/SET_PAGE_ADD_PRODUCT',
    }),
  }
}
</script>

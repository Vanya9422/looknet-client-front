<template lang="pug">

</template>

<script>

export default {
  props: {
    category:{
      type:Object,
      default:{}
    },
    categoryImg: {
      type: String,
      default: "category__img1.png"
    },
    categoryLink: {
      type: String,
      default: "#"
    },
    categoryText: {
      type: String,
      default: "Electronics"
    },
    breadcrumbs: {
      type: Array,
      default: () => ([]),
    },
  },
}

</script>

<style lang="scss">
</style>
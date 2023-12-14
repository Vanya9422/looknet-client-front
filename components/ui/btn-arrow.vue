<template lang="pug">
  span.btn-arrow
    span.btn-arrow__icon
      svg-icon.btn-arrow_svg(:name="icon")
    span.btn-arrow_text
      slot
</template>

<script>
export default {
  props:{
    icon:{
      type:String,
      default:'prev'
    }
  }
}
</script>


<style lang="scss" scoped>
.btn-arrow{
  display: flex;
  align-items: center;
  &__icon{
    padding-right: 7px;
  }
}
</style>

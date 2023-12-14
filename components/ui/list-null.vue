<template lang="pug">
  .not-notification
    .not-notification__img
      img(:src="require(`~/assets/img/${img}`)")
    .not-notification__text.h4
      slot
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: 'null.png'
    },
  }
}
</script>

<style lang="scss">
.not-notification{
  text-align: center;
  margin-top: 50px;
  &__img {
    max-width: 487rem;
    margin: 0 auto 0 auto;
    @include large-mobile {
      max-width: 260rem;
    }
  }
  &__text {
    font-family: 'Gilroy';
    font-weight: 500;
    margin-top: 30rem;

    @include large-mobile {
      margin-top: 20rem;
      font-size: 16rem;
    }
  }
}
</style>
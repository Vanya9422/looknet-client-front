<template lang="pug">
.not-notification
  .not-notification__img
    set-img(:default-img="require(`~/assets/img/${img}`)")
  .not-notification__text.h4
    slot
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: "not-notification___chat.png",
    },
  },
};
</script>

<style lang="scss">
.not-notification {
  text-align: center;
  height: 100%;
  &__img {
    height: calc(100% - 51px);
	 img {
      object-fit: contain;
      height: 100%;
    }
    max-width: 487rem;
    margin: 0 auto 0 auto;
    @include large-mobile {
      max-width: 260rem;
    }
  }
  &__text {
    font-family: "Gilroy";
    font-weight: 500;
    margin-top: 15rem;

    @include large-mobile {
      margin-top: 20rem;
      font-size: 16rem;
    }
  }
}
</style>

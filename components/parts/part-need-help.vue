<template lang="pug">
  .need-help
    .need-help__box
      .need-help__title {{ title }}
      .need-help__text.color-gray
        slot
      button-primary.need-help__btn(blue v-b-modal.form-contact) {{btn}}
    .need-help__img
      set-img(:src="img" medium medThumb :defaultImg="defaultImg")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Need help?'
    },
    btn: {
      type: String,
      default: 'Need help?'
    },
    img: {
      type: [Object,Boolean],
      default: false
    },
    defaultImg: {
      type: String,
      default: require(`~/assets/img/contacts__img.jpg`)
    },
  }
}
</script>

<style lang="scss">
.need-help {
  padding: 60rem;
  display: flex;
  align-items: center;
  min-height: 328rem;
  border: 1px solid #D2D2D7;
  border-radius: 20rem;
  overflow: hidden;
  position: relative;

  @include large-tablet {
    padding: 40rem;
  }

  @include large-mobile {
    padding: 40rem 30rem;
    border-radius: 10rem;
    min-height: inherit;
    display: block;
  }

  &__box {
    position: relative;
    z-index: 2;
    max-width: 50%;
    padding-right: 50rem;
    @include large-mobile {
      max-width: inherit;
      padding-right: 0;
      max-width: 400rem;
    }
  }

  &__title {
    font-size: 36rem;
    font-family: 'Atyp Display';
    line-height: 1;
    max-width: 420rem;
    @include large-mobile {
      font-size: 20rem;
      max-width: 230rem;
    }
  }

  &__text {
    font-size: 18rem;
    line-height: 1.5;
    color: rgba(6, 36, 57, 0.5);
    font-weight: 500;
    margin-top: 20rem;
    @include large-mobile {
      margin-top: 15rem;
      font-size: 14rem;
    }
  }

  &__btn {
    min-width: 184rem;
    margin-top: 35rem;

    @include large-tablet {
      margin-top: 25rem;
    }

    @include large-mobile {
      margin-top: 20rem;
      min-width: 145rem;
    }
  }

  &__img {
    position: absolute;
    pointer-events: none;
    left: 50%;
    margin-left: -30rem;
    bottom: -34rem;
    width: 516rem;

    @include large-tablet {
      margin-left: 0;
      width: 450rem;
      bottom: -30rem;
    }

    @include large-mobile {
      position: static;
      width: 100%;
      margin-top: 30rem;
    }
  }
}
</style>

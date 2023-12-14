<template lang="pug">
.page-preview
  .page-preview__img
    set-img(:src="img" large medMedium :default-img="require(`~/assets/img/contacts__img.jpg`)" img-class="object-fit")
  h1.page-preview__title.h1 {{title}}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    img: {
      type: [Object,Boolean],
      default: false
    },
  },
}
</script>

<style lang="scss">
.page-preview {
  position: relative;
  @include large-mobile {
    margin-left: -15rem;
    margin-right: -15rem;
    &-img {
      padding-top: div(220, 375) * 100%;
    }
  }

  &__img {
    position: relative;
    overflow: hidden;
    padding-top: div(500, 1400) * 100%;
    border-radius: 20rem;
    @include large-mobile {
      padding-top: div(220, 375) * 100%;
    }
  }

  &__title {
    position: absolute;
    left: 50rem;
    top: 50rem;
    color: #fff;
    font-weight: 500;

    @include small-tablet {
      left: 40rem;
      top: 40rem;
    }

    @include large-mobile {
      left: 20rem;
      top: 20rem;
      font-size: 26rem;
      line-height: 1;
      font-weight: 500;
    }
  }
}
</style>

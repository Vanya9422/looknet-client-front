<template lang="pug">
section.section-support
  .wrap
    part-page-preview.section-support__preview(
      :title="content.pageTitle",
      :img="background_images.background || false"
    )
    part-faq.section-support__faq(:accordion="content.accordion")
    part-need-help.section-support__help(
      :title="content.banner.name",
      :btn="content.banner.btn",
      :default-img="require(`~/assets/img/Contact.jpg`)",
      :img="background_images.bannerBackground || false"
    ) {{ content.banner.desc }}
  modal-form-support
  modal-thank
</template>

<script>
export default {
  props: {
    background_images: {
      type: [Object, Array],
      default: () => ({}),
    },
    content: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss">
.section-support {
  padding-bottom: 120rem;
  @include large-mobile {
    padding-bottom: 50rem;
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

  &__help {
    margin-top: 120rem;
    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__faq {
    margin-top: 96rem;

    @include large-mobile {
      margin-top: 50rem;
    }
  }
}
</style>

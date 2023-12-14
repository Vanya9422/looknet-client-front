<template lang="pug">
section.registration
  .registration__wrap.wrap
    .registration__img.registration__img_left
      set-img(:default-img="require(`~/assets/img/${img.left}`)")
    .registration__img.registration__img_right
      set-img(:default-img="require(`~/assets/img/${img.right}`)")
    .registration__inner
      part-registration-form.registration__form(:title="title")
        slot
        template(v-slot:bottom)
          slot(name="bottom")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Create your profile",
    },
    list: {
      type: Array,
      default: () => [],
    },
    img: {
      type: [Array, Object],
      default: () => ({
        left: "registration__img1.png",
        right: "registration__img2.png",
      }),
    },
  },
  data() {
    return {
      nav: [
        {
          text: "Favorites",
          class: "isActive",
        },
        {
          text: "Recently viewed",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.registration {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 100rem 0;
  overflow: hidden;

  @include small-tablet {
    padding-top: 60rem;
  }

  @include large-mobile {
    padding: 20rem 0 80rem 0;
  }

  &__wrap {
    position: relative;
    width: 100%;
    height: 100%;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0;
    margin-bottom: 0;
    @include large-mobile {
      flex-direction: column;
    }
  }

  &__inner {
    width: 100%;
    max-width: 530rem;
    position: relative;

    @include large-mobile {
      height: 100%;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
    }
  }

  &__img {
    position: absolute;

    &_left {
      top: -8px;
      left: -202rem;
      width: 487rem;
    }

    &_right {
      bottom: 33px;
      right: -167rem;
      width: 582rem;
    }

    @include large-desktop {
      &_left {
        left: -150rem;
      }
    }
    @include large-tablet {
      &_left {
        left: -75rem;
        width: 350px;
      }
      &_right {
        width: 400px;
        right: -150rem;
      }
    }

    @include small-tablet {
      display: none;
    }
  }

  &__form {
    @include large-mobile {
      position: relative;
      height: 100%;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
    }
  }
}

.confirm-page {
  @include min-large-mobile {
    .registration__wrap {
      min-height: 70vh;
    }
  }

  .registration__img_left {
    top: -60px;
    left: -115rem;
    width: 487rem;
    @include large-desktop {
      width: 400px;
    }
    @include large-tablet {
      width: 350px;
      left: -109px;
    }
  }

  .registration__img_right {
    bottom: -7px;
    right: -244px;
    width: 579rem;
    @include large-desktop {
      width: 500px;
      right: -200px;
    }
    @include large-tablet {
      width: 350px;
      right: -85px;
    }
  }
}

.done-page {
  @include min-large-mobile {
    .registration__wrap {
      min-height: 65vh;
    }
  }

  .registration__img_left {
    top: -110px;
    left: -195rem;
    width: 576px;
    @include large-desktop {
      width: 500px;
      left: -150px;
    }
    @include large-tablet {
      width: 450px;
      top: -75px;
      left: -145px;
    }
  }

  .registration__img_right {
    bottom: -25px;
    right: -76px;
    width: 432px;
    @include large-desktop {
      width: 400px;
    }
    @include small-desktop {
      right: -100px;
    }
    @include large-tablet {
      width: 380px;
      right: -150px;
    }
  }
}
</style>

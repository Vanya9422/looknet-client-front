<template lang="pug">
form.registration-form
  .registration-form__body
    .registration-form__center
      h3.registration-form__title.h3 {{ title }}

      slot
  .registration-form__bottom.flex.flex_vertical
    slot(name="bottom")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Create your profile",
    },
  },
};
</script>

<style lang="scss">
.registration-form {
  @include large-mobile {
    display: flex;
    flex-direction: column;
  }
  &__bottom-separator {
    width: 100%;
    height: 1px;
    background: $light-gray;
    margin: 30px 0;
  }
  &__body {
    @include large-mobile {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
    }
  }
  &__center {
    width: 100%;
  }
  &__title {
    line-height: 0.8;
    font-family: "Atyp Display";
    letter-spacing: -0.02em;

    @include large-mobile {
      font-weight: 500;
      line-height: 1;
    }
  }
  &__social {
    margin-top: 30rem;
    &-list {
      @include items(1, 6);
    }
    &-text {
      margin-bottom: 10rem;
    }
    @include large-mobile {
      margin-top: 20rem;
      //&-list {
      //  @include items(2, 3);
      //}
    }
  }
  &__separator {
    margin: 40rem 0;
    overflow: hidden;
    &-text {
      line-height: 1;
      position: relative;
      &:before,
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        width: 300rem;
        height: 1px;
        background: $light-gray;
      }
      &:before {
        right: 100%;
        margin-right: 13rem;
      }
      &:after {
        left: 100%;
        margin-left: 13rem;
      }
    }

    @include large-mobile {
      margin: 30rem 0 40rem 0;
      &-text {
        font-size: 17rem;
      }
    }
  }
  &__fields {
    &-row {
      @include items(2, 6);
      margin-top: -30rem;
    }

    @include large-mobile {
      &-row {
        @include items(1, 1);
        margin-top: -20rem;
      }
    }
  }
  &__field {
    margin-top: 30rem;
    @include large-mobile {
      margin-top: 20rem;
    }
  }
  &__input {
    &_code {
      .input__field {
        padding: 0;
        text-align: center;
      }
    }
  }
  &__label {
    display: block;
    margin-bottom: 10rem;
    @include large-mobile {
      font-size: 16rem;
    }
  }

  &__checkbox {
    &__link {
      color: $blue;
      text-decoration: underline!important;
    }
  }

  &__bottom {
    margin-top: 40rem;

    @include large-mobile {
      margin-top: 35rem;
    }
  }
  &__btn {
    width: 247rem;
    @include large-mobile {
      width: 100%;
      &:not(:first-child) {
        margin-top: 10rem;
      }
    }
  }
  &__question {
    margin-left: 28rem;
    font-size: 15rem;
    @include large-mobile {
      margin-left: 0;
      width: 100%;
      margin-top: 30rem;
      text-align: center;
      br {
        display: none;
      }
    }
  }

  &__desc {
    margin-top: 25rem;
    line-height: 1.4;
    a {
      font-weight: 600;
      color: $default;
    }

    @include large-mobile {
      margin-top: 20rem;
      font-size: 16rem;
    }
  }
  &__code {
    display: flex;
    @include items(6, 5);
    @include large-mobile {
      padding: 10rem 0;
    }
  }

  &__buttons {
    width: 100%;
  }

  &__add-avatar {
    margin-top: 50rem;

    @include large-mobile {
      margin-top: 30rem;
      padding-bottom: 10rem;
    }
  }

  @include large-mobile {
    .mobile-hidden {
      display: none;
    }
  }

  @include min-large-mobile {
    .mobile-visible {
      display: none;
    }
  }
}
</style>

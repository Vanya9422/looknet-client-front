<template lang="pug">
  label.checkbox-btn--catalog
    input.checkbox-btn--catalog__input(type="checkbox" :value="value" :checked="checked" :name="name" @change="$emit('change')")
    span.checkbox-btn--catalog__inner
      span.checkbox-btn--catalog__left
        span.checkbox-btn--catalog__input-checked
          svg-icon(name="check")
        span.checkbox-btn--catalog__wrap
          span.checkbox-btn--catalog__text {{ value }}
      span.checkbox-btn--catalog__number

</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'name'
    },
    checked: {
      type: Boolean,
      default: false
    },
  },
}
</script>

<style lang="scss" scoped>
.checkbox-btn--catalog {
  line-height: 1;
  display: block;

  &:hover {
    .checkbox-btn--catalog {
      &__btn {
        color: $blue;
        background: #F5F5F7;
      }
    }
  }

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  &__number {
    color: #9A9A9A;
  }

  &__text {
    padding-left: 10px;
  }

  &__left {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__input {
    display: none;

    &-checked {
      width: 20px;
      height: 20px;
      background: #fff;
      border: 1px solid #D2D2D7;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg{

        fill: transparent;
        stroke: #fff;
        width: 10px;
        height: 10px;
      }
    }

    &:checked {
      background: red;

      & ~ .checkbox-btn--catalog__inner {
        .checkbox-btn--catalog__input-checked {
          background: $blue;
          border-color: $blue;
        }
      }
    }

    &:checked + .checkbox-btn--catalog__inner {
      &__wrap {
        color: $blue;
        font-weight: 600;
        background: #F5F5F7;

        .checkbox-btn--catalog__icon {
          opacity: 1;
          visibility: visible;
        }
      }

    }

    @include large-mobile {
      &:checked + .checkbox-btn--catalog {
        &__wrap {
          background: none;
          color: $blue;

          .checkbox-btn--catalog__icon {
            border-color: $blue;
            background: $blue;

            svg {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  &__wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8rem 0;
    transition: ease .2s;
    border-radius: 5px;
    cursor: pointer;
    width: calc(100% - 30px);

    @include large-mobile {
      padding: 0 7rem 0 0;
      background: none;
      font-weight: 600;
    }
  }

  &__icon {
    width: 20rem;
    height: 20rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-left: 15rem;
    stroke: #556DEE;
    stroke-width: 2;
    stroke-linecap: square;
    margin-right: -4rem;
    transition: ease .2s;
    opacity: 0;
    visibility: hidden;

    svg {
      width: 10rem;
      height: 9rem;

      &:nth-child(2) {
        display: none;
      }
    }

    @include large-mobile {
      width: 15rem;
      height: 15rem;
      visibility: visible;
      opacity: 1;
      border: 1px solid $light-gray;
      border-radius: 3px;
      margin-right: 0;
      svg {
        opacity: 0;

        &:first-child {
          display: none;
        }

        &:nth-child(2) {
          display: block;
          width: 9rem;
          height: 8rem;
          fill: none;
          stroke: #fff;
          transition: ease .12s;
          stroke-width: 2;
        }
      }
    }
  }

  @include large-mobile {
    font-size: 14rem;
    line-height: 1;
    &:hover {
      .checkbox-btn--catalog {
        &__btn {
          color: $default;
          background: none;
        }
      }
    }
  }
}
</style>

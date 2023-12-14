<template lang="pug">
  label.checkbox(:class="Mods")
    input.checkbox__input(
      :name="name"
      :value="value"
      type="checkbox"
      :checked="checked"
      @change="$emit('change')"
      @input="$emit('input',$event.target.value)"
    )
    .checkbox__btn
      .checkbox__icon(:class="{input_error:error}")
        svg-icon(name="check" viewBox="0 0 9 8")
      .checkbox__text
        slot

</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    name: {
      type: String,
      default: 'name'
    },
    checked: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    all: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    Mods() {
      return {
        'checkbox_light': this.light,
        'checkbox_all': this.all,
      }
    }
  }
}
</script>

<style lang="scss">
.checkbox {
  position: relative;
  display: inline-flex;
  cursor: pointer;
  font-size: 14rem;

  &_light {
    .checkbox {
      &__input {
        &:checked + .checkbox__btn {
          .checkbox {
            &__icon {
              border-color: #7A8DF1;
              background: #7A8DF1;
            }
          }
        }
      }
    }
  }

  &_all {
    .checkbox {
      &__icon {
        &:before {
          content: '';
          display: block;
          width: 7rem;
          height: 1px;
          background: #fff;
        }

        svg {
          display: none;
        }
      }
    }
  }

  &__btn {
    display: flex;
    align-items: center;
  }

  &__input {
    display: none;

    &:checked + .checkbox__btn {
      .checkbox {
        &__icon {
          border-color: $blue;
          background: $blue;

          svg {
            opacity: 1;
          }
        }
      }
    }
  }

  &__icon {
    width: 20rem;
    height: 20rem;
    border: 1px solid $light-gray;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: ease .15s;
    flex-shrink: 0;
    background: #fff;
    &.input_error{
      border-color: $red;
    }

    svg {
      width: 11rem;
      height: 9rem;
      fill: none;
      stroke: #fff;
      stroke-width: 1.5;
      opacity: 0;
      transition: ease .15s;
    }
  }

  &__text {
    margin-left: 10rem;

    .p {
      font-size: 17rem;
    }

    @include large-mobile {
      .p {
        font-size: 14rem;
      }
    }
  }
}
.checkbox.error{
  color: inherit;
  animation: my-animation 3s;
}
@keyframes my-animation {
  0% {
    color: $red;
  }
  100% {
    color: $red;
  }
}
</style>

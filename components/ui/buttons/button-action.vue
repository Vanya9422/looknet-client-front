<template lang="pug">
  component.button-action(
    :is="to !== '' ? 'NuxtLink' : 'span'"
    :to="to !== '' ? to : false"
    :class="Mods"
  )
    transition(name="fade" :key="icon")
      svg-icon.button-action__icon(:name="icon" :class="`button-action__icon_${icon}`")
    span.button-action__text(v-if="text") {{ text }}

</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "heart"
    },
    to: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    gray: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    blue: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    }
  },

  computed: {
    Mods() {
      return {
        'button-action_gray': this.gray,
        'button-action_small': this.small,
        'button-action_blue': this.blue,
        'button-action_circle': this.circle,
      };
    }
  }
};
</script>

<style lang="scss">
.button-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 40rem;
  border: 0;
  background: none;
  border-radius: 10rem;
  font-size: 16rem;
  cursor: pointer;

  &_gray {
    color: $gray;

    .button-action__icon {
      &_heart {
        stroke: $light-gray;
        stroke-width: 2.5;
      }

      &_search {
        fill: $gray;
      }
    }

    &:hover {
      color: $blue;
    }
  }

  &_blue {
    .button-action__icon {
      fill: $blue;

      &_heart {
        stroke: none;
      }
    }
  }

  &:hover {
    .button-action {
      &__icon {
        &_heart {
          stroke: $blue;
        }

        &_search {
          fill: $blue;
        }
      }
    }
  }

  @include large-mobile {
    width: 36rem;
    height: 36rem;
  }

  &_circle {
    width: 50rem;
    height: 50rem;
    border-radius: 100%;
    background: $blue;
    fill: #fff;

    .button-action {
      &__icon {
        max-width: 23rem;
        max-height: 15rem;
      }
    }
  }

  &_small {
    width: auto;
    height: auto;

    .button-action__icon {
      width: 14rem;
      height: 14rem;

      &_search {
        width: 17rem;
        height: 17rem;
      }
    }

  }

  &__icon {
    max-width: 18rem;
    max-height: 16rem;
    transition: ease .1s;

    &_search {
      fill: $gray;
    }

    &_home {
      transition: all .2s linear;
      fill: $gray;
      max-height: 18rem;
    }

    &_search {
      fill: $default;
      width: 17rem;
      height: 17rem;
    }

    &_heart {
      fill: none;
      stroke: $default;
      stroke-width: 2;
    }

    &_add {
      fill: none;
      stroke: $default;
      stroke-width: 1.7;
    }

    &_zoom {
      width: 16rem;
      height: 16rem;
      fill: #fff;
      stroke: #fff;
      stroke-width: 1px;
      transform: rotate(90deg);
    }

    &_sliders {
      fill: none;
      stroke: #fff;
      stroke-width: 2;
      max-width: 23rem;
      max-height: 15rem;
    }

    &_arrowRight {
      fill: none;
      stroke: $default;
      stroke-width: 2px;
    }

    @include large-mobile {
      max-width: 16rem;
      max-height: 14rem;
      &_zoom {
        width: 14rem;
        height: 14rem;
      }
      &_home, &_search, &_add {
        max-width: 18rem;
        max-height: 18rem;
      }
      &_heart {
        max-width: 18rem;
        max-height: 16rem;
      }
      &_arrowRight {
        max-width: 9rem;
        max-height: 9rem;
        stroke-width: 3px;
      }
    }
  }

  &__text {
    margin-left: 10rem;
  }
}

.mobile-menu__item {
  .mobile-menu__btn {
    .button-action__icon_search {
      fill: $gray;
    }

    .button-action__icon_add {
      stroke: $gray;
    }

    .button-action__icon_heart {
      stroke: $gray;
    }

    .button-action__icon_cross-menu {
      width: 32px;
      height: 32px;
      max-width: 32px!important;
      max-height: 32px!important;
      stroke: #062439;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      background-color: #F2F4F5;
      padding: 10px;
      border-radius: 50%;
    }

    &.active {
      .button-action__icon_home {
        fill: $default;
      }

      .button-action__icon_heart {
        fill: $default;
        stroke: $default;
        stroke-width: 2;
      }
    }
  }
}
</style>

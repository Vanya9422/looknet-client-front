<template lang="pug">
component.button-primary.h5(
	:is="Tag"
	:to="!link && to !== '' ? to : false"
	:href="link && to !== '' ? to  : false"
	:class="Mods"
)
	template(v-if="loading")
		svg-icon.button-primary__icon(name="loading" :class="`button-primary__loading`" )
	template(v-else)
		svg-icon.button-primary__icon(:name="icon" :class="`button-primary__icon_${icon}`" v-if="icon")
		span.button-primary__text
			slot
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Boolean],
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    light: {
      type: Boolean,
      default: false,
    },
    link: {
      type: Boolean,
      default: false,
    },
    gray: {
      type: Boolean,
      default: false,
    },
    white: {
      type: Boolean,
      default: false,
    },
    blue: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    verysmall: {
      type: Boolean,
      default: false,
    },
    borderRed: {
      type: Boolean,
      default: false,
    },
    red: {
      type: Boolean,
      default: false,
    },
    big: {
      type: Boolean,
      default: false,
    },
    medium: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    square: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    Mods() {
      return {
        "button-primary_light": this.light,
        "button-primary_gray": this.gray,
        "button-primary_white": this.white,
        "button-primary_small": this.small,
        "button-primary_blue": this.blue,
        "button-primary_border": this.border,
        "button-primary_verysmall": this.verysmall,
        "button-primary_border-red": this.borderRed,
        "button-primary_red": this.red,
        "button-primary_big": this.big,
        "button-primary_medium": this.medium,
        isActive: this.active,
        "button-primary_square": this.square,
      };
    },
    Tag() {
      let component = "button";
      if (this.link && this.to) component = "a";
      if (!this.link && this.to) component = "NuxtLink";
      return component;
    },
  },
};
</script>

<style lang="scss">
.button-primary {
  border: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60rem;
  padding: 0 30rem;
  border-radius: 10rem;
  font-size: 16rem;
  font-weight: 600;
  transition: ease 0.12s;
  cursor: pointer;
  font-family: "Gilroy";
  background: #f4f3f4;

  &:not(:disabled) {
    &:hover {
      color: inherit;
    }
  }

  &__loading {
    margin: 0 !important;
    width: 30px;
    height: 30px;
    animation: lds-ring 2.5s cubic-bezier(0, 0, 0, 0) infinite;

    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  &_square {
    width: 60rem;
    padding: 0;

    .button-primary {
      &__icon {
        margin-right: 0;
      }
    }
  }

  &_big {
    height: 70rem;
  }

  &_medium {
    height: 50rem;
    font-size: 14rem;
  }

  @include large-mobile {
    height: 50rem;
    font-size: 14rem;
    padding: 0 20rem;
    &_big {
      height: 60rem;
    }
    &_square {
      width: 50rem;
      padding: 0;
    }
  }

  &_light {
    background: rgba(85, 109, 238, 0.1);
    color: $blue;
    fill: $blue;

    &:hover {
      // color: #fff;
      background: #d6ddfe;
    }
  }

  &_gray {
    background: #f5f5f7;
    border: 1px solid #f5f5f7;

    &:hover:not(:disabled) {
      background: #e4e4e4;
      border-color: #e4e4e4;
    }
  }

  &_small {
    font-size: 14rem;
  }

  &_blue {
    background: $blue;
    color: #fff;
    fill: #fff;

    &:hover:not(:disabled) {
      background: #4257c7;
      color: #fff;
    }

    &:disabled {
      background: $light-gray;
      opacity: 1 !important;
    }

    .button-primary {
      &__icon {
        &_check {
          fill: none;
          stroke: #fff;
        }

        &_penEdit {
          fill: none;
          stroke: #fff;
        }
      }
    }
  }

  &_white {
    background: #fff;
  }

  &_border {
    background: #fff;
    border: 1px solid #c4c4c4;
    transition: 0.3s;

    &:hover,
    &.isActive {
      border-color: $blue;
      color: $blue;
    }
  }

  &_verysmall {
    height: 32rem;
    font-weight: 500;
  }

  &_border-red {
    background: none;
    border: 1px solid $red;
    color: $red;
    font-size: 14rem;

    &:hover {
      color: #fff;
      background: $red;
    }
  }

  &_red {
    background: rgba(235, 87, 87, 0.14);
    color: $red;
    transition: 0.3s;

    .button-primary {
      &__icon {
        &_close {
          stroke: $red;
        }
      }
    }

    &:hover {
      background: $red;
      color: #fff;
    }
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  &__icon {
    flex-shrink: 0;
    margin-right: 10rem;

    &_chatting {
      width: 16rem;
      height: 12rem;
      //margin-right: 0;
    }

    &_phone {
      width: 11rem;
      height: 10rem;

      margin-top: -1px;
    }

    &_info {
      width: 12rem;
      height: 12rem;
      fill: #c3c8cb;
    }

    &_facebook {
      fill: #556dee;
      width: 11rem;
      height: 12rem;
    }

    &_gmail {
      fill: #eb5757;
      width: 15rem;
      height: 12rem;
    }

    &_yahoo {
      fill: #7f40bd;
      width: 14rem;
      height: 14rem;
    }

    &_plusBig {
      width: 12rem;
      height: 12rem;
      margin-right: 15rem;
    }

    &_download {
      width: 20rem;
      height: 20rem;
    }

    &_close {
      width: 14rem;
      height: 14rem;
      stroke: $default;
      stroke-width: 1.5;
      margin-right: 15rem;
    }

    &_check {
      fill: none;
      stroke: $default;
      width: 20rem;
      height: 20rem;
    }

    &_user {
      width: 18rem;
      height: 18rem;
    }

    &_grid {
      width: 18rem;
      height: 18rem;
    }

    &_grid2 {
      width: 16rem;
      height: 16rem;
    }

    &_danger {
      width: 17rem;
      height: 17rem;
    }

    &_dots {
      margin-right: 0;
      width: 14rem;
    }

    &_penEdit {
      width: 16rem;
      height: 16rem;
      fill: none;
      stroke: $default;
      stroke-width: 1.5;
    }

    @include large-mobile {
      &_phone {
        width: 10rem;
        height: 10rem;
        margin-right: 10rem;
      }
    }
  }

  .phone {
    font-size: 22rem;
    font-family: "Gilroy";

    @include large-mobile {
      font-size: 18rem;
    }
  }
}
</style>

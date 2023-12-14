<template lang="pug">
.input(:class="Mods", ref="input")
  component.input__field(
    :is="Tag",
    :class="TagMods",
    :type="type",
    :name="name",
    :id="name",
    :placeholder="placeholder",
    :disabled="disabled",
    :maxlength="maxlength",
    :value="!activeInput ? capitalizeFirstLetter(value) : value",
    autocomplete="off",
    v-mask="mask"
    @keyup="$emit('keyup', $event.target.value)",
    @input="changeValue",
    @touchstart="$emit('touchstart', $event.target.value)"
    :key="customKey"
  ) {{ value }}
  label.input__label(:for="name") {{ label }}
  //.input__clear(v-if="adress && value.length > 0"  @click.prevent="value = ''")
  //  svg-icon(name="closeBig")
  a.input__btn-map.p(:href="mapLink", target="_blank", v-if="adress") {{ mapText }}
  svg-icon.input__icon(
    :name="icon",
    :class="`input__icon_${icon}`",
    v-if="icon",
    @click="$emit('click')"
  )
  slot
</template>

<script>
export default {
  props: {
    activeInput: {
      type: Boolean,
      default: false,
    },
    debounce: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
      default: "",
    },
    name: {
      type: String,
    },
    label: {
      type: String,
      default: "",
    },
    mapLink: {
      type: String,
      default: "",
    },
    mapText: {
      type: String,
      default: "Map",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    separator: {
      type: Boolean,
      default: false,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    adress: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    big: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: null,
    },
    icon: {
      type: String,
      default: "",
    },
    error: {
      type: [Boolean, String],
      default: false,
    },
    valid: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: String,
      default: ''
    },
    customKey: {
      type: Number,
      default: 0
    }
  },
  methods: {
    changeValue(val) {
      const input = val.target;
      const value = input.value;
      const newValue = value.replace(/(<|>)/g, "");
      if (!this.activeInput) {
        const upperCasedValue = this.capitalizeFirstLetter(newValue);
        if (value !== upperCasedValue) {
          input.value = upperCasedValue;
        }
      }
      if (this.activeInput) {
        if (value !== newValue) {
          input.value = newValue;
        }
      }
      if (this.debounce) {
        this.changeValueDebounce(value);
      } else {
        this.$emit("input", value);
      }
    },
    capitalizeFirstLetter(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    changeValueDebounce: _.debounce(function (val) {
      this.$emit("input", val);
    }, 500),
  },
  computed: {
    Mods() {
      return {
        "is-separator": this.separator,
        input_adress: this.adress,
        input_big: this.big,
        input_label: this.label,
      };
    },
    Tag() {
      let component = "input";
      if (this.textarea) component = "textarea";
      return component;
    },
    TagMods() {
      return {
        input__field_textarea: this.textarea,
        input_error: this.error,
        input_valid: this.valid,
      };
    },
  },
};
</script>

<style lang="scss">
input {
  &:disabled {
    -webkit-text-fill-color: rgb(6, 36, 57);
    -webkit-opacity: 1;
    opacity: 1;
  }
}
.input {
  position: relative;

  @include min-large-mobile {
    &.is-separator {
      .input__field {
        border-left-width: 0;
        border-right-width: 0;
        border-radius: 0;

        &:focus {
          border-color: $light-gray;
        }
      }

      &:before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 50%;
        width: 1px;
        height: 30rem;
        background: #d2d2d7;
        margin-top: -15rem;
      }

      &:first-child {
        &:before {
          display: none;
        }

        .input__field {
          border-radius: 10rem 0 0 10rem;
          border-left-width: 1px;
        }
      }

      &:last-child {
        .input__field {
          border-radius: 0 10rem 10rem 0;
          border-right-width: 1px;
        }
      }
    }
  }

  &_adress {
    .input {
      &__field {
        padding-right: 133rem;
      }
    }

    @include large-mobile {
      .input {
        &__field {
          padding-right: 105rem;
        }
      }
    }
  }

  &_big {
    .input {
      &__field {
        height: 80rem;
      }
    }

    @include large-mobile {
      .input {
        &__field {
          height: 50rem;
        }
      }
    }
  }

  &_label {
    .input {
      &__field {
        padding-top: 20rem;
      }
    }
  }

  &_sucsess {
    .input {
      &__label {
        font-size: 14rem;
        line-height: 1.2;
        top: 18rem;
        color: rgba($default, 0.3);
        font-weight: 600;
      }
    }
  }

  &__field {
    width: 100%;
    height: 60rem;
    font-size: 17rem;
    font-weight: 500;
    font-family: "Gilroy";
    padding: 0 40rem 0 20rem;
    border: 1px solid $light-gray;
    border-radius: 10rem;
    display: block;

    &:focus {
      border-color: $blue;
    }

    &.input_valid {
      border-color: $green;
    }

    &.input_error {
      border-color: $red;
    }

    &::placeholder {
      font-weight: 500;
      color: $gray;
    }

    &:disabled {
      border-color: transparent;
      background: #f4f3f4;
      color: #83929d;

      &::placeholder {
        color: #83929d;
      }
    }

    &_textarea {
      height: 110rem;
      padding-top: 20rem;
      overflow-x: hidden;
      overflow-y: auto;
      resize: none;

      /* width */
      &::-webkit-scrollbar {
        width: 2px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: rgba(#d2d2d7, 0.3);
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: $blue;
      }
    }

    &:focus + .input__label {
      font-size: 14rem;
      line-height: 1.2;
      top: 18rem;
      color: rgba($default, 0.3);
      font-weight: 600;
    }

    @include large-mobile {
      height: 50rem;
      font-size: 14rem;
      &_textarea {
        height: 90rem;
        padding-top: 15rem;
      }
    }
  }

  &__clear {
    width: 24rem;
    height: 24rem;
    fill: $gray;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    margin-top: -12rem;
    right: 100rem;
    cursor: pointer;

    svg {
      width: 16rem;
      height: 16rem;
    }

    @include large-mobile {
      right: 78rem;
    }
  }

  &__btn-map {
    position: absolute;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    right: 0;
    top: 0;
    width: 86rem;
    height: 100%;

    &:before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 13rem;
      width: 1px;
      height: calc(100% - 26rem);
      background: $light-gray;
    }

    @include large-mobile {
      width: 69rem;
      &:before {
        top: 10rem;
        height: calc(100% - 20rem);
      }
    }
  }

  &__icon {
    position: absolute;
    width: 20rem;
    height: 20rem;
    top: 50%;
    margin-top: -10rem;
    right: 20rem;

    &_eyeShow {
      cursor: pointer;
      fill: #9a9a9a;
      width: 24rem;
      height: 24rem;
      margin-top: -12rem;
      right: 18rem;
      transition: fill 0.3s;

      &:hover {
        fill: #9f9e9e;
      }
    }

    &_eyeHide {
      cursor: pointer;
      stroke: #9a9a9a;
      stroke-width: 1.5;
      fill: none;
      width: 24rem;
      height: 24rem;
      margin-top: -12rem;
      right: 18rem;
      transition: stroke 0.3s;

      &:hover {
        stroke: #9f9e9e;
      }
    }
  }

  &__edit {
    position: absolute;
    right: 1px;
    top: 1px;
    height: calc(100% - 2px);
    background: #fff;
    cursor: pointer;
    border-radius: 10rem;
    padding: 0 20rem;
    display: flex;
    align-items: center;
  }

  &__label {
    position: absolute;
    left: 20rem;
    top: 28rem;
    font-size: 17rem;
    line-height: 1;
    color: $gray;
    transition: ease 0.15s;
  }

  &__change {
    position: absolute;
    right: 15rem;
    top: 50%;
    margin-top: -14rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    padding: 0 12rem;
    min-height: 28rem;
    background: #fff;
    border-radius: 4px;
    color: $blue;
    font-size: 17rem;

    @include large-mobile {
      height: 26rem;
      margin-top: -13rem;
      padding: 0 6rem;
      font-size: 14rem;
    }
  }
}
</style>

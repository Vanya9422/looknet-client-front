<template lang="pug">
  .input(:class="Mods" ref="input" )
    input.input__field(
      :class="TagMods"
      :type="type"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      v-model="price"
      :value="price"
      autocomplete="off"
      @blur="$emit('blur')"
    )
    label.input__label(:for="name") {{label}}
    .input__clear(v-if="adress")
      svg-icon(name="closeBig")
    a.input__btn-map.p(:href="mapLink" target="_blank" v-if="adress") {{mapText}}
    svg-icon.input__icon(
      :name="icon"
      :class="`input__icon_${icon}`"
      v-if="icon"
      @click="$emit('click')"
    )
    slot

</template>

<script>

import price from "@/mixins/price";

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    mapLink: {
      type: String,
      default: ''
    },
    mapText: {
      type: String,
      default: 'Map'
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    separator: {
      type: Boolean,
      default: false
    },
    adress: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    big: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: null
    },
    icon: {
      type: String,
      default: ''
    },
    error: {
      type: [Boolean,String],
      default: false
    },
    valid: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number,
      default: 0
    }
  },
  data(){
    return{
      price:this.value ? `$ ${this.value}` : ''
    }
  },
  watch:{
    price: {
      handler(newValue) {
        if (newValue === '') {
          this.$nextTick(() => this.$emit('input',result));
          return;
        }
        let result = newValue.replace(/[^0-9.]/g, "")
        if (result[0] === '0') {
          result = result.substring(1);
        }
        this.$nextTick(() => this.price = `$ ${result}`);
        // console.log(result)
        // this.$emit('price', result);
        this.$emit('input',result)
      },
      deep: true
    },
  },
  // mixins: [price],
  computed: {
    Mods() {
      return {
        'is-separator': this.separator,
        'input_adress': this.adress,
        'input_big': this.big,
        'input_label': this.label,
      }
    },

    TagMods() {
      return {
        'input__field_textarea': this.textarea,
        'input_error': this.error,
        'input_valid': this.valid
      }
    }
  }
}
</script>

<style lang="scss">
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
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 50%;
        width: 1px;
        height: 30rem;
        background: #D2D2D7;
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
        color: rgba($default, .3);
        font-weight: 600;
      }
    }
  }

  &__field {
    width: 100%;
    height: 60rem;
    font-size: 17rem;
    font-weight: 500;
    font-family: 'Gilroy';
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
      background: #F4F3F4;
      color: #062439;

      &::placeholder {
        color: #83929D;
      }
    }

    &_textarea {
      height: 110rem;
      padding-top: 20rem;
      overflow: hidden;
      resize: none;
    }

    &:focus + .input__label {
      font-size: 14rem;
      line-height: 1.2;
      top: 18rem;
      color: rgba($default, .3);
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
      content: '';
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
      fill: #9A9A9A;
      width: 24rem;
      height: 24rem;
      margin-top: -12rem;
      right: 18rem;
      transition:fill 0.3s;

      &:hover{
        fill: #9f9e9e;
      }
    }


  &_eyeHide {
      cursor: pointer;
      stroke: #9A9A9A;
      stroke-width: 1.5;
      fill: none;
      width: 24rem;
      height: 24rem;
      margin-top: -12rem;
      right: 18rem;
      transition:stroke 0.3s;
      &:hover{
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
    transition: ease .15s;
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

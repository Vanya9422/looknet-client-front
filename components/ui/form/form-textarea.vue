<template lang="pug">
  .textarea(:class="Mods")
    textarea.textarea__field(
      :class="{'css-scrollbar': canScroll}"
      ref="inputFocus"
      :maxlength="max"
      :name="name"
      :placeholder="placeholder"
      v-model="currentValue"
      :style="inputStyle"
      @focus="scrollListener(true)"
      @blur="scrollListener(false)"
      @keydown.enter.exact.prevent="$emit('enter')"
      @input="$emit('input',$event.target.value)"
    )
    textarea.textarea__field.textarea__field_shadow(
      :maxlength="max"
      @keydown.enter.exact.prevent="$emit('enter')"
      @input="$emit('input',$event.target.value)"
      v-model="currentValue" ref="shadow" tabindex="0"
    )

</template>

<script>
  import {mapGetters} from 'vuex'

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
    placeholder: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    },
    big: {
      type: Boolean,
      default: false
    },
    test: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    canScroll: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return {
      inputIsVisible:false,
      currentValue: '',
      inputHeight: '0',
    }
  },
  watch:{
    currentValue(val){
     this.$nextTick(this.resize)
    }
  },
  computed: {
    ...mapGetters({
      GET_FOCUS_AFTER_MESSAGE_SEND: 'chat/GET_FOCUS_AFTER_MESSAGE_SEND',
    }),
    Mods() {
      return {
        // 'css-scrollbar': this.canScroll,
        'textarea_small': this.small,
        'textarea_big': this.big,
        'textarea_large': this.large
      }
    },
    inputStyle() {
      return {
        'min-height': this.inputHeight,
      }
    },
  },
  mounted() {
    let route = this.$route.path;
    if (route.includes('chat') && this.GET_FOCUS_AFTER_MESSAGE_SEND) this.showInput();
    this.resize()
  },
  methods: {
    showInput() {
      this.$nextTick(() => {
        this.focusInput();
      });
    },
    focusInput() {
      if (!this.$refs.inputFocus) return;
      this.$refs.inputFocus.focus();
    },
    blurInput() {
      if (!this.$refs.inputFocus) return;
      this.$refs.inputFocus.blur();
    },
    resize() {
      this.inputHeight = `${this.$refs.shadow.scrollHeight}px`
    },
    scrollListener(value) {
      if (!process.client) return;
      setTimeout(() => {
        if (value) {
          document.addEventListener('scroll', this.blurInput)
        } else {
          document.removeEventListener('scroll', this.blurInput)
        }
      }, 500)
    },
  }
}
</script>

<style lang="scss">
.textarea {
  position: relative;
  padding-top: 19rem;
  padding-bottom: 19rem;
  &__field {
    width: 100%;
    height: 110rem;
    font-size: 17rem;
    font-weight: 500;
    font-family: 'Gilroy';
    padding: 0 10rem 0 20rem;
    border: 1px solid $light-gray;
    border-radius: 10rem;
    //margin-top: -19px;
    //margin-bottom: -19px;
    display: block;
    line-height: normal;
    resize: none;
    overflow: hidden;

    &.css-scrollbar {
      overflow-y: auto;
    }

    &:focus {
      border-color: $blue;
    }

    &::placeholder {
      font-weight: 500;
      color: $gray;
    }

    &:disabled {
      border-color: transparent;
      background: #F4F3F4;
      color: #83929D;

      &::placeholder {
        color: #83929D;
      }
    }

    &_shadow {
      opacity: 0;
      position: absolute;
      visibility: hidden;

      @include large-mobile {
        width: calc(100% - 30px);
      }
      }

    @include large-mobile {
      height: 90rem;
      font-size: 14rem;
      padding-top: 15rem;
      padding-bottom: 15rem;
    }
  }

  &_small {
    .textarea {
      &__field {
        height: 20rem;
      }
    }

    @include large-mobile {
      .textarea {
        &__field {
          height: 48rem;
        }
      }
    }
  }

  &_big {
    .textarea {
      &__field {
        height: 170rem;

        &::placeholder {
          white-space: pre-wrap;
        }
      }
    }
  }

  &_large {
    .textarea {
      &__field {
        height: 250rem;
      }
    }

    @include large-mobile {
      .textarea {
        &__field {
          height: 185rem;
        }
      }
    }
  }

}
</style>

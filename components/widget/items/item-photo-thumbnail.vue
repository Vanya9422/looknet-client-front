<template lang="pug">
  .photo-thumbnail
    .photo-thumbnail__preview(v-if="img")
      .photo-thumbnail__img
        set-img(img-class="object-fit" :src="img")
      button-medium.photo-thumbnail__btn.photo-thumbnail__btn_left(type="button" verysmall blue square icon="pinned" v-if="main")
      button-medium.photo-thumbnail__btn.photo-thumbnail__btn_right(type="button" @click.stop.native="$emit('deleteItem')" verysmall transparent square icon="deleteBig" )
    .photo-thumbnail__loading(v-else-if="loading")
      .photo-thumbnail__loading-icon
        img(src="~/assets/img/spin.svg")
    .photo-thumbnail__add(v-else)
      slot(name="input" )
        input.photo-thumbnail__add-input(type="file" id="files2" name="pictures2[]" :accept="accept" @change="$emit('change')" multiple)
      svg-icon.photo-thumbnail__add-icon(name="closeBig")
</template>

<script>
export default {
  props: {
    img: {
      // type: Object,
      // default: () => {}
    },
    main: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    accept: {
      type: [String,Boolean],
      default: false
    },
  },
}
</script>

<style lang="scss">
.photo-thumbnail {
  position: relative;
  padding-top: 100%;
  cursor: pointer;

  &:before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 1px dashed $light-gray;
    border-radius: 6rem;
  }
&:hover{
  .photo-thumbnail {
    &__btn {
      &_right {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
  &.isActive {
    cursor: default;

    .photo-thumbnail__preview:after {
      visibility: visible;
      opacity: 1;
    }

    .photo-thumbnail {
      &__btn {
        &_right {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
  @include large-mobile{
    .photo-thumbnail {
      &__btn {
        &_right {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
  &.error {
    cursor: default;
    margin: 0 2rem;

    .photo-thumbnail__preview:after {
      visibility: visible;
      opacity: 1;
      border-color: $red;
    }
  }

  &__preview {
    //position: relative;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    &:after {
      content: '';
      display: block;
      box-sizing: border-box;
      position: absolute;
      left: -4px;
      top: -4px;
      width: calc(100% + 8px);
      height: calc(100% + 8px);
      border-radius: 8rem;
      border: 2px solid $blue;
      transition: ease .15s;
      visibility: hidden;
      opacity: 0;
    }
  }

  &__img {
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 6rem;
  }

  &__btn {
    position: absolute;
    z-index: 2;
    top: 5rem;

    &_left {
      left: 5rem;
    }

    &_right {
      right: 5rem;
      visibility: hidden;
      opacity: 0;
      transition: ease .15s;
      z-index: 9;
    }
  }

  &__loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &-icon {
      width: 30rem;
      height: 30rem;
      animation: rotate 1s ease-in-out infinite;
    }
  }

  &__add {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &-input {
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      z-index: 2;
    }

    &-icon {
      width: 16rem;
      height: 16rem;
      fill: $light-gray;
      transform: rotate(45deg);
    }
  }
}
</style>

<template lang="pug">
  .add-photo
    input.photo-thumbnail__add-input(type="file" id="files3" name="pictures1[]" accept=".jpeg, .jpg, .png" @change="changeFile" multiple)
    .add-photo__preview
      .add-photo__box.add-photo__box_default
        .add-photo__inner
          .add-photo__default-img
            set-img(:default-img="require('~/assets/img/add-photo__default.png')")
            .add-photo__default-icon
              svg-icon(name="plusBig")
          .add-photo__desc {{firstText}}
          ul.add-photo__list.flex.flex_justify
            li.add-photo__item(
              v-for="(item, i) in list"
              :key="i"
            ) {{item.text}}
      .add-photo__box.add-photo__box_hover
        .add-photo__inner
          .add-photo__icon
            svg-icon(name="plusBig")
          .add-photo__desc {{secondText}}
          ul.add-photo__list.flex.flex_justify
            li.add-photo__item(
              v-for="(item, i) in list"
              :key="i"
            ) {{item.text}}
    .add-photo__thumbnails
      .add-photo__thumbnails-list.flex

        .add-photo__thumbnails-item(v-for="i in 10" :key="i")

          item-photo-thumbnail.add-photo__thumbnails-btn
            template(#input)
              div


</template>

<script>
export default {
  props: {
    firstText: {
      type: String,
      default: "The first photo will be displayed in the search results, choose the most successful one"
    },
    secondText: {
      type: String,
      default: "Click to upload or drop a photo"
    },
    img: {
      type: String,
      default: "analytics-box__img.svg"
    },
    list: {
      type: Array,
      default: () => ([
        'You can upload up to 10 photos',
        'Format JPG or PNG format',
        'Only upload media you own the rights to',
        'The maximum photo size is 10MB.'
      ])
    },
  },
  methods: {
    changeFile(event) {
      const file = event.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        event.preventDefault();
        event.target.value = "";
        this.$toast.show("File size is too big", {
          duration: 3000,
          position: "top-right",
          type: "error",
        });
        return;
      }
      const fileType = file.type.toLowerCase();

      if (fileType === 'image/gif') {
        event.preventDefault();
      } else {
        this.$emit('change')
      }
    }
  }
}
</script>

<style lang="scss">
.photo-thumbnail__add-input{
  z-index: 9 !important;
}
.add-photo {
  position: relative;
  &>*{
    z-index: 1;

  }
  &:hover {
    .add-photo__box_default {
      opacity: 0;
    }
    .add-photo__box_hover {
      opacity: 1;
    }
  }

  &__box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: ease .2s;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10rem;
    padding: 50rem;

    &_default {
      border: 2px dashed $light-gray;

      &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: -2px;
        left: -2px;
        width: calc(100% + 4px);
        height: 130rem;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
      }
    }

    &_hover {
      border: 2px dashed $light-gray;
      opacity: 0;
      &:active {
        border-color: $blue;
      }
      &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: -2px;
        left: -2px;
        width: calc(100% + 4px);
        height: 130rem;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
      }
    }

    @include large-mobile {
      padding: 20rem;
      &_default {
        opacity: 1 !important;
      }
      &_hover {
        opacity: 1;
        border: 2px dashed $light-gray;
        display: none;
      }
    }
  }

  &__default {
    &-img {
      width: 77rem;
      height: 98px;
      margin: 0 auto;
      img{
        object-fit: cover;
      }
    }

    &-icon {
      display: none;
    }

    @include large-mobile {
      &-img {
        width: 67rem;
      }
    }
  }

  &__preview {
    position: relative;
    padding-top: div( 500, 872 ) *100%;
    overflow: hidden;
    border-radius: 10rem;
    text-align: center;
    cursor: pointer;


    @include large-mobile {
      padding-top: div( 334, 345 ) *100%;
    }
  }

  &__inner {
    width: 100%;
    max-width: 450rem;
    position: relative;
    z-index: 999;
  }

  &__desc {
    height: 35px;
    max-width: 340rem;
    font-size: 16rem;
    font-weight: 500;
    margin: 25rem auto 0 auto;
    @include max-rows(16 * 1.2, 2);

    @include large-mobile {
      font-size: 14rem;
      max-width: 300rem;
      margin-top: 20rem;
      @include max-rows(16 * 1.2, 2);

    }
  }

  &__list {
    @include items(2, 10);
    margin-top: 50rem;
    text-align: left;
    color: $gray;
    line-height: 1.3;
    font-weight: 400;
    @include large-mobile {
      margin: 15rem auto 0 auto;
      max-width: 240rem;
      font-size: 12rem;
      line-height: 1.2;
      padding-left: 20rem;
    }
  }

  &__item {
    max-width: 200rem;
    @include large-mobile {
      max-width: none;
      width: 100%;
      margin: 0;
      &:not(:first-child) {
        margin-top: 10rem;
      }
    }
  }

  &__icon {
    width: 98rem;
    height: 98rem;
    margin: 0 auto;
    background: #EEF1FE;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;

    svg {
      width: 24rem;
      height: 24rem;
      fill: $blue;
    }
  }

  &__thumbnails {
    margin-top: 10rem;

    &-list {
      @include items(10, 4);
    }

    @include large-mobile {
      overflow: hidden;
      margin: 5rem -15rem 0 -15rem;
      &-list {
        padding: 0 15rem;
        padding-bottom: 40rem;
        margin: 0 0 -40rem 0;
        overflow-y: hidden;
        overflow-x: auto;
        flex-wrap: nowrap;
      }
      &-item {
        margin: 0;
        width: 111rem;
        flex-shrink: 0;

        &:not(:last-child) {
          margin-right: 5rem;
        }
      }
    }
  }
}
</style>

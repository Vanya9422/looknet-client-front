<template lang="pug">
  .create-gallery
    .create-gallery__preview
      .create-gallery__action
        button-medium.create-gallery__action-btn.create-gallery__action-btn_main.d-inline-flex(v-if="active !== 0 " big borderWhite icon="pinned" type="button" @click.prevent.native="toTop") {{content.pin}}
        button-medium(v-if="active === 0" big blue icon="pinned" type="button") {{content.main}}

        //button-medium.create-gallery__action-btn.create-gallery__action-btn_refresh(big transparent square icon="refresh")
        button-medium.create-gallery__action-btn( big transparent square icon="deleteBig" @click.prevent.native="deleteItem(active)")
      .create-gallery__preview-img(v-if="thumbnails.length > 0")
        set-img(img-class="object-fit" :src="thumbnails[active <= 0 ? 0 : active]")
    client-only
      .create-gallery__thumbnails
        draggable.create-gallery__thumbnails-list.flex(
          v-model="thumbnails"
          v-bind="dragOptions"
          draggable=".canDrag:not(.photo-thumbnail__btn)"
          @start="drag=true"
          @end="dragMethod"
          :scroll="false"
          :delay='!$screen.lt ? 200 : 500'
          delay-on-touch-only='true'
        )
          .create-gallery__thumbnails-item.canDrag(
            v-for="(item, i) in thumbnails" :key="i"
          )
            item-photo-thumbnail.create-gallery__thumbnails-btn(
              :img="item"
              :main="i === 0"
              :loading="item.loading"
              @deleteItem="deleteItem(i)"
              @click.stop.prevent.native="thumbnail(i)"
              :class="[{isActive:active === i},{error:item && item.size > 10 * 1024 * 1024}]"
            )
          .create-gallery__thumbnails-item(v-show="thumbnails.length <= 9")
            item-photo-thumbnail.create-gallery__thumbnails-btn(accept=".jpeg, .jpg, .png" @change="$emit('change')")
    .create-gallery__text.color-red(v-if="thumbnails.length >  10" v-html="`* ${content.error}`")
    .create-gallery__text.color-gray(v-html="`* ${content.drop}`")
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  props: {
    content: {
      type: Object,
      default: () => {}
    },
    preview: {
      type: String,
      default: "create-gallery__img5_big.jpg"
    },
    thumbnails: {
      default: () => ([])
    },
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      drag: false
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "group",
        ghostClass: "ghost",
        scrollSensitivity: 200,
        forceFallback: true
      };
    },
  },
  methods: {
    dragMethod() {
      this.$emit('changeOrder', this.thumbnails)
    },
    thumbnail(i) {
      this.$emit('changeActive', i)
    },
    deleteItem(i) {
      this.$emit('deleteItem', i)
    },
    toTop() {
      this.$emit('top', this.active)
      this.$emit('changeActive', 0)
    }
  }
}
</script>

<style lang="scss">
.create-gallery {

  &__preview {
    position: relative;

    &-img {
      padding-top: div( 500, 872 ) *100%;
      overflow: hidden;
      border-radius: 10rem;
      text-align: center;
      position: relative;
    }

    @include large-mobile {
      &-img {
        padding-top: div( 334, 345 ) *100%;
      }
    }
  }

  &__btn-main {
    position: absolute;
    left: 100%;
    margin-left: 70rem;
    top: 0;
    white-space: nowrap;

    @include large-desktop {
      margin-left: 40rem;
    }
    @include small-desktop {
      display: none;
    }
    @include large-mobile {
      display: inline-flex;
      position: static;
      width: 35rem;
      padding: 0;
      margin-left: 5rem;
      .button-medium {
        &__icon {
          margin-right: 0;
        }

        &__text {
          display: none;
        }
      }
    }
  }

  &__action {
    position: absolute;
    z-index: 50;
    right: 20rem;
    top: 20rem;

    &-btn {
      &:not(:first-child) {
        margin-left: 10rem;
      }
    }

    @include large-mobile {
      right: 10rem;
      top: 10rem;
      &-btn {
        &:not(:first-child) {
          margin-left: 5rem;
        }

        &_main, &_refresh {
          display: none;
        }
      }
    }
  }

  &__thumbnails {
    margin-top: 10rem;

    &-list {
      @include items(10, 4);
    }

    @include large-mobile {
      overflow: hidden;
      margin: 2px -15rem 0 -15rem;
      max-width: 100vw;
      &-list {
        padding: 4px 15rem 44rem 15rem;
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

  &__text {
    margin-top: 20rem;
  }
}
</style>

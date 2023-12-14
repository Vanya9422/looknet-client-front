<template lang="pug">
  intersect(@enter="intersected = true")
    .mouse-gallery.absolute(v-if="list?.length" @mouseleave="selectBullet")
      .mouse-gallery__list.absolute
        .mouse-gallery__item(v-for="(image, i) in list" :key="i" @mouseenter="selectBullet(i)")
          .mouse-gallery__image-wrapper.absolute(v-show="isImageLoad")
            img.mouse-gallery__image.object-fit(:src="image")
            set-img(
              :src="image"
              v-if="image && intersected"
              img-class="mouse-gallery__image object-fit"
              :thumb="thumb"
              @load="isImageLoad = true"
            )
          .mouse-gallery__image-wrapper.absolute(v-show="!isImageLoad")
            .item-card__skeleton
              vue-skeleton-loader(:size='400' animation='wave')

      .mouse-gallery__nav(v-if="list?.length > 1")
        .mouse-gallery__dot(v-for="(image, i) in list" :key="i" ref="bullet")
    .mouse-gallery.absolute(v-else)
      .mouse-gallery__list.absolute
        .mouse-gallery__item
          .mouse-gallery__image-wrapper.absolute
            //img.mouse-gallery__image.object-fit(:src="image")
            set-img(
              :default-img="require('assets/img/default-product.jpg')"
              img-class=".mouse-gallery__image object-fit")
</template>

<script>
import Intersect from 'vue-intersect'
import VueSkeletonLoader from "skeleton-loader-vue";

export default {
  components: {Intersect, VueSkeletonLoader },
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    thumb: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    intersected: false,
    isImageLoad: false
  }),
  methods: {
    clearAll() {
      const $bullets = this.$refs.bullet;

      if ($bullets === undefined) return false;

      $bullets.forEach(bullet => {
        bullet.classList.remove('is-active');
      });
    },
    selectBullet(index = -1) {
      const $bullets = this.$refs.bullet;

      if ($bullets === undefined) return false;

      if (index !== -1 && $bullets[index] !== undefined) {
        this.clearAll();

        $bullets[index].classList.add('is-active');
      } else {
        this.clearAll();
      }
    }
  }
};
</script>

<style lang="scss">
.mouse-gallery {


  &__list {
    display: flex;
  }

  &__nav {
    pointer-events: none;
    display: flex;

    padding-left: 10rem;
    padding-right: 10rem;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 15;

  }

  &__image-wrapper {
    z-index: -2;
    opacity: 0;

  }

  &__dot {
    // position: absolute;
    // left: 0;
    flex: 1;
    position: relative;
    margin-bottom: 10rem;

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 2px;
      right: 2px;
      height: 2px;
      bottom: 0;
      background: rgba(255, 255, 255, 0.44);
      border-radius: 1px;

    }

    &.is-active {
      &:before {
        background-color: #fff;
      }
    }
  }

  &__item {
    height: 100%;
    flex: 1;
    // background-color: red;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &:hover, &:first-child {

      .mouse-gallery__image-wrapper {
        z-index: -1;
        opacity: 1;
      }
    }
  }
}
</style>

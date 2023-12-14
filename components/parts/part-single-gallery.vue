<template lang="pug">
  div
    CoolLightBox(
      v-if="media.length > 0"
      :items="media"
      :index="index"
      @close="index = null"
      closeOnClickOutsideMobile
      :slideshow="false"
      overlayColor=" rgba(6, 36, 57, 0.34)"
    )
      template(#icon-previous)
        button-close.modal__close.modal-left(icon="arrowRight")
      template(#icon-next)
        button-close.modal__close.modal-right(icon="arrowRight")
      template(#loading)
        div
      template(#close)
        button-close.modal__close(@click.native='index = null')
    .single-gallery(v-if="TestImages.length>0")
      swiper.single-gallery__slider(
        :options="MainSwiperOptions"
        disabled
        v-model="MainSliderInstance"
      )
        swiper-slide(v-for="(image,i) in TestImages" :key="i")
          .single-gallery__preview
            .single-gallery__preview-inner(@click.prevent.stop="index = i" v-if="openImages")
            you-tube-video.object-fit(:link="image.src" v-if="image.link")
            set-img(img-class="object-fit-contain" :large="true" :src="image" v-else)
        swiper-slide(v-if="link")
          .single-gallery__preview
            set-img(img-class="object-fit" :default-img="require('assets/img/default-product-big.jpg')")

        template(v-slot:nav)
          swiper-nav.single-gallery__nav

          swiper-dots.single-gallery__dots

      swiper.single-gallery__slider.single-gallery__slider_thumb(
        :options="ThumbsSwiperOptions"
        v-model="ThumbsSliderInstance"
      )
        swiper-slide(v-for="(image,i) in TestImages" :key="i")
          .single-gallery__thumbnail(
            @click="GoToSlide(i)"
            :class="{'is-active': ThumbActive === i}"
          )
            .single-gallery__thumbnail-inner
              you-tube-video.disabled.object-fit(:link="image.src" v-if="image.link" disabled)
              set-img(img-class="object-fit" :thumb="true" :src="image" v-else-if="image")

    .single-gallery(v-else)
      swiper.single-gallery__slider(
        :options="MainSwiperOptions"
        disabled
        v-model="MainSliderInstance"
      )
        swiper-slide
          .single-gallery__preview
            set-img(img-class="object-fit" :default-img="require('assets/img/default-product-big.jpg')")
            set-img(img-class="object-fit" v-if="link" :default-img="require('assets/img/default-product-big.jpg')")


</template>

<script>
import {Navigation, Pagination} from "swiper";

export default {
  props: {
    TestImages: {
      type: Array,
      default: () => ([])
    },
    link: {
      type: String,
      default: ''
    },
    openImages:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: null,
      MainSliderInstance: null,
      ThumbsSliderInstance: null,
      ThumbActive: 0,

      MainSwiperOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,
        // noSwiping: true,
        // touchEventsTarget: 'wrapper',
        allowTouchMove: this.openImages ? process.client && !this.$screen.sd : true,
        modules: [Navigation, Pagination],
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },

      ThumbsSwiperOptions: {
        slidesPerView: 7,
        slidesPerGroup: 6,
        spaceBetween: 2,
        // centeredSlides: true,
        loop: false,
        breakpoints: {
          0: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          820: {
            slidesPerView: 6,
            slidesPerGroup: 5,
          },
          1120: {
            slidesPerView: 7,
            slidesPerGroup: 6,
          },
        }
      },

    }
  },
  computed: {
    media() {
      let arr = []
      this.TestImages.forEach((item) => {
        if(item.link) {
          arr.push({
            src: item.src,
            type: 'youtube'
          })
        } else {
          arr.push({
            src: item.original_full_url,
            type: 'image'
          })
        }
      })
      return arr
    }
  },
  mounted() {
    this.$nextTick(this.MainSliderInit)
  },

  methods: {
    MainSliderInit() {
      if (!this.MainSliderInstance) return false;

      this.MainSliderInstance.on('slideChange', () => {
        const Actived = this.MainSliderInstance.activeIndex;

        this.ThumbActive = Actived;

        this.ThumbsSliderInstance.slideTo(this.ThumbActive, 700)
      });
    },
    GoToSlide(Index) {
      if (!this.MainSliderInstance) return false;

      this.MainSliderInstance.slideTo(Index)
    }
  }
}
</script>

<style lang="scss">
.single-gallery {
  &__slider {
    border-radius: 10rem;
    overflow: hidden;

    &:not(:last-child) {
      margin-bottom: 6rem;
    }

    @include small-tablet {
      &_thumb {
        display: none;
      }
      border-radius: 0;
      width: calc(100% + var(--wrapper-offset) * 2);
      margin-left: calc(-1 * var(--wrapper-offset));
      margin-right: calc(-1 * var(--wrapper-offset));
    }
  }

  &__nav {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-bottom: 20rem;
    margin-right: 20rem;
    @include small-tablet {
      &.swiper-nav {
        display: none;
      }
    }
  }

  &__dots {

    @include min-small-tablet {
      display: none !important;
    }
  }

  &__thumbnail {
    padding: 4rem;
    border-radius: 10rem;
    cursor: pointer;
    transition: ease .1s;

    &-inner {
      padding-top: div(80, 114) * 100%;
      border-radius: inherit;
      position: relative;

      &:before {
        content: '';
        z-index: 2;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background: rgba(0, 0, 0, 0.3);
        transition: ease .1s;
      }

      picture, img {
        border-radius: inherit;
      }

    }

    &.is-active {
      box-shadow: inset 0px 0px 0 2px $blue;

      .single-gallery__thumbnail-inner {
        &:before {
          opacity: 0;
        }
      }
    }


    img {
      border-radius: inherit;
    }
  }

  &__preview {
    position: relative;
    padding-top: div(526, 982) * 100%;
    border-radius: 10rem;
    &-inner{
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 9;
      cursor: pointer;
      top: 0;
      left: 0;
    }

    @include large-tablet {
      padding-top: 69.564155%;
    }

    @include small-tablet {
      border-radius: 0;
      padding-top: 55.564155%;
    }

    @include large-mobile {
      padding-top: div(250, 375) * 100%;
    }

    img {
      border-radius: inherit;
    }


  }

}
</style>

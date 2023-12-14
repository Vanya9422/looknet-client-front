<template lang="pug">
.analytics-box
  swiper.analytics-box__slider(:options="SwiperOptions", :disabled="true")
    swiper-slide.analytics-box__slide(
      v-for="(slide, i) in slides",
      :class="slide.class",
      :key="i"
    )
      .analytics-box__inner
        template(v-if="slide.showText")
          h2.analytics-box__title.h2.h2_big {{ slide.title }}
          .analytics-box__desc {{ slide.desc }}

        part-statistic.analytics-box__statistic(
          v-if="slide.showText",
          :class="{ 'opacity-0': !slide.statistics }",
          :statistics="slide.statistics"
        )

      .analytics-box__img(:class="{ 'cover-img': slide.img }")
        set-img(
          :src="slide.img && slide.img.length !== 0 ? slides.img[0] : ''",
          :defaultImg="require(`~/assets/img/analytics-box__img.jpg`)"
        )

    template(v-slot:nav, v-if="hasMoreOneSlides")
      swiper-nav.analytics-box__nav
</template>

<script>
import { Navigation } from "swiper";

export default {
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    hasMoreOneSlides() {
      return this.slides.length > 1;
    },
    SwiperOptions() {
      return {
        enabled: this.hasMoreOneSlides,
        slidesPerView: 1,
        spaceBetween: 20,
        loop: process.client && this.$screen.lt,
        enableSwiper: process.client && !this.$screen.lt,
        modules: [Navigation],
        navigation: {
          nextEl: ".analytics-box__nav .swiper-button-next",
          prevEl: ".analytics-box__nav .swiper-button-prev",
        },
      };
    },
  },
};
</script>

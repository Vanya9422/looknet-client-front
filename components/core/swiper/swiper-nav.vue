<template lang="pug">
  .swiper-nav(:class="Mods")
    .swiper-button.swiper-button-prev
    button-arrow.swiper-button.swiper-button-prev(v-if="notShowPrev" prev @click.prevent.native="$emit('prev')")
    button-arrow.swiper-button.swiper-button-next(v-if="notShowNext" @click.prevent.native="$emit('next')")

</template>

<script>
export default {
  props: {
    light: {
      type: Boolean,
      default: false,
    },
    notShowPrev: {
      type: Boolean,
      default: true,
    },
    notShowNext: {
      type: Boolean,
      default: true,
    }
  },

  computed: {
    Mods() {
      return {
        'swiper-nav_light': this.light
      }
    }
  }
}
</script>

<style lang="scss">
.swiper {

  &-nav {
    z-index: 200;
    display: flex;
  }

  &-button {
    &-next {
      margin-left: 10rem;
      @include large-tablet {
        margin-left: 6rem;
      }
    }
  }
}
</style>

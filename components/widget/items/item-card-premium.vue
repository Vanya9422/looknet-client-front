<template lang="pug">
  a.card-premium(v-if="item" target="_blank" :style="`color:${item.textColor};background:${item.bgColor}`" :href="item.link")
    client-only
      span.card-premium__wrap
        template(v-if="!$screen.lt")
          span.card-premium__img
            set-img(:src="item.img[1]" :defaultImg="require(`~/assets/img/card-premium__img1.png`)")
          span.card-premium__name.h4(  v-if="item.showMobileText" v-html="item.mobileTitle")
        template(v-else)
          span.card-premium__img
            set-img(:src="item.img[0]" :defaultImg="require(`~/assets/img/card-premium__img1.png`)")
          span.card-premium__name.h4( v-if="item.showDescText"  v-html="item.title")
        svg-icon.card-premium__arrow(name="arrowRight" :style="`stroke:${item.textColor || '#fff'}`")
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.card-premium {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 30rem 20rem;
  border-radius: 10px;
  margin-top: 15px;

  &:before {
    //content: '';
    //display: block;
    //position: absolute;
    //left: 0;
    //top: 0;
    //width: 100%;
    //height: 100%;
    //background: linear-gradient(239.83deg, #E0F0FF 10.5%, #FFE3D3 124.13%);
    //opacity: 0.7;
    //border-radius: 10px;
    //transform: matrix(-1, 0, 0, 1, 0, 0);
  }
  &__wrap {
    position: relative;
    text-align: center;
    display: block;
  }
  &__name {
    letter-spacing: 0.01em;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 190px;
    @include max-rows(22, 3);
    height:  3*22px;
    @include large-mobile {
      font-size: 14rem;
    }
  }
  &__img {
    display: block;
    margin-bottom: 20rem;
    img {
      max-height: 130rem;
      min-height: 60px;
      object-fit: cover;

    }

    @include large-mobile {
      margin-bottom: 17rem;
      img {
        max-height: 114rem;
      }
    }
  }
  &__arrow {
    width: 9rem;
    height: 11rem;
    display: block;
    margin: 20rem auto 0 auto;
    fill: none;
    stroke: $default;
    stroke-width: 2;

    @include large-mobile {
      margin-top: 10rem;
    }
  }
}
</style>

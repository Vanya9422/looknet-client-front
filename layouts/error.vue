<template lang="pug">
main.main
  .error
    .error__image
      img.error__image-img(:src="require('~/assets/img/404.png')")
    .error__block
      h3.error__title Sorry something went wrong.
      h3.error__title Page not found
      nuxt-link(to="/")
        button.error__button Main page
</template>

<script>
export default {
  props: ["error"],
};
</script>
<style lang="scss" scoped>
.error {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &__image {
    height: calc(100% - 130px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
    bottom: 60px;
  }
  &__title {
    font-size: 16.5rem;
    color: $gray;
    text-align: center;
    font-weight: 500;
  }
  &__button {
    background-color: $blue;
    width: 247rem;
    height: 60rem;
    border-radius: 10rem;
    font-size: 17rem;
    font-weight: 600;
    margin-top: 40rem;
    border-style: none;
    color: #fff;
  }
}
</style>

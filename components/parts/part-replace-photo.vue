<template lang="pug">
  .replace-photo
    .replace-photo__img(v-if="img || imgDefault")
      set-img(img-class="object-fit" :src="img" :default-img="require(`~/assets/img/${imgDefault}`)")
    .replace-photo__buttons.flex
      button-primary.replace-photo__btn(blue icon="penEdit" )
        input(type="file" :name="name"  ref="file" @change="getFileObject")
        | Replace Photo
      button-primary.replace-photo__btn(gray square icon="close")
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ""
    },
    imgDefault: {
      type: String,
      default: "contacts__img.jpg"
    },
    name: {
      type: String,
      default: "pageBg"
    },
  },
  methods:{
    getFileObject() {
      const input = this.$refs.file
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => this.$emit('change', e.target.result);
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
}
</script>

<style lang="scss">
.replace-photo {
  &__img {
    position: relative;
    overflow: hidden;
    border-radius: 20rem;
    padding-top: div( 460, 874 ) * 100%;

    @include large-mobile {
      border-radius: 7px;
      padding-top: div( 202, 345 ) * 100%;
    }
  }

  &__buttons {
    margin-top: 20rem;
    @include large-mobile {
      margin-top: 10rem;
    }
  }

  &__btn {
    &:not(:last-child) {
      margin-right: 15rem;
    }

    position: relative;
    input{
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }

    @include large-mobile {
      &:not(:last-child) {
        margin-right: 5rem;
      }
    }
  }

}
</style>
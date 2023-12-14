<template lang="pug">
  .button-file
      input.button-file__input(:name="name" :accept="accept" ref="files" :id="id !== '' ? id : 'files'" type="file" multiple @change="getFileObject")
      .button-file__wrap
        svg-icon(name="clip" viewBox="0 0 24 24")

</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'file'
    },
    id: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      files: []
    }
  },
  watch:{
    files(val){
     this.$emit('changeFiles',val)
    }
  },
  methods: {
    getFileObject() {
      const files = this.$refs.files.files
      let arr = []

      const readFile = (index) => {
        let item = {}
        if (index >= files.length) {
          this.files = arr
          return;
        }
        let file = files[index];
        let reader = new FileReader();
        reader.onload = function (e) {
          item.file = e.target.result
          item.name = file.name
          readFile(index + 1)
        }
        arr.push(item)

        reader.readAsDataURL(file);
      }
      readFile(0);
    },

  }
}
</script>

<style lang="scss">
.button-file {
  position: relative;
  display: inline-flex;
  width: 64rem;
  height: 60rem;
  cursor: pointer;

  &:hover {
    .button-file {
      &__wrap {
        border-color: $blue;
      }
    }
  }

  @include large-mobile {
    width: 50rem;
    height: 50rem;
  }

  &__input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  &__wrap {
    width: 100%;
    height: 100%;
    border: 1px solid $light-gray;
    border-radius: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ease .15s;

    svg {
      width: 24rem;
      height: 24rem;
      fill: none;
      stroke: #9A9A9A;
      stroke-width: 1.5;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 22px 0 32px;
  }

  &__item {
    border: 1px solid #D2D2D7;
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;

    img {
      max-width: 30px;
      width: 100%;
      height: 30px;
      border-radius: 5px;
          object-fit: cover;
    }

    span {
      max-width: 140px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 6px;
    }
  }
  &__delete {
    min-width: 10px;
    max-width: 10px;
    height: 10px;
    fill: #6E6E73;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
      fill: #6E6E73;
    }
  }
  &__error{
    margin-top: 16px;
    margin-bottom: 25px;
    color: $red;
  }

}
</style>

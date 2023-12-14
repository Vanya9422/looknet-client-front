<template lang="pug">
.form-select-stars
  ul.form-select-stars__list.flex(:class="{'is-actived': result !== 0}")
    li.form-select-stars__list-item(
      v-for="n in maxScore"
      :class="{'is-actived': result === n}"
      @click="setActive(n)"
    )
      svg-icon(
        name="star"
        viewBox="0 0 16 16"
      )
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      maxScore: 5,
    };
  },
  computed: {
    result: {
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  },

  methods: {
    setActive(index){
      this.result = index
    }
  }
}
</script>
<style lang="scss">
.form-select-stars{
  --star-width: 43rem;
  --star-offset: 3rem;
  --star-default-color: #B5B5B5;
  --star-active-color: #556DEE;

  &__list {
    display: inline-flex;

    &:hover, &.is-actived{
      .form-select-stars{
        &__list{
          &-item{
            fill: var(--star-active-color);
          }
        }
      }
    }

    &:not(:hover){
      .form-select-stars{
        &__list{
          &-item{
            &.is-actived{
              & ~ .form-select-stars__list-item{
                fill: var(--star-default-color);
              }
            }
          }
        }
      }
    }

    &-item {
      cursor: pointer;
      display: block;
      position: relative;
      transition: ease .15s;
      width: var(--star-width);
      height: var(--star-width);
      fill: var(--star-default-color);

      padding-left: var(--star-offset);
      padding-right: var(--star-offset);



      &:hover{
        & ~ .form-select-stars__list-item{
          fill: var(--star-default-color);
        }
      }
    }
  }
}
</style>

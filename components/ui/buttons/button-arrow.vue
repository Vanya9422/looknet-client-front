<template lang="pug">
  component.button-arrow(
    :is="to !== '' ? 'NuxtLink' : 'button'"
    :to="to !== '' ? to : false"
    :class="Mods"
  )
    svg-icon(name="arrowRight")

</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: ""
    },
    prev: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    Mods() {
      return {
        'button-arrow_prev': this.prev,
      }
    }
  }
}
</script>

<style lang="scss">
.button-arrow {
  border: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  cursor: pointer;
  width: 40rem;
  height: 40rem;
  border: 1px solid $light-gray;
  border-radius: 10rem;
  padding-left: 2rem;
  @include  min-large-desktop{
    width: 50rem;
    height: 50rem;
  }

  &_prev {
    padding-right: 2rem;
    padding-left: 0;

    svg {
      transform: rotate(180deg);
    }
  }

  svg {
    fill: none;
    stroke: $default;
    width: 14rem;
    height: 11rem;
    stroke-width: 2;
  }

}
</style>
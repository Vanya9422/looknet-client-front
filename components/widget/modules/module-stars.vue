<template lang="pug">
ul.module-stars.flex
	li.module-stars__item(
		v-for="n in maxScore"
		:class="[n < lastStar == false || 'is-active', (n === lastStar && delimeter === 0) == false || 'is-active']"
	)
		svg-icon(
			name="star"
			viewBox="0 0 16 16"
		)

		span.module-stars__shadow(
			v-if="n === lastStar && delimeter !== 0"
			:style="`width: ${delimeter * 100}%`"
		)
			svg-icon.module-stars__inside(
				name="star"
				viewBox="0 0 16 16"
			)
</template>

<script>
export default {
  data() {
    return {
      maxScore: 5,
    };
  },

  props: {
    score: {
      type: [Number, String],
      default: 0,
    },
  },

  computed: {
    lastStar() {
      return Math.ceil(this.score);
    },

    delimeter() {
      return this.score - Math.floor(this.score);
    },

    isMobile() {
      return window.innerWidth <= 821 ? true : false;
    },

    mobileRate() {
      return (this.score / this.maxScore) * 100;
    },
  },
};
</script>

<style lang="scss">
.module-stars {
  --star-width: 14rem;

  gap: 2rem;

  &__item {
    display: block;
    position: relative;
    width: var(--star-width);
    height: var(--star-width);
    fill: #b5b5b5;

    &:not(:last-child) {
      margin-right: 2rem;
    }

    &.is-active {
      fill: $blue;
    }
  }

  &__shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__inside {
    max-width: none;
    width: var(--star-width);
    fill: $blue;
  }
}
</style>

<template lang="pug">
  .part-stars-rating.flex.flex_nowrap.flex_vertical(
    :class='modes'
    @click='handleStarsRatingClick'
  )
    .part-stars-rating__stars.flex.flex_nowrap.flex_vertical
      .part-stars-rating__stars-score {{ score }}
      module-stars.part-stars-rating__module-stars(:score='score')
    .part-stars-rating__count ({{ reviewCount }} {{ reviewLabel }})
</template>

<script>
import { declOfNum } from '~/assets/js/functions';

export default {
  props: {
    averageRating: {
      type: [String, Number],
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    disableModalTrigger: {
      type: Boolean,
      default: false,
    },

    isSimple: {
      type: Boolean,
      default: false,
    },

    isBtn: {
      type: Boolean,
      default: false,
    },

    value: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleStarsRatingClick() {
      if (!this.disableModalTrigger) {
        this.$emit("setModalReviewsState", true);
      }
    },
  },

  computed: {
    modes() {
      return {
        "part-stars-rating_simple": this.isSimple,
        "part-stars-rating_btn": this.isBtn,
        "part-stars-rating_disable-modal-trigger": this.disableModalTrigger,
      };
    },

    reviewLabel() {
      let text = "reviews";
      switch (this.$i18n.locale) {
        case 'en':
          if (this.reviewCount === 1) {
            text = "review";
          } else {
            text = "reviews";
          }
          break;
        case 'ru':
          const lablel = declOfNum(this.reviewCount, ['отзыв', 'отзыва', 'отзывов']);
          text = lablel;
          break;
        case 'es':
          if (this.reviewCount === 1) {
            text = "reseña";
          } else {
            text = "reseñas";
          }
          break;
      }
      return text;
    },

    score() {
      const score =
        typeof this.averageRating !== "number" &&
        !isNaN(Number(this.averageRating))
          ? Number(this.averageRating)
          : this.averageRating;

      return score;
    },
  },
};
</script>

<style lang="scss">
.part-stars-rating {
  font-size: 14rem;
  line-height: 1;
  letter-spacing: -0.42px;
  font-weight: 600;
  gap: 18rem;

  &:not(.part-stars-rating_disable-modal-trigger) {
    cursor: pointer;
  }

  &_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 10px;
    background: #F2F4F5;
    height: 50px;
    cursor: pointer;

    .part-stars-rating {
      &__count {
        flex-grow: 0;
        flex-basis: auto;
      }
    }
  }

  &_simple {
    gap: 10rem;

    @include large-mobile() {
      display: none;
    }

    .part-stars-rating {
      &__stars {
        gap: 10rem;
        flex-direction: row-reverse;
      }

      &__module-stars {
        .module-stars {
          &__item {
            &:not(:first-child) {
              display: none;
            }
          }

          &__shadow {
            width: 100% !important;
          }
        }
      }
    }
  }

  &__stars {
    gap: 12rem;
    flex: 0 0 auto;
  }

  &__count {
    flex: 1;
    min-width: 0;
    @extend %text-overflow;
  }
}
</style>

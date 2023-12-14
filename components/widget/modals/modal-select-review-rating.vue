<template lang="pug">
b-modal(
	id="modal-select-review-rating"
	ref="modal-select-review-rating"
	size="form"
	modal-class="modal-select-review-rating"
	body-class="modal-select-review-rating__body"
	header-class="modal-select-review-rating__header"
	footer-class="modal-select-review-rating__footer"
	centered
	:hide-footer="true"
)

	template(
		#modal-header='{ close }'
	)
		button-close.modal__close(
			@click.native='close()'
		)
	.modal-select-review-rating__item
		.modal-select-review-rating__title.h4
			| {{ translatedContent.selectTitle }}
		form-select.modal-select-review-rating__select(
			v-model="value.statusText"
			:items="value.dealStatus"
			default
			@input="handleStatusChange"
		)

	.modal-select-review-rating__item
		.modal-select-review-rating__title.h4
			| {{ translatedContent.starsTitle }}
		form-select-stars.modal-select-review-rating__stars(
			v-model='value.star'
		)

	button-primary.modal-select-review-rating__button-primary(
		:loading="value.isLoading"
		@click.native='handleModalSelectReviewRatingButtonClick'
		blue
		:disabled='!((value.status !== null && value.status >= 0 && value.status <= 3) && (value.star >= 1 && value.star <= 5))'
	)
		| {{ translatedContent.buttonPrimarySend }}
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    value: {
      type: Object,
      default: () => ({}),
    },

    translatedContent: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    handleStatusChange(dealStatus) {
      Object.keys(this.value.dealStatus).forEach((reviewDealStatusKey) => {
        if (this.value.dealStatus[reviewDealStatusKey] === dealStatus) {
          this.$emit("input", {
            ...this.value,
            status: Number(reviewDealStatusKey),
          });
        }
      });
    },
    handleModalSelectReviewRatingButtonClick() {
      this.$emit("submitFormReview");
    },
  },
};
</script>

<style lang="scss">
.modal-select-review-rating {
  &__item {
    &:not(:first-child) {
      margin-top: 50rem;
    }
  }

  &__title {
    text-align: center;
  }

  &__select {
    margin: 20rem auto 0;
    width: 100%;
    max-width: 355rem;
  }

  &__stars {
    margin: 20rem auto 0;
    width: fit-content;
  }

  &__button-primary {
    width: fit-content;
    max-width: 100%;
    min-width: 192rem;
    margin: 50rem auto 0;
    display: flex;

    @include large-mobile {
      margin-top: 30rem;
    }

    &.button-primary {
      display: flex;
    }
  }
}
</style>

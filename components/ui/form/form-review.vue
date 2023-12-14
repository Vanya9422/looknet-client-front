<template lang="pug">
div.form-review.flex.flex_column.flex_nowrap(
	:class="formReviewClasses"
)
	.form-review__content.css-scrollbar
		label.form-review__field-label
			textarea.form-review__field(
				:placeholder='translatedContent.placeholder'
				:value='value.comment'
				@input='handleFormReviewFieldInput'
				@focus='handleFormReviewFieldFocus'
			)
		.form-review__attachments.flex(
			v-if='getObjectLength(value.picturesUrls)'
		)
			.form-review__attachments-item(
				v-for='(photo, photoIndex) in value.picturesUrls'
				:key='photoIndex'
			)
				img.object-fit(
					:src="photo"
					alt
				)
				button-close.form-review__attachments-item-remove(
					@click.native='handleFormReviewAttachmentRemove(photoIndex)'
				)
	footer.form-review__footer.flex.flex_nowrap.flex_vertical
		button-primary.form-review__button-primary(
			blue
			:disabled='value.comment.length < 11'
			@click.native='handleFormReviewNextStep'
		)
			| {{ translatedContent.buttonPrimarySubmit }}
		form-attachment.form-review__form-attachment(
			v-model="value.pictures"
			name="pictures[]"
			accept=".png, .jpg, .jpeg, .webp"
			:translated-content='translatedContent.formAttachment'
		)
</template>

<script>
import { getObjectLength } from "~/assets/js/functions.js";

export default {
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
    getObjectLength,

    handleFormReviewFieldInput({ target }) {
      if (target.value.length > 10) {
        this.$emit("input", {
          ...this.value,
          errors: { ...this.value.errors, comment: [] },
        });
      }

      this.$emit("input", { ...this.value, comment: target.value });

      target.style.height = "auto";
      target.style.height = `${target.scrollHeight + 2}px`;
    },

    handleFormReviewFieldFocus() {
      this.$emit("input", { ...this.value, isFormReviewFocused: true });
    },

    handleFormReviewAttachmentRemove(photoIndexToRemove) {
      const formattedPictures = this.value.pictures.filter(
        (picture) => picture.name !== photoIndexToRemove
      );

      this.$emit("input", { ...this.value, pictures: formattedPictures });
    },

    handleFormReviewNextStep() {
      this.$emit("input", { ...this.value, isRatingSelection: true });
      this.$root.$emit("bv::show::modal", "modal-select-review-rating");
    },
  },

  computed: {
    formReviewClasses() {
      return {
        "is-focused": this.value.isFormReviewFocused,
      };
    },
  },
};
</script>

<style lang="scss">
.form-review {
  border-radius: 15rem;
  border: 1px solid #d2d2d7;
  height: 100%;
  height: 60rem;
  overflow: hidden;
  transition-property: height, border-color;
  transition-duration: 0.3s;
  transition-timing-function: linear;

  &.is-focused {
    height: 200rem;
    gap: 20rem;
    border-color: #556dee;

    @include large-mobile() {
      height: 260rem;
    }

    .form-review {
      &__content {
        margin-right: 12rem;
      }

      &__field {
        &-label {
          padding-bottom: 0;
          padding-right: 24px;
        }
      }

      &__footer {
        opacity: 1;
      }
    }
  }

  &:not(.is-focused) {
    .form-review {
      &__content {
        overflow: hidden;
        flex-shrink: 0;
      }

      &__footer {
        pointer-events: none;
      }
    }
  }

  &__content {
    max-height: 100%;

    &::-webkit-scrollbar-track {
      margin-top: 15px;
    }
  }

  &__field {
    border: none;
    resize: none;
    width: 100%;
    overflow: hidden;
    line-height: 1.1;
    font-size: clamp(16px, 16rem, 16rem);
    letter-spacing: -0.16px;
    font-weight: 500;

    &-label {
      display: block;
      width: 100%;
      padding: 20rem 36rem;
    }
  }

  &__attachments {
    margin-top: 20rem;
    gap: 18rem;
    padding: 0 24rem 0 36rem;

    @include large-tablet() {
      gap: 14rem;
      margin-top: 18rem;
    }

    @include large-mobile() {
      gap: 10rem;
      margin-top: 16rem;
    }

    &-item {
      flex: 0 0 auto;
      position: relative;
      width: 73rem;
      overflow: hidden;
      border-radius: 10rem;

      &::before {
        content: "";
        padding-top: 83.56%;
        display: block;
      }

      @include large-tablet() {
        width: 65rem;
      }

      @include large-mobile() {
        width: 57rem;
      }

      &-remove {
        position: absolute;
        top: 5rem;
        right: 5rem;
        width: 20rem;
        height: 20rem;

        @include large-mobile() {
          top: 3rem;
          right: 3rem;
          width: 16rem;
          height: 16rem;
        }

        svg {
          width: 10rem;
          height: 10rem;
          pointer-events: none;

          @include large-mobile() {
            width: 8rem;
            height: 8rem;
          }
        }
      }
    }
  }

  &__footer {
    margin-top: auto;
    gap: 20rem;
    padding: 0 36rem 20rem;
    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.3s;
    transition-timing-function: linear;
  }

  &__button-primary {
    &.button-primary {
      min-width: 120rem;
      height: 40rem;
      font-size: 12rem;
      letter-spacing: -0.36px;
    }
  }
}
</style>

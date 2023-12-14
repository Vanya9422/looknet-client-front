<template lang="pug">
b-modal(
	:id='`${modalId || "modal-reviews"}`'
	modal-class="modal-reviews"
	body-class="modal-reviews__body"
	content-class="modal-reviews__content"
	header-class="modal-reviews__header"
	size='reviews-size'
	:hide-footer="true"
	:visible='value'
	@show="handleModalOpen"
	@hide="handleModalHide"
	centered)
	template(#modal-header='{ close }')
		button-close.modal__close(@click.native='close()')
	module-user-info.modal-reviews__module-user-info(
		:fake='user.fake'
		:avatar="user.avatar",
		:name="user.name",
		:content="user.content",
		:about="user.about",
		:verified="user.verified",
		:rating_reviews="{isHidden: true}"
		vertical
	)
	.modal-reviews__feedback.flex.flex_nowrap.flex_vertical
		.modal-reviews__feedback-title
			| {{ getFeedbackTitle }}
		part-stars-rating.modal-reviews__part-stars-rating(
			v-if='user.rating_reviews'
			:average-rating='user.rating_reviews.average_rating'
			:review-count='user.rating_reviews.review_count'
			:disable-modal-trigger='true'
		)
	.modal-reviews__list.flex.flex_column.flex_nowrap.css-scrollbar.infinite-wrapper
		form-review.modal-reviews__form-review(
			v-if="USER && USER.id !== user.id"
			v-model='formData'
			v-click-outside='handleClickOutsideFormReview'
			:translated-content='content.formReview'
		)
		item-review.modal-reviews__item-review(
			v-for='(itemReview, itemReviewIndex) in reviewsList'
			v-if='itemReview.published'
			:key='itemReviewIndex'
			:review-content='itemReview'
			:content='content.itemReview'
			:show-complaint-button='user && USER && USER.id === user.id'
			@modalComplaintTriggered='handleModalComplaintTriggered'
		)
		client-only
			infinite-loading(
				v-if="!this.isReviewsListLoading && !REVIEWS_LOADED && reviewsList.length",
				force-use-infinite-wrapper=".infinite-wrapper"
				:distance="20"
				@infinite="infiniteHandler"
			)
				div(slot="no-results")
				div(slot="no-more")
				div(slot="spinner")
	modal-select-review-rating(
		v-model="formData"
		:translated-content='content.modalSelectReviewRating'
		@submitFormReview='handleSubmitFormReview'
	)
	modal-thank(:show-button="false" :desc="content.thank.desc" :title="content.thank.title")
	modal-complaint-refactor(
		v-model='modalComplaint'
		:content='content.modalComplaint'
		@sendModalComplaint='handleSendModalComplaint'
	)
</template>

<script>
import { serialize } from "object-to-formdata";
import { mapGetters, mapActions } from "vuex";

import { generateErrorMessage } from "~/assets/js/functions.js";
import ModalThank from "~/components/widget/modals/modal-thank.vue";

export default {
  components: { ModalThank },
  data() {
    return {
      locale: this.$i18n.locale,
      reviewsList: [],
      isReviewsListLoading: false,
      contentTranslations: {
        en: {
          modalReviews: {
            feedbackTitle: "Feedback",
            statusText: "Share your experience",
          },
          formReview: {
            placeholder: "Share your experience",
            buttonPrimarySubmit: "Send",
            formAttachment: {
              text: "Upload image",
              error: {
                format:
                  "You are allowed to upload only images (except gif, svg, avif formats)",
                size: "File size is too big",
              },
            },
          },
          modalSelectReviewRating: {
            selectTitle: "Choose your type of review",
            starsTitle: "Select your rating",
            buttonPrimarySend: "Send",
          },
          modalComplaint: {
            title: "Complaint",
            refusalsLabel: "Select the type of complaint",
            descriptionLabel: "Your comment",
            buttonPrimarySend: "Send",
            errorImageMessage: "Only 3 files are allowed to attach",
          },
          itemReview: {
            tooltipButton: "Complaint",
          },
          thank: {
            title: "Thank you",
            desc: "Thank you for leaving a review.",
          },
        },
        es: {
          modalReviews: {
            feedbackTitle: "Realimentación",
            statusText: "Comparte tu experiencia",
          },
          formReview: {
            placeholder: "Comparte tu experiencia",
            buttonPrimarySubmit: "Enviar",
            formAttachment: {
              text: "Subir imagen",
              error: {
                format:
                  "Solo puede cargar imágenes (excepto formatos gif, svg, avi)",
                size: "El tamaño del archivo es demasiado grande",
              },
            },
          },
          modalSelectReviewRating: {
            selectTitle: "Elige tu tipo de reseña",
            starsTitle: "Seleccione su calificación",
            buttonPrimarySend: "Enviar",
          },
          modalComplaint: {
            title: "Reclamación",
            refusalsLabel: "Seleccione el tipo de queja",
            descriptionLabel: "Tu comentario",
            buttonPrimarySend: "Enviar",
            errorImageMessage: "Solo se permiten adjuntar 3 archivos",
          },
          itemReview: {
            tooltipButton: "Reclamación",
          },
          thank: {
            title: "Thank you",
            desc: "Gracias por dejar un comentario.",
          },
        },
        ru: {
          modalReviews: {
            feedbackTitle: "Обратная связь",
            statusText: "Поделитесь своим опытом",
          },
          formReview: {
            placeholder: "Поделитесь своим опытом",
            buttonPrimarySubmit: "Отправить",
            formAttachment: {
              text: "Загрузить изображения",
              error: {
                format:
                  "Вам разрешено загружать только изображения (кроме форматов gif, svg, avi).",
                size: "Размер файла слишком велик",
              },
            },
          },
          modalSelectReviewRating: {
            selectTitle: "Выберите свой тип отзыва",
            starsTitle: "Выберите свой рейтинг",
            buttonPrimarySend: "Отправить",
          },
          modalComplaint: {
            title: "Жалоба",
            refusalsLabel: "Выберите тип жалобы",
            descriptionLabel: "Ваш комментарий",
            buttonPrimarySend: "Отправить",
            errorImageMessage: "Разрешается прикреплять только 3 файлов",
          },
          itemReview: {
            tooltipButton: "Жалоба",
          },
          thank: {
            title: "Спасибо",
            desc: "Спасибо за отзыв.",
          },
        },
      },
      formData: {
        star: 0,
        comment: "",
        advertise_id: this.advertiseId,
        status: null,
        statusText: null,
        dealStatus: [],
        picturesUrls: {},
        pictures: [],
        isLoading: false,
        isFormReviewFocused: false,
        isRatingSelection: false,
      },
      modalComplaint: {
        feedbackId: null,
        isModalOpened: false,
        isLoading: false,
        refusals: {
          types: [],
          active: {},
        },
        description: {
          name: "description",
        },
        files: {
          name: "refusals-attachments",
          id: "refusals-attachments",
          accept: "image/jpeg, image/png, image/webp, image/jpg",
          limit: 3,
        },
        data: {
          description: "",
          refusal_id: null,
          files: [],
        },
      },
    };
  },

  props: {
    advertiseId: {
      type: [Number, Boolean],
      default: null,
    },

    modalId: {
      type: String,
      default: "",
    },

    user: {
      type: Object,
      default: () => ({}),
    },

    value: {
      type: Boolean,
      default: false,
    },
  },

  async created() {
    if (!this.formData.dealStatus.length) {
      const { data } = await this.$axios.$options("/reviews");

      this.formData.dealStatus = data;
    }

    if (!this.modalComplaint.refusals?.types?.length) {
      const { data } = await this.$axios.$get(
        "/refusals?page=1&per_page=50&search=type:2"
      );

      this.modalComplaint.refusals.types = data;
    }
  },

  computed: {
    ...mapGetters({
      REVIEWS: "reviews/REVIEWS",
      REVIEWS_LOADED: "reviews/REVIEWS_LOADED",
      REVIEWS_USER_ID: "reviews/REVIEWS_USER_ID",
      USER: "user/USER",
    }),

    content() {
      this.$set(
        this.formData,
        "statusText",
        this.contentTranslations[this.locale]?.modalReviews?.statusText
      );
      return this.contentTranslations[this.locale];
    },

    getFeedbackTitle() {
      return this.content?.modalReviews?.feedbackTitle || "";
    },
  },

  methods: {
    ...mapActions({
      SET_USER_REVIEWS: "reviews/SET_USER_REVIEWS",
    }),

    showThan() {
      this.$root.$emit("bv::show::modal", "modal-thank");
    },

    async fetchReviews() {
      await this.SET_USER_REVIEWS({
        userId: this.user.id,
        fake: this.user?.fake?.isFake,
        advertiseId: this.advertiseId,
      });
    },

    async handleModalOpen() {
      if (this.user.id !== this.REVIEWS_USER_ID) {
        this.isReviewsListLoading = true;
        await this.fetchReviews();
        this.reviewsList = this.REVIEWS;
        this.isReviewsListLoading = false;
      } else {
        this.reviewsList = this.REVIEWS;
      }
    },

    handleModalHide() {
      this.$emit("setModalReviewsState", false);
    },

    async infiniteHandler($state) {
      if (!this.isReviewsListLoading) {
        await this.fetchReviews();

        if (this.REVIEWS_LOADED) {
          $state.complete();
        } else {
          $state.loaded();
        }
      }
    },

    handleClickOutsideFormReview({ target }) {
      if (
        !this.formData.comment.length &&
        !this.formData.pictures.length &&
        this.formData.isFormReviewFocused &&
        !this.formData.isRatingSelection &&
        ![...target.classList].find((classItem) =>
          classItem.includes("form-review")
        )
      ) {
        this.formData.isFormReviewFocused = false;
      }
    },

    handleSubmitFormReview() {
      const { star, comment, advertise_id, status, pictures } = this.formData;

      this.formData.isLoading = true;

      const FormData = serialize(
        { star, comment, advertise_id, status, pictures },
        {
          indices: true,
          allowEmptyArrays: true,
        }
      );

      this.$axios
        .$post("/reviews", FormData)
        .then(({ status }) => {
          if (status === "Success") {
            this.formData = {
              star: 0,
              comment: "",
              advertise_id: this.advertiseId,
              status: null,
              statusText:
                this.contentTranslations[this.locale].modalReviews.statusText,
              picturesUrls: {},
              pictures: [],
              isLoading: false,
              isFormReviewFocused: false,
            };

            this.$root.$emit("bv::hide::modal", "modal-select-review-rating");
            this.$nextTick(() => {
              this.$root.$emit("bv::show::modal", "modal-thank");
            });
          }
        })
        .catch((error) => {
          this.formData.isLoading = false;

          if (error?.response) {
            const errorMessage = generateErrorMessage(error);

            this.$toast.show(errorMessage, {
              duration: 3000,
              position: "top-right",
              type: "error",
            });
          }
        });
    },

    handleModalComplaintTriggered(id) {
      this.modalComplaint.feedbackId = id;
      this.modalComplaint.isModalOpened = true;
    },

    handleSendModalComplaint() {
      this.modalComplaint.isLoading = true;

      const FormData = serialize(this.modalComplaint.data, {
        indices: true,
      });

      this.$axios
        .$post(
          `/reviews/add-complaint/${this.modalComplaint.feedbackId}`,
          FormData
        )
        .then(({ status }) => {
          if (status === "Success") {
            this.modalComplaint.feedbackId = null;
            this.modalComplaint.isLoading = false;
            this.modalComplaint.isModalOpened = false;
            this.modalComplaint.refusals.active = {};
            this.modalComplaint.data = {
              description: "",
              refusal_id: null,
              files: [],
            };
          }
        })
        .catch((error) => {
          this.modalComplaint.isLoading = false;

          if (error?.response) {
            const errorMessage = generateErrorMessage(error);

            this.$toast.show(errorMessage, {
              duration: 3000,
              position: "top-right",
              type: "error",
            });
          }
        });
    },
  },

  watch: {
    "formData.pictures"(newPicturesValue, oldPicturesValue) {
      const formattedPicturesUrls = {};

      if (newPicturesValue.length === 0) {
        this.formData.picturesUrls = {};
      }

      newPicturesValue.forEach((newPictureFile) => {
        if (newPicturesValue.length > oldPicturesValue.length) {
          if (!this.formData.picturesUrls[newPictureFile.name]) {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(newPictureFile);

            fileReader.onload = () => {
              this.formData.picturesUrls = {
                ...this.formData.picturesUrls,
                [newPictureFile.name]: fileReader.result,
              };
            };
          }
        } else {
          if (this.formData.picturesUrls[newPictureFile.name]) {
            formattedPicturesUrls[newPictureFile.name] =
              this.formData.picturesUrls[newPictureFile.name];
          }
        }
      });

      if (newPicturesValue.length < oldPicturesValue.length) {
        this.formData.picturesUrls = formattedPicturesUrls;
      }
    },
  },
};
</script>

<style lang="scss">
.modal-reviews {
  &.modal {
    @include min-large-mobile() {
      overflow: hidden !important;
      padding: 20px 0 !important;
    }

    @include large-mobile() {
      padding-top: 140rem !important;
    }
  }

  &__content {
    max-height: 100%;
    overflow: hidden;
    margin: auto;
    display: flex;
    flex-flow: column nowrap;
    padding-right: 0;

    @include large-mobile() {
      margin: auto 0 0;
    }
  }

  &__body {
    display: flex;
    flex-flow: column nowrap;
    max-height: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__module-user-info {
    flex: 0 0 auto;
    padding-right: 60rem;

    @include small-tablet() {
      padding-right: 30rem;
    }

    @include large-mobile() {
      padding-right: 15rem;
    }

    .user-info {
      @include large-mobile() {
        justify-content: flex-start;
      }

      &__confimed {
        margin-left: 40rem;
      }
    }
  }

  &__feedback {
    flex: 0 0 auto;
    margin-top: 10rem;
    gap: 18rem;
    letter-spacing: -0.52px;
    line-height: 1;
    font-size: 26rem;
    padding-right: 60rem;

    @include large-tablet() {
      margin-top: 5rem;
      font-size: 23rem;
    }

    @include small-tablet() {
      padding-right: 30rem;
    }

    @include large-mobile() {
      padding-right: 15rem;
      font-size: 20rem;
      letter-spacing: -0.4px;
    }
  }

  &__part-stars-rating {
    flex: 1;
    min-width: 0;
    font-size: inherit;
    letter-spacing: -0.78px;

    @include large-tablet() {
      font-size: 20rem;
    }

    @include large-mobile() {
      font-size: 14rem;
      letter-spacing: -0.42px;
    }

    .part-stars-rating {
      &__stars {
        &-score {
          color: #f1ae00;

          @include min-large-mobile() {
            color: $blue;
          }
        }
      }

      &__module-stars {
        --star-width: 21rem;

        @include large-tablet() {
          --star-width: 18rem;
        }

        @include large-mobile() {
          --star-width: 14rem;
        }
      }
    }
  }

  &__list {
    margin-top: 34rem;
    gap: 32rem;
    flex: 1;
    margin-right: 20rem;
    padding-right: 40rem;
    min-height: 0;

    @include small-tablet() {
      margin-right: 10rem;
      padding-right: 20rem;
    }

    @include large-mobile() {
      margin-right: 5rem;
      padding-right: 10rem;
    }
  }

  &__form-review {
    flex: 0 0 auto;
  }

  &__item-review {
    &:not(:last-child) {
      margin-bottom: 4rem;
    }
  }
}
</style>

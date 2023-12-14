<template lang="pug">
b-modal(
	id="modal-complaint-refactor"
	ref="modal-complaint-refactor"
	size="form"
	modal-class="modal-complaint-refactor-modal"
	body-class="modal-complaint-refactor__body"
	header-class="modal-complaint-refactor__header"
	footer-class="modal-complaint-refactor__footer"
	centered
	:visible='value.isModalOpened'
	:hide-footer="true"
	@hide='handleModalComplainHide'
)
	template(
		#modal-header='{ close }'
	)
		button-close.modal__close(
			@click.native='close'
		)
	form(
		ref='form-modal-complaint'
	)
		h3.h3(
			v-if='content.title'
		)
			| {{ content.title }}
		.modal-complaint-refactor__fields
			.modal-complaint-refactor__field(
				v-if='getObjectLength(value.refusals)'
			)
				.modal-complaint-refactor__label.h4(
					v-if='content.refusalsLabel'
				)
					| {{ content.refusalsLabel }}
				form-select-refusal.modal-complaint-refactor__select(
					v-model="value.refusals.active"
					:items="value.refusals.types"
					:selected="content.refusalsLabel"
					default
					@input='handleRefusalSelectChange'
				)
			.modal-complaint-refactor__field(
				v-if='getObjectLength(value.description)'
			)
				.modal-complaint-refactor__label.h4(
					v-if='content.descriptionLabel'
				)
					| {{ content.descriptionLabel }}
				form-input.modal-complaint-refactor__input(
					v-model="value.data.description"
					:name="value.description.name"
					:placeholder="content.descriptionLabel"
					textarea
				)
		ul.button-file__list(
			v-if="value.data.files.length> 0 && getObjectLength(value.files)"
		)
			li.button-file__item(
				v-for="(item,index) in value.data.files"
				:key="index"
			)
				set-img(
					:src="item.file ? item.file : require('~/assets/img/file.svg')"
					:default-img="item.file ? item.file : require('~/assets/img/file.svg')"
				)
				span
					| {{item.name}}
				.button-file__delete(
					@click.prevent="handleDeleteAttachedFile(index)"
				)
					svg-icon(
						name="closeBig"
						viewBox="0 0 14 14"
					)
		.button-file__error(
			v-if="value.data.files.length === value.files.limit"
		)
			| * {{ content.errorImageMessage }}
		.modal-complaint-refactor__bottom.flex.flex_vertical.flex_justify
			.modal-complaint-refactor__buttons.flex
				button-primary.modal-complaint-refactor__btn-send(
					type='button'
					:loading="value.isLoading"
					:disabled='value.data.description && value.data.description.length < 8'
					@click.native="handleModalComplaintSend"
					blue
				)
					| {{ content.buttonPrimarySend }}
				button-file.modal-complaint-refactor__btn-file(
					v-if='getObjectLength(value.files)'
					:class='modalComplaintButtonFileModes'
					:name="value.files.name"
					:id="value.files.id"
					:accept='value.files.accept'
					@changeFiles="handleChangeAttachedFile"
				)

</template>
<script>
import inputMultiple from "@/mixins/inputMultiple";
import { getObjectLength } from "~/assets/js/functions";

export default {
  data() {
    return {
      files: [],
    };
  },

  props: {
    value: {
      type: Object,
      default: () => ({}),
    },

    content: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    modalComplaintButtonFileModes() {
      return {
        "is-disabled": this.value.data.files.length === this.value.files.limit,
      };
    },
  },

  mixins: [inputMultiple],

  watch: {
    files() {
      this.$emit("input", {
        ...this.value,
        data: { ...this.value.data, files: this.dt.files },
      });
    },
  },

  methods: {
    getObjectLength,

    handleModalComplainHide() {
      this.$emit("input", {
        ...this.value,
        isModalOpened: false,
      });
    },

    handleDeleteAttachedFile(index) {
      this.deleteItem(index, this.value.files.id);
    },

    handleChangeAttachedFile() {
      this.changeFiles(this.value.files.id);
    },

    handleRefusalSelectChange({ id }) {
      this.$emit("input", {
        ...this.value,
        data: { ...this.value.data, refusal_id: id },
      });
    },

    handleModalComplaintSend() {
      this.$emit("sendModalComplaint");
    },
  },
};
</script>

<style lang="scss">
.modal-backdrop,
.modal-open .modal.modal-complaint-refactor {
  padding-left: 0 !important;

  .modal-content {
    @include large-mobile {
      width: 100vw;
      bottom: 0;
      z-index: 1000;
      margin: 0;
      border-radius: 15rem 15rem 0 0;
      padding-bottom: 20px;
    }
  }
}

.modal-complaint-refactor {
  .modal-complaint-refactor__label {
    font-weight: 400;
  }

  @include large-mobile {
    padding-left: 15px !important;
    .modal-content {
      padding-bottom: 0rem;
      border-radius: 15rem;
    }
    .modal-form {
      align-items: flex-end;
    }
  }

  &__field {
    margin-top: 40rem;

    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__label {
    margin-bottom: 15rem;

    @include large-mobile {
      margin-bottom: 10rem;
    }
  }

  &__bottom {
    margin-top: 40rem;

    @include large-mobile {
      margin-top: 30rem;
    }
  }

  &__btn {
    &-send {
      font-size: 14rem;
      font-weight: 400;
      min-width: 190rem;
    }

    &-file {
      margin-left: 10rem;

      &.is-disabled {
        opacity: 0.6;
        cursor: not-allowed;

        &:hover {
          .button-file__wrap {
            border-color: #d2d2d7;
          }
        }

        > * {
          pointer-events: none;
        }
      }
    }

    @include large-mobile {
      &-send {
        min-width: 160rem;
      }
    }
  }

  &__checkbox {
    &.error {
      color: inherit;
      animation: my-animation 3s;
    }

    @include large-mobile {
      margin-top: 20rem;
      width: 100%;
    }
  }
}

@keyframes my-animation {
  0% {
    color: $red;
  }
  100% {
    color: $red;
  }
}
</style>

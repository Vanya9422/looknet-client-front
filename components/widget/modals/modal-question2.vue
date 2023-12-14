<template lang="pug">
	b-modal(
		id="modal-question2"
		size="question-size"
		modal-class="modal-question"
		body-class="modal-question__body"
		header-class="modal-question__header"
		footer-class="modal-question__footer"
		centered
	)

		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')

		h3.modal-question__title.h3 {{ title }}?
		.modal-question__desc.p(v-html="desc")

		template(#modal-footer='{ close }')
			.modal-question__buttons.flex
				button-primary.modal-question__btn(gray @click.native='close()') {{ content.remove }}
				button-primary.modal-question__btn(blue @click.native='close()') {{ content.draft }}

</template>
<script>
export default{
	props: {
    content: {
      type: Object,
      default: () => {}
    },
		title: {
			type: String,
			default: 'Save as a draft?'
		},
		desc: {
			type: String,
			default: 'You leave the ad creation page. <br>Save your ad as a draft?'
		},
	}
}
</script>
<style lang="scss">
.modal-question {
	padding: 0;
	.modal-content {
		padding: 60rem;
	}
	@include large-mobile {
		.modal-content {
			border-radius: 10rem 10rem 0 0;
			padding: 20rem 15rem;
		}
	}
	&__title {
		font-family: 'Atyp Display';
		@include large-mobile {
			font-weight: 500;
		}
	}
	&__desc {
		margin-top: 15rem;
		max-width: 430rem;
		line-height: 1.3;
		@include large-mobile {
			font-weight: 500;
		}

		@include large-mobile {
			font-size: 16rem;
			margin-top: 20rem;
		}
	}
	&__footer {
		padding: 0;
		border: 0;
		margin-top: 30rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	&__btn {
		min-width: 147rem;
		&:not(:last-child) {
			margin-right: 10rem;
		}
		@include large-mobile {
			width: 100%;
			&:not(:last-child) {
				margin-right: 0;
				margin-top: 5rem;
			}
		}
	}
	&__checkbox {
		@include large-mobile {
			font-size: 17rem;
			margin-bottom: 30rem;
		}
	}
	&__buttons {
		@include large-mobile {
			width: 100%;
			flex-direction: column-reverse;
		}
	}
}
</style>

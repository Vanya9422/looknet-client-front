<template lang="pug">
	b-modal(
		id="modal-safety"
		size="notification-size"
		modal-class="modal-safety"
		body-class="modal-safety__body"
		header-class="modal-safety__header"
		footer-class="modal-safety__footer"
		centered
	)

		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')
		.modal-safety__preview
			.modal-safety__img
				set-img(:default-img="require(`~/assets/img/${img}`)")
		.modal-safety__title.h4 {{title}}
		.modal-safety__content.content
			slot

		template(#modal-footer='{ close }')
			button-primary.modal-safety__cancel(border @click.native='close()') {{ POPUP_GLOBAL.cancel }}

</template>

<script>
import { mapGetters } from 'vuex'

export default{
	props: {
		img: {
			type: String,
			default: 'safety__img.svg'
		},
		title: {
			type: String,
			default: 'For your safety'
		},
	},
	computed: {
		...mapGetters({
			POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
		})
	},
}
</script>

<style lang="scss">
.modal-safety {
	.modal-content {
		padding: 60rem 50rem 50rem 50rem;
	}

	.modal__close {
		right: 15rem;
		top: 15rem;
	}

	@include large-mobile {
		padding: 0!important;
		.modal__close {
			display: none;
		}
		.modal-content {
			padding: 15rem 15rem 20rem 15rem;
		}
	}

	&__preview {
		position: relative;
		overflow: hidden;
		height: 160rem;
		border-radius: 20rem;
		border: 1px solid $light-gray;
		@include large-mobile {
			border-radius: 10rem;
			height: 110rem;
		}
	}
	&__img {
		width: 566rem;
		position: absolute;
		left: 23rem;
		top: -54rem;

		@include large-mobile {
			width: 390rem;
			left: 15rem;
			top: -38rem;
		}
	}

	&__title {
		margin-top: 30rem;
		font-family: 'Gilroy';
		font-weight: 600;

		@include large-mobile {
			margin-top: 20rem;
			font-size: 20rem;
		}
	}

	&__content {
		margin-top: 20rem;
		color: $gray;
		min-height: 190rem;
		line-height: 1.3;

		@include large-mobile {
			margin-top: 15rem;
		}
	}

	&__footer {
		padding: 0;
		border: 0;
		justify-content: flex-start;
		margin-top: 30rem;
	}
	&__cancel {
		min-width: 160rem;
		@include large-mobile {
			width: 100%;
		}
	}
}
</style>

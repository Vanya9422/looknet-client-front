<template lang="pug">
	b-modal(
		id="modal-activated"
		size="activated-size"
		modal-class="modal-activated"
		body-class="modal-activated__body"
		header-class="modal-activated__header"
		footer-class="modal-activated__footer"
		centered
	)

		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')

		h3.modal-activated__title.h3 {{ title }}
		.modal-activated__desc.color-gray.h4
			slot

		template(#modal-footer='{ close }')
			.modal-activated__buttons
				button-primary.modal-activated__btn(blue @click.native='close()') {{ POPUP_GLOBAL.continue }}
				button-primary.modal-activated__btn.mobile-hidden(border @click.native='close()')
					span.color-gray {{ POPUP_GLOBAL.cancel }}
				button-primary.modal-activated__btn.mobile-visible(gray @click.native='close()')
					span.color-gray {{ POPUP_GLOBAL.cancel }}
			.modal-activated__text.color-gray The notification will close after 00:10
			//- // TODO перевод

</template>

<script>
import { mapGetters } from 'vuex'

export default{
	props: {
		title: {
			type: String,
			default: 'The ad is activated'
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
.modal-activated {
	.modal-content {
		padding: 60rem 50rem;
	}

	@include large-mobile {
		padding: 0!important;
		.modal-content {
			padding: 20rem 15rem 25rem 15rem;
		}
	}

	&__title {
		font-weight: 600;
	}

	&__desc {
		font-family: 'Gilroy';
		margin-top: 20rem;
		@include large-mobile {
			font-size: 16rem;
		}
	}

	&__footer {
		margin-top: 40rem;
		padding: 0;
		border: 0;
		display: block;
	}
	&__buttons {
		@include items(2, 5);
		@include large-mobile {
			@include items(1, 5);
		}
	}
	&__text {
		margin-top: 20rem;
		@include large-mobile {
			text-align: center;
			margin-top: 25rem;
		}
	}
}
</style>

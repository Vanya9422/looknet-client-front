<template lang="pug">
	b-modal(
		id="modal-refusal" 
		size="refusal-size" 
		modal-class="modal-refusal" 
		body-class="modal-refusal__body" 
		header-class="modal-refusal__header"
		footer-class="modal-refusal__footer"
		centered
		:hide-footer="true"
	)
	
		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')

		form.modal-refusal__form
			h3.modal-refusal__title.h3 {{ title }}
			.modal-refusal__field
				label.modal-refusal__label.h4 You have a criminal product
				form-select(value="Sent the url on video" default :items="['Sent the url on video','Sent the url on video 2','Sent the url on video 3']")
			.modal-refusal__field
				label.modal-refusal__label.h4 Sent the comment
				form-textarea(placeholder="Sent the comment" large)
			button-primary.modal-refusal__btn(blue) Send

</template>
<script>
export default{
	props: {
		title: {
			type: String,
			default: 'Choose the reason for refusal'
		},
	}
}
</script>
<style lang="scss">
.modal-refusal {
	.modal-content {
		padding: 60rem 50rem;
	}

	@include large-mobile {
		padding: 0!important;
		.modal-content {
			padding: 20rem 15rem 30rem 15rem;
		}
	}

	&__title {
		font-weight: 600;
		@include large-mobile {
			padding-bottom: 5rem;
		}
	}

	&__field {
		margin-top: 40rem;
		@include large-mobile {
			margin-top: 20rem;
		}
	}

	&__label {
		display: block;
		font-family: 'Gilroy';
		font-weight: 600;
		margin-bottom: 20rem;
		@include large-mobile {
			font-size: 16rem;
			margin-bottom: 10rem;
		}
	}

	&__btn {
		margin-top: 40rem;
		min-width: 192rem;
		@include large-mobile {
			width: 100%;
			margin-top: 20rem;
		}
	}

}
</style>
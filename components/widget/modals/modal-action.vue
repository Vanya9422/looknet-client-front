<template lang="pug">
	b-modal(
		id="modal-action" 
		size="users" 
		modal-class="modal-action" 
		body-class="modal-action__body" 
		header-class="modal-action__header"
		footer-class="modal-action__footer"
		centered
		:hide-footer="true"
	)
	
		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')
		h3.modal-panel__title.h3 {{ title }}
			.modal-panel__list
				slot

</template>
<script>
export default{
	props: {
		title: {
			type: String,
			default: 'Select an action'
		},
	}
}
</script>
<style lang="scss">
.modal-action {
	padding: 0;
	.modal-content {
		padding: 25rem 15rem;
	}

	&__title {
		font-weight: 600;
	}
	&__footer {
		padding: 0;
		border: 0;
		margin-top: 45rem;
	}

	&__btn {
		justify-content: flex-start;
		width: 100%;

		&.button-primary {
			justify-content: center;
		}
	}

	&__list {
		margin-top: 20rem;
	}
	&__item {
		&:not(:first-child) {
			margin-top: 10rem;
		}
	}
	&__cancel {
		width: 100%;
	}
}
</style>
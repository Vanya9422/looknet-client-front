<template lang="pug">
	b-modal(
		id="modal-user"
		size="users"
		modal-class="modal-user"
		body-class="modal-user__body"
		header-class="modal-user__header"
		footer-class="modal-user__footer"
		centered
	)

		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')
		h3.modal-user__title.h3 {{ title }}
		module-user-info.modal-user__head(
			:avatar="avatar"
			:name="name"
			:about="about"
			big
			edit
		)
		.modal-user__list
			.modal-user__item(v-for="(item, i) in list" :key="i")
				.modal-user__label.color-gray {{item.label}}
				.modal-user__text {{item.text}}
		template(#modal-footer='{ close }')
			.modal-user__buttons.flex
				button-primary.modal-user__btn(borderRed @click.native='close()') {{ buttonText }}
				button-primary.modal-user__btn(border @click.native='close()') {{ POPUP_GLOBAL.cancel }}

</template>
<script>
import { mapGetters } from 'vuex';

export default{
	props: {
		avatar: {
			type: String,
			default: "User3.jpg"
		},
		name: {
			type: String,
			default: "Alexandr Bairamov"
		},
		about: {
			type: String,
			default: "New Your, Rochester "
		},
		title: {
			type: String,
			default: 'Profile'
		},
		buttonText: {
			type: String,
			default: ''
		},
		list: {
			type: Array,
			default: () => ([
			]),
		},
	},
	computed: {
		...mapGetters({
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
		}),
	},
}
</script>
<style lang="scss">
.modal-user {
	padding: 0;
	.modal-content {
		padding: 20rem 15rem 25rem 15rem;
	}
	.modal__close {
		width: 34rem;
		height: 34rem;
	}

	&__title {
		font-weight: 500;
		font-family: 'Atyp Display';
	}
	&__footer {
		padding: 0;
		border: 0;
		margin-top: 20rem;
		display: block;
	}

	&__list {
		margin-top: 10rem;
	}
	&__item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18rem 0;
		font-size: 16rem;
		&:not(:first-child) {
			border-top: 1px solid $light-gray;
		}
	}
	&__cancel {
		width: 100%;
	}

	&__head {
		margin-top: 30rem;
	}

	&__buttons {
		@include items(2, 3);
	}
}
</style>

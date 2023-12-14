<template lang="pug">
	//- // TODO возможно стоит удалить этот компонент, т.к. он не используется
	b-modal(
		id="modal-category"
		size="category-size"
		modal-class="modal-category"
		body-class="modal-category__body"
		header-class="modal-category__header"
		footer-class="modal-category__footer"
		centered
	)

		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')
			.modal-category__head.flex.flex_vertical.flex_justify
				.modal-category__head-column
					.modal-category__desc(:class="`color-${color}`" v-if="switcher") {{level}}
					.modal-category__desc(:class="`color-${color}`" v-else) {{desc}}
					h3.modal-category__name.h3 {{name}}
				.modal-category__head-column
					button-switcher.modal-category__switcher(:items="switchers" blue name="correctModal" @change="tabs")

		.modal-category__container(v-if="switcher")
			.modal-category__box
				.modal-category__row.flex.flex_vertical
					.modal-category__column.modal-category__column_left
						label.modal-category__label.h3 Filters 1
					.modal-category__column.modal-category__column_right
						part-correct-field.modal-category__field(value="Size")
				.modal-category__question
					.modal-category__row.flex
						.modal-category__column.modal-category__column_left
							label.modal-category__question-label.h4.color-gray Ответы
						.modal-category__column.modal-category__column_right
							part-correct-field.modal-category__field(value="43" drag)
							part-correct-field.modal-category__field(value="43" drag)
							part-correct-field.modal-category__field(value="43" drag)
							button-primary.modal-category__question-btn(gray icon="plusBig") Add a question

		.modal-category__box-list(v-else)
			.modal-category__box
				.modal-category__row.flex.flex_vertical
					.modal-category__column.modal-category__column_left
						label.modal-category__label.h4 Category name
					.modal-category__column.modal-category__column_right
						form-input.modal-category__input(:value="name")
			.modal-category__box
				.modal-category__row.flex.flex_vertical
					.modal-category__column.modal-category__column_left
						label.modal-category__label.h4 Change category
					.modal-category__column.modal-category__column_right
						form-select.modal-category__select(default colors :items="categories" color="red" value="1 level")

		template(#modal-footer='{ close }')
			.modal-category__footer-row.flex.flex_justify
				.modal-category__footer-column
					button-primary.modal-category__footer-btn(icon="plusBig" blue v-if="switcher") New filters
				.modal-category__footer-column.flex
					button-primary.modal-category__footer-btn(gray v-if="switcher" @click.native='close()') Cancel
					button-primary.modal-category__footer-btn(gray icon="close" v-else @click.native='close()') Delete
					button-primary.modal-category__footer-btn(blue @click.native='close()') Save changes
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: 'red'
		},
		desc: {
			type: String,
			default: 'Edit'
		},
		name: {
			type: String,
			default: 'Category 1'
		},
		level: {
			type: String,
			default: '1 level'
		},
	},
	data(){
		return{
			switchers: [
				{
					value: 'Category',
					text: 'Category',
					checked: true
				},
				{
					value: 'Filters',
					text: 'Filters',
				}
			],
			switcher: false,
			categories: [
				{
					text: '1 level',
					color: 'red'
				},
				{
					text: '2 level',
					color: 'blue'
				},
				{
					text: '3 level',
					color: 'brown'
				},
				{
					text: '4 level',
					color: 'green'
				}
			]
		}
	},
	methods: {
		tabs() {
			this.switcher = !this.switcher;
		}
  	}
}
</script>

<style lang="scss">
.modal-category {
	@include large-mobile {
		padding: 0!important;
		.modal-content {
			padding: 20rem 15rem 25rem 15rem;
		}
	}

	&__name {
		font-family: 'Atyp Display';
		margin-top: 15rem;
	}

	&__switcher {
		.button-switcher__btn {
			min-width: 130rem;
		}
	}

	&__footer {
		display: block;
		margin-top: 40rem;
		padding: 0;
		border: 0;

		&-btn {
			min-width: 156rem;
			&:not(:last-child) {
				margin-right: 15rem;
			}
		}
	}

	&__body {
		margin-top: 40rem;
		min-height: 200rem;
	}

	&__container {
		padding-bottom: 20rem;
		margin-right: -40rem;
		padding-right: 37rem;
		overflow-x: hidden;
		overflow-y: auto;
		max-height: 60vh;
		&::-webkit-scrollbar {
			width: 3px;
		}
		&::-webkit-scrollbar-track {
			background: rgba(#D2D2D7, 0.3);
		}
		&::-webkit-scrollbar-thumb {
			background: $blue;
		}
	}

	&__label {
		font-family: 'Gilroy';
		font-weight: 600;
	}

	&__row {
		flex-wrap: nowrap;
	}

	&__column {
		&_left {
			width: 205rem;
			min-width: 205rem;
		}
		&_right {
			width: 100%;
		}
	}

	&__box {
		&:not(:first-child) {
			margin-top: 20rem;
		}
	}

	&__select {
		.select__head {
			color: $default;
		}
	}

	&__field {
		&:not(:first-child) {
			margin-top: 15rem;
		}
	}

	&__question {
		margin-top: 35rem;
		padding-bottom: 15rem;
		&-label {
			font-family: 'Gilroy';
			padding-top: 15rem;
		}
		&-btn {
			min-width: 185rem;
			margin-top: 20rem;
			margin-left: 29rem;
		}
	}

}
</style>

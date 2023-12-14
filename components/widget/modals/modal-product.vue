
<!-- // TODO возможно стоит удалить этот компонент, т.к. он не используется -->
<template lang="pug">
b-modal(
	id="modal-product"
	size="product-size"
	modal-class="modal-product"
	body-class="modal-product__body"
	header-class="modal-product__header"
	footer-class="modal-product__footer"
	centered
	:hide-footer="true"
)

	template(#modal-header='{ close }')
		button-close.modal__close(@click.native='close()')
	.modal-product__row
		.modal-product__column.modal-product__column_left
			.modal-product__container
				h2.modal-product__title.mobile-visible.h2 {{title}}

				part-single-gallery.modal-product__gallery

				part-single-box.modal-product__box

				part-single-content.modal-product__content

				part-single-map.modal-product__map(
					:coordinates="{ latitude:DETAIL.latitude, longitude:DETAIL.longitude }"
					:hideAddress="!!DETAIL.hide_address"
				)

		.modal-product__column.modal-product__column_right
			.modal-product__sidebar
				.modal-product__action
					button-primary.modal-product__btn-action(icon="check" blue v-b-modal.modal-activated) Active
					button-primary.modal-product__btn-action(icon="close" red v-b-modal.modal-refuse) Refuse
					button-primary.modal-product__btn-action(icon="dots" gray v-b-modal.modal-product-action)
				.modal-product__buttons
					button-primary.modal-product__btn(icon="user" gray v-b-modal.modal-activated) Check other advertises
					button-primary.modal-product__btn(icon="grid2" gray v-b-modal.modal-activated) Change categories
				.modal-product__sidebar-bottom
					button-primary.modal-product__btn(icon="danger" border v-b-modal.modal-activated) Ban this person

</template>
<script>
import {mapGetters} from 'vuex'
export default{
	props: {
		title: {
			type: String,
			default: 'Advertisement preview'
		},
	},
  computed: {
    ...mapGetters({
      DETAIL: 'product/DETAIL',
    })
  },
}
</script>
<style lang="scss">
.modal-product {

	overflow: hidden;

	@include large-tablet {
		.modal-content {
			padding: 60rem 30rem;
		}
	}

	@include large-mobile {
		padding: 0!important;
		overflow: hidden !important;
		.modal-content {
			padding: 20rem 15rem 0 15rem;
			height: 90vh;
			display: flex;
		}
	}


	&__row {
		display: flex;

		@include large-tablet {
			flex-wrap: wrap;
		}

		@include large-mobile {
			display: flex;
			flex-direction: column;
			position: relative;
			height: 100%;
		}
	}

	&__column {
		&_left {
			width: calc(100% - 375rem );
		}
		&_right {
			width: 375rem;
			padding-left: 35rem;
			position: relative;
		}

		@include large-tablet {
			&_left {
				width: 100%;
			}
			&_right {
				width: 100%;
				padding-left: 0;
				margin-top: 40rem;
			}
		}

		@include large-mobile {
			&_left {
				flex: 1 1 auto;
				position: relative;
			}
			&_right {
				padding: 15rem;
				margin: 0 -15rem;
				border-top: 1px solid $light-gray;
				width: calc( 100% + 30rem );
			}
		}
	}

	&__container {
		@include large-mobile {
			position: absolute;
			left: 0;
			top: 0;
			width: calc( 100% + 40px );
			height: 100%;
			overflow-x: hidden;
			overflow-y: auto;
			padding-right: 40px;
		}
	}

	&__action {
		@include items(2, 5);
		display: flex;

		@include large-mobile {
			@include items(2, 3);
		}
	}

	&__buttons {
		margin-top: 12rem;
		@include large-mobile {
			display: none;
		}
	}

	&__btn {
		width: 100%;
		&:not(:first-child) {
			margin-top: 10rem;
		}

		@include large-mobile {
			&-action {
				&:last-child {
					width: 25%;
				}
			}
		}
	}

	&__sidebar {
		&-bottom {
			margin-top: 20rem;
			padding-top: 20rem;
			border-top: 1px solid $light-gray;
		}
		@include large-mobile {
			&-bottom {
				display: none;
			}
		}
	}

	&__box {
		margin-top: 44rem;

		@include large-mobile {
			margin-top: 20rem;
		}
	}

	&__content {
		margin-top: 40rem;
		@include large-mobile {
			margin-top: 30rem;
		}
	}

	&__map {
		margin-top: 50rem;
		padding-top: 50rem;
		border-top: 1px solid $light-gray;
		@include large-mobile {
			margin-top: 30rem;
			padding-top: 30rem;
			padding-bottom: 30rem;
		}
	}

	&__gallery {
		@include small-tablet {
			.single-gallery {
				&__slider {
					margin-left: 0;
					margin-right: 0;
					width: 100%;
					margin-bottom: 0;
					border-radius: 6px;
				}
			}
		}

		@include large-mobile {
			margin-top: 15rem;
		}
	}

}
</style>

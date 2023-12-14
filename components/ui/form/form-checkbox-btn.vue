<template lang="pug">
	label.checkbox-btn
		input.checkbox-btn__input(type="checkbox" :value="value" :name="name" @change="$emit('change')")
		span.checkbox-btn__wrap
			span.checkbox-btn__text {{ value }}
			span.checkbox-btn__icon
				svg-icon(name="close")
				svg-icon(name="check")

</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: 'name'
		},
	},
}
</script>

<style lang="scss">
.checkbox-btn {
	line-height: 1;
	display: block;
	&:hover {
		.checkbox-btn {
			&__btn {
				color: $blue;
				background: #F5F5F7;
			}
		}
	}
	&__input {
		display: none;

		&:checked + .checkbox-btn {
			&__wrap {
				color: $blue;
				font-weight: 600;
				background: #F5F5F7;
				.checkbox-btn__icon {
					opacity: 1;
					visibility: visible;
				}
			}
		}

		@include large-mobile {
			&:checked + .checkbox-btn {
				&__wrap {
					background: none;
					color: $blue;
					.checkbox-btn__icon {
						border-color: $blue;
						background: $blue;
						svg {
							opacity: 1;
						}
					}
				}
			}
		}
	}
	&__wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rem;
		transition: ease .2s;
		border-radius: 5px;
		cursor: pointer;

		@include large-mobile {
			padding: 0 7rem 0 0;
			background: none;
			font-weight: 600;
		}
	}
	&__icon {
		width: 20rem;
		height: 20rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-left: 15rem;
		stroke: #556DEE;
		stroke-width: 2;
		stroke-linecap: square;
		margin-right: -4rem;
		transition: ease .2s;
		opacity: 0;
		visibility: hidden;
		svg {
			width: 10rem;
			height: 9rem;
			&:nth-child(2) {
				display: none;
			}
		}

		@include large-mobile {
			width: 15rem;
			height: 15rem;
			visibility: visible;
			opacity: 1;
			border: 1px solid $light-gray;
			border-radius: 3px;
			margin-right: 0;
			svg {
				opacity: 0;
				&:first-child {
					display: none;
				}
				&:nth-child(2) {
					display: block;
					width: 9rem;
					height: 8rem;
					fill: none;
					stroke: #fff;
					transition: ease .12s;
					stroke-width: 2;
				}
			}
		}
	}

	@include large-mobile {
		font-size: 14rem;
		line-height: 1;
		&:hover {
			.checkbox-btn {
				&__btn {
					color: $default;
					background: none;
				}
			}
		}
	}
}
</style>
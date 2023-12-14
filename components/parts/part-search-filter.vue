<template lang="pug">
	form.search-filter(action="#")
		.search-filter__fields
			slot
		.search-filter__btn-wrap
			button-primary.search-filter__btn(blue :disabled="disabled") Search
</template>

<script>
export default {
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
	},
	mounted() {
    if (!process.client) return;
		document.querySelector(".search-filter__field .input__field").addEventListener('keyup', function () {
			document.querySelector(".search-filter__btn").removeAttribute('disabled');
		})
	}
}
</script>

<style lang="scss">
.search-filter{
	display: flex;
	height: 74rem;

	@include large-tablet {
		flex-wrap: wrap;
		height: auto;
	}

	@include small-tablet {
		display: none;
	}
	&__fields {
		border: 1px solid $light-gray;
		display: flex;
		height: 100%;
		width: 100%;
		margin-right: 10rem;
		border-radius: 10rem;

		@include large-tablet {
			margin-right: 0;
		}

		@include large-tablet {
			height: 74rem;
		}
	}

	&__field {
		height: 100%;
		font-size: 17rem;
		width: 100%;
		position: relative;
		.select {
			&__head {
				font-size: 17rem;
				padding: 0 20rem;
				width: 100%;
				border: 0;
			}
			&__wrap {
				width: 100%;
			}
			&__list {
				width: 100%;
			}
		}
		.input {
			&__field {
				height: 100%;
				border: 0;
			}
		}
		&:not(:first-child) {
			&:before {
				content: '';
				display: block;
				position: absolute;
				left: 0;
				top: 50%;
				height: 28rem;
				width: 1px;
				margin-top: -14rem;
				background: $light-gray;
			}
		}
		@include large-tablet {
			font-size: 16rem;
			.select {
				&__head {
					font-size: 16rem;
				}
			}
			.input {
				&__field, &__label {
					font-size: 16rem;
				}
			}
			&.input_sucsess {
				.input {
					&__label {
						font-size: 14rem;
					}
				}
			}
		}
	}

	&__btn {
		padding: 0 23rem;
		height: 100%;
		position: relative;

		@include large-tablet {
			height: 60rem;
			width: 100%;
			&-wrap {
				width: 33.33%;
				margin-top: 10rem;
			}
		}
	}
}
</style>

<template lang="pug">
	span.button-category(  :class="Mods")
		span.button-category__wrap
			span.button-category__img(v-if="img")
				set-img(:src="img" :default-img="img")
			span.button-category__icon(v-else)
					svg-icon(name="grid")
			span.button-category__text
				span.button-category__title {{ text || PAGE_HOME.allCategories }}
				span.button-category__counter.color-blue(v-if="counter") ({{counter}})
				span.button-category__desc(v-if="desc") {{desc}}
		svg-icon.button-category__arrow(name="arrowRight")
		span.button-category__edit.p(v-if="edit") {{editText}}
</template>

<script>
import { mapGetters } from "vuex";

export default{
	props: {
		img: {
			type: String,
			default: ""
		},
		to: {
			type: String,
			default: "#"
		},
		text: {
			type: String,
		},
		desc: {
			type: String,
			default: ""
		},
		editText: {
			type: String,
			default: "edit"
		},
		counter: {
			type: Number,
			default: null
		},
		border: {
			type: Boolean,
			default: false
		},
		edit: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		...mapGetters({
      PAGE_HOME: "pages/PAGE_HOME",
		}),
		Mods(){
			return {
				'button-category_border': this.border,
				'button-category_edit': this.edit,
			}
		}
	}
}
</script>

<style lang="scss">
.button-category{

	@include min-large-mobile {
		display: flex;
		background: #F4F3F4;
		align-items: center;
		justify-content: space-between;
		padding: 5rem 20rem 5rem 15rem;
		border-radius: 10rem;
		min-height: 78rem;
		&_border {
			background: none;
			border: 1px solid $light-gray;
		}
		&_edit {
			.button-category {
				&__arrow {
					display: none;
				}
			}
		}
		&__icon {
			display: none;
		}
		&__arrow {
			width: 7rem;
			height: 10rem;
			fill: none;
			stroke: $gray;
			stroke-width: 3;
		}
		&__wrap {
			display: flex;
			align-items: center;
			width: calc( 100% - 17rem);
		}
		&__img {
			width: 48rem;
			height: 48rem;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			margin-right: 10rem;
			flex-shrink: 0;
			img {
				max-height: 48rem;
			}
		}

		&__text {
			padding-left: 5rem;
		}

		&__title {
			font-size: 17rem;
			font-weight: 600;
			line-height: 1;
			display: block;
		}

		&__desc {
			margin-top: 5rem;
			color: $gray;
			display: block;
		}

		&__edit {
			display: inline-flex;
			align-items: center;
			color: $blue;
			line-height: 1;
			background: #fff;
			border-radius: 4px;
			padding: 0 12rem;
			height: 28rem;
		}
	}

	@include large-mobile {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 10rem;

		font-size: 14rem;
		line-height: 1.2;
		color: $default;

		&_edit {
			background: #F4F3F4;
			border-radius: 10rem;
			min-height: 58rem;
			padding: 5rem 20rem 5rem 15rem;
			.button-category {
				&__edit {
					display: none;
				}
				&__img {
					width: 38rem;
					height: 38rem;
					padding: 0;
				}
				&__title {
					font-size: 16rem;
					font-weight: 600;
				}
				&__arrow {
					stroke-width: 2;
					width: 7rem;
					height: 10rem;
				}
			}
		}

		&__arrow {
			width: 6rem;
		    height: 10rem;
		    fill: none;
		    stroke: $gray;
		    stroke-width: 1.5;
		    flex-shrink: 0;
		    margin-left: 10rem;
		}

		&__wrap {
			display: flex;
			align-items: center;
		}

		&__img {
			width: 34rem;
			height: 34rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #F2F4F5;
			border-radius: 3px;
			padding: 5rem;
			margin-right: 10rem;
			img {
				max-height: 100%;
			}
		}

		&__icon {
			width: 34rem;
			height: 34rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #F2F4F5;
			border-radius: 3px;
			padding: 5rem;
			margin-right: 10rem;
			fill: $gray;
			svg {
				width: 12rem;
				height: 12rem;
			}
		}

		&__desc {
			color: $gray;
			&:before {
				content: '/ '
			}
		}
	}
}
</style>

<template lang="pug">
	component.button-medium(
		:is="to !== '' ? 'NuxtLink' : 'button'"
		:to="to !== '' ? to : false"
		:class="Mods"
	)
		span.button-medium__icon(:class="`button-medium__icon_${icon}`" v-if="icon")
			svg-icon(:name="icon")
		span.button-medium__text
			slot

</template>

<script>
export default {
	props: {
		to: {
			type: String,
			default: ""
		},
		icon: {
			type: String,
			default: ""
		},
		white: {
			type: Boolean,
			default: false
		},
		blue: {
			type: Boolean,
			default: false
		},
		border: {
			type: Boolean,
			default: false
		},
		square: {
			type: Boolean,
			default: false
		},
		small: {
			type: Boolean,
			default: false
		},
		verysmall: {
			type: Boolean,
			default: false
		},
		big: {
			type: Boolean,
			default: false
		},
		borderWhite: {
			type: Boolean,
			default: false
		},
		transparent: {
			type: Boolean,
			default: false
		},
		gray: {
			type: Boolean,
			default: false
		},
		large: {
			type: Boolean,
			default: false
		},
		light: {
			type: Boolean,
			default: false
		},
		iconActive: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		Mods(){
			return {
				'button-medium_white': this.white,
				'button-medium_big': this.big,
				'button-medium_gray': this.gray,
				'button-medium_blue': this.blue,
				'button-medium_border': this.border,
				'button-medium_square': this.square,
				'button-medium_small': this.small,
				'button-medium_verysmall': this.verysmall,
				'button-medium_border-white': this.borderWhite,
				'button-medium_transparent': this.transparent,
				'button-medium_large': this.large,
				'button-medium_light': this.light,
				'button-medium_icon-active': this.iconActive
			}
		}
	}
}
</script>

<style lang="scss">
.button-medium{
	border: 0;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: $default;
	line-height: 1;
	border-radius: 10rem;
	transition: ease .15s;
	background: #F4F3F4;
	padding: 0 20rem;
	height: 40rem;
	font-weight: 600;
	font-size: 14rem;

	&_big {
		height: 44rem;
		padding: 0 15rem 0 10rem;
		.button-medium {
			&__icon {
				width: 24rem;
				height: 24rem;
				margin-right: 3rem;
			}
		}

		@include large-mobile {
			height: 35rem;
			border-radius: 8rem;
			.button-medium {
				&__icon {
					width: 20rem;
					height: 20rem;
				}
			}
		}
	}

	&_white {
		background: none;
		padding: 0;
	}
	&_blue {
		color: #fff;
		background: $blue;
		.button-medium {
			&__icon {
				stroke: #fff;
				&_pinned {
					fill: #fff;
				}
				&_deleteBig {
					stroke: none;
					fill: #fff;
				}
				&_user {
					stroke: none;
					fill: #fff;
				}
				&_category {
					stroke: none;
					fill: #fff;
				}
				&_plusBig {
					stroke: none;
					fill: #fff;
				}
			}
		}
		&:hover {
			background:#4257C7;
      color: #fff;
		}
	}

	&_square {
		padding: 0;
		width: 40rem;
		.button-medium {
			&__icon {
				margin-right: 0;
			}
		}
		&.button-medium_big {
			width: 44rem;
		}
		&.button-medium_verysmall {
			width:30rem;
		}
		&.button-medium_large {
			width: 50rem;
		}
	}

	&_border-white {
		background: none;
		border: 1px solid #fff;
		color: #fff;
		.button-medium {
			&__icon {
				stroke: #fff;
				&_pinned {
					fill: #fff;
				}
				&_deleteBig {
					stroke: none;
					fill: #fff;
				}
				&_dotsRotate {
					fill: $default;
					stroke: $default;
					stroke-width: .2;
				}
			}
		}
	}

	&_transparent {
		background: rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		border: 0;
		color: #fff;
		.button-medium {
			&__icon {
				stroke: #fff;
				&_pinned {
					fill: #fff;
				}
				&_deleteBig {
					stroke: none;
					fill: #fff;
				}
				&_plusBig {
					stroke: none;
					fill: #fff;
				}
			}
		}
	}

	&_border {
		background: #FFF;
		border: 1px solid $light-gray;
	}
	&_small {
		border-radius: 4px;
		padding: 0 10rem;
		height: 36rem;
	}

	&_verysmall {
		height: 30rem;
		border-radius: 7rem;
		.button-medium {
			&__icon {
				width: 18rem;
				height: 18rem;
				&_deleteBig {
					width: 16rem;
					height: 16rem;
				}
			}
		}
	}

	&_gray {
		background: #F4F3F4;
		color: $default;
		border: 1px solid transparent;
		&:hover {
			background: #fff;
			border-color: #E4E4E4;
		}
		.button-medium {
			&__icon {
				&_closeBig {
					fill: $gray;
				}
			}
		}
	}

	&_light {
		background: #EEF1FE;
		color: $blue;
		.button-medium {
			&__icon {
				&_plusBig {
					fill: $blue;
				}
			}
		}
	}

	&_large {
		height: 50rem;
	}
	// Modifiers
	&_icon {
		&-active {
			& > .button-medium__icon {
				position: relative;
		    &:after {
		      content: '';
		      display: block;
		      position: absolute;
		      right: 2rem;
		      top: 1.1rem;
		      background: $blue;
		      width: 6rem;
		      height: 6rem;
		      border-radius: 6px;
		    }
			}
		}
	}
	&__icon {
		width: 20rem;
		height: 20rem;
		fill: none;
		stroke: $default;
		stroke-width: 1.5;
		flex-shrink: 0;
		margin-right: 8rem;
		svg {
			width: 100%;
			height: 100%;
		}

		&_chatBorder {
			
		}
		&_closeBig {
			stroke: none;
			fill: $default;
			width: 14rem;
			height: 14rem;
			margin-top: -1px;
		}
		&_chart {
			margin-top: -1px;
		}
		&_dots {
			width: 12rem;
			height: 4rem;
			stroke: none;
			fill: $default;
			margin-right: 0;
		}
		&_dotsRotate {
			width: 3rem;
			height: 12rem;
			stroke: none;
			fill: $default;
			margin-right: 0;
		}
		&_pinned {
			fill: $default;
			stroke: none;
		}
		&_infoCircle {
			position: relative;
			&:after {
				content: '';
				display: block;
				position: absolute;
				bottom: 6rem;
				left: 9rem;
				width: 2rem;
				height: 2rem;
				background: $default;
			}
		}
		&_user {
			stroke: none;
			fill: $default;
		}
		&_plusBig {
			width: 12rem;
			height: 12rem;
			margin-right: 15rem;
			fill: $default;
			stroke: none;
		}
		&_check {
			width: 16rem;
			height: 16rem;
			stroke-width: 1.2;
		}
		&_editSmall {
			stroke: none;
			fill: $gray;
			width: 18rem;
			height: 18rem;
		}
		&_category {
			stroke: none;
			fill: $default;
		}
		&_plusBig {
			stroke: none;
			fill: $default;
		}
	}

	&__text {
		@include large-tablet {
			.hidden {
				display: none;
			}
		}
	}
}
</style>
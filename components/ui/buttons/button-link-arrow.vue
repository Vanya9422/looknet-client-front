<template lang="pug">
	component.link-arrow(
		:is="to !== '' ? 'NuxtLink' : 'button'"
		:to="to !== '' ? to : false"
		:class="Mods"
	)
		span.link-arrow__text.link-arrow__text_toggle(v-if="showText" :data-show-text="showText" :data-hide-text="hideText")
		span.link-arrow__text(v-else)
			slot
		svg-icon.link-arrow__icon(name="arrowRight")

</template>

<script>
export default {
	props: {
		to: {
			type: String,
			default: ""
		},
		showText: {
			type: String,
			default: ""
		},
		hideText: {
			type: String,
			default: ""
		},
		more: {
			type: Boolean,
			default: false
		},
		small: {
			type: Boolean,
			default: false
		},
		blue: {
			type: Boolean,
			default: false
		},
		white: {
			type: Boolean,
			default: false
		},
		black: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		Mods(){
			return {
				'link-arrow_more': this.more,
				'link-arrow_small': this.small,
				'link-arrow_blue': this.blue,
				'link-arrow_white': this.white,
				'link-arrow_black': this.black
			}
		}
	}
}
</script>

<style lang="scss">
.link-arrow{
	border: 0;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background: none;
	cursor: pointer;
	font-size: 17rem;
	line-height: 1;
	font-weight: 600;

	@include large-mobile {
		font-size: 16rem;
	}

	&_small {
		font-size: 14rem;
		.link-arrow {
			&__icon {
				width: 13rem;
				height: 10rem;
				stroke-width: 3;
			}
		}
	}

	&_more {
		.link-arrow {
			&__icon {
				transform: rotate(90deg);
				margin-left: 8rem;
			}
		}
		&.isActive {
			.link-arrow {
				&__icon {
					transform: rotate(-90deg);
				}
			}
		}
	}
	&.isActive {
		.link-arrow {
			&__text {
				&_toggle {
					&:before {
						content: attr(data-hide-text);
					}
				}
			}
		}
	}

	&_blue {
		color: $blue;
		.link-arrow {
			&__icon {
				stroke: $blue;
			}
		}
	}

	&_black {
		color: $default;
		.link-arrow {
			&__icon {
				stroke: $default;
				stroke-width: 2;
			}
		}
	}

	&_white {
		color: #fff;
		.link-arrow {
			&__icon {
				stroke: #fff;
			}
		}
	}

	&__icon {
		fill: none;
		stroke: $gray;
		width: 14rem;
		height: 11rem;
		stroke-width: 1.5;
		flex-shrink: 0;
		margin-left: 4rem;
		transition: ease .2s;
		margin-top: 1px;
	}

	&__text {
		&_toggle {
			&:before {
				content: attr(data-show-text);
			}
		}
	}
	
}
</style>
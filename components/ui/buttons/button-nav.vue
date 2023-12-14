<template lang="pug">
	component.button-nav(
		:is="to !== '' ? 'NuxtLink' : 'button'"
		:to="to !== '' ? to : false"
		:class="Mods"
	)
		span.button-nav__icon(:class="`button-nav__icon_${icon}`")
			svg-icon(:name="icon")
		span.button-nav__text
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
		red: {
			type: Boolean,
			default: false
		},
		small: {
			type: Boolean,
			default: false
		},
		notif: {
			type: [Boolean,Number],
			default: 0
		},
	},
	computed: {
		Mods(){
			return {
				'button-nav_red': this.red,
				'button-nav_small': this.small,
				'button-nav_notif': this.notif,
			}
		}
	}
}
</script>

<style lang="scss">
.button-nav{
	border: 0;
	display: inline-flex;
	align-items: center;
	background: none;
	cursor: pointer;
	color: #9A9A9A;
	font-size: 15rem;
	line-height: 1;
	border-radius: 7rem;
	transition: ease .15s;

	&:not(.button-nav_small) {
		height: 52rem;
		padding: 0 10rem 0 18rem;
	}

	&:hover:not(.button-nav_small), &.nuxt-link-active:not(.button-nav_small) {
		color: $blue;
		.button-nav__icon {
			fill: $blue;
			&_support {
				fill: none;
				stroke: $blue;
			}
		}
	}

	&.nuxt-link-active {
		background: #fff;
	}

	&_red {
		color: $red;
		.button-nav {
			&__icon {
				fill: $red;
				&_logout {
					stroke: $red;
					fill: none;
				}
			}
		}
	}

	&_notif {
		.button-nav {
			&__icon {
				&:before {
					content: '';
					display: block;
					position: absolute;
					width: 7rem;
					height: 7rem;
					background: $red;
					border: 1px solid #F4F3F4;
					border-radius: 5px;
					right: 5rem;
					top: 2rem;
				}
			}
		}
	}

	&_medium {
		padding: 0 15rem;
		height: 40rem;
	}

	@include small-desktop {
		&:not(.button-nav_small) {
			padding-left: 12rem;
		}
	}

	&__icon {
		width: 24rem;
		height: 24rem;
		fill: #9A9A9A;
		flex-shrink: 0;
		margin-right: 15rem;
		transition: ease .15s;
		position: relative;
		svg {
			width: 100%;
			height: 100%;
		}
		&_logout {
			fill: none;
			stroke: #9A9A9A;
			stroke-width: 1.5;
		}
		&_plus {
			&:before {
				content: '+';
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				color: #fff;
				font-size: 20rem;
			}
		}
		&_bell {
			&:after {
				content: '';
				display: block;
				width: 4rem;
				height: 2rem;
				background:#9A9A9A;
				position: absolute;
				bottom: 2rem;
				left: 50%;
				margin-left: -2rem;
			}
		}
		&_support {
			fill: none;
			stroke: #9A9A9A;
			stroke-linecap: round;
			stroke-linejoin: round;
			stroke-width: 1.5;
		}

		@include small-desktop {
			margin-right: 10rem;
		}
	}
}
</style>

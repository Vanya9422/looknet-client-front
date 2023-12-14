<template lang="pug">
	component.button-back(
		:is="to !== '' ? 'NuxtLink' : 'button'"
		:to="to !== '' ? to : false"
		:class="Mods"
	)
		span.button-back__arrow
			svg-icon.button-back__icon(name="prev")
		span.button-back__text
			slot

</template>

<script>
export default {
	props: {
		to: {
			type: String,
			default: ""
		},
		small: {
			type: Boolean,
			default: false
		},
		gray: {
			type: Boolean,
			default: false
		},
	},

	computed: {
		Mods(){
			return {
				'button-back_gray': this.gray,
				'button-back_small': this.small,
			}
		}
	}
}
</script>

<style lang="scss">
.button-back{
	border: 0;
	display: inline-flex;
	align-items: center;
	background: none;
	cursor: pointer;
	color: #9A9A9A;
	font-size: 16rem;
	line-height: 1;

	&_small {
		.button-back {
			&__arrow {
				width: 32rem;
				height: 32rem;
				border: 1px solid $light-gray;
				margin-right: 13rem;
			}
			&__icon {
				width: 18rem;
				height: 18rem;
				stroke: $blue;
			}
		}
	}

	&_gray {
		color: $gray;
		.button-back {
			&__icon {
				stroke: $gray;
			}
		}
	}

	&__arrow {
		width: 42rem;
		height: 42rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		border-radius: 100%;
		flex-shrink: 0;
		margin-right: 15rem;
	}

	&__icon {
		width: 24rem;
		height: 24rem;
		fill: $blue;
	}
}
</style>
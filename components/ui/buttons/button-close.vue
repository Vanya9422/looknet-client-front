<template lang="pug">
	button.button-close(:class="Mods")
		svg-icon(:name="icon" viewBox="0 0 10 9")

</template>
<script>
export default {
	props: {
		white: {
			type: Boolean,
			default: false
		},
		light: {
			type: Boolean,
			default: false
		},
    icon:{
      type: String,
      default: 'close'
    }
	},

	computed: {
		Mods(){
			return {
				'button-close_white': this.white,
				'button-close_light': this.light,
			}
		}
	}
}
</script>

<style lang="scss">
.button-close{
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 34rem;
	height: 34rem;
	border-radius: 100%;
	background: #F4F3F4;
	border: 0;
	cursor: pointer;

	&_white {
		background: #fff;
	}

	svg {
		width: 13rem;
		height: 13rem;
		stroke: $gray;
	}

	&_light {
		background: #798CEF;
		svg {
			stroke: #fff;
		}
	}

	@include large-mobile {
		width: 28rem;
		height: 28rem;
		svg {
			width: 12rem;
			height: 12rem;
		}
	}
}
</style>
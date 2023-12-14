<template lang="pug">
	button.button-toggle.p(:class="Mods")
		span.button-toggle__text 
			slot
		svg-icon.button-toggle__icon(name="arrowDown" viewBox="0 0 11 7")
</template>

<script>
export default {
	props: {
		active: {
			type: Boolean
		}
	},

	computed: {
		Mods(){
			return {
				'button-toggle_active': this.active
			}
		}
	}
}
</script>

<style lang="scss">
.button-toggle{
	background: transparent;
	border: none;
	cursor: pointer;

	font-weight: 600;
	color: $blue;
	line-height: 1em;
	display: flex;
	align-items: center;

	&_active{
		.button-toggle{
			&__icon{
				transform: rotate(-180deg);
			}
		}
	}

	&__text {
		flex: 1 1 auto;
	}

	&__icon{
		flex: 0 0 auto;
		width: 11rem;
		margin-left: 10rem;
		stroke: $blue;
		stroke-width: 2;
		fill: transparent;
	}
}
</style>
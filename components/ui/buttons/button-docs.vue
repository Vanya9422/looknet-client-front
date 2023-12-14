<template lang="pug">
	component.button-docs(
		:is="to !== '' ? 'NuxtLink' : 'button'"
		:to="to !== '' ? to : false"
		:class="Mods"
	)
		span.button-docs__text
			slot
		span.button-docs__icon(:class="`button-docs__icon_${icon}`" v-if="icon")
			svg-icon(:name="icon")

</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: "download"
		},
		to: {
			type: String,
			default: ""
		},
	},
}
</script>

<style lang="scss">
.button-docs{
	border: 0;
	background: none;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: $blue;
	line-height: 1;
	transition: ease .15s;
	font-weight: 600;
	font-size: 14rem;

	&__icon {
		fill: $blue;
		width: 18rem;
		height: 18rem;
		flex-shrink: 0;
		margin-left: 5rem;
		svg {
			width: 100%;
			height: 100%;
		}
	}

}
</style>
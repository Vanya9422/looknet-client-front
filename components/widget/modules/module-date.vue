<template lang="pug">
	.date
		svg-icon.date__icon(:name="icon" :class="`date__icon__icon_${icon}`")
		.date__text
			slot
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: "clock"
		}
	}
}
</script>

<style lang="scss">
.date{
	display: inline-flex;
	align-items: center;
	font-size: 16rem;
	font-weight: 500;
	color: $dark-gray;

	@include large-mobile {
		font-size: 14rem;
	}

	&__icon {
		width: 16rem;
		height: 16rem;
		margin-right: 10rem;
		fill: $dark-gray;
		@include large-mobile {
			width: 14rem;
			height: 14rem;
			margin-right: 8rem;
		}
	}
}
</style>
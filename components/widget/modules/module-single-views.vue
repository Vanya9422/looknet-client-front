<template lang="pug">
	span.single-views
		svg-icon.single-views__icon(name="eye-1" viewBox="0 0 16 16")
		span.single-views__text
			slot
</template>

<style lang="scss">
.single-views{
	display: flex;
	align-items: center;
	color: $gray;
	fill: $gray;
	font-weight: 600;
	line-height: 1;

	@include large-mobile {
		font-size: 14rem;
		line-height: 1;
		fill: #C3C8CB;
	}

	&__icon{
		flex: 0 0 auto;
		width: 14rem;
		margin-right: 10rem;

		@include small-tablet {
			width: 16rem;
		}

		@include large-mobile {
			width: 14rem;
			margin-top: -2rem;
			margin-right: 5rem;
		}
	}
}
</style>
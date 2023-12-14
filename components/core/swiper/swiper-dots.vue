<template lang="pug">
	.swiper-pagination
</template>

<style lang="scss">
.swiper-pagination{
	position: absolute;
	left: 0;
	width: 100%;
	bottom: 0;
	z-index: 20;

	display: flex;
	justify-content: center;
	padding: 20rem;

	@include large-mobile {
		padding: 8rem;
	}

	&-bullet{
		background: rgba(#FFFFFF, 0.4);
		border-radius: 10rem;
		margin: 2rem;
		height: 2px;
		flex: 1 1 auto;
		max-width: 45rem;

		&.swiper-pagination-bullet-active{
			background: #fff;
		}
	}
}
</style>
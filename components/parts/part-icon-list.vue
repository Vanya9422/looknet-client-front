<template lang="pug">
	ul.icon-list.flex
		li.icon-list__item(v-for="(item, i) in list" :key="i")
			set-img(img-class="icon-list__icon" :default-img="require(`~/assets/img/${item.icon}`)")
			span.icon-list__text {{ item.text }}
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => ([])
		}
	}
}
</script>

<style lang="scss">
.icon-list{
	&__item{
		display: block;
		margin-right: 30rem;
		margin-bottom: 15rem;
		font-weight: 500;

		@include large-mobile {
			font-size: 14rem;
			line-height: 1em;
			margin-bottom: 13rem;
			position: relative;
			padding-left: 22rem;

			&:first-child{
				.icon-list__icon{
					width: 10rem;
				}
			}
		}
	}

	&__icon{
		margin-right: 12rem;

		@include large-mobile {
			position: absolute;
			left: 0;
			top: 0;
			width: 13rem;
		}
	}
}
</style>

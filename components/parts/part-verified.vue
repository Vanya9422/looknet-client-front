<template lang="pug">
	span.verified(:content="content" placement="top-start" v-tippy)
		img(src="~/assets/img/verified.svg")
</template>

<script>
export default {
	props: {
		content: {
			type: String,
			default: '<strong>Phone / Еmail confirmed</strong>'
		},
	},
}
</script>

<style lang="scss">
.verified{
	align-items: center;
	display: inline-flex;

	@include large-mobile {
		padding: 6rem;
		background: #EEF1FE;
		border-radius: 6rem;

		img{
			width: 12rem;
		}
	}
}
</style>

<template lang="pug">
	.button-faq(:class="Mods")
		.button-faq__text
			slot

</template>

<script>
export default {
	props: {
		active: {
			type: Boolean,
			default: false
		},
	},

	computed: {
		Mods(){
			return {
				'isActive': this.active,
			}
		}
	},
}
</script>

<style lang="scss">
.button-faq{
	display: flex;
	min-height: 40rem;
	align-items: center;
	padding: 10rem;
	border-radius: 6px;
	transition: ease .15s;
	font-size: 16rem;
	line-height: 1;
	cursor: pointer;

	&:hover {
		color: $blue;
	}

	&.isActive {
		background: #EEF0FD;
		color: $blue;
	}
}
</style>
<template lang="pug">
	label.radio-switch(:class="Mods")
		input.radio-switch__input(:name="name" :value="value" type="checkbox" @change="$emit('change')" :checked="checked")
		.radio-switch__btn
			.radio-switch__icon
		.radio-switch__text
			slot

</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: 'name'
		},
		checked: {
			type: [Boolean,Number],
			default: false
		},
		light: {
			type: Boolean,
			default: false
		},
		rotate: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		Mods(){
			return {
				'radio-switch_light': this.light,
				'radio-switch_rotate': this.rotate,
			}
		}
	}
}
</script>

<style lang="scss">
.radio-switch{
	display: inline-flex;
	align-items: center;
	cursor: pointer;
	font-size: 16rem;

	&_rotate {
		flex-direction: row-reverse;
		.radio-switch__text {
			margin-right: 13rem;
		}
	}

	&__input {
		display: none;

		&:checked + .radio-switch__btn {
			background: $blue;
			.radio-switch__icon {
				left: 20rem;
			}
			& + .radio-switch__text {
				color: $default;
			}
		}
	}

	&__btn {
		display: block;
		position: relative;
		width: 39rem;
		height: 21rem;
		background: $light-gray;
		border-radius: 13rem;
		transition: ease .15s;
	}

	&__icon {
		width: 17rem;
		height: 17rem;
		background: #fff;
		border-radius: 100%;
		position: absolute;
		left: 2rem;
		top: 2rem;
		transition: ease .2s;
	}

	&__text {
		color: #9A9A9A;
		transition: ease .15s;
		margin-left: 10rem;
	}
}
</style>
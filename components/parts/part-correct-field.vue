<template lang="pug">
	.correct-field
		.correct-field__drag(v-if="drag")
			svg-icon(name="menu")
		form-input.correct-field__input(
			:value="value"
			:name="name"
			:placeholder="placeholder"
			:type="type"
		)
		button-primary.correct-field__btn(gray icon="close" square)

</template>

<script>
export default {
	props: {
		name: {
			type: String,
			default: 'name'
		},
		value: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: 'Alexandr'
		},
		type: {
			type: String,
			default: ''
		},
		drag: {
			type: Boolean,
			default: false
		},
	},
}
</script>

<style lang="scss">
.correct-field {
	display: flex;

	&__input {
		width: 100%;
	}

	&__btn {
		margin-left: 10rem;
		flex-shrink: 0;

		@include large-mobile {
			margin-left: 6rem;
		}
	}

	&__drag {
		width: 29rem;
		min-width: 29rem;
		min-height: 100%;
		cursor: pointer;
		padding-right: 14rem;
		display: flex;
		align-items: center;
		stroke: $light-gray;
		stroke-width: 2;
		svg {
			height: 12rem;
		}
	}
}
</style>
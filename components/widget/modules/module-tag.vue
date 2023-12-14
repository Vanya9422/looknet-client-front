<template lang="pug">
	component.tag(
			:is="to !== '' ? 'NuxtLink' : 'div'"
			:to="to !== '' ? to : false"
			:class="Mods"
		)
		span.tag__text {{ text }}
		slot
		//- span.tag__counter.color-blue(v-if="counter") ({{ counter }})
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default: ""
		},
		counter: {
			type: Number,
		},
		to: {
			type: String,
			default: ""
		},
		button: {
			type: Boolean,
			default: false
		},
		active: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		Mods(){
			return {
				'tag_btn': this.button,
				'is-active': this.active,
			}
		}
	}
}
</script>

<style lang="scss">
.tag{
	display: inline-flex;
	font-size: 16rem;
	color: $gray;
	text-align: center;
	justify-content: center;
  transition: all 0.3s;
  &:hover{
    color: $blue;
  }

	&_btn {
		font-weight: 600;
		padding: 0 28rem 10rem 28rem;
		border-bottom: 2px solid transparent;
		color: #9A9A9A;
		&.is-active {
			border-color: $default;
		}
		.tag__counter {
			color: inherit;
		}
		&:hover {
			text-decoration: none;
		}
	}

	&.is-active {
		color: $default;
		.tag__counter {
			color: $blue;
		}
	}

	@include large-mobile {
		font-size: 14rem;

		&:not(.tag_btn) {
			height: 25rem;
			align-items: center;
			padding: 0 8rem;
			background: #F4F3F4;
			border-radius: 3px;
		}
	}
	&__counter {
		margin-left: 3rem;
	}
}
</style>

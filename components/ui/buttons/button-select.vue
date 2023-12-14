<template lang="pug">
	.button-select(:class="Mods")
		.button-select__head
			.button-select__text
				slot
			.button-select__arrow(:class="{'button-select__arrow_rotate': isOpen}")
				svg-icon(name="arrowDown" viewBox="0 0 11 7")

</template>

<script>
export default {
	props: {
		borderRight: {
			type: Boolean,
			default: false
		},
    isOpen: {
      type: Boolean,
      default: false
    },
	},

	computed: {
		Mods(){
			return {
				'button-select_border-right': this.borderRight,
			}
		}
	},
}
</script>

<style lang="scss">
.button-select{
	position: relative;

	&_border-right {
		.button-select {
			&__head {
				border-left: 0;
				border-right: 1px solid $light-gray;
			}
		}
	}

	&__head {
		border-left: 1px solid $light-gray;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 56rem;
		font-size: 17rem;
		font-weight: 600;
		padding: 0 30rem;
		cursor: pointer;
		white-space: nowrap;

		@include small-tablet {
      padding: 0;
      border: 0;
		}

		@include large-mobile {
			height: 20rem;
			font-size: 14rem;
		}
	}

	&__arrow {
		flex-shrink: 0;
		width: 11rem;
		height: 7rem;
		fill: none;
		stroke: $default;
		stroke-width: 2;
		margin-left: 18rem;
    transition: all .3s linear;

    &_rotate {
      transform: rotate(180deg);
    }

		@include small-tablet {
			margin-left: 10rem;
		}

		@include large-mobile {
			width: 8rem;
			height: 5rem;
		}
	}
}
</style>

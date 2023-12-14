<template lang="pug">
.button-filter(:class="Mods")
	svg-icon.button-filter__icon.button-filter__icon_mobile(name="list2")
	svg-icon.button-filter__icon.button-filter__icon_desktop(name="filter")
	span.filter__title-text
		| {{ text }}&nbsp;
		span.color-blue ({{ counter }})
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default: "Filters"
		},
		counter: {
			type: Number,
			default: 2
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
.button-filter{
	display: inline-flex;
	align-items: center;
	color: $gray;
	font-weight: 600;
	font-size: 14rem;
  cursor: pointer;
	&__icon {
		width: 18rem;
		height: 8rem;
		flex-shrink: 0;
		fill: $gray;
		margin-right: 10rem;
		position: relative;
		top: -1px;
		&_mobile {
			display: none;
		}

		@include large-mobile {
			margin-right: 5rem;
			&_mobile {
				display: block;
				stroke: $gray;
				width: 12rem;
				height: 11rem;
			}
			&_desktop {
				display: none;
			}
		}
	}
}
</style>

<template lang="pug">
	.accordion(:class="Mods")
		.accordion__head(@click="ToggleAccordion" role="tab")
			.accordion__title {{ title }}
			.accordion__arrow
				svg-icon(name="arrowDown")
		b-collapse.accordion__body(
			v-model="active"
			:accordion="groupName"
			role="tabpanel"
		)
			.accordion__content(v-if="content")
				slot
			.accordion__list(v-else)
				.accordion__item(v-for="(value, i) in list" :key="i")
					form-checkbox-btn.accordion__checkbox(:value="value.name" :name="value.name" @change="$emit('change',value.id)")
			.accordion__more(v-if="list.length > 5") Моrе

</template>

<script>
export default {
	props: {
		groupName: {
			type: String,
			default: null
		},
		title: {
			type: String,
			default: ""
		},
		name: {
			type: String,
			default: "name"
		},
		visible: {
			type: Boolean,
			default: false
		},
		content: {
			type: Boolean,
			default: false
		},
		list: {
			type: Array,
			default: () => ([])
		}
	},
	data(){
		return {
			active: this.visible
		}
	},
	computed: {
		Mods(){
			return {
				'is-active': this.active
			}
		}
	},
	methods: {
		ToggleAccordion(){
			this.active = !this.active
		}
	}
}
</script>

<style lang="scss">
.accordion{
	border-top: 1px solid #D2D2D7;
	&.is-active {
		.accordion {
			&__arrow {
				svg {
					transform: rotate(-180deg);
				}
			}
		}
	}
	&__head {
		padding: 20rem 10rem 20rem 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		line-height: 1;
		transition: ease .15s;

		@include small-tablet {
			min-height: inherit;
			padding: 25rem 10rem;
			line-height: 1;
		}
	}

	&__title {
		font-weight: 600;

		@include small-tablet {
			font-size: 15rem;
		}
	}

	&__arrow {
		flex-shrink: 0;
		fill: none;
		stroke: #86868B;
		stroke-width: 2;
		margin-left: 20rem;
		width: 11rem;
		height: 7rem;
		svg {
			width: 100%;
			height: 100%;
			transition: ease .2s;
		}
	}
	&__body {
		margin-left: -10rem;
		padding-left: 10rem;
		padding-top: 5rem;
		margin-top: -5rem;
	}
	&__list {
		margin-top: -5rem;
		padding-bottom: 10rem;
		@include small-tablet {
			margin-top: 0;
			padding-bottom: 20rem;
			padding-left: 10rem;
		}
	}
	&__item {
		margin-top: 1px;

		@include large-mobile {
			margin-top: 0;
			&:not(:first-child) {
				margin-top: 18rem;
			}
		}
	}
	&__checkbox {
		margin-left: -10rem;

		@include large-mobile {
			margin-left: 0;
		}
	}

	&__more {
		display: inline-flex;
		margin-bottom: 15rem;
		line-height: 1;
		cursor: pointer;
		color: $blue;

		@include small-tablet {
			margin-bottom: 20rem;
			margin-left: 10rem;
			font-size: 14rem;
		}
	}

	&__fields {
		display: flex;
		.input {
			width: 100%;
		}

		@include large-mobile {
			@include items(2, 5);
		}
	}
}
</style>

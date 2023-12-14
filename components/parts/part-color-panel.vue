<template lang="pug">
	.color-panel
		.color-panel__list.flex
			.color-panel__item(
				v-for="(item, i) in list"
				:key="i"
				:class="{isActive:number == i}"
				@click="change(i)"
			)
				.color-panel__inner(:style="{ background: item.color, borderColor: item.border}")
			.color-panel__item
				.color-panel__edit
					svg-icon(name="editSmall")
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => ([
			])
		},
	},
	data(){
		return {
			number: 0,
			i: 0
		}
	},
	methods:{
		change(i) {
			this.number = i;
		},
	}
}
</script>

<style lang="scss">
.color-panel{
	&__list {
		margin: -5rem;
		@include large-mobile {
			margin: -4rem;
		}
	}
	&__item {
		margin: 5rem;
		width: 60rem;
		height: 60rem;
		cursor: pointer;
		transition: ease .15s;
		border: 1px solid $light-gray;
		border-radius: 10rem;
		display: flex;
		padding: 3px;
		&.isActive {
			border-color: $blue;
		}

		@include large-mobile {
			width: 50rem;
			height: 50rem;
			margin: 4rem;
		}
	}
	&__inner {
		min-height: 100%;
		width: 100%;
		border-radius: 8rem;
		border: 1px solid transparent;
	}
	&__edit {
		min-height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			fill: #9A9A9A;
			width: 18rem;
			height: 18rem;
		}

		@include large-mobile {
			svg {
				width: 15rem;
				height: 15rem;
			}
		}
	}
}
</style>
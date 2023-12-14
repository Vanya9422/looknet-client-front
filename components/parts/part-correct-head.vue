<template lang="pug">
	.correct-head
		.correct-head__row.flex.flex_vertical.flex_justify
			.correct-head__column.correct-head__column_left
				h1.correct-head__title.h2.h2_big {{title}}
			.correct-head__column.correct-head__column_right.flex.flex_vertical
				button-switcher.correct-head__switcher(:items="switchers" blue name="correct")
				slot
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: 'Web site corrections'
		},
	},
	data(){
		return{
			switchers: [
				{
					value: 'Web site',
					text: 'Web site',
					checked: true
				},
				{
					value: 'Categories',
					text: 'Categories',
				},
				{
					value: 'Gallery',
					text: 'Gallery',
				},
			],
		}
	}
}
</script>

<style lang="scss">
.correct-head {
	margin-top: 30rem;

	@include large-mobile {
		margin-top: 15rem;
	}

	&__column {
		@include small-tablet {
			width: 100%;
			display: block;
			&_left {
				display: none;
			}
		}
	}

	&__switcher {
		order: 2;
	}

	&__btn {
		min-width: 180rem;
		margin-right: 10rem;
		order: 1;

		@include small-tablet {
			margin-top: 30rem;
			min-width: 190rem;
		}
	}
}
</style>
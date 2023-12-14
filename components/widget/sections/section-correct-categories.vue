<template lang="pug">
	section.correct-categories
		.correct-categories__box
			.correct-categories__level.color-red 1 level
			h3.correct-categories__title.h3 Main category
			.correct-categories__list.flex
				.correct-categories__item(v-for="(item, i) in listLevel1" :key="i")
					module-category(
						:img="item.img"
						:name="item.name"
						:counter="item.counter"
						@showPanel="panel"
					)
				.correct-categories__item
					module-category(
						btn
						v-b-modal.modal-category
					)
		.correct-categories__box
			.correct-categories__level.color-blue 2 level
			h3.correct-categories__title.h3 Category 1
			.correct-categories__list.flex
				.correct-categories__item(v-for="(item, i) in listLevel2" :key="i")
					module-category(
						:img="item.img"
						:name="item.name"
						:counter="item.counter"
						@showPanel="panel"
					)
				.correct-categories__item
					module-category(
						btn
						v-b-modal.modal-category
					)
		.correct-categories__box
			.correct-categories__level.color-brown 3 level
			h3.correct-categories__title.h3 Category 2
			.correct-categories__list.flex
				.correct-categories__item(v-for="(item, i) in listLevel3" :key="i")
					module-category(
						:img="item.img"
						:name="item.name"
						:counter="item.counter"
						@showPanel="panel"
					)
				.correct-categories__item
					module-category(
						btn
						v-b-modal.modal-category
					)
		.correct-categories__box
			.correct-categories__level.color-green 4 level
			h3.correct-categories__title.h3 Category 3
			.correct-categories__list.flex
				.correct-categories__item(v-for="(item, i) in listLevel4" :key="i")
					module-category(
						:img="item.img"
						:name="item.name"
						:counter="item.counter"
						@showPanel="panel"
					)
				.correct-categories__item
					module-category(
						btn
						v-b-modal.modal-category
					)
		transition(name="fade")
			part-annoucement-panel.correct-categories__panel(v-if="panelOpen" @closePanel="panelOpen = false" modalName="modal-correct-categories")
				button-medium.annoucement-panel__btn(icon="duplicate" blue small) Duplicate
				button-medium.annoucement-panel__btn(icon="filters" blue small) Filters
				button-medium.annoucement-panel__btn(icon="plusBig" blue small) Add category
				button-medium.annoucement-panel__btn(icon="penEdit" blue small) Edit
				button-medium.annoucement-panel__btn(icon="delete" blue small) Delete
		modal-panel(id="modal-correct-categories")
			.modal-panel__item
				button-border.modal-panel__btn(icon="duplicate" BigIcon gray) Duplicate
			.modal-panel__item
				button-border.modal-panel__btn(icon="filters" BigIcon gray) Filters
			.modal-panel__item
				button-border.modal-panel__btn(icon="plusBig" BigIcon gray) Add category
			.modal-panel__item
				button-border.modal-panel__btn(icon="penEdit" BigIcon gray) Edit
			.modal-panel__item
				button-border.modal-panel__btn(icon="closeBig" BigIcon gray) Delete
</template>

<script>
export default {
	data(){
		return{
			panelOpen: false,
			listLevel1: [
				{
					img: 'category__img1.png',
					name: 'Electronics',
					counter: 3
				},
				{
					img: 'category__img3.png',
					name: 'Gaming',
					counter: 7
				},
				{
					img: 'category__img1.png',
					name: 'Electronics',
					counter: 3
				},
				{
					img: 'category__img3.png',
					name: 'Gaming',
					counter: 7
				},
				{
					img: 'category__img1.png',
					name: 'Electronics',
					counter: 3
				},
				{
					img: 'category__img3.png',
					name: 'Gaming',
					counter: 7
				},
				{
					img: 'category__img1.png',
					name: 'Electronics',
					counter: 3
				},
				{
					img: 'category__img3.png',
					name: 'Gaming',
					counter: 7
				},
				{
					img: 'category__img1.png',
					name: 'Electronics',
					counter: 3
				},
				{
					img: 'category__img3.png',
					name: 'Gaming',
					counter: 7
				},
				{
					img: 'category__img1.png',
					name: 'Electronics',
					counter: 3
				},
			],
			listLevel2: [
				{
					name: 'Electronics',
					counter: 3
				},
				{
					name: 'Gaming',
					counter: 7
				},
				{
					name: 'Electronics',
					counter: 3
				},
				{
					name: 'Gaming',
					counter: 7
				},
				{
					name: 'Electronics',
					counter: 3
				},
				{
					name: 'Gaming',
					counter: 7
				},
				{
					name: 'Electronics',
					counter: 3
				},
				{
					name: 'Gaming',
					counter: 7
				},

			],
			listLevel3: [
				{
					name: 'Electronics',
					counter: 3
				},
				{
					name: 'Gaming',
					counter: 7
				},
				{
					name: 'Electronics',
					counter: 3
				},
				{
					name: 'Gaming',
					counter: 7
				},
				{
					name: 'Electronics',
					counter: 3
				},
				{
					name: 'Gaming',
					counter: 7
				},
				
			],
			listLevel4: [
				{
					name: 'Electronics',
					counter: 3
				},
				{
					name: 'Gaming',
					counter: 7
				},
				{
					name: 'Electronics',
					counter: 3
				},
				
			],
		}
	},
	methods:{
		panel() {
	    	this.panelOpen = true;
	    },
	}
}
</script>

<style lang="scss">
.correct-categories {
	padding-bottom: 20rem;
	&__box {
		padding-top: 40rem;
		&:not(:first-child) {
			margin-top: 50rem;
			border-top: 1px solid #D6D6D6;
		}
	}
	&__level {
		font-family: 'Atyp Display';
		line-height: 1;
		font-weight: 500;
	}
	&__title {
		margin-top: 15rem;
		font-family: 'Atyp Display';
	}
	&__list {
		padding-top: 20rem;
		margin: 0 0 0 -35rem;
	}

	&__item {
		margin-top: 10rem;
		margin-left: 20rem;
		width: calc( 25% - 20rem );
	}

	&__panel {
		margin: 20rem 0 0 0;
	}
}
</style>
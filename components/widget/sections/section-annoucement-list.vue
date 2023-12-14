<template lang="pug">
	//- // TODO возможно стоит удалить этот компонент, т.к. он не используется
	section.annoucement-list
		.annoucement-list__head.flex.flex_vertical.flex_justify
			.annoucement-list__title
				h1.annoucement-list__title-text.h2.h2_big {{title}}
				span.annoucement-list__title-counter.h3 ({{counter}})
			button-switcher.annoucement-list__switcher(:items="switchers" blue)
		part-search-filter.annoucement-list__filter(disabled)
			form-input.search-filter__field(
				name="name"
				label="Name"
			)
			form-input.search-filter__field(
				name="phone"
				type="tel"
				label="Phone"
			)
			form-input.search-filter__field(
				name="id"
				label="ID"
			)
			form-select.search-filter__field(
				value="Categories"
				name="category"
				:items="['Category 1', 'Category 2', 'Category 3']"
			)
			form-input.search-filter__field(
				name="cost"
				label="Cost"
			)
			form-input.search-filter__field(
				name="date"
				label="Date"
			)
		form-checkbox.annoucement-list__select-all(@change.native="panel")
			span.color-gray.h6 Select all
		part-annoucement-table.annoucement-list__table(:rows="rows" @showPanel="panel")

		.annoucement-list__items
			item-annoucement.annoucement-list__item(
				v-for="(item, i) in list"
				:key="i"
				:name="item.name"
				:user="item.user"
				:category="item.category"
				:status="item.status"
				:date="item.date"
				:to="item.to"
				:preview="item.preview"
				@showPanel="panel"
				small
			)

		transition(name="fade")
			part-annoucement-panel.annoucement-list__panel(v-if="panelOpen" @closePanel="panelOpen = false" modalName="modal-annoucement-list")
				button-medium.annoucement-panel__btn(icon="check" blue small) Active
				button-medium.annoucement-panel__btn(icon="user" blue small) Check
					span.hidden  other advertises
				button-medium.annoucement-panel__btn(icon="category" blue small) Change categories
				button-medium.annoucement-panel__btn(icon="minusCircle" blue small) Ban
					span.hidden  this person

		modal-panel(id="modal-annoucement-list")
			.modal-panel__item
				button-border.modal-panel__btn(icon="checkBig" blue BigIcon v-b-modal.modal-activated) Active
			.modal-panel__item
				button-border.modal-panel__btn(icon="closeBig" BigIcon gray v-b-modal.modal-refusal) Refuse
			.modal-panel__item
				button-border.modal-panel__btn(icon="profile" BigIcon gray) Check other advertises
			.modal-panel__item
				button-border.modal-panel__btn(icon="category" BigIcon gray) Change categories
			.modal-panel__item
				button-border.modal-panel__btn(icon="minusCircle" BigIcon gray) Ban this person

		modal-panel(id="modal-product-action")
			.modal-panel__item
				button-border.modal-panel__btn(icon="profile" BigIcon gray) Check other advertises
			.modal-panel__item
				button-border.modal-panel__btn(icon="category" BigIcon gray) Change categories
			.modal-panel__item
				button-border.modal-panel__btn(icon="minusCircle" BigIcon gray) Ban this person

		modal-activated
			| You have activated the ad, if it is an error, click «Cancel»
		modal-refusal

		modal-product

</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "Advertises"
		},
		counter: {
			type: Number,
			default: 1540
		},
	},
	data(){
		return{
			panelOpen: false,
			switchers: [
				{
					value: 'On moderation',
					text: 'On moderation',
					checked: true
				},
				{
					value: 'Active',
					text: 'Active'
				},
				{
					value: 'Non Active',
					text: 'Non Active'
				}
			],
			rows: [
				{
					img: 'item-card__img1.jpg',
					name: 'Продает Macbook M1 pro 2021 16’2',
					category: 'Electronics',
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					status: 'Non active',
					date: '11.04.22',
					id: '114575854'
				},
				{
					img: 'item-card__img1.jpg',
					name: 'Продает Macbook M1 pro 2021 16’2',
					category: 'Electronics',
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					status: 'Non active',
					date: '11.04.22',
					id: '114575854'
				},
				{
					img: 'item-card__img1.jpg',
					name: 'Продает Macbook M1 pro 2021 16’2',
					category: 'Electronics',
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					status: 'Non active',
					date: '11.04.22',
					id: '114575854'
				},
				{
					img: 'item-card__img1.jpg',
					name: 'Продает Macbook M1 pro 2021 16’2',
					category: 'Electronics',
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					status: 'Non active',
					date: '11.04.22',
					id: '114575854'
				},
				{
					img: 'item-card__img1.jpg',
					name: 'Продает Macbook M1 pro 2021 16’2',
					category: 'Electronics',
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					status: 'Non active',
					date: '11.04.22',
					id: '114575854'
				},
				{
					img: 'item-card__img1.jpg',
					name: 'Продает Macbook M1 pro 2021 16’2',
					category: 'Electronics',
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					status: 'Non active',
					date: '11.04.22',
					id: '114575854'
				}
			],
			list: [
				{
					name: 'Объектив SLR Magic. Sony E. 25mm f1.4',
					to: '#',
					user: 'Johnson',
					category: 'Electronics',
					date: '11.04.22',
					status: 'Non active',
					preview: 'item-card__img1.jpg',
				},
				{
					name: 'Объектив SLR Magic. Sony E. 25mm f1.4',
					to: '#',
					user: 'Johnson',
					category: 'Electronics',
					date: '11.04.22',
					status: 'Non active',
					preview: 'item-card__img1.jpg',
				},
				{
					name: 'Объектив SLR Magic. Sony E. 25mm f1.4',
					to: '#',
					user: 'Johnson',
					category: 'Electronics',
					date: '11.04.22',
					status: 'Non active',
					preview: 'item-card__img1.jpg',
				},
			]
		}
	},
	methods: {
	    panel() {
	    	this.panelOpen = true;
	    },
	},
}
</script>

<style lang="scss">
.annoucement-list{
	padding: 30rem 0;

	@include small-tablet {
		padding-bottom: 80rem;
	}

	@include large-mobile {
		padding: 20rem 0 60rem 0;
	}

	&__title {
		display: flex;
		&-text {
			font-family: 'Atyp Display';
			font-weight: 500;
		}
		&-counter {
			font-family: 'Atyp Display';
			margin-left: 10rem;
			font-weight: 500;
			padding-top: 10rem;
			font-size: 24rem;
			color: #9A9A9A;
		}

		@include large-tablet {
			&-counter {
				font-size: 18rem;
				padding-top: 8rem;
			}
		}

		@include large-mobile {
			&-counter {
				font-size: 17rem;
				padding-top: 5rem;
				margin-left: 8rem;
			}
		}
	}

	&__switcher {
		@include large-mobile {
			margin-top: 15rem;
			width: calc( 100% + 30rem );
		}
	}

	&__filter {
		margin-top: 40rem;
	}

	&__table {
		margin-top: 50rem;

		@include large-tablet {
			display: none;
		}
	}

	&__panel {
		margin-left: 0;
		margin-right: 0;
		margin-top: 10rem;
	}

	&__items {
		@include min-large-tablet {
			display: none;
		}
	}

	&__select-all {
		margin-top: 15rem;
		@include min-large-tablet {
			display: none;
		}
	}

	&__item {
		padding: 15rem 0;
		border-bottom: 1px solid $light-gray;
	}
}
</style>

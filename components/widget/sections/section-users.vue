<template lang="pug">
	section.section-users
		.section-users__head.flex.flex_vertical.flex_justify
			.section-users__head-column.section-users__head-column_left
				h1.section-users__title.h2.h2_big {{title}}
				button-docs.mobile-visible(to="#") Download EXCL
			.section-users__head-column.section-users__head-column_right.flex.flex_vertical
				.section-users__sort
					form-checkbox.section-users__sort-checkbox(@change.native="panel")
						p.color-gray Select all
					form-select.section-users__sort-select(label="Sort by" :items="['Newest', 'Popular']" value="Newest" noBorder)
				button-switcher.section-users__switcher(:items="switchers" blue)
		button-primary.section-users__btn-add.mobile-visible(border icon="plusBig" v-if="moderator") Add moderator
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
		part-users-table.section-users__table(
			:rows="rows" 
			:moderator="moderator" 
			@showPanel="panel"
		)

		.section-users__bottom.flex.flex_justify
			.section-users__bottom-column
				button-primary.section-users__btn(blue) Load more
			.section-users__bottom-column.flex
				button-primary.section-users__btn(gray icon="plusBig" v-if="moderator") Add moderator
				button-primary.section-users__btn(gray icon="download" to="#") Download base EXCL
		.section-users__panel-wrap
			button-action.section-users__btn-filter(circle icon="sliders")
			transition(name="fade")
				part-annoucement-panel.section-users__panel(v-if="panelOpen" @closePanel="panelOpen = false" modalName="modal-panel-users")
					button-medium.annoucement-panel__btn(icon="noneUser" blue small) Ban
					button-medium.annoucement-panel__btn(icon="user" blue small) Check
		modal-panel(id="modal-panel-users")
			.modal-panel__item
				button-border.modal-panel__btn(icon="user" blue BigIcon) Check
			.modal-panel__item
				button-border.modal-panel__btn(icon="noneUser" BigIcon gray) Ban
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "Users"
		},
		moderator: {
			type: Boolean,
			default: false
		},
		add: {
			type: Boolean,
			default: false
		},
	},
	data(){
		return{
			panelOpen: false,
			switchers: [
				{
					value: 'Active',
					text: 'Active',
					checked: true
				},
				{
					value: 'Ban',
					text: 'Ban'
				}
			],
			rows: [
				{
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					date: '11.04.22',
					id: '114575854'
				},
				{
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					date: '11.04.22',
					id: '114575454'
				},
				{
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					date: '11.04.22',
					id: '114575852'
				},
				{
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					date: '11.04.22',
					id: '414575854'
				},
				{
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					date: '11.04.22',
					id: '114335854'
				},
				{
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					date: '11.04.22',
					id: '114577854'
				},
				{
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					date: '11.04.22',
					id: '414575854'
				},
				{
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					date: '11.04.22',
					id: '114335854'
				},
				{
					user: 'Johnson',
					email: 'Bari56@mail.ru',
					phone: '+7 747 609 99 95',
					date: '11.04.22',
					id: '114577854'
				}
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
.section-users{
	padding: 30rem 0;
	position: relative;

	@include small-tablet {
		padding-bottom: 70rem;
	}

	@include large-mobile {
		padding-top: 20rem;
	}

	&__head {
		@include large-mobile {
			&-column {
				width: 100%;
				&_right {
					margin-top: 15rem;
				}
				&_left {
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
			}
		}
	}

	&__switcher {
		@include large-mobile {
			width: calc( 100% + 30rem );
		}
	}

	&__filter {
		margin-top: 45rem;
	}

	&__table {
		margin-top: 45rem;

		@include large-mobile {
			margin-top: 0;
			padding-top: 5rem;
		}
	}

	&__sort {
		margin-right: 20rem;
		display: flex;
		align-items: center;
		@include min-large-mobile {
			&-checkbox {
				display: none;
			}
		}

		@include large-mobile {
			order: 2;
			margin-top: 15rem;
			width: 100%;
			justify-content: space-between;
			margin-right: 0;
			padding: 0 5rem 0 11rem;
		}
	}

	&__bottom {
		margin-top: 40rem;

		@include large-mobile {
			display: none;
		}
	}

	&__btn {
		font-size: 14rem;
		min-width: 146rem;
		padding: 0 30rem;

		&:not(:last-child) {
			margin-right: 10rem;
		}
	}

	&__btn-filter {
		@include min-small-tablet {
			display: none;
		}
	}

	&__panel {
		margin-left: 0;
		margin-right: 0;
		position: static;

		&-wrap {
			position: sticky;
			bottom: 30rem;
			margin-top: 30rem;
			z-index: 50;
		}

		@include small-tablet {
			width: 100%;
			margin-top: 10rem;
			&-wrap {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-end;
				margin-top: -20rem;
				bottom: 63rem;
			}
		}

		@include large-mobile {
			&-wrap {
				margin-top: -50rem;
			}
		}
	}

	&__btn-add {
		margin-bottom: -5rem;
		margin-top: 15rem;
		width: 100%;
	}
}
</style>
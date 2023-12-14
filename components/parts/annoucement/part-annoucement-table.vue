<template lang="pug">
	.annoucement-table
		table
			thead
				tr
					th
						form-checkbox(@change.native="$emit('showPanel')")
					th Image
					th Name
					th Categories
					th User
					th Email
					th Phone
					th Status
					th Date public
					th ID
			tbody
				tr(v-for="(row, i) in rows" :key="i")
					td
						form-checkbox.users-table__checkbox(@change.native="$emit('showPanel')")
					td
						.annoucement-table__img
							set-img(img-class="object-fit" :default-img="require(`~/assets/img/${row.img}`)")
					td
						.annoucement-table__name {{row.name}}
					td {{row.category}}
					td {{row.user}}
					td {{row.email}}
					td {{row.phone}}
					td {{row.status}}
					td {{row.date}}
					td
						.annoucement-table__row
							.annoucement-table__id {{row.id}}
							.annoucement-table__buttons
								button-medium.annoucement-table__btn(icon="check" blue square v-b-modal.modal-activated)
								button-medium.annoucement-table__btn(icon="closeBig" gray square v-b-modal.modal-refusal)
								button-medium.annoucement-table__btn(icon="editSmall" border square v-b-modal.modal-product)
</template>

<script>
export default {
	props: {
		rows: {
			type: Array,
			default: () => ([
			])
		},
	},
}
</script>

<style lang="scss">
.annoucement-table{
	table {
		border-collapse: collapse;
		width: 100%;
	}
	tr {
		border-bottom: 1px solid $light-gray;
	}
	th {
		color: $gray;
		font-weight: 500;
		padding-bottom: 17rem;
	}
	th, td {
		&:first-child {
			width: 40rem;
		}
		&:nth-child(2) {
			width: 78rem;
		}
		&:nth-child(3) {
			width: 17%;
		}
		&:last-child {
			width: 16.5%;
		}
	}
	td {
		padding-bottom: 15rem;
		padding-top: 15rem;
		font-size: 15rem;
		font-weight: normal;
	}

	&__img {
		position: relative;
		overflow: hidden;
		width: 63rem;
		height: 60rem;
		border-radius: 10rem;
	}

	&__name {
		max-width: 223rem;
		padding-right: 20rem;
		font-weight: 500;
	}

	&__row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__buttons {
		display: flex;
		margin-left: 20rem;
	}

	&__btn {
		&:not(:first-child) {
			margin-left: 5rem;
		}
		&:last-child {
			margin-left: 10rem;
		}
	}
}
</style>
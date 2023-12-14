<template lang="pug">
	.users-table(:class="Mods")
		table
			thead.color-gray
				tr
					th
						form-checkbox.users-table__checkbox(@change.native="$emit('showPanel')")
					th
						| User
					th
						| Email
					th
						| Phone
					th
						| Date register
					th
						| ID
			tbody
				tr(v-for="(row, i) in rows" :key="i")
					td
						form-checkbox.users-table__checkbox(@change.native="$emit('showPanel')")
					td
						.users-table__label.mobile-visible User
						.users-table__text {{row.user}}
					td 
						.users-table__label.mobile-visible Email
						.users-table__text {{row.email}}
					td 
						.users-table__label.mobile-visible Phone
						.users-table__text {{row.phone}}
					td 
						.users-table__label.mobile-visible Date register
						.users-table__text {{row.date}}
					td 
						.users-table__id
							.users-table__id-wrap
								.users-table__label.mobile-visible ID
								.users-table__text {{row.id}}
							button-switcher.users-table__switcher(:items="switchers" light :name="row.id")
							.users-table__arrow.mobile-visible(v-b-modal.modal-panel-users)
								svg-icon(name="arrowRight")
</template>

<script>
export default {
	props: {
		moderator: {
			type: Boolean,
			default: false
		},
		rows: {
			type: Array,
			default: () => ([
			])
		},
	},
	data(){
		return{
			switchers: [
				{
					value: 'Ban',
					text: 'Ban'
				},
				{
					value: 'Check',
					text: 'Check',
					checked: true
				}
			],
		}
	},
	computed: {
		Mods(){
			return {
				'users-table_moderator': this.moderator,
			}
		}
	}
}
</script>

<style lang="scss">
.users-table{
	table {
		width: 100%;
	}
	th {
		font-weight: 500;
		text-align: left;
		padding-bottom: 17rem;
	}
	th, td {
		border-bottom: 1px solid $light-gray;
		&:first-child {
			width: 80rem;
		}
		&:last-child {
			width: 40%;
		}
	}
	td {
		padding: 20rem 0;
		font-size: 15rem;
	}

	&__id {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&_moderator {
		.users-table {
			&__switcher {
				.button-switcher__list {
					flex-direction: row-reverse;
				}
			}
		}
	}

	&__switcher {
		margin-left: 10rem;

		@include large-mobile {
			display: none;
		}
	}

	&__label {
		font-size: 10rem;
		margin-bottom: 1px;
		color: #AEAEAE;
	}

	&__arrow {
		width: 12rem;
		height: 10rem;
		fill: none;
		stroke: $gray;
		stroke-width: 2px;
		svg {
			width: 100%;
			height: 100%;
		}
	}

	@include large-tablet {
		th, td {
			&:first-child {
				width: 35rem;
			}
			&:nth-child(3) {
				display: none;
			}
		}
	}

	@include large-mobile {
		table {
			border-collapse:separate;
			border-spacing: 0 10rem;
		}
		thead {
			display: none;
		}
		td {
			border-bottom: 1px solid #ECECEC;
			border-top: 1px solid #ECECEC;
			padding-top: 12rem;
			padding-bottom: 12rem;
			font-size: 12rem;
			&:first-child {
				border-left: 1px solid #ECECEC;
				padding-left: 10rem;
				border-radius: 15rem 0 0 15rem;
				width: 38rem;
			}
			&:last-child {
				border-right: 1px solid #ECECEC;
				padding-right: 10rem;
				border-radius: 0 15rem 15rem 0;
				width: 33.33%;
			}
			&:nth-child(4) {
				display: none;
			}
		}
	}
}
</style>
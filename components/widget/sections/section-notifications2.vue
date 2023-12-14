<template lang="pug">
	//- // TODO возможно стоит удалить
	//- section.section-notifications
		h1.section-notifications__title.h3 {{title}}
		part-back-nav.section-notifications__nav(:nav="nav" mobile)
			a.back-nav__read(href="#") Mark all as read
		.section-notifications__list
			item-notification.section-notifications__item(
				v-for="(item, i) in list"
				:key="i"
				:title="item.title"
				:columns="item.columns"
				:unread="item.unread"
				:desc="item.desc"
				:date="item.date"
				columns
			)
		modal-notification
</template>

<script>
// export default {
// 	props: {
// 		title: {
// 			type: String,
// 			default: "Notifications"
// 		},
// 		list: {
// 			type: Array,
// 			default: () => ([
// 			])
// 		},
// 	},
// 	data() {
// 		return {
// 			nav: [
// 				{
// 					text: 'all',
// 					to: '/notifications',
// 				},
// 				{
// 					text: 'Type one',
// 					to: '/notifications2',
// 					class: 'isActive'
// 				},
// 				{
// 					text: 'Type two',
// 					to: '#two',
// 				},
// 			],
// 		};
// 	},
// }
</script>

<style lang="scss">
.section-notifications{
	padding: 70rem 0;
	@include large-mobile {
		padding: 20rem 0 70rem 0;
	}
	&__title {
		font-family: 'Atyp Display';
		font-weight: 500;
	}

	&__nav {
		margin-top: 30rem;

		@include large-mobile {
			margin-top: 20rem;
		}
	}

	&__list {
		margin-top: 4rem;
		margin-left: -20rem;

		@include large-desktop {
			margin-left: 0;
		}

		@include large-mobile {
			margin-top: 0;
		}
	}

	&__item {
		padding-top: 40rem;
		padding-bottom: 40rem;
		border-bottom: 1px solid $light-gray;
		@include large-mobile {
			padding-top: 30rem;
			padding-bottom: 30rem;
		}
	}
}
</style>

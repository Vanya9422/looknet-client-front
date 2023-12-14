<template lang="pug">
	section.support-chat
		.support-chat__top
			.support-chat__head.flex.flex_vertical.flex_justify
				h1.support-chat__title.h2.h2_big {{title}}
				button-switcher.support-chat__head-switcher(:items="switchers" blue)
			part-search-filter.support-chat__filter(disabled)
				form-input.search-filter__field(
					name="Title"
					label="Title"
				)
				form-input.search-filter__field(
					name="Description"
					label="Description"
				)
				form-input.search-filter__field(
					name="Status"
					label="Status"
				)
				form-input.search-filter__field(
					name="Date"
					label="Date"
				)
			part-back-nav.support-chat__nav(:nav="nav")
		.support-chat__body
			part-chat-table.support-chat__table(:rows="rows")
			part-chat-sidebar.support-chat__sidebar(:list="list")
		.support-chat__bottom
			button-switcher.support-chat__switcher(:items="switchers" name="switchers2" blue)
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "Themes"
		},
		
	},
	data(){
		return{
			switchers: [
				{
					value: 'New (+13)',
					text: 'New',
					counter: +313,
					checked: true
				},
				{
					value: 'Viewed (313)',
					text: 'Viewed',
					counter: 313,
				},
				{
					value: 'Expectation (14)',
					text: 'Expectation',
					counter: 14,
				},
				{
					value: 'Close (313)',
					text: 'Close',
					counter: 313,
				},
			],
			nav: [
				{
					text: 'Register',
					counter: 3,
					class: 'isActive'
				},
				{
					text: 'Login',
					counter: 1,
				},
				{
					text: 'Claim',
					counter: 3,
				},
				{
					text: 'Other',
					counter: 4,
				},
				{
					text: 'Closed',
					counter: 4,
				}
			],
			rows: [
				{
					title: 'I forgot my password',
					desc: 'I forgot my password, help me please forgot my password, help me please forgot my password',
					status: 'Wait for answer',
					date: '31/02/2021',
				},
				{
					title: 'I forgot my password',
					desc: 'I forgot my password, help me please forgot my password, help me please forgot my password',
					status: 'Wait for answer',
					date: '31/02/2021',
				},
				{
					title: 'I forgot my password',
					desc: 'I forgot my password, help me please forgot my password, help me please forgot my password',
					status: 'Wait for answer',
					date: '31/02/2021',
				},
				{
					title: 'I forgot my password',
					desc: 'I forgot my password, help me please forgot my password, help me please forgot my password',
					status: 'Wait for answer',
					date: '31/02/2021',
				},
				{
					title: 'I forgot my password',
					desc: 'I forgot my password, help me please forgot my password, help me please forgot my password',
					status: 'Wait for answer',
					date: '31/02/2021',
				},
				{
					title: 'I forgot my password',
					desc: 'I forgot my password, help me please forgot my password, help me please forgot my password',
					status: 'Wait for answer',
					date: '31/02/2021',
				},
				{
					title: 'I forgot my password',
					desc: 'I forgot my password, help me please forgot my password, help me please forgot my password',
					status: 'Wait for answer',
					date: '31/02/2021',
				},
			],
			list: [
				{
					text: 'A pleasure to contact with you pleasure to contact with you',
				},
				{
					name: 'Johnson',
					avatar: 'User4.jpg',
					desc: 'Macbook pro 2016 text',
					text: 'A pleasure to contact with you pleasure to contact with you',
					counter: 2
				},
				{
					name: 'Johnson',
					avatar: 'User4.jpg',
					desc: 'Macbook pro 2016 text',
					text: 'A pleasure to contact with you pleasure to contact with you',
				},
				{
					name: 'Alexandr',
					avatar: 'User3.jpg',
					desc: 'Macbook pro 2016 text',
					text: 'A pleasure to contact with you pleasure to contact with you',
					counter: 2
				},
				{
					name: 'Johnson',
					avatar: 'User4.jpg',
					desc: 'Macbook pro 2016 text',
					text: 'A pleasure to contact with you pleasure to contact with you',
					counter: 2
				},
				{
					name: 'Johnson',
					avatar: 'User4.jpg',
					desc: 'Macbook pro 2016 text',
					text: 'A pleasure to contact with you pleasure to contact with you',
				},
				{
					name: 'Alexandr',
					avatar: 'User3.jpg',
					desc: 'Macbook pro 2016 text',
					text: 'A pleasure to contact with you pleasure to contact with you',
					counter: 2
				},
				{
					name: 'Johnson',
					avatar: 'User4.jpg',
					desc: 'Macbook pro 2016 text',
					text: 'A pleasure to contact with you pleasure to contact with you',
					counter: 2
				},
				{
					name: 'Johnson',
					avatar: 'User4.jpg',
					desc: 'Macbook pro 2016 text',
					text: 'A pleasure to contact with you pleasure to contact with you',
				},
				{
					name: 'Alexandr',
					avatar: 'User3.jpg',
					desc: 'Macbook pro 2016 text',
					text: 'A pleasure to contact with you pleasure to contact with you',
					counter: 2
				},
			],
		}
	}
}
</script>

<style lang="scss">
.support-chat{
	padding: 33rem 0 80rem 0;

	@include small-tablet {
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
		padding-bottom: 70rem;
	}

	@include large-mobile {
		padding: 20rem 0 58rem 0;
	}

	&__head {
		@include small-tablet {
			&-switcher {
				display: none;
			}
		}
	}

	&__filter {
		margin-top: 30rem;
	}

	&__nav {
		margin-top: 50rem;

		@include small-tablet {
			margin-top: 100rem;
		}

		@include large-mobile {
			.back-nav__btn {
				padding-left: 15rem;
				padding-right: 15rem;
			}
		}
	}

	&__table {
		margin-top: 50rem;

		@include small-tablet {
			display: none;
		}
	}
	&__body {
		@include small-tablet {
			display: flex;
			flex-direction: column;
			position: relative;
			flex: 1 1 auto;
		}
	}

	&__bottom {
		margin-top: 10rem;
		border-top: 1px solid $light-gray;
		padding-top: 20rem;
		margin-left: -32px;
		margin-right: -32px;
		padding-left: var(--wrapper-offset);
		padding-right: var(--wrapper-offset);
		@include min-small-tablet {
			display: none;
		}
		@include large-mobile {
			padding-top: 10rem;
			overflow: hidden;
			margin-left: -15rem;
			margin-right: -15rem;
			.button-switcher {
				&__btn {
					padding-left: 20rem;
					padding-right: 20rem;
				}
			}
		}
	}

	&__sidebar {
		@include min-small-tablet {
			display: none!important;
		}
		@include small-tablet {
			padding-bottom: 0!important;
			margin-top: 10rem;
			.chat-sidebar {
				&__top {
					display: none;
				}
				&__container-wrap {
					padding: 0 12rem 0 0;
				}
			}
		}
	}
}
</style>
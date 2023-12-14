<template lang="pug">
	section.section-notifications.section-notifications_not-found
		.section-notifications__top
			h1.section-notifications__title.h3 {{title}}
		.section-notifications__center
			part-not-notification.section-notifications__not-notification(:img="img") {{text}}
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "Notifications"
		},
		text: {
			type: String,
			default: ""
		},
		img: {
			type: String,
			default: "not-notification___chat.png"
		},
	},
}
</script>

<style lang="scss">
.section-notifications{
	padding: 70rem 0;
	&_not-found {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
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

	&__center {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1 1 auto;

		@include large-mobile {
			display: block;
		}
	}
	&__not-notification {
		margin: auto;
		@include large-mobile {
			margin-top: 37rem;
		}
	}
}
</style>

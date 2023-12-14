<template lang="pug">
	.page-helper
		.page-helper__button.h4(@click="ToggleWindow") {{ ButtonLabel }}

		.page-helper__info(v-if="Opened")
			h5.page-helper__title.h5 Список всех страниц

			.page-helper__scroll.css-scrollbar.content
				ul
					li(v-for="(Page, PID) in PageList" :key="PID")
						NuxtLink.link(:to="Page.path") {{ Page.name }}
</template>

<script>
export default {
	data(){
		return {
			Opened: false,

			// PageList: {
			// 	"Главная": "/",
			// 	"Каталог": "/catalog",
			// 	"Контакты": "/contacts",
			// 	"Карточка": "/single",
			// 	"Помощь": "/support",
			// 	"Мои объявления": "/announcements",
			// 	"Создать объявлениe": "/create-ad",
			// 	// "Favorites ad": "/favorites-ad",
			// }
		}
	},

	computed: {
		ButtonLabel(){
			return this.Opened ? 'x' : 'i';
		},

		PageList(){
			return this.$router.options.routes.map(Route => (
				{
					name: Route.name,
					path: Route.path
				}
			))
		}
	},

	methods: {
		ToggleWindow(){
			this.Opened = !this.Opened 
		}
	}
}
</script>

<style lang="scss">
.page-helper{
	position: fixed;
	right: 0;
	bottom: 0;
	z-index: 1;

	&__info{
		background: #eff2f4;
		border-radius: 24rem;
		padding: 24rem;

		width: 500rem;
		max-width: calc(100vw - 60rem);

		position: absolute;
		bottom: 100%;
		margin-bottom: 30rem;
		margin-right: 30rem;
		right: 0;
		border: 2px solid #fff;

		//
	}

	&__scroll{
		max-height: 240rem;

		li{
			&:not(:last-child){
				margin-bottom: 12rem;
			}
		}

		a{
			&.nuxt-link-exact-active{
				text-decoration: underline;
			}
		}
	}

	&__title{
		margin-bottom: 20rem;
	}

	&__button {
		width: 60rem;
		height: 60rem;
		border-radius: 50%;
		border: 4px solid $blue;

		background: #fff;

		display: flex;
		align-items: center;
		justify-content: center;

		margin-right: 20rem;
		margin-bottom: 20rem;
		padding-bottom: 5rem;

		cursor: pointer;

		user-select: none;

		transition: ease .1s;

		&:hover{
			background: $blue;
			border-color: $blue;
			color: #fff;
		}

		@include large-mobile {
			margin-bottom: 80rem;
		}
	}
}
</style>
<template lang="pug">
	.container
		.container__row
			.container__column.container__column_left
				part-back-sidebar(:nav="nav")

			.container__column.container__column_right
				.container__inner
					part-header(back)

				Nuxt
				part-mobile-menu
				client-only
					modal-search
</template>
<script>
export default {
	data(){
		return{
			nav: [
				{
					icon: 'apps',
					to: '/announcement-list',
					name: 'Advertises'
				},
				{
					icon: 'user',
					to: '/users',
					name: 'Users'
				},
				{
					icon: 'shield',
					to: '/moderators',
					name: 'Moderators'
				},
				{
					icon: 'editText',
					to: '/сorrect-text',
					name: 'Correct the text'
				},
				{
					icon: 'support',
					to: '/support-chat',
					name: 'Support chat',
				},
				{
					icon: 'wallet',
					to: '/commercial',
					name: 'Commercial',
				}
			]
		}
	},
}
</script>

<template lang="pug">
	.social(:class="Mods")
		ul.social__list.flex
			li.social__item(
				v-for="(link, name) in list" :key="name"
			)
				a.social__link(
					:href="link"
					:class="`social__link_${name}`"
					target="_blank"
				)
					svg-icon.social__icon(
						:name="name"
					)
</template>

<script>
export default {
	props: {
		list: {
			type: Object,
			default: () => ({
				fb: 'https://facebook.com/',
				instagram: 'https://www.instagram.com',
				whatsapp: 'https://www.whatsapp.com/',
				in: 'https://ca.linkedin.com/',
				youtube: 'https://www.youtube.com'
			})
		},
		small: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		Mods(){
			return {
				'social_small': this.small,
			}
		}
	}
}
</script>

<style lang="scss">
.social{
	&_small {
		.social {
			&__link {
				width: 26rem;
				height: 26rem;
				border: 0;
				fill: #9A9A9A;
			}
		}
	}
	&__list{
		margin: -5rem;
	}
	&__item{
		display: block;
		margin: 5rem;
	}
	&__link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 42rem;
		height: 42rem;
		border: 1px solid rgba(195, 200, 203, 0.5);
		border-radius: 12rem;
		fill: #C3C8CB;
		fill-rule: evenodd;
		clip-rule: evenodd;
		transition: ease .12s;
		&:hover {
			fill: $blue;
		}
	}
	&__icon {
		width: 20rem;
		height: 20rem;
	}
}
</style>
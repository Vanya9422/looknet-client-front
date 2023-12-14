<template lang="pug">
	.single-box
		.single-box__top.flex.flex_justify.flex_start
			module-user-info.single-box__user.mobile-hidden(
				:avatar="avatar"
				:name="name"
				:about="about"

				verified
			)
			.single-box__stat.flex
				.single-box__stat-item(v-if="id") ID {{id}}
				.single-box__stat-item(v-if="date") ID {{date}}
				.single-box__stat-item(v-if="views")
					module-single-views.single-box__views {{views}}
		.single-box__center
			button-action.single-box__favorite.mobile-visible(gray)
			h2.single-box__title.h2 {{title}}
			.single-box__price.h2.color-blue $ {{ numberWithSpaces(price) }}
		button-primary.single-box__btn.mobile-hidden(blue big to="tel:`${phoneNumber}`" link)
			span.phone {{ phone }}
		button-primary.single-box__btn.mobile-visible(blue big to="tel:`${phoneNumber}`" link icon="phone") {{ phone }}
</template>

<script>
import { numberWithSpaces } from "~/assets/js/functions"
export default {
	props: {
		avatar: {
			type:String,
			default: 'user-avatar.jpg'
		},
		name: {
			type:String,
			default: 'Antony Watson'
		},
		about: {
			type:String,
			default: 'Registered mart 2022'
		},
		id: {
			type:String,
			default: '312300120312'
		},
		date: {
			type:String,
			default: '2 days ago'
		},
		views: {
			type:String,
			default: '2120'
		},
		title: {
			type:String,
			default: 'Объектив SLR Magic. Sony E. 25mm f1.4'
		},
		price: {
			type: Number,
			default: 2800
		},
		phoneNumber: {
			type: String,
			default: "+13762665353"
		},
		phone: {
			type: String,
			default: "+ 1 376 266 5353"
		},
	},
	data(){
		return {
			numberWithSpaces
		}
	},
}
</script>

<style lang="scss">
.single-box{
	padding: 40rem 30rem;
	border: 1px solid $light-gray;
	border-radius: 20rem;

	@include large-mobile {
		padding: 0;
		border: 0;
		border-radius: 0;
		padding-bottom: 20rem;
		border-bottom: 1px solid $light-gray;
		display: flex;
		flex-wrap: wrap;
	}

	&__top {
		@include large-mobile {
			order: 3;
			width: 100%;
		}
	}

	&__stat {
		color: #9A9A9A;
		line-height: 1;
		&-item {
			&:not(:last-child) {
				padding-right: 15rem;
			}
			&:not(:first-child) {
				padding-left: 15rem;
				border-left: 1px solid $light-gray;
			}
		}

		@include large-mobile {
			margin-top: 20rem;
			width: 100%;
			justify-content: space-between;
			&-item {
				&:not(:first-child) {
					border-left: 0;
				}
				&:nth-child(2) {
					margin-right: auto;
				}
			}
		}
	}

	&__views {
		color: #9A9A9A;
		font-weight: 500;
		.single-views__icon {
			fill: #9A9A9A;
		}
	}

	&__center {
		margin-top: 30rem;
		display: flex;
		justify-content: space-between;
		position: relative;

		@include large-mobile {
			margin-top: 0;
			display: block;
			padding-right: 30rem;
		}
	}

	&__price {
		margin-left: 20rem;
		white-space: nowrap;
		@include large-mobile {
			margin-left: 0;
			margin-top: 10rem;
		}
	}

	&__btn {
		min-width: 340rem;
		margin-top: 40rem;

		@include large-mobile {
			margin-top: 20rem;
			width: 100%;
			min-width: inherit;
		}
	}

	&__favorite {
		position: absolute;
		right: -5rem;
		top: -5rem;
	}
}
</style>
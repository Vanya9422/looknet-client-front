<template lang="pug">
	.item-photo(:class="Mods" @click="$emit('showPanel')")
		.item-photo__wrap
			.item-photo__img(v-if="img")
				set-img.object-fit(:default-img="require(`~/assets/img/${img}`)")
			.item-photo__img(v-else)
				.item-photo__icon
					svg-icon(name="image")
		.item-photo__bottom
			.item-photo__name {{name}}
			.item-photo__size.color-gray {{size}}
</template>

<script>
export default{
	props: {
		img: {
			type: String,
			default: ""
		},
		name: {
			type: String,
			default: "SLR Magic09743.PNG"
		},
		size: {
			type: String,
			default: "7 MB"
		},
	},
}
</script>

<style lang="scss">
.item-photo {
	cursor: pointer;
	&.isActive, &:hover {
		.item-photo__wrap:before {
			opacity: 1;
		}
	}
	&__wrap {
		position: relative;
		&:before {
			content: '';
			display: block;
			position: absolute;
			left: -6rem;
			top: -6rem;
			width: calc( 100% + 12rem );
			height: calc( 100% + 12rem );
			border-radius: 23rem;
			border: 2px solid $blue;
			opacity: 0;
			transition: ease .15s;
		}

		@include large-mobile {
			&:before {
				left: -3px;
				top: -3px;
				width: calc( 100% + 6px );
				height: calc( 100% + 6px );
				border: 1px solid $blue;
				border-radius: 11rem;
			}
		}
	}

	&__img {
		position: relative;
		overflow: hidden;
		background: #EEF1FE;
		border-radius: 20rem;
		padding-top: div( 202, 221 ) * 100%;

		@include large-mobile {
			border-radius: 10rem;
			padding-top: div( 154, 170 ) * 100%;
		}
	}

	&__icon {
		width: 42rem;
		height: 42rem;
		position: absolute;
		left: 50%;
		top: 50%;
		margin: -21rem 0 0 -21rem;
		stroke: $blue;
		stroke-width: 1.5;
		fill: none;
		svg {
			height: 100%;
		}

		@include large-mobile {
			width: 34rem;
			height: 34rem;
			margin: -17rem 0 0 -17rem;
		}
	}

	&__bottom {
		display: flex;
		justify-content: space-between;
		margin-top: 15rem;

		@include large-mobile {
			margin-top: 10rem;
			display: block;
		}
	}

	&__name {
		@include large-mobile {
			font-weight: 600;
		}
	}

	&__size {
		white-space: nowrap;
		margin-left: 15rem;
		@include large-mobile {
			margin-left: 0;
			margin-top: 6rem;
		}
	}

}
</style>
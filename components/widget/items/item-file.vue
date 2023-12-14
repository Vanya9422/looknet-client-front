<template lang="pug">
	.item-file(:class="Mods")
		button-medium.item-file__delete(@click.prevent.native="$emit('delete')" type="button" verysmall transparent square icon="deleteBig")
		.item-file__img(v-if="img")
			set-img(img-class="object-fit" :src="img" :default-img="img")
		.item-file__doc(v-if="!isImage")
			.item-file__icon
				svg-icon(name="paper")
			.item-file__name {{docName}}
			.item-file__size {{docSize}}

</template>

<script>
export default{
	props: {
		img: {
			type: String,
			default: ""
		},
		docName: {
			type: String,
			default: ""
		},
		docSize: {
			type: String,
			default: ""
		},
    isImage: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		Mods(){
			return {
				'isActive': this.show,
				'item-tariff_blue': this.blue,
			}
		}
	}
}
</script>

<style lang="scss">
.item-file{
	position: relative;
	background: #F4F3F4;
	padding-top: 100%;
	border-radius: 6rem;
	overflow: hidden;

	&__img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	&__delete {
		position: absolute;
		right: 5rem;
		top: 5rem;
		z-index: 5;
	}

	&__doc {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 10rem;
	}

	&__icon {
		width: 12rem;
		height: 14rem;
		fill: #9A9A9A;
		margin-bottom: 10rem;
		svg {
			width: 100%;
			height: 100%;
		}
	}

	&__name {
		color: $gray;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&__size {
		margin-top: 1px;
		color: #9A9A9A;
	}
}
</style>
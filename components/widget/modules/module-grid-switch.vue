<template lang="pug">
	.grid-switch
		label.grid-switch__item
			input.grid-switch__input(type="radio" :name="name" @change="changeType(false)" :checked="!PRODUCT_CART_TYPE")
			svg-icon.grid-switch__icon(name="grid2")
		label.grid-switch__item
			input.grid-switch__input(type="radio" :name="name" @change="changeType(true)" :checked="PRODUCT_CART_TYPE")
			svg-icon.grid-switch__icon(name="list")
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
	props: {
		name: {
			type: String,
			default: 'grid'
		},
	},
  methods: {
    ...mapActions({
      SET_PRODUCT_CART_TYPE:'product/SET_PRODUCT_CART_TYPE'
    }),
    changeType(type){
      this.SET_PRODUCT_CART_TYPE(type)
    }
  },
  mounted() {
		if (process.client) {
    	this.SET_PRODUCT_CART_TYPE(JSON.parse(localStorage.getItem('cartType')));
		}
  },
  computed:{
    ...mapGetters({
      PRODUCT_CART_TYPE:'product/PRODUCT_CART_TYPE'
    })
  }
}
</script>

<style lang="scss">
.grid-switch{
	display: flex;
	&__item {
		cursor: pointer;
		width: 14rem;
		height: 14rem;
    transform: rotate(90deg);
		&:not(:last-child) {
			margin-right: 30rem;
		}

		@include large-mobile {
			&:not(:last-child) {
				margin-right: 16rem;
			}
		}
	}
	&__input {
		display: none;
		&:checked {
			& + .grid-switch__icon {
				fill: $default;
			}
		}
	}
	&__icon {
		width: 100%;
		height: 100%;
		transition: ease .12s;
		fill: $light-gray;
	}
}
</style>

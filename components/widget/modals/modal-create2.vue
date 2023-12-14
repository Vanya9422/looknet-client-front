<template lang="pug">
	b-modal(
		id="modal-create2"
		size="create-size"
		modal-class="modal-create"
		body-class="modal-create__body"
		header-class="modal-create__header"
		footer-class="modal-create__footer"
		centered
	)

		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')
			.modal-create__title.h4 {{ content.mainCategory.chooseAnotherCategory }}
			.modal-create__breadcrumbs.color-gray.p
				span.modal-create__breadcrumbs-item(v-for="(item, i) in breadcrumbs" :key="i")
					| {{item}}
			.modal-create__nav.flex.flex_vertical.flex_justify
				button-back.modal-create__back(small gray @click.native='close()') {{ POPUP_GLOBAL.back }}
				transition(name="fade")
					button-action.modal-create__nav-btn(icon="search" text="Search" small gray @click.native="showSearch" v-if="search != true")
			transition(name="fade")
				form.modal-create__search(action="/#search" v-if="search")
					.modal-create__search-field
						form-input.modal-create__search-input(placeholder="Search" ref="InputSearch")
						button-action.modal-create__search-btn(icon="search" small gray)
						button-close.modal-create__search-clear(type="button" white)
					.modal-create__search-cancel(@click="closeSearch") {{ POPUP_GLOBAL.cancel }}
		.modal-create__categories
			.modal-create__categories-list.flex
				.modal-create__categories-item(v-for="(category, i) in categories" :key="i")
					button-category.modal-create__categories-btn(
						:img="category.img"
						:to="category.to"
						:text="category.text"
						:desc="category.desc"
						:border="category.border"
						v-b-modal.modal-create3
						@click.native="$bvModal.hide('modal-create2');$bvModal.hide('modal-create')"
					)

		template(#modal-footer='{ close }')
			button-primary.modal-create__cancel(border @click.native='close()') {{ POPUP_GLOBAL.cancel }}
</template>

<script>
import { mapGetters } from "vuex";

export default{
  props: {
    content: {
      type: Object,
      default: () => {}
    },
  },
	data(){
		return {
			search: false,
			categories: [
				{
					img: "category__img1.png",
					text: 'Electronics',
				},
				{
					img: "category__img2.png",
					text: 'Appliances',
				},
				{
					img: "category__img3.png",
					text: 'Computers',
				},
				{
					img: "category__img4.png",
					text: 'Automotive products',
				},
				{
					img: "category__img1.png",
					text: 'Electronics',
				},
				{
					img: "category__img2.png",
					text: 'Appliances',
				},
				{
					img: "category__img3.png",
					text: 'Computers',
				},
				{
					img: "category__img4.png",
					text: 'Automotive products',
				},
				{
					text: 'Electronics',
				},
				{
					text: 'Appliances',
				},
				{
					text: 'Computers',
				},
				{
					text: 'Automotive products',
				},
			],
			breadcrumbs: [
				'Creat Advertise',
				'Electronics'
			],
		}
	},
	computed: {
    ...mapGetters({
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
    })
	},
	methods:{
		showSearch(){
			this.search = true
		},
		closeSearch(){
			this.search = false
		}
	}
}
</script>

<style lang="scss">
@import '~/assets/сss/components/modal-create.scss';
</style>

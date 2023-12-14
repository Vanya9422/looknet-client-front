<template lang="pug">
	b-modal(
		:id="id"
		size="users"
		modal-class="modal-panel"
		body-class="modal-panel__body"
		header-class="modal-panel__header"
		footer-class="modal-panel__footer"
		centered
	)

		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')
		h3.modal-panel__title.h3 {{ title }}
		.modal-panel__list
			slot
		template(#modal-footer='{ close }')
			button-border.modal-panel__cancel(gray @click.native='close()') {{ cancelMessage }}

</template>
<script>
import { mapGetters } from "vuex";

export default{
	props: {
		title: {
			type: String,
			default: 'Select an action'
		},
		id: {
			type: String,
			default: 'modal-panel'
		}
	},
	computed: {
    ...mapGetters({
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
    }),
	cancelMessage(){
		const message = this.POPUP_GLOBAL?.cancel || 'Cancel';
		return message
	}
	},
}
</script>

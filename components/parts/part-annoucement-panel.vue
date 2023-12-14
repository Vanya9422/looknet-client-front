<template lang="pug">
	.annoucement-panel
		.annoucement-panel__row.flex.flex_vertical.flex_justify
			.annoucement-panel__column
				form-checkbox.annoucement-panel__checkbox(checked light)
					strong.p {{selected}} ad selected
			.annoucement-panel__column.mobile-hidden.flex.flex_vertical
				slot
				button-medium.annoucement-panel__cancel(blue small @click.native="$emit('closePanel')") Cancel
			button-link-arrow.annoucement-panel__action.mobile-visible(white @click.native="$bvModal.show(`${modalName}`)") Actions
</template>

<script>
export default {
	props: {
		modalName: {
			type: String,
			default: 'modal-panel'
		},
		selected: {
			type: Number,
			default: 1
		},
	},
}
</script>

<template>
	<b-modal
		id="modal-notification"
		ref="modal-notification"
		size="notification-size"
		modal-class="modal-notification"
		body-class="modal-notification__body"
		header-class="modal-notification__header"
		footer-class="modal-notification__footer"
		centered="centered"
		@hide="$emit('hide')"
	>
		<template #modal-header="{ close }">
			<button-close class="modal__close" @click.native="close()"></button-close>
		</template>
		<module-date class="modal-notification__date" v-if="date">{{ date }}</module-date>
		<div class="modal-notification__title h4">{{ title }}</div>
		<div class="modal-notification__content content" v-html="content"></div>
		<template #modal-footer="{ close }">
			<button-primary
				class="modal-notification__close"
				border="border"
				@click.native="close()"
			>
				{{ POPUP_GLOBAL.close }}
			</button-primary>
			<!-- <div class="modal-notification__buttons">
				<button-primary
					class="modal-notification__btn"
					gray="gray"
					@click.native="$emit('delete'), close()"
				>
					{{ POPUP_GLOBAL.delete }}
				</button-primary> -->
				<!-- <button-primary class="modal-notification__btn" blue="blue"
					@click.native="close()">Actions</button-primary> -->
			<!-- </div> -->
		</template>
	</b-modal>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	props: {
		date: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		},
	},
	computed: {
		...mapGetters({
			POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
		})
	},
}
</script>

<style lang="scss">
.modal-notification {
	.modal-content {
		padding: 50rem;
	}

	@include large-mobile {
		padding: 0 !important;

		.modal-content {
			padding: 25rem 15rem;
		}
	}

	&__date {
		@include large-mobile {
			display: none !important;
		}
	}

	&__title {
		margin-top: 30rem;
		font-family: 'Gilroy';
		font-weight: 600;

		@include large-mobile {
			margin-top: 0;
			font-size: 20rem;
			max-width: calc(100% - 60rem);
		}
	}

	&__content {
		margin-top: 20rem;
		color: $gray;
		line-height: 1.3;
		min-height: 220rem;

		@include large-mobile {
			margin-top: 15rem;
			min-height: 200rem;
			font-size: 16rem;
		}
	}

	&__footer {
		margin-top: 30rem;
		border: 0;

		@include large-mobile {
			margin-top: 25rem;
			display: block;
		}
	}

	&__close {
		min-width: 160rem;

		@include large-mobile {
			display: none;
		}
	}

	&__buttons {
		display: none;

		@include large-mobile {
			display: flex;
			@include items(2, 5);
		}
	}
}</style>

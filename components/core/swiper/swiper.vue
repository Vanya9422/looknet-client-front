<template lang="pug">
	.swiper(ref="swiper")
		.swiper-wrapper
			slot

		slot(name="nav")
</template>

<script>
import Swiper from "swiper";

export default {
	props: {
		options: {
			type: Object,
			default: () => ({}),
		},

		value: {
			type: Object,
			default: () => ({}),
		},
	},

	watch: {
		Instance(swiper) {
			this.$emit("input", swiper);
		},
	},

	data() {
		return {
			Instance: this.value,
		};
	},

	mounted() {
		this.SwiperInit();
	},

	beforeDestroy() {
		this.SwiperDestroy();
	},

	methods: {
		SwiperInit() {
			if (!process.client) return false;

			const $swiper = this.$refs.swiper;

			if (!$swiper) return false;

			this.Instance = new Swiper($swiper, this.options);
		},

		SwiperDestroy() {
			if (!this.Instance) return false;

			this.Instance.destroy();

			this.Instance = null;
		},
	},
};
</script>

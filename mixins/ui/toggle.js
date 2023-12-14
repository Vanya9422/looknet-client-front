export default {
	props: {
		name: {
			type: String,
		},

		use: {
			type: [String, Number, Boolean, Object],
			default: ""
		},

		value: {
			type: [String, Array, Number, Boolean],
			default: ""
		}
	},
	computed: {
		model: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			},
		},
	},
	methods: {
		ChangeHandler(evt) {
			const $input = evt.currentTarget;
			const isChecked = $input.checked;

			this.$emit('change', isChecked);

		}
	},
};
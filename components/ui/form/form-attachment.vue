<template lang="pug">
label.form-attachment
	input.form-attachment__field(
		type='file'
		:name='name'
		:accept='accept'
		@change='handleFormAttachmentFieldChange'
		multiple)
	span.form-attachment__content.flex.flex_nowrap.flex_vertical
		svg-icon.form-attachment__icon(
			name='attachment'
		)
		span.form-attachment__text.h6.color-gray
			| {{ translatedContent.text }}
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },

    name: {
      type: String,
      default: "attachment-file",
    },

    accept: {
      type: String,
      default: "",
    },

    translatedContent: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    handleFormAttachmentFieldChange(event) {
      const { target } = event;
      const { files } = target;
      const filteredFiles = [];

      for (let index = 0; index < files.length; index++) {
        const uploadFile = files[index];

        if (this.name === "pictures[]") {
          if (
            !uploadFile.type.includes("image") ||
            uploadFile.type.includes("image/gif") ||
            uploadFile.type.includes("image/svg") ||
            uploadFile.type.includes("image/avif")
          ) {
            event.preventDefault();

            target.value = "";

            this.$toast.show(this.translatedContent.error.format, {
              duration: 3000,
              position: "top-right",
              type: "error",
            });

            return;
          }

          if (uploadFile.size > 10 * 1024 * 1024) {
            event.preventDefault();

            target.value = "";

            this.$toast.show(translatedContent.error.size, {
              duration: 3000,
              position: "top-right",
              type: "error",
            });

            return;
          }
        }

        if (
          !this.value.find(
            (attachedFile) => attachedFile.name === uploadFile.name
          )
        ) {
          filteredFiles.push(uploadFile);
        }
      }

      this.$emit("input", [...this.value, ...filteredFiles]);
    },
  },
};
</script>

<style lang="scss">
.form-attachment {
  position: relative;
  display: block;
  cursor: pointer;
  user-select: none;

  &:hover {
    .form-attachment {
      &__icon {
        fill: $blue;
      }

      &__text {
        color: $blue;
      }
    }
  }

  &__field {
    position: absolute;
    inset: 0;
    visibility: hidden;
    opacity: 0;
  }

  &__content {
    gap: 5rem;
  }

  &__icon {
    fill: #000;
    flex: 0 0 auto;
    width: 18rem;
    height: 18rem;
    transition-property: fill;
    transition-duration: 0.3s;
    transition-timing-function: linear;
  }

  &__text {
    flex: 1;
    min-width: 0;
    letter-spacing: -0.16px;
    line-height: 1;
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: linear;
  }
}
</style>

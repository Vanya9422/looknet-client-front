<template lang="pug">
picture(:class="pictureClass")
  template(v-if="typeof src === 'object' && !Array.isArray(src)")
    source(
      v-if="hasImage(item.key)",
      v-for="(item, index) in sizes",
      :key="index",
      :srcset="src.conversion_urls[item.key]",
      :media="item.media ? `(max-width: ${item.size}px)` : false",
      :type="item.type"
    )
  img(:src="imgSrc", :class="imgClass" @load="$emit('load')")
</template>

<script>
export default {
  props: {
    src: {
      type: [Object, Boolean, String],
      default: false,
    },
    defaultImg: {
      type: String,
      default: "",
    },
    imgClass: {
      type: String,
      default: "",
    },
    small: {
      type: Boolean,
      default: false,
    },
    thumb: {
      type: Boolean,
      default: false,
    },
    medium: {
      type: Boolean,
      default: false,
    },
    pictureClass: {
      type: String,
      default: "",
    },
    large: {
      type: Boolean,
      default: false,
    },
    medSmall: {
      type: Boolean,
      default: false,
    },
    medThumb: {
      type: Boolean,
      default: false,
    },
    medMedium: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sizes() {
     const options = [
        { condition: this.small, size: 150, key: 'small', type: 'image/webp' },
        { condition: this.medSmall, size: 150, key: 'small', type: 'image/webp', media: true },
        { condition: this.medSmall, size: 150, key: 'small-default', type: 'image/jpg', media: true },
        { condition: this.thumb, size: 375, key: 'thumb', type: 'image/webp' },
        { condition: this.medThumb, size: 375, key: 'thumb', type: 'image/webp', media: true },
        { condition: this.medThumb, size: 375, key: 'thumb-default', type: 'image/jpg', media: true },
        { condition: this.medium, size: 1024, key: 'medium', type: 'image/webp' },
        { condition: this.medMedium, size: 1024, key: 'medium', type: 'image/webp', media: true },
        { condition: this.medMedium, size: 1024, key: 'medium-default', type: 'image/jpg', media: true },
        { condition: this.large, size: 1400, key: 'large', type: 'image/webp' }
      ]

      return options.filter(option => option.condition).map(({ condition, ...rest }) => rest);
    },
    imgSrc() {
      if (typeof this.src === "string") {
        return this.src;
      }
      let src =
        this.src && this.src.original_full_url
          ? this.src.original_full_url
          : this.defaultImg;
      if (this.src) {
        if (this.small && this.src.conversion_urls["small-default"])
          src = this.src.conversion_urls["small-default"];
        if (this.thumb && this.src.conversion_urls["thumb-default"])
          src = this.src.conversion_urls["thumb-default"];
        if (this.medium && this.src.conversion_urls["medium-default"])
          src = this.src.conversion_urls["medium-default"];
        if (this.large && this.src.conversion_urls["large-default"])
          src = this.src.conversion_urls["large-default"];
      }
      return src;
    },
  },
  methods: {
    hasImage(key) {
      const src = this.src;
      if (src) {
        const conversion_urls = src.conversion_urls;
        return (
          conversion_urls &&
          JSON.stringify(conversion_urls) !== "[]" &&
          conversion_urls[key]
        );
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="scss">
picture {
  width: 100%;
  height: 100%;
}
</style>


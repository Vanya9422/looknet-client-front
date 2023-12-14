<template lang="pug">
.statistic(:class="Mods")
  .statistic__list
    .statistic__item(v-for="(item, i) in statistics", :key="i")
      .statistic__number.color-blue {{ item.number || 0 }}
      .statistic__name
        svg-icon.statistic__icon(
          v-if="showIcon"
          :name="item.icon",
          :class="`statistic__icon__icon_${item.icon}`"
        )
        .statistic__text {{ item.name }}
</template>

<script>
export default {
  props: {
    statistics: {
      type: Array,
      default: () => [],
    },
    light: {
      type: Boolean,
      default: false,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    Mods() {
      return {
        statistic_light: this.light,
      };
    },
  },
};
</script>

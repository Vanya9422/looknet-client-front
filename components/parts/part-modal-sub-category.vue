<template>
  <div class="modal-categories__sub-category">
    <nuxt-link
      class="modal-categories__title h3"
      :to="getPath()">
      {{ title }}
    </nuxt-link>
    <div
      class="modal-categories__category-right__list"
      v-if="categories.length">
      <div class="modal-categories__category-right__item"
           v-for="category in categories"
           :key="category.slug">
        <nuxt-link
          class="modal-categories__category-right__title h5"
          :to="getPath(category.slug)">
          {{ category.name }}
        </nuxt-link>
        <part-modal-sub-category-list
          :category="category"
          :parent-path="parentPath"
        />
      </div>
    </div>
  </div>
</template>

<script>

import PartModalSubCategoryList from "~/components/parts/part-modal-sub-category-list.vue";

export default {
  components: { PartModalSubCategoryList },
  props: {
    categories: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: ''
    },
    parentPath: {
      type: String,
      default: ''
    }
  },
  methods: {
    getPath(category, item) {
      let result = '/catalog';
      if (this.parentPath) {
        result = `${result}/${this.parentPath}`;
      }
      if (category) {
        result = `${result}/${category}`;
      }
      if (item) {
        result = `${result}/${item}`;
      }
      return this.$locationPath(result);
    }
  }
};
</script>

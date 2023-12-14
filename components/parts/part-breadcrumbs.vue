<template lang="pug">
  div.content.breadcrumbs(v-if="breadcrumbs.length")
    span.color-gray Сategory:&nbsp;
    template(v-for="(item, index) in breadcrumbs")
      a(:href="item.path" @click.prevent="$router.push(item.path)") {{ item.name }}
      span(v-if="index < breadcrumbs.length - 1") &nbsp;/&nbsp;
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      CATEGORIES: "category/CATEGORIES",
    }),
    breadcrumbs() {
      let breadcrumbsCats = [];
      const findCategory = (categoryList, categoryId) => {
        for (const category of categoryList) {
          if (category.id === categoryId) {
            breadcrumbsCats.unshift(category);
            return true;
          }
          if (category.allSubCategories.length) {
            const found = findCategory(category.allSubCategories, categoryId);
            if (found) {
              breadcrumbsCats.unshift(category);
              return true;
            }
          }
        }
        return false;
      }
      findCategory(this.CATEGORIES, this.category.id);
      const slugs = breadcrumbsCats.map((item) => item.slug);
      const breadcrumbs = breadcrumbsCats.map((item, index) => ({
        name: item.name,
        path: this.$locationPath(`/catalog/${slugs.slice(0, index + 1).join("/")}`),
      }));
      return breadcrumbs;
    },
  },
}
</script>

<style>
.breadcrumbs a:hover {
  color: #556DEE;
}
</style>

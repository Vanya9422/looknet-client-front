<template>
  <div v-if="itemsToShow.length">
    <transition-group tag="ul" name="list" outin class="modal-categories__category-right__category">
      <li class="modal-categories__category-right__category-item"
          v-for="item in itemsToShow"
          :key="item.slug">
        <nuxt-link :to="getPath(category.slug, item.slug)">
          {{ item.name }}
        </nuxt-link>
      </li>
    </transition-group>
    <div
      v-if="showBtn"
      class="modal-categories__category-right__more-btn"
      @click="showAllItems">
      <span>{{ PAGE_CATALOG.more }}</span>
      <svg-icon name="arrowDown" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    category: {
      type: Object,
      default: () => ({})
    },
    parentPath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showBtn: false,
      showAll: true,
    };
  },
  created() {
    if (this.items.length > 4) {
      this.showBtn = true;
      this.showAll = false;
    }
  },
  computed: {
    ...mapGetters({
      PAGE_CATALOG: 'pages/PAGE_CATALOG',
    }),
    items() {
      return this?.category?.allSubCategories || [];
    },
    itemsToShow() {
      if (!this.showAll) {
        return this.items.slice(0, 4);
      }
      return this.items;
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
    },
    showAllItems() {
      this.showAll = true;
      this.showBtn = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.list-item {
  display: inline-block;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>

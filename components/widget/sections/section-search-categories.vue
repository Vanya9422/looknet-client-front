<template lang="pug">
  .section-search__list(v-if="CATEGORIES")
    client-only
      .section-search__list-wrap.flex(:class="{'css-scrollbar': !$screen.st}")
        item-category.section-search__item(
          :text="PAGE_HOME.allCategories"
          @click.prevent.native="openCategory(`/catalog`, -1)"
        )
        .section-search__item(v-for="(item, i) in CATEGORIES" :key="i")
          template(v-if="!(item.allSubCategories.length && $screen.lt)")
            item-category(
              :img="item.picture"
              :text="item.name"
              :name="`sub${i}`"
              @click.prevent.native="openCategory(item,i)"
            )
          tippy(v-else theme="tippy-category" placement="bottom-center")
            template(v-slot:trigger)
              item-category(
                :img="item.picture"
                :text="item.name"
                :name="`sub${i}`"
                @click.prevent.native="openCategory(item,i)"
              )
            .sub-categories(:class="{'sub-categories__big': item.allSubCategories.length > 2}")
              button-primary.sub-categories-name.strong(
                v-for="(itemSub, j) in item.allSubCategories"
                :key="j"
                :to="`/catalog/${item.slug}/${itemSub.slug}`") {{itemSub.name}}
        item-category.section-search__item(
          :text="PAGE_HOME.allCategories"
          @click.prevent.native="openCategory({ slug: '' })"
        )
    client-only
      mobile-categories-modal(:active="activeCategoryIndex")

</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  watch: {
    '$i18n.locale'() {
      this.SET_CATEGORIES_NEW(this.$i18n.lang);
    }
  },
  created() {
    this.SET_CATEGORIES(this.$i18n.lang);
  },
  computed: {
    ...mapGetters({
      CATEGORIES: 'category/CATEGORIES',
      PAGE_HOME: 'pages/PAGE_HOME'
    })
  },
  data() {
    return {
      activeCategoryIndex: null
    };
  },
  methods: {
    ...mapActions({
      SET_CATEGORIES: 'category/SET_CATEGORIES',
      SET_CATEGORIES_NEW: 'category/SET_CATEGORIES_NEW'
    }),
    openCategory(item, index) {
      if (!this.$screen.lt) {
        console.log(item, index);
        this.activeCategoryIndex = index + 1;
        console.log(this.activeCategoryIndex);
        this.$nextTick(() => this.$bvModal.show('mobile-categories-modal'));
      } else {
        this.$router.push(this.$locationPath(`/catalog/${item.slug}`));
      }
    }
  }
};
</script>



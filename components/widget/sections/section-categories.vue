<template lang="pug">
  .section-categories__wrap.wrap(v-if="category.list.length > 0")
    .section-categories__category
      h2.section-categories__title.h3 {{ category.title }}
      .section-categories__list.flex
        template(v-for="(item, i) in category.list")
          .section-categories__column(v-if="isRecommend && i % showItem === 0 && i !== 0 && getItem(i) < HOME_BANNERS.length")
            item-card-premium.section-categories__item(
              v-if="HOME_BANNERS.length > 0 "
              :item="HOME_BANNERS[getItem(i) || 0]"
            )
          .section-categories__column(:key="i")
            item-card.section-categories__item(
              :name="item.name "
              :city="item.city_name"
              :coordinates="{longitude:item.longitude,latitude:item.latitude}"
              :date="item.created_at"
              :phoneNumber="item.contact_phone"
              :price="item.price"
              :pricePolicy="item.price_policy",
              :status="item.is_vip ? 1 : 0"
              :to="item.slug"
              :id="item.id"
              :author_id="item.user_id"
              :gallery="item.gallery"
              @show="openProductModal(i,category.list)"
            )
        template(v-if="showSkeleton" )
          .section-categories__column(v-for="i in 16" :key="`${i}key`" )
            item-card-skeleton
        client-only
          infinite-loading(:distance="20" @infinite="infinite")
            div(slot="no-results")
            div(slot="no-more")
            div(slot="spinner")
</template>

<script>
import openProductModal from "@/mixins/openProductModal";
import { mapGetters } from "vuex";

export default {
  props: {
    category: {
      type: Object,
      default: () => ({
        title: '',
        list: []
      })
    },
    status: {
      type: String,
      default: ''
    },
    isRecommend: {
      type: Boolean,
      default: false
    },
    showSkeleton: {
      type: Boolean,
      default: false
    }
  },
  mixins: [openProductModal],
  computed: {
    ...mapGetters({
      HOME_BANNERS: 'home/HOME_BANNERS'
    }),
    showItem() {
      return 4
    }
  },
  methods: {
    infinite($state) {
      if (!this.category.list.length) return;
      this.$emit('fetchMoreData', $state);
    },
    getItem(i) {
      return i / this.showItem - 1
    },
  }
}
</script>


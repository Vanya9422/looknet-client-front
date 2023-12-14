<template lang="pug">
  b-modal(
    id="fake-users-adds",
    ref="fake-users-adds",
    size="users",
    modal-class="users-adds",
    body-class="users-adds__body",
    header-class="users-adds__header",
    footer-class="users-adds__footer",
    centered,
    @show="openModal",
    :hide-footer="true"
  )
    template(#modal-header="{ close }")
      button-close.modal__close(@click.native="close()")
    module-user-info(
      :id='product.user_id'
      :advertise-id='product.id'
      :fake='fakeData'
      :about="registerDate",
      :verified="true",
      :rating_reviews="rating_reviews",
      vertical
    )

    .users-adds__title.h3 {{ POPUP_USER_ADS.title }}

    .users-adds__nav.flex
      module-tag.users-adds__nav-btn(
        v-for="(tag, i) in tags",
        :key="i",
        :text="tag.text",
        :to="tag.to",
        :active="tag.active",
        button,
        @click.native.prevent="changeActiveTag(i)"
      )
        span.tag__counter.color-blue ({{ tag.count }})

    .users-adds__container.css-scrollbar
      .users-adds__list.flex(v-if="products.length > 0 && tags[0].active")
        item-card.users-adds__item(
          v-for="(item, i) in products",
          :key="i",
          :contacts="item.contacts",
          :name="item.name",
          :city="item.city_name",
          :coordinates="{ longitude: item.longitude, latitude: item.latitude }",
          :date="item.created_at",
          :phoneNumber="item.contact_phone",
          :price="item.price",
          :pricePolicy="item.price_policy",
          :gallery="item.gallery",
          :status="item.status",
          :to="item.slug",
          :id="item.id",
          @show="openProductModal(i, products)",

        )
      part-loader(v-show="loading")
      .section-notifications__center(v-if="count === 0 && !loading")
        part-not-notification.section-notifications__not-notification.section-notifications__not-notification-small {{ POPUP_NOT_FOUND.description || '' }}
</template>

<script>
import openProductModal from "@/mixins/openProductModal";
import { mapActions, mapGetters } from "vuex";
import fakeService from "~/core/services/fakeService";
import moment from "moment";

export default {
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      fetchReviews: null,
      counts: {
        active_count: 1,
        inactive_count: 0,
      },
      count: 1,
    };
  },
  watch: {
    product: {
      handler(newProduct) {
        if (this.user) return false;
        this.getUserReviews(newProduct?.slug);
      },
      deep: true
    }
  },
  async mounted() {
    if (this.user) return false;
    await this.getUserReviews(this?.product?.slug);
  },
  mixins: [openProductModal],
  computed: {
    ...mapGetters({
      POPUP_NOT_FOUND: "popup/POPUP_NOT_FOUND",
      POPUP_USER_ADS: "popup/POPUP_USER_ADS"
    }),
    fakeData() {
      const data = fakeService.getFaked(this.product);
      return data;
    },
    registerDate() {
      const registeredDate = this.fakeData?.isFake && this.fakeData?.date ? this.fakeData?.date : this.user?.registered;
      return `Registered  ${this.getDate(registeredDate)}`;
    },
    tags() {
      return [
        {
          text: this?.POPUP_USER_ADS?.activeTab,
          active: true,
          count: 1,
          status: 0,
        },
        {
          text: this?.POPUP_USER_ADS?.inactiveTab,
          status: 2,
          count: 0,
        },
      ];
    },
    user() {
      return this.product?.author;
    },
    products() {
      return this.product ? [this.product] : [];
    },
    rating_reviews() {
      return this.user?.rating_reviews || this.fetchReviews || false;
    }
  },
  methods: {
    ...mapActions({
      SET_POPUP_NOT_FOUND: 'popup/SET_POPUP_NOT_FOUND',
      SET_POPUP_USER_ADS: 'popup/SET_POPUP_USER_ADS',
    }),
    getDate(date) {
      if (!date) return "";
      return moment(date).utc().format("MMMM yyyy");
    },
    openModal() {
    },
    changeActiveTag(index) {
      this.tags.forEach((item, i) => (item.active = i === index));
      this.status = this.tags[index].status;
      this.count = this.tags[index].count;
    },
    async getUserReviews(slug) {
      if (!slug) return false;
      this.fetchReviews = await this.$axios.$get(`/products/${slug}/review-information`);
    }
  },
  async fetch() {
    await this.SET_POPUP_USER_ADS();
    await this.SET_POPUP_NOT_FOUND();
  },
};
</script>

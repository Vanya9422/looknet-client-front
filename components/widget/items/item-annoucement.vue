<template lang="pug">
intersect.item-annoucement(:class="Mods" @enter="intersected = true")
  .item-annoucement__row
    .item-annoucement__column.item-annoucement__column_left
      form-checkbox.item-annoucement__checkbox(
        :checked="item.checked",
        @change.native="$emit('checked')"
      )
      NuxtLink.item-annoucement__preview(
        :to="$locationPath(`/product/${item.slug}`)"
      )
        set-img(
          img-class="object-fit",
          :src="item.gallery?.[0]",
          :default-img="require('assets/img/default-product.jpg')"
          v-if="intersected"
          @load="isImageLoad = true"
          small
        )
        vue-skeleton-loader(v-if="!isImageLoad" :size='400' animation='wave')
        part-item-annoucement-status.item-annoucement__status__container.tablet-hidden(
          :item="item"
        )
      .item-annoucement__info(v-if="small")
        NuxtLink.item-annoucement__title.h4.text-wrap(
          :to="$locationPath(`/product/${item.slug}`)"
        ) {{ item.name }}
        .item-annoucement__desc
          .item-annoucement__text(v-if="user")
            span.color-gray User: &nbsp;
            | {{ user }}

          .item-annoucement__text(v-if="category")
            span.color-gray Category: &nbsp;
            | {{ category }}

        .item-annoucement__footer.flex.flex_vertical.flex_justify
          .item-annoucement__status {{ item.status }}
          .item-annoucement__footer-date {{ getDate }}

      .item-annoucement__info(v-else)
        .item-annoucement__name
          NuxtLink.item-annoucement__title.h4.text-wrap(
            :to="$locationPath(`/product/${item.slug}`)"
          ) {{ item.name }}

        .item-annoucement__price.max-tablet-hidden {{ showPrice }}
        .item-annoucement__status-info
          part-item-annoucement-status.item-annoucement__status__container.max-tablet-hidden(
            :item="item"
          )
          .item-annoucement__days.color-gray.max-tablet-hidden(
            v-if="getDays >= 0"
          )
            | {{ left }}:
            span.color-blue {{ getDays }} {{ days }}

        .item-annoucement__distance.color-gray.h6(v-if="distance") {{ distance }} {{ PAGE_PRODUCT_DETAILS.km }}
        .item-annoucement__date.color-gray.h6 {{ getDate }}
        .item-annoucement__nav.flex
          button-medium.item-annoucement__nav-btn(
            :to="$locationPath('/chat')",
            icon="chatBorder",
            :icon-active="item.exists_unread_messages"
          ) {{ buttons.chat }}
          button-medium.item-annoucement__nav-btn(
            v-if="[$status.notVerified, $status.active].includes(item.status)",
            icon="closeBig",
            white,
            @click.native.prevent="$emit('deactivate')"
          ) {{ buttons.deactivation }}
          button-medium.item-annoucement__nav-btn(
            v-if="item.status === $status.rejected",
            white,
            :to="$locationPath(`/create-ad/${item.slug}`)"
          ) {{ buttons.edit }}
          button-medium.item-annoucement__nav-btn(
            v-if="[$status.nonActive, $status.draft].includes(item.status)",
            white,
            @click.native.prevent="$emit('moderation')"
          ) {{ buttons.activation }}

        part-statistic.item-annoucement__statistic.max-tablet-hidden(
          :statistics="statistics",
          showIcon,
          light
        )

    .item-annoucement__column.item-annoucement__column_right.desktop-only
      .item-annoucement__price.tablet-hidden {{ showPrice }}

      part-statistic.item-annoucement__statistic.tablet-hidden(
        :statistics="statistics",
        showIcon,
        light
      )
      .item-annoucement__bottom.flex.flex_justify
        .item-annoucement__bottom-column
          button-medium.item-annoucement__bottom-btn.tablet-hidden(
            icon="chart",
            @click.prevent.native="$emit('statistics')"
          ) {{ PAGE_MODAL_STATISTIC.title }}

        .item-annoucement__bottom-column.flex
          button-medium.item-annoucement__bottom-btn.tablet-hidden(
            @click.native.prevent="$emit('sale')",
            icon="zipper",
            v-b-modal.modal-tariffs,
            blue
          ) {{ buttons.saleFaster }}
          .item-annoucement__more-inner
            client-only
              tippy(placement="bottom-end", trigger="click")
                template(v-slot:trigger)
                  button-medium.item-annoucement__more(
                    icon="dots",
                    border,
                    square
                  )
                .item-annoucement__bottom-column.item-annoucement__bottom-column-inner.d-flex.flex-column.text-start.align-items-start
                  button-medium.annoucement-panel__btn.ml-0(
                    v-if="item.status !== $status.rejected",
                    white,
                    :to="$locationPath(`/create-ad/${item.slug}`)"
                  ) {{ buttons.edit }}
                  button-medium.annoucement-panel__btn.ml-0(
                    v-if="[$status.nonActive, $status.draft].includes(item.status)",
                    white,
                    @click.native.prevent="$emit('moderation')"
                  ) {{ buttons.activation }}
                  button-medium.annoucement-panel__btn.ml-0(
                    v-if="item.status !== $status.draft",
                    white,
                    @click.native.prevent="$emit('draft')"
                  ) {{ buttons.draft }}
                  button-medium.annoucement-panel__btn.ml-0(
                    white,
                    @click.native.prevent="$emit('deleteAdvertis')"
                  ) {{ buttons.delete }}
                  button-medium.annoucement-panel__btn.ml-0(
                    v-if="[$status.notVerified, $status.active].includes(item.status)",
                    white,
                    @click.native.prevent="$emit('deactivate')"
                  ) {{ buttons.deactivation }}
                  button-medium.annoucement-panel__btn.ml-0.max-tablet-hidden(
                    @click.native.prevent="$emit('sale')",
                    white,
                    v-b-modal.modal-tariffs
                  ) {{ buttons.saleFaster }}
          .item-annoucement__more-inner__mobile
            div(@click="$bvModal.show(`item-announcement-${item.id}`)")
              button-medium.item-annoucement__more(icon="dots", border, square)

  modal-panel(:id="`item-announcement-${item.id}`")
    .modal-panel__item
      button-border.modal-panel__btn(
        icon="zipper",
        blue,
        v-if="ADVERTISES_CHECKED.length <= 1",
        BigIcon,
        v-b-modal.modal-tariffs,
        @click.native.prevent="$emit('sale')"
      ) {{ buttons.saleFaster }}
    .modal-panel__item
      button-border.modal-panel__btn(
        icon="chart",
        BigIcon,
        white,
        @click.prevent.native="$emit('statistics')",
        v-if="ADVERTISES_CHECKED.length <= 1"
      ) {{ PAGE_MODAL_STATISTIC.title }}
    .modal-panel__item
      button-border.modal-panel__btn(
        v-if="ADVERTISES_CHECKED.length <= 1",
        icon="chatBorder",
        BigIcon,
        gray,
        :to="$locationPath('/chat')"
      ) {{ buttons.chat }}
    .modal-panel__item
      button-border.modal-panel__btn(
        icon="delete",
        BigIcon,
        gray,
        @click.native.prevent="ADVERTISES_CHECKED.length <= 1 ? $emit('deleteAdvertis') : $emit('deleteAdvertisMobile')"
      ) {{ buttons.delete }}
    .modal-panel__item(
      v-if="[$status.notVerified, $status.active].includes(item.status) && ADVERTISES_CHECKED.length <= 1"
    )
      button-border.modal-panel__btn(
        :img="deactive",
        BigIcon,
        gray,
        @click.native.prevent="$emit('deactivate')"
      ) {{ buttons.deactivation }}
    .modal-panel__item(
      v-if="[$status.nonActive, $status.draft].includes(item.status) && ADVERTISES_CHECKED.length <= 1"
    )
      button-border.modal-panel__btn(
        icon="check",
        BigIcon,
        stroke,
        @click.native.prevent="$emit('moderation')"
      ) {{ buttons.activation }}
    .modal-panel__item(
      v-if="item.status !== $status.rejected && ADVERTISES_CHECKED.length <= 1"
    )
      button-border.modal-panel__btn(
        :img="editIcon"
        BigIcon,
        gray,
        :to="$locationPath(`/create-ad/${item.slug}`)"
      ) {{ buttons.edit }}
    .modal-panel__item(v-if="item.status !== $status.draft")
      button-border.modal-panel__btn(
        icon="closeBig",
        BigIcon,
        gray,
        @click.native.prevent="$emit('draft')"
      ) {{ buttons.draft }}
</template>

<script>
import Intersect from 'vue-intersect'
import VueSkeletonLoader from "skeleton-loader-vue";
import { formatDistance, subDays } from "date-fns";
import { numberWithSpaces } from "assets/js/functions";
import distanceMixin from "@/mixins/distanceMixin";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import deactive from '../../../assets/img/icons/deactive.svg'
import editIcon from '../../../assets/img/icons/edit-icon.svg'
export default {
  components: { VueSkeletonLoader, Intersect },
  props: {
    item: {
      type: Object,
      required: true,
    },
    buttons: {
      type: Object,
      required: true,
    },
    left: {
      type: String,
      default: "left",
    },
    days: {
      type: String,
      default: "days",
    },
    user: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    small: {
      type: Boolean,
      default: false,
    },
    coordinates: {
      type: Object,
      default: () => {},
    },
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      formatDistance,
      subDays,
      phone: false,
      numberWithSpaces,
      deactive,
      editIcon,
      intersected: false,
      isImageLoad: false
    };
  },
  computed: {
    ...mapGetters({
      ADVERTISES_CHECKED: "advertises/ADVERTISES_CHECKED",
      PAGE_PRODUCT_DETAILS: "pages/PAGE_PRODUCT_DETAILS",
      PAGE_MY_ADVERTISES: "pages/PAGE_MY_ADVERTISES",
      PAGE_MODAL_STATISTIC: "pages/PAGE_MODAL_STATISTIC",
    }),
    Mods() {
      return {
        "item-annoucement_small": this.small,
      };
    },
    statistics() {
      return [
        {
          icon: "favorites",
          name: `${this.PAGE_MY_ADVERTISES.banner.favorites}`,
          number: this.item.added_favorites,
        },
        {
          icon: "view",
          name: `${this.PAGE_MY_ADVERTISES.banner.view}`,
          number: this.item.show_details,
        },
        {
          icon: "call",
          name: `${this.PAGE_MY_ADVERTISES.banner.call}`,
          number: this.item.show_phone,
        },
      ];
    },
    showPrice() {
      if (this.item && this.item.price_policy === 1)
        return `$ ${this.numberWithSpaces(this.item.price)}`;
      if (this.item && this.item.price_policy === 2) return "Exchange";
      return "Free";
    },
    getDate() {
      const start = moment(this.item.inactively_date, "YYYY-MM-DD HH:mm:ss")
        .subtract("30", "days")
        .format("DD.MM.YYYY");
      const end = moment(
        this.item.inactively_date,
        "YYYY-MM-DD HH:mm:ss"
      ).format("DD.MM.YYYY");
      return `${start} - ${end}`;
    },
    getDays() {
      moment.lang(this.$i18n.locale);
      const dateB = moment(this.item.inactively_date, "YYYY-MM-DD HH:mm:ss"),
        dateC = moment(new Date());
      return dateB.diff(dateC, "days");
    },
  },
  mixins: [distanceMixin],
  methods: {
    ...mapActions({
      SET_CHANGE_STATUS: "advertises/SET_CHANGE_STATUS",
    }),
    showPhone() {
      this.phone = true;
      this.$axios.$post(
        `${this.$api.user.statistics}${this.item.slug}/phone-view`
      );
    },
  },
  beforeDestroy() {
  }
};
</script>

<style lang="scss" scoped>
.item-annoucement {
  &__status {
    &__container {
      z-index: 1;

      @include min-large-tablet {
        position: absolute;
        left: 10rem;
        top: 10rem;
      }

      @include large-tablet {
        margin-top: 10rem;
      }
    }

    &-info {
      @include large-tablet {
        display: flex;
        flex-direction: row;
      }

      @include large-mobile {
        flex-direction: column;
      }
    }
  }

  &__days {
    @include large-tablet {
      height: 30rem;
      display: flex;
      align-items: center;
    }
  }
}
</style>

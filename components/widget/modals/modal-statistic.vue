<template lang="pug">
b-modal#modal-statistic(
  ref="modal-statistic",
  size="statistic-size",
  modal-class="modal-statistic",
  body-class="modal-statistic__body",
  header-class="modal-statistic__header",
  footer-class="modal-statistic__footer",
  centered,
  @hide="closeModal",
  :hide-footer="true"
)
  template(#modal-header="{ close }")
    button-close.modal__close(@click.native="closeModal")
  h3.modal-statistic__title.h3 {{ PAGE_MODAL_STATISTIC.title }}
  .modal-statistic__table
    .statistic-table
      .statistic-table__header
        .statistic-table__header-name {{ PAGE_MODAL_STATISTIC.name }}
        .statistic-table__header-description {{ PAGE_MODAL_STATISTIC.description }}
        .statistic-table__header-title {{ PAGE_MODAL_STATISTIC.title }}
      .statistic-table__body(v-if="STATISTIC")
        .statistic-table__body-item(
          v-for="(item, index) in PAGE_MODAL_STATISTIC.list",
          :key="index"
        )
          .statistic-table__body-name
            button-action.modal-statistic__title(
              icon="favorites",
              :text="item.title",
              small,
              blue
            )
          .statistic-table__body-description {{ item.text }}
          .statistic-table__body-title {{ getStatisticsData(index) }}
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "Statistics",
    },
    head: {
      type: Array,
      default: () => ["Name", "Description", "Statistics"],
    },
  },
  computed: {
    ...mapGetters({
      PAGE_MODAL_STATISTIC: "pages/PAGE_MODAL_STATISTIC",
      STATISTIC: "product/STATISTIC",
    }),
  },
  created() {
    this.SET_PAGE_MODAL_STATISTIC(this.$i18n.locale || "en");
  },
  watch: {
    "$i18n.locale"(val) {
      this.SET_PAGE_MODAL_STATISTIC(this.$i18n.locale);
    },
  },
  methods: {
    ...mapActions({
      SET_PAGE_MODAL_STATISTIC: "pages/SET_PAGE_MODAL_STATISTIC",
      SET_STATISTIC: "product/SET_STATISTIC",
    }),
    getStatisticsData(index) {
      if (index === 0) return this.STATISTIC.favorite;
      if (index === 1) return this.STATISTIC.view;
      if (index === 2) return this.STATISTIC.call;
    },
    closeModal() {
      this.SET_STATISTIC(null);
      this.$root.$emit("bv::hide::modal", "modal-statistic");
    },
  },
};
</script>

<style lang="scss">
.statistic {
  &-table {
    height: 100%;
    &__header {
      font-weight: 500;
      color: $gray;
    }
    &__header,
    &__body {
      display: flex;
      padding-bottom: 10rem;
      @include large-mobile {
        padding-right: 10px;
        padding-left: 10px;
      }

      &-name {
        width: 20%;
        min-width: 80px;
      }
      &-description {
        width: 63%;
        padding: 0 20rem;

        hyphens: auto;
      }
      &-title {
        width: 17%;
        min-width: 60px;
        text-align: right;
      }
    }
    &__body {
      height: calc(100% - 50px);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      &-item {
        display: flex;
        border-top: 1px solid $light-gray;
      }
      &-name,
      &-description,
      &-title {
        padding-top: 20rem;
        padding-bottom: 20rem;
      }
      &-name {
        width: 20%;
      }
      &-description {
        width: 63%;
        padding: 20rem;
      }
      &-title {
        width: 17%;
        font-family: "Atyp Display";
        font-weight: 600;
        font-size: 26rem;
        color: #556dee;
      }
    }
  }
}
.modal-statistic {
  .modal-content {
    padding: 50rem;
    @include large-mobile {
      padding: 15rem;
      height: 80vh;
    }
  }

  &__title {
    font-weight: 600;
  }
  &__body {
    @include large-mobile {
      height: 100%;
    }
  }
  &__table {
    margin-top: 20rem;
    font-size: 16rem;
    line-height: 1.2;
    height: calc(100% - 30px);
  }

  &__number {
    font-family: "Atyp Display";
    font-weight: 600;
  }
}
</style>
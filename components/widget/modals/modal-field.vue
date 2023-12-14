<template>
  <b-modal
    :id="id"
    size="statistic-size"
    modal-class="modal-field"
    body-class="modal-field__body"
    header-class="modal-field__header"
    footer-class="modal-field__footer"
    centered @hide="$emit('hide')"
  >
    <template #modal-header="{ close }">
      <button-close class="modal__close" @click.native="close()"></button-close>
    </template>
    <h3 class="modal-field__title h3">{{ title }}</h3>
    <div class="modal-field__content">
      <slot></slot>
    </div>
    <template #modal-footer="{ close }">
      <button-primary class="modal-field__btn" blue @click.native="save(close)">{{ POPUP_GLOBAL.save }}</button-primary>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    closeAuto: {
      type: Boolean,
      default: true,
    },
  },
	computed: {
    ...mapGetters({
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
    })
	},
  methods: {
    save(close) {
      this.$emit("save", close);
      if (this.closeAuto) {
        close();
      }
    },
  },
};
</script>

<style lang="scss">
.modal-field {
  .modal-content {
    padding: 25rem 15rem;
  }
  @include large-mobile {
    padding: 0 !important;
  }

  &__title {
    font-family: "Atyp Display";
    font-weight: 500;
  }

  &__footer {
    border: 0;
    margin-top: 20rem;
  }

  &__btn {
    width: 100%;
  }

  &__list {
    margin-top: 25rem;
  }
  &__label {
    font-size: 16rem;
    font-weight: 600;
    margin-bottom: 10rem;
  }
  &__item {
    &:not(:first-child) {
      margin-top: 20rem;
    }
  }
}
</style>

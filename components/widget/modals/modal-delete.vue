<template>
  <b-modal
    id="modal-delete"
    ref="modal-delete"
    size="thank-size"
    modal-class="modal-delete"
    body-class="modal-delete__body"
    header-class="modal-delete__header"
    footer-class="modal-delete__footer"
    centered
    @hide="closeModal"
    :hide-footer="true">
    <template #modal-header="{ close }">
      <button-close class="modal__close"
                    @click.native="closeModal"></button-close>
    </template>
    <div :class="status">
      <div class="modal-delete__icon">
        <slot name="icon">
          <svg-icon name="del"></svg-icon>
        </slot>
      </div>
      <div class="modal-delete__title h2 h2_big">{{ title || POPUP_GLOBAL.delete }}</div>
      <div class="modal-delete__desc color-gray h4">{{ desc }}</div>
      <div class="modal-delete__btns">
        <button-primary class="modal-delete__btn"
                        @click.native.prevent="closeModal">{{ POPUP_GLOBAL.close }}
        </button-primary>
        <button-primary
          class="modal-delete__btn text-capitalize"
          v-if="!withOutBtn"
          :class="[{blue:status === 'activate' || status === 'moderation'},{red:status !== 'activate' || status !== 'moderation'}]"
          @click.native.prevent="deleteItem">
          {{ btn || POPUP_GLOBAL.delete }}
        </button-primary>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    withOutBtn: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: "default"
    },
    btn: {
      type: String,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
      default: ''
    },
  },
  computed: {
    ...mapGetters({
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
    }),
  },
  methods: {
    closeModal() {
      this.$emit('cancel');
      this.$root.$emit('bv::hide::modal', 'modal-delete');
    },
    deleteItem() {
      this.$emit('deleteItem');
      this.$root.$emit('bv::hide::modal', 'modal-delete');
    },
  }
};
</script>

<style lang="scss">
.modal-delete {
  .modal-content {
    padding-top: 70rem;
    padding-bottom: 70rem;
  }

  @include large-mobile {
    padding: 0 !important;
    .modal-content {
      border-radius: 10rem 10rem 0 0;
      padding: 50rem 15rem 20rem 15rem;
    }
  }

  &__body {
    text-align: center;

    .moderation,
    .activate {
      .modal-delete__icon {
        background: #EEF1FE;

        svg {
          fill: $blue;
        }
      }
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 77rem;
    height: 77rem;
    background: #FCE7E7;
    border-radius: 20rem;
    margin: 0 auto;

    svg {
      width: 30rem;
      height: 23rem;
      stroke: none;
      fill: $red;
      stroke-width: 1.5;
    }
  }

  &__title {
    margin-top: 30rem;

    @include large-mobile {
      font-family: 'Atyp Display';
      margin-top: 25rem;
      line-height: 1;
      font-weight: 500;
    }
  }

  &__desc {
    margin: 20rem auto 0 auto;
    font-weight: 400;
    max-width: 400rem;
    @include large-mobile {
      line-height: 1.3;
      font-size: 16rem;
      max-width: 272rem;
    }
  }

  &__btn {
    min-width: 131rem;
    margin-top: 40rem;
    background: #F4F3F4;
    border-radius: 10px;
    @include large-mobile {
      width: 100%;
      margin-top: 60rem;
    }

    &s {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 13px;
    }

    &:hover {
      color: inherit;
    }

    &.red {
      background: #EB5757 !important;
      color: #fff !important;
      border-radius: 10px;

      &:hover {
        color: #fff;
      }
    }

    &.blue {
      background: $blue !important;
      color: #fff !important;
      border-radius: 10px;

      &:hover {
        color: #fff;
      }
    }
  }

}
</style>

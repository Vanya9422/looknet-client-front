<template>
  <b-modal :id="id || 'modal-confirmation'" ref="modal-confirmation" size="small-size" modal-class="modal-confirmation" body-class="modal-confirmation__body" header-class="modal-confirmation__header" footer-class="modal-confirmation__footer" centered @show="openModal" @hide="closeModal">
    <template #modal-header="{ close }">
      <button-close class="modal__close" @click.native="closeModal(), $emit('close')"></button-close>
    </template>
    <h3 class="modal-confirmation__title h3">{{ POPUP_CONFIRM?.confirmation?.title }}</h3>
    <p class="modal-confirmation__desc desc p">{{ POPUP_CONFIRM?.confirmation?.desc }}</p>
    <template>
      <div class="modal-confirmation__content">
        <template v-for="(type, key) in confirmationTypes">
          <form-checkbox
            class="modal-confirmation__item"
            v-if="!!type.value"
            type="radio"
            :checked="key === confirmationType"
            :value="key"
            :name="type.title"
            @input="confirmationType = key"
          >
            <b>{{ type.title }}</b>
            <span>{{ type.value }}</span>
          </form-checkbox>
        </template>
      </div>
    </template>
    <template #modal-footer="{ close }">
      <div class="modal-location__buttons flex">
        <div></div>
        <button-primary class="modal-location__btn" small gray @click.native="closeModal(), $emit('close')">{{ POPUP_GLOBAL.close }}</button-primary>
        <button-primary class="modal-location__btn" small blue :disabled="!confirmationType" @click.native="send">{{ POPUP_CONFIRM?.confirmation?.send }}</button-primary>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    id: {
      type: [String, Number],
    }
  },
  data: () => ({
    confirmationType: null,
  }),
  computed: {
    ...mapGetters({
      POPUP_CONFIRM: 'popup/POPUP_CONFIRM',
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
    }),
    confirmationTypes() {
      return {
        email: {
          title: this.POPUP_CONFIRM?.confirmation?.email,
          value: this.$auth.user.email,
        },
        phone: {
          title: this.POPUP_CONFIRM?.confirmation?.sms,
          value: this.$auth.user.phone_view || this.$auth.user.phone,
        },
      };
    },
  },
  created() {
    this.SET_POPUP_CONFIRM();
  },
  methods: {
    ...mapActions({
      SET_POPUP_CONFIRM: 'popup/SET_POPUP_CONFIRM',
    }),
    openModal() {
      this.resetType();
    },
    closeModal() {
      this.resetType();
      this.$refs['modal-confirmation'].hide();
    },
    send() {
      this.$emit('send', this.confirmationType);
      this.closeModal();
    },
    resetType() {
      if (this.confirmationTypes.email.value) {
        this.confirmationType = 'email';
        return;
      }
      this.confirmationType = 'phone';
    },
  }
}
</script>

<style lang="scss">
.modal-confirmation {
  padding: 0;

  &.modal-dialog {
    max-width: 632px;
    width: 100%;
  }

  .modal-content {
    padding: 50rem;
    @include large-mobile {
      padding: 30rem 20rem;
    }
  }

  &__title {
    font-weight: 500;
    font-family: 'Atyp Display';
    margin-bottom: 26px;
  }

  &__desc {
    margin-bottom: 16rem;
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 30rem 0;
  }

  &__error {
    margin-top: 10px;
  }

  &__footer {
    padding: 0;
    border: 0;
    margin-top: 20rem;
    display: block;
  }


  &__buttons {
    @include items(3, 5);
  }

  &__search {
    margin: 30rem 0 25rem;

    .input__icon {
      width: 14rem;
      height: 14rem;
      margin-top: -7rem;
      fill: #6E6E73;
    }
  }

  &__item {
    padding: 10rem 20rem;
    font-size: 16rem;
    line-height: 120%;
    color: #062439;
    border-radius: 5rem;
    transition: 0.3s;
    cursor: pointer;
    @include large-mobile {
      font-size: 16rem;
    }

    // &.active,
    // &:hover {
    //   background: #F5F5F7;
    // }

    span {
      font-weight: 400;
      // font-size: 16rem;
      color: #6E6E73;
      padding-left: 10px;
      @include large-mobile {
        font-size: 14rem;
      }
    }
  }
}
</style>

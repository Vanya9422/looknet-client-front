<template>
  <b-modal
    id="modal-confirm"
    ref="modal-confirm" size="login-size"
    modal-class="modal-confirm"
    body-class="modal-confirm__body"
    header-class="modal-confirm__header"
    footer-class="modal-confirm__footer"
    centered
    @show="openModal"
    @hide="closeModal"
  >
    <template #modal-header="{ close }">
      <button-close class="modal__close" @click.native="closeModal(), $emit('close')"></button-close>
    </template>
    <h3 class="modal-confirm__title h3">{{ title }}</h3>
    <p class="modal-confirm__desc desc p"> {{ desc }}</p>
    <confirm-code :key="confirmationCount" @input="(res) => this.codeString = res" :error="error" />
    <template>
      <div class="c-pointer registration-form__desc mobile-hidden p color-blue" v-if="isShow && currentTime === 0" @click="resendCode()">{{ POPUP_CONFIRM.resendCode }}</div>
      <div class="registration-form__desc mobile-hidden p color-gray" v-else>{{ POPUP_CONFIRM.sendCodeAgain }} {{ $getMinutes(currentTime) }}</div>
    </template>
    <template #modal-footer="{ close }">
      <div class="modal-location__buttons flex">
        <div></div>
        <button-primary class="modal-location__btn" small gray @click.native="closeModal(), $emit('close')">{{ POPUP_GLOBAL.close }}</button-primary>
        <button-primary class="modal-location__btn" small blue :loading="loading" @click.native="save">{{ POPUP_CONFIRM.send }}</button-primary>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import timer from "@/mixins/helpers/timer";
import confirmCode from "@/mixins/helpers/confirmCode";

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    changeUserInfo: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => ({})
    },
    confirmationCount: {
      type: Number,
      default: 1,
    },
    changePhone: {
      type: Boolean,
      default: false
    }
  },
  mixins: [timer, confirmCode],
  data() {
    return {
      codeString: '',
      repeatTime: 120,
      error: false,
      loading:false,
    }
  },
  computed: {
    ...mapGetters({
      POPUP_CONFIRM: 'popup/POPUP_CONFIRM',
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
    }),
  },
  watch: {
    codeString(val) {
      if (val.length === this.amount) this.error = false
    },
    isShow() {
      this.repeatTime = 120
    }
  },
  created() {
    this.SET_POPUP_CONFIRM();
  },
  methods: {
    ...mapActions({
      SET_POPUP_CONFIRM: 'popup/SET_POPUP_CONFIRM',
    }),
    openModal() {
      this.resendCode()
    },
    closeModal() {
      this.$refs['modal-confirm'].hide();
    },
    resendCode(value) {
      this.$emit('reset', value);
      this.repeatCounter();
    },
    send() {
      if (this.confirmationCount > 1 && !this.changePhone) {
        this.resendCode(this.codeString);
        return;
      }
      this.loading = true;
      this.error = false;

      const info = JSON.parse(JSON.stringify(this.info));
      info.code = this.codeString;
      info.code_type = 2;

      const api = this.changeUserInfo
        ? this.$api.changeSettings.email
        : this.$api.changeSettings.password;

      this.$axios
      .$put(api, info)
      .then(() => {
        this.closeModal();
        this.$emit('success');
      })
      .catch(({response}) => {
        if (response?.data) {
          if (this.changeUserInfo) {
            this.$emit('error', response.data);
          }
          if (response.data.message === 'Your Code is incorrect') {
            this.error = true;
          } else if (!this.changeUserInfo && response.data.errors.password) {
            this.$emit('error', response.data);
            this.closeModal();
          }
        }
      })
      .finally(() => {
        this.loading = false;
      });
    },
    save() {
      if (this.codeString.length !== this.amount && !this.loading) {
        this.error = true;
      } else {
        this.send();
      }
    }
  }
}
</script>

<style lang="scss">
.modal-confirm {
  padding: 0;

  .modal-login-size {
    max-width: 637px;
  }

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

  .modal__close {
    width: 34rem;
    height: 34rem;
  }

  &__title {
    font-weight: 500;
    font-family: 'Atyp Display';
    margin-bottom: 26px;
  }

  &__desc {
    margin-bottom: 36px;
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

  &__list {
    max-height: 469px;
    height: 55vh;

    &-edit {
      padding: 6px 12px;
      background: #FFFFFF;
      border-radius: 4px;
      color: #556DEE;
      font-size: 17rem;
      line-height: 100%;
      @include large-mobile {
        font-size: 14rem;
      }
    }

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 17rem;
      line-height: 100%;
      margin-bottom: 25rem;
      padding: 0 20rem;
      @include large-mobile {
        font-size: 14rem;
      }
    }

    &-active {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #F5F5F7;
      font-size: 20px;
      line-height: 120%;
      @include large-mobile {
        font-size: 16rem;
      }
    }

    &-title {
      color: #9A9A9A;
    }

    &-helper {
      color: #556DEE;
      cursor: pointer;
    }

    &-item {
      padding-bottom: 20rem;
      margin-bottom: 30rem;
      border-bottom: 1rem solid #D2D2D7;

      &:nth-last-child(1) {
        margin-bottom: 0;
        border-bottom: none;
      }
    }
  }

  &__item {
    padding: 15rem 20rem;
    font-size: 20rem;
    line-height: 120%;
    color: #062439;
    border-radius: 5rem;
    transition: 0.3s;
    cursor: pointer;
    @include large-mobile {
      font-size: 16rem;
    }

    &.active,
    &:hover {
      background: #F5F5F7;
    }

    span {
      font-weight: 400;
      font-size: 17px;
      color: #6E6E73;
      padding-left: 10px;
      @include large-mobile {
        font-size: 14rem;
      }
    }
  }
}
</style>

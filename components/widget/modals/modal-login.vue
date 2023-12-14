<template>
  <b-modal
      id="modal-login"
      ref="login"
      size="login-size"
      modal-class="modal-login"
      body-class="modal-login__body"
      header-class="modal-login__header"
      footer-class="modal-login__footer"
      centered
      @show="openModal"
      @hidden="closeModal">
    <template #modal-header="{ close }">
      <button-close
          class="modal__close"
          @click.native="close()"></button-close>
    </template>
    <h3 class="modal-login__title h3">{{ POPUP_LOGIN.sing }}</h3>
    <login-form
        @close="closeLogin"
        :content="POPUP_LOGIN"
    />
    <div class="modal-login__with">
      <div class="modal-login__with-text p">{{ POPUP_LOGIN.loginWith }}</div>
      <div class="modal-login__with-buttons flex">
        <!--        <button-primary-->
        <!--            class="modal-login__with-btn"-->
        <!--            border-->
        <!--            icon="facebook"-->
        <!--            @click.prevent.native="socialAuth('facebook')"-->
        <!--        >-->
        <!--          Facebook-->
        <!--        </button-primary>-->
        <button-primary
            class="modal-login__with-btn"
            border
            @click.prevent.native="socialAuth('google', { params: { prompt: 'select_account' } })">
          <set-img
              img-class="button-primary__icon"
              :default-img="require(`~/assets/img/gmail.png`)" />
          Gmail
        </button-primary>
      </div>
    </div>
    <template #modal-footer="{ close }">
      <button-primary
          class="modal-login__btn modal-login__btn_reg"
          light
          @click.native.prevent="goRegistration()">
        {{ POPUP_LOGIN.registration }}
      </button-primary>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  middleware: ["ghost"],
  props: {
    title: {
      type: String,
      default: "Sign in",
    },
  },
  computed: {
    ...mapGetters({
      POPUP_LOGIN: "popup/POPUP_LOGIN",
      PAGE_POPUP: "pages/PAGE_POPUP",
    }),
  },
  watch: {
    "$i18n.locale"(val) {
      this.SET_POPUP_LOGIN(this.$i18n.locale);
      this.SET_PAGE_POPUP(this.$i18n.locale);
    },
  },
  mounted() {
    this.$auth.$storage.removeUniversal('redirect');
    this.SET_PAGE_POPUP(this.$i18n.locale);
  },
  methods: {
    ...mapActions({
      SET_POPUP_LOGIN: "popup/SET_POPUP_LOGIN",
      SET_PAGE_POPUP: "pages/SET_PAGE_POPUP",
      SET_EVENT: 'gtm/SET_EVENT'
    }),
    openModal() {
      this.SET_POPUP_LOGIN(this.$i18n.locale);
    },
    socialAuth(social, params) {
      localStorage.setItem("locale", this.$i18n.locale);
      this.$auth.loginWith(social, params)
          .then(() => {
            this.SET_EVENT('login');
          });
    },
    closeLogin() {
      this.$bvModal.hide("modal-login");
    },
    goRegistration() {
      this.closeLogin();
      this.$goRegister();
    },
    closeModal() {
      this.$auth.$storage.removeUniversal('redirect');
    },
  },
};
</script>

<style lang="scss">
.modal-login {
  @include large-mobile {
    //padding-left: 15px !important;
    .modal-content {
      padding-bottom: 40rem;
      border-radius: 15rem 15rem 0 0;
    }
    //.modal-form {
    //  align-items: center;
    //}
    //.modal-dialog {
    //  align-items: center;
    //}
  }

  &__title {
    text-align: center;
  }

  &__form {
    margin-top: 30rem;
  }

  &__field {
    &:not(:first-child) {
      margin-top: 20rem;
    }
  }

  &__link {
    line-height: 0.8;
    display: inline-flex;
    margin-top: 10rem;
    font-weight: 600;
  }

  &__btn {
    width: 100%;

    &_reg {
      width: calc(100% + 20rem);
      margin-left: -10rem;
      margin-right: -10rem;
      margin-bottom: -10rem;
    }

    &_login {
      margin-top: 30rem;
    }
  }

  &__with {
    margin-top: 50rem;
    text-align: center;

    &-text {
      line-height: 0.8;
    }

    &-buttons {
      padding-top: 20rem;
      flex-grow: 1;

      button {
        width: 100%;
      }
    }
  }

  &__footer {
    margin-top: 30rem;
    padding-top: 34rem;

    .button-primary__icon {
      width: 18rem;
      height: 14rem;
    }
  }
}
</style>

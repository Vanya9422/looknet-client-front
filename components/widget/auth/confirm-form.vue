<template lang="pug">
  section-registration.confirm-page(
    v-if="PAGE_REGISTER_CONFIRM",
    :title="isEmail ? PAGE_REGISTER_CONFIRM.titleEmail : PAGE_REGISTER_CONFIRM.titlePhone",
    :img="{ left: 'reset1.png', right: 'reset2.png' }"
  )
    .registration-form__desc.p.color-gray
      div(v-if="USER", v-html="getDesc", @click="handleLineClick")
        |
    .registration-form__field
      confirm-code(@input="(res) => (this.codeString = res)", :error="error")
    template
      .c-pointer.registration-form__desc.mobile-hidden.p.color-blue(
        v-if="currentTime === 0",
        @click="resendCode"
      )
        | {{ PAGE_REGISTER_CONFIRM.codeReset }}
      .registration-form__desc.mobile-hidden.p.color-gray(v-else)
        | {{ PAGE_REGISTER_CONFIRM.codeAgain }} {{ $getMinutes(currentTime) }}
    .registration-form__social(v-if="link")
      .registration-form__social-text.p {{ PAGE_REGISTER_CONFIRM.goToTheMail }}
      .registration-form__social-list.flex
        button-primary.registration-form__social-btn.registration-form__social-btn-100(
          gray,
          :to="link.target_url",
          link,
          target="_blank",
          :icon="link.icon_name"
        )
          | {{ link.title }}
    template(v-slot:bottom)
      button-primary.registration-form__btn(
        @click.prevent.native="confirm($event)",
        blue
      ) {{ PAGE_REGISTER_CONFIRM.button }}
      template
        button-primary.c-pointer.registration-form__btn.mobile-visible(
          v-show="currentTime === 0",
          @click="resendCode",
          gray
        )
          span.color-gray Resend code
        button-primary.registration-form__btn.mobile-visible(
          :loading="loadingBtn",
          gray,
          v-show="currentTime !== 0"
        )
          span.color-gray {{ PAGE_REGISTER_CONFIRM.codeAgain }} {{ $getMinutes(currentTime) }}
      .registration-form__question
        | {{ PAGE_REGISTER_CONFIRM.text }}
        br
        a.link.color-blue(href="#", v-b-modal.modal-login) {{ PAGE_REGISTER_CONFIRM.link }}
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import timer from "@/mixins/helpers/timer";
import confirmCode from "@/mixins/helpers/confirmCode";
import getConstructorPage from "@/mixins/getConstructorPage";

export default {
  mixins: [timer, confirmCode, getConstructorPage],
  props: {
    reset: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: false,
      errors: {},
      repeatTime: 120,
      codeString: "",
      isEmail: true,
      link: null,
      type: "front_design",
      page_key: "other-confirm",
      loadingBtn: false,
    };
  },
  created() {
    this.getPage();
  },
  computed: {
    ...mapGetters({
      USER: "user/USER",
      PAGE_REGISTER_CONFIRM: "pages/PAGE_REGISTER_CONFIRM",
    }),
    getDesc() {
      let html = "";
      if (this.isEmail) {
        html = `${this.PAGE_REGISTER_CONFIRM.isEmail.desc1}
                <a href="mailto:${this.USER.confirmation_auth}">${this.USER.confirmation_auth}</a>.
                ${this.PAGE_REGISTER_CONFIRM.isEmail.desc2}`;
        if (this.currentTime === 0) {
          html += `<a class="c-pointer" id="resend-code"  onclick="${this.resendCode}">"${this.PAGE_REGISTER_CONFIRM.codeReset}"</a>`;
        } else {
          html += `"${
            this.PAGE_REGISTER_CONFIRM.codeResetText
          } ${this.$getMinutes(this.currentTime)}"`;
        }
        html += `${this.PAGE_REGISTER_CONFIRM.isEmail.desc3} <a href="mailto:help@looknet.com">help@looknet.com</a>`;
      } else {
        html = this.PAGE_REGISTER_CONFIRM.isPhone.desc1;
      }
      return html;
    },
  },
  mounted() {
    if (!this.modal) {
      if (this.USER?.confirmation_auth) {
        if (!this.$validateEmail(this.USER.confirmation_auth)) {
          this.isEmail = false;
        }
      } else {
        const token = this.$route.query.token;
        if (token) {
          const user = process.client ? JSON.parse(localStorage.getItem("user")) : null;
          if (user) {
            this.SET_USER(user);
            if (!this.$validateEmail(user.confirmation_auth)) {
              this.isEmail = false;
            }
          }
        } else {
          this.$goRegister();
        }
      }
      const link = process.client ? localStorage.getItem("link") : null;
      if (link) this.link = JSON.parse(link);
    }
  },
  methods: {
    ...mapActions({
      SET_USER: "user/SET_USER",
      SET_PAGE_REGISTRATION_CONFIRM: "pages/SET_PAGE_REGISTRATION_CONFIRM",
      SET_EVENT: 'gtm/SET_EVENT'
    }),
    getPage() {
      this.SET_PAGE_REGISTRATION_CONFIRM(this.$i18n.locale);
    },
    handleLineClick(e) {
      if (e.target.id === "resend-code") this.resendCode();
    },
    async confirm() {
      this.loadingBtn = true;
      if (this.codeString.length !== this.amount) {
        this.error = true;
      } else {
        this.error = false;
        const form = {
          confirmation_auth: this.USER.confirmation_auth,
          code: +this.codeString,
        };
        if (this.reset) form.reset_password = this.reset;
        const currentLocale = this.$i18n.locale;
        try {
          const res = await this.$axios.$post(this.$authApi.confirmLogin, form);
          if (res.status === "Success") {
            if (this.reset) {
              if (process.client) {
                localStorage.setItem("reset-token", res.data.access_token);
              }
              this.$router.push(this.$locationPath("/auth/reset-password"));
              this.loadingBtn = false;
            } else {
              this.$auth.strategy.token.set(res.data.access_token || null);
              this.$auth.setUser(res.data.user);
              await this.$auth
                .fetchUser()
                .then(() => {
                  this.SET_EVENT('sign-up');
                  this.$router.push(
                    this.$locationPath("/auth/registration-done", currentLocale)
                  );
                })
                .finally(() => (this.loadingBtn = false));
            }
          }
        } catch (e) {
          this.loadingBtn = false;
          this.errors = e.errors;
          this.error = true;
        }
      }
    },
    async resendCode(e) {
      const form = {
        confirmation_auth: this.USER.confirmation_auth,
      };
      try {
        const { instances } = await this.$axios.$options(this.$authApi.getCodeTypes);
        if (!instances) {
          throw new Error("no code types");
        }
        form.code_type = this.reset
          ? instances.RESET_PASS_CONFIRMATION_CODE
          : instances.REGISTER_CONFIRMATION_CODE;
        const res = await this.$axios.$post(this.$authApi.confirmCode, form);
        if (res.status === "Success") this.repeatCounter();
      } catch (error) {
        if (typeof error === "object") {
          this.errors = error?.response?.data?.errors || {};
        }
      }
    },
  },
};
</script>

<style lang="scss">
.registration-form__social-btn-100 {
  width: 100%;

  &:hover {
    color: inherit;
  }
}

.c-pointer {
  cursor: pointer;
}
</style>

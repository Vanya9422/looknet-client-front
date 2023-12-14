<template>
  <section-registration :title="content.title">
    <div class="registration-form__desc p color-gray">{{ content.description }}</div>
    <div class="registration-form__field">
      <label class="registration-form__label p b">{{ content.password.label }}</label>
      <form-input
        activeInput
        :placeholder="content.password.placeholder"
        :icon="isPassword ? 'eyeHide' : 'eyeShow'"
        :type="isPassword ? 'password' : 'text'"
        @click="isPassword = !isPassword"
        v-model.trim.lazy="form.password"
        @input="recommendedPassword(form.password)"
        :error="$v.form.$dirty && ($v.form.password.$error || recommendedError)"
        :valid="$v.form.password.$dirty && !$v.form.password.$error"/>
      <client-only>
        <password-rules
          style="padding-top: 15rem"
          :dirty="$v.form.$dirty"
          :recommended="recommended"
          :rules="PAGE_REGISTRATION.password?.rules"
        />
      </client-only>
    </div>
    <div class="registration-form__field">
      <label class="registration-form__label p b">{{ content.rePassword.label }}</label>
      <form-input
        activeInput
        :placeholder="content.rePassword.placeholder"
        :icon="isPasswordConfirm ? 'eyeHide' : 'eyeShow'"
        :type="isPasswordConfirm ? 'password' : 'text'"
        @click="isPasswordConfirm = !isPasswordConfirm"
        v-model.trim.lazy="form.password_confirmation"
        @input="$v.form.password_confirmation.$touch()"
        :error="$v.form.password_confirmation.$error || $v.form.password.$error"
        :valid="$v.form.password_confirmation.$dirty && !$v.form.password_confirmation.$error"/>
    </div>
    <template v-slot:bottom>
      <button-primary
        class="registration-form__btn"
        blue
        @click.prevent.native="reset"
      >
        {{ content.button }}
      </button-primary>
      <div class="registration-form__question">{{ content.text }}<br>
        <a class="link color-blue"
           href="#"
           v-b-modal.modal-login>{{ content.link }}
        </a>
      </div>
    </template>
    <modal-thank
      id="modal-thank-reset-password"
      :desc="POPUP_THANK.passwordRestored"
      :notRedirectToHome="false"
      @close="clearRedirectTimeout" />
    <modal-error
      :desc="errorText"
      @close="errorText = ''"
      id="modal-error-reset-password" />
  </section-registration>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { minLength, sameAs, required } from "vuelidate/lib/validators";
import recommendedPassword from "@/mixins/auth/recommendedPassword";
import getConstructorPage from "@/mixins/getConstructorPage";
import { parseRequestErrors } from "@/misc/utils/errors";

export default {
  layout: "default_small",
  middleware: ["ghost"],
  data() {
    return {
      type: "front_design",
      page_key: "other-recovery",
      content: {
        title: "Password recovery",
        description: "Enter your phone number or email",
        password: {
          label: "New password",
          placeholder: "Enter the password",
        },
        rePassword: {
          label: "Repeat the password",
          placeholder: "Enter the password",
        },
        button: "Send",
        text: "Do you already have a profile?",
        link: "Log in",
      },
      form: {
        password: "",
        password_confirmation: "",
      },
      errors: {},
      isPassword: true,
      isPasswordConfirm: true,
      redirectTimeout: null,
      errorText: "",
    };
  },
  mixins: [recommendedPassword, getConstructorPage],
  validations: {
    form: {
      password: { required, minLength: minLength(8) },
      password_confirmation: { sameAsPassword: sameAs("password") },
    },
  },
  computed: {
    ...mapGetters({
      POPUP_THANK: 'popup/POPUP_THANK',
      PAGE_REGISTRATION: "pages/PAGE_REGISTRATION",
    }),
  },
  created() {
    this.SET_POPUP_THANK();
    this.getPage();
  },
  mounted() {
    const token = process.client ? localStorage.getItem("reset-token") : null;
    if (!token || token === "0") this.$goRegister();
  },
  methods: {
    ...mapActions({
      SET_POPUP_THANK: 'popup/SET_POPUP_THANK',
      SET_PAGE_REGISTRATION: "pages/SET_PAGE_REGISTRATION",
    }),
    getPage() {
      this.SET_PAGE_REGISTRATION(this.$i18n.locale);
    },
    reset() {
      this.$v.form.$touch();
      if (process.client && !this.$v.form.$error) {
        const token = localStorage.getItem("reset-token");
        this.$axios.setToken(token, "Bearer");
        this.$axios.$put(this.$authApi.resetPassword, this.form).then((res) => {
          if (res.status === "Success") {
            localStorage.setItem("reset-token", 0);
            this.$axios.setToken(false);
            this.$bvModal.show("modal-thank-reset-password");
            this.redirectTimeout = setTimeout(() => {
              this.$router.push(this.$locationPath("/"));
              this.$bvModal.hide("modal-thank-reset-password");
            }, 3000);
          }
        })
          .catch((error) => {
            if (error?.response?.data) {
              const errors = parseRequestErrors(error.response.data);
              this.errorText = errors[0];
              this.$bvModal.show('modal-error-reset-password');
            }
          });
      }
    },
    clearRedirectTimeout() {
      if (this.redirectTimeout) {
        clearTimeout(this.redirectTimeout);
        this.redirectTimeout = null;
      }
    },
  },
};
</script>

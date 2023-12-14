<template lang="pug">
section-registration.reset-page(:title="PAGE_RESET.title")
  .registration-form__desc.p.color-gray
    | {{ PAGE_RESET.description }}

  auth-email-phone(
    :error="$v.form.confirmation_auth.$error || confirmation_authError || errors.hasOwnProperty('email') || errors.hasOwnProperty('phone')",
    @error="(val) => (confirmation_authError = val)",
    @input="changeConfirmAuth",
    :valid="$v.form.confirmation_auth.$dirty",
    :email="PAGE_RESET.email.email",
    :phoneText="PAGE_RESET.email.phone",
    :placeholder="PAGE_RESET.email.placeholder"
  )

  template(v-slot:bottom)
    button-primary.registration-form__btn(blue, @click.prevent.native="send") {{ PAGE_RESET.button }}
    .registration-form__question
      | {{ PAGE_RESET.text }}
      br
      a.link.color-blue(href="#", v-b-modal.modal-login) {{ PAGE_RESET.link }}
  modal-error(:desc="errorText" @close="errorText = ''" id="modal-error-reset")
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import { parsePhoneNumber } from "libphonenumber-js";
import getConstructorPage from "@/mixins/getConstructorPage";
import { parseRequestErrors } from "@/misc/utils/errors";

export default {
  layout: "default_small",
  middleware: ["ghost"],
  mixins: [getConstructorPage],
  data() {
    return {
      content: {
        title: "Password recovery",
        description:
          "Enter the email address you used when you joined and we’ll send you instructions to reset your password.",
        email: {
          label: "Phone or mail",
          placeholder: "Enter your phone number or email",
        },
        button: "Send",
        text: "Do you already have a profile?",
        link: "Log in",
      },
      type: "front_design",
      page_key: "other-reset",
      form: {
        confirmation_auth: "",
        token: Math.floor(Math.random() * 10000000),
      },
      loading: false,
      confirmation_authError: false,
      errors: {},
      errorText: "",
    };
  },
  validations: {
    form: {
      confirmation_auth: { required },
    },
  },
  computed: {
    ...mapGetters({
      USER: "user/USER",
      PAGE_RESET: "pages/PAGE_RESET",
    }),
  },
  created() {
    this.getPage();
  },
  methods: {
    ...mapActions({
      SET_USER: "user/SET_USER",
      SET_PAGE_RESET: "pages/SET_PAGE_RESET",
    }),
    getPage() {
      this.SET_PAGE_RESET(this.$i18n.locale);
    },
    changeConfirmAuth(val) {
      this.form.confirmation_auth = val;
      this.$v.form.confirmation_auth.$touch();
    },
    async send() {
      this.$v.form.$touch();
      if (!this.$v.form.$error && !this.confirmation_authError) {
        this.loading = true;
        const confirmation_auth = this.form.confirmation_auth;

        if (!this.$validateEmail(confirmation_auth)) {
          const parse = parsePhoneNumber(confirmation_auth);
          this.$set(this.form, 'confirmation_auth', parse.number.substring(1))
        }
        try {
          const { instances } = await this.$axios.$options(this.$authApi.getCodeTypes);
          if (!instances) {
            throw new Error("no code types");
          }
          this.form.code_type = instances.RESET_PASS_CONFIRMATION_CODE;
          const { status } = await this.$axios.$post(this.$authApi.resetCode, this.form);
          if (status === "Success") {
            this.errors = {};
            this.SET_USER(this.form);
            this.$router.push(this.$locationPath(
              `/auth/reset-password-confirm?token=${this.form.token}`
            ));
          }
        } catch (error) {
          if (error?.response?.data) {
            this.onError(error.response.data);
            this.errors = error.response.data.errors || {};
          }
        } finally {
          this.loading = false;
        }
      }
    },
    onError(data) {
      const errors = parseRequestErrors(data);
      this.errorText = errors[0];
      this.$bvModal.show('modal-error-reset');
    },
  },
};
</script>

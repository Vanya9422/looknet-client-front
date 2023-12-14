<template>
  <form class="modal-login__form"
        action="/registration">
    <div class="modal-login__field">
      <form-input
        class="modal-login__input"
        :activeInput="true"
        :placeholder="content.username.placeholder || 'Enter the login'"
        name="email"
        v-model.trim.lazy="form.confirmation_auth"
        @input="changeEmail"
        :debounce="false"
        :error="$v.form.confirmation_auth.$error || confirmation_authError ||  errors"
      />
    </div>
    <div class="modal-login__field">
      <form-input
        class="modal-login__input"
        :activeInput="true"
        :placeholder="content.password.placeholder || 'Enter the password'"
        name="password"
        :icon="isPassword ? 'eyeHide' : 'eyeShow' "
        :type="isPassword ? 'password':'text'"
        @click="isPassword = !isPassword"
        :debounce="false"
        v-model.trim.lazy="form.password"
        @input="changePassword"
        :error="$v.form.password.$error ||  errors.hasOwnProperty('password') ||  errors"></form-input>
      <nuxt-link
        class="modal-login__link color-blue"
        to=""
        @click.prevent.native="close()">{{ content.forget }}
      </nuxt-link>
      <p class="alert-error"
         v-if="errorForbidden">{{ 'Your account has been blocked by an administrator' }}</p>
    </div>
    <button-primary
      class="modal-login__btn modal-login__btn_login"
      blue
      @click.prevent.native="login">
      {{ content.login }}
    </button-primary>
    <modal-error
      :desc="errorText"
      @close="errorText = ''"
      id="modal-error-login"></modal-error>
  </form>
</template>

<script>
import loginValidation from "@/mixins/auth/loginValidation";
import { mapActions } from "vuex";
import { parsePhoneNumber } from "libphonenumber-js";
import { parseRequestErrors } from "@/misc/utils/errors";

export default {
  props: {
    content: {
      type: Object,
      default: () => {
      }
    }
  },
  mixins: [loginValidation],
  data() {
    return {
      errors: false,
      isPassword: true,
      errorForbidden: false,
      errorText: '',
    };
  },
  computed: {
    parsedPhone() {
      if (this.$validateEmail(this.form.confirmation_auth)) return {};
      const parse = parsePhoneNumber(
        this.form.confirmation_auth, {
          defaultCountry: 'US',
        });
      return parse;
    }
  },
  methods: {
    ...mapActions({
      ADD_CONVERSATION: 'chat/ADD_CONVERSATION',
      SET_USER_LOCATION: 'location/SET_USER_LOCATION',
      SET_LOGIN_FAV_PRODUCTS: 'favourites/SET_LOGIN_FAV_PRODUCTS',
      SET_USER_LOCAL: 'user/SET_USER_LOCAL',
      SET_EVENT: 'gtm/SET_EVENT'
    }),
    changeEmail() {
      this.errors = false;
      this.$v.form.confirmation_auth.$touch();
    },

    changePassword() {
      this.errors = false;
      this.$v.form.password.$touch();
    },
    async login() {
      this.$v.form.$touch();
      if (!this.$v.form.$error && !this.confirmation_authError) {
        const currentLocale = this.$i18n.locale;
        const confirmation_auth = this.form.confirmation_auth;
        const requestForm = { ...this.form };

        if (process.client) {
          localStorage.setItem('user', 0);
          localStorage.setItem("lang", currentLocale);
        }

        if (!this.$validateEmail(confirmation_auth)) {
          const preparePhone = parsePhoneNumber(
            confirmation_auth, {
              defaultCountry: 'US',
            });
          requestForm.confirmation_auth = preparePhone.number.substring(1);
        }

        console.log('logging in with sanctum');

        try {
          const e = await this.$auth.loginWith('laravelSanctum', { data: requestForm });

          console.log('logging then.');

          const isAuthPage = this.$route.path.search('auth') !== -1;
          if (!isAuthPage) {
            this.$auth.$storage.setUniversal('redirect', this.$route.path);
          }

          console.log(
            'auth-token',
            e.data.data.access_token,
          );
          this.SET_EVENT('login')
          await this.SET_USER_LOCAL(e.data.data.access_token);
          this.SET_LOGIN_FAV_PRODUCTS(this.$auth.user.favorites_ids);
          this.SET_USER_LOCATION(this.$auth.user);
          if (isAuthPage) {
            this.$router.push(this.$locationPath('/'));
          }
          const message = process.client ? localStorage.getItem('send_message') : null;
          if (message) {
            this.ADD_CONVERSATION(JSON.parse(message));
            if (process.client) {
              localStorage.removeItem('send_message');
            }
          }
          const redirect = this.$auth.$storage.getUniversal('redirect');
          if (redirect) {
            this.$router.push(redirect);
          }
          this.errors = false;
          this.$emit('close');
        } catch ({ response }) {
          if (response.data) {
            const errors = parseRequestErrors(response.data);
            this.errorText = errors[0];
          }
          this.$bvModal.show('modal-error-login');
          this.errors = true;
          console.log(response, "ERR");
          if (response.status === 403) {
            this.errorForbidden = true;
          }
        }
      }
    },
    close() {
      this.$emit('close');
      this.$router.push(this.$locationPath('/auth/reset'));
    }
  }
};
</script>

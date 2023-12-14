<template>
  <section-registration
    :title="PAGE_REGISTRATION.create"
    :img="{ left: 'registration__img1.png', right: 'registration__img2.png' }"
    v-if="PAGE_REGISTRATION">
    <div class="registration-form__social">
      <div class="registration-form__social-list flex">
        <button-primary
          class="registration-form__social-btn"
          gray
          @click.prevent.native="socialAuth('google', { params: { prompt: 'select_account' } })">
          <set-img
            img-class="button-primary__icon"
            :default-img="require(`~/assets/img/gmail.png`)"></set-img>
          Gmail
        </button-primary>
      </div>
    </div>
    <div class="registration-form__separator flex flex_center">
      <div class="registration-form__separator-text p">
        {{ PAGE_REGISTRATION.singWith }}
      </div>
    </div>
    <div class="registration-form__fields">
      <div class="registration-form__fields-row flex">
        <div class="registration-form__field">
          <label class="registration-form__label p b">
            {{ PAGE_REGISTRATION.name.label }}
          </label>
          <form-input
            :placeholder="PAGE_REGISTRATION.name.placeholder"
            v-model.trim.lazy="form.fName"
            @input="$v.form.fName.$touch()"
            :error="$v.form.fName.$error"
            :valid="$v.form.fName.$dirty && !$v.form.fName.$error"></form-input>
        </div>
        <div class="registration-form__field">
          <label class="registration-form__label p b">
            {{ PAGE_REGISTRATION.lName.label }}
          </label>
          <form-input
            :placeholder="PAGE_REGISTRATION.lName.placeholder"
            v-model.trim.lazy="form.lName"
            @input="$v.form.lName.$touch()"
            :error="$v.form.lName.$error"
            :valid="$v.form.lName.$dirty && !$v.form.lName.$error"></form-input>
        </div>
      </div>
      <auth-email-phone
        :error="$v.form.confirmation_auth.$error || confirmation_authError || errors.hasOwnProperty('email') || errors.hasOwnProperty('phone')"
        @error="(val) => (confirmation_authError = val)"
        @input="changeConfirmAuth"
        :valid="$v.form.confirmation_auth.$dirty"
        :email="PAGE_REGISTRATION.username.email"
        :phoneText="PAGE_REGISTRATION.username.phone"
        :placeholder="PAGE_REGISTRATION.username.placeholder"
        check
        :content="PAGE_REGISTRATION" />
      <div class="registration-form__field">
        <label class="registration-form__label p b">
          {{ PAGE_REGISTRATION.password.label }}
        </label>
        <form-input
          :activeInput="true"
          :placeholder="PAGE_REGISTRATION.password.placeholder"
          :icon="isPassword ? 'eyeHide' : 'eyeShow'"
          :type="isPassword ? 'password' : 'text'"
          @click="isPassword = !isPassword"
          v-model.trim.lazy="form.password"
          @input="recommendedPassword(form.password)"
          :error="$v.form.$dirty && ((errors.hasOwnProperty('password') && errors.password) || recommendedError)"
          :valid="$v.form.password.$dirty && !$v.form.password.$error"></form-input>
        <client-only>
          <password-rules
            style="padding-top: 15rem"
            :dirty="$v.form.$dirty"
            :recommended="recommended"
            :rules="PAGE_REGISTRATION.password?.rules"
          />
        </client-only>
      </div>
      <div  class="registration-form__bottom-separator" />
      <form-checkbox
        class="registration-form__checkbox"
        :class="{ error: $v.form.remember.$error }"
        :checked="form.remember"
        @change="form.remember = !form.remember"
        @input="$v.form.remember.$touch()"
        :error="$v.form.remember.$error">
        I agree with
        <NuxtLink
          class="registration-form__checkbox__link"
          :to="$locationPath('/privacy-policy')">rules
        </NuxtLink>
        of this system
      </form-checkbox>
    </div>
    <template v-slot:bottom>
      <button-primary
        class="registration-form__btn"
        :loading="loadingBtn"
        blue
        @click.prevent.native="registration"
      >
        {{ PAGE_REGISTRATION.sing }}
      </button-primary>
      <div class="registration-form__question">
        {{ PAGE_REGISTRATION.haveProfile }}<br>
        <a class="link color-blue"
           href="#"
           v-b-modal.modal-login
        >
          {{ PAGE_REGISTRATION.login }}
        </a>
      </div>
    </template>
    <modal-error
      :desc="errorText"
      @close="errorText = ''"
      id="modal-error-register" />
  </section-registration>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import registrationValidation from "@/mixins/auth/registrationValidation";
import recommendedPassword from "@/mixins/auth/recommendedPassword";
import { parsePhoneNumber } from "libphonenumber-js";
import { parseRequestErrors } from "@/misc/utils/errors";

export default {
  layout: "default_small",
  middleware: ["ghost"],
  mixins: [registrationValidation, recommendedPassword],
  data() {
    return {
      type: "front_design",
      page_key: "register",
      errors: {},
      confirmation_authError: false,
      isPassword: true,
      loadingBtn: false,
      errorText: "",
    };
  },
  computed: {
    ...mapGetters({
      USER: "user/USER",
      PAGE_REGISTRATION: "pages/PAGE_REGISTRATION",
      LOCATION: "location/LOCATION",
    }),
  },
  created() {
    this.getPage();
  },
  methods: {
    ...mapActions({
      SET_USER: "user/SET_USER",
      SET_PAGE_REGISTRATION: "pages/SET_PAGE_REGISTRATION",
      SET_EVENT: 'gtm/SET_EVENT'
    }),
    getPage() {
      this.SET_PAGE_REGISTRATION(this.$i18n.locale);
    },
    changeConfirmAuth(val) {
      this.form.confirmation_auth = val;
      this.$v.form.confirmation_auth.$touch();
    },
    registration() {
      this.loadingBtn = true;
      this.errors = {};
      this.$v.form.$touch();
      let confirmation_auth = this.form.confirmation_auth;
      if (!this.$v.form.$error && !this.confirmation_authError) {
        if (!this.errors.phone) {
          let city = {};
          if (this.LOCATION) {
            if (this.LOCATION.id === "c1") {
              city = {
                country: 1,
              };
            } else {
              city = {
                city_id: this.LOCATION.id,
                country: 0,
                latitude: "" + this.LOCATION.latitude,
                longitude: "" + this.LOCATION.longitude,
              };
            }
          }

          const form = {
            first_name: this.form.fName,
            last_name: this.form.lName,
            policy: this.form.remember ? 1 : 0,
            confirmation_auth,
            password: this.form.password,
            ...city,
          };
          if (!this.$validateEmail(confirmation_auth)) {
            const parse = parsePhoneNumber(confirmation_auth);
            form.confirmation_auth = parse.number.substring(1);
            form.phone_view = confirmation_auth;
          }
          this.$axios
            .$get(this.$authApi.csrf)
            .then((res) => this.authUser(form))
            .catch((error) => {
              if (error?.response?.data) {
                this.onError(error.response.data);
              }
            });
        } else {
          this.loadingBtn = false;
        }
      } else {
        this.loadingBtn = false;
      }
    },
    authUser(form) {
      this.$axios
        .$post(this.$authApi.register, form)
        .then((res) => {
          if (res.status === "Success") {
            this.SET_USER({
              confirmation_auth: form.confirmation_auth,
              token: this.form.token,
            });
            this.$router.push(
              this.$locationPath(
                `/auth/registration-confirm?token=${this.form.token}`
              )
            );
          }
        })
        .catch(({ response }) => {
          if (response.data) {
            this.errors = response.data.errors || {};
            this.onError(response.data);
          }
        })
        .finally(() => {
          this.loadingBtn = false;
        });
    },
    socialAuth(social, params) {
      localStorage.setItem("locale", this.$i18n.locale);
      this.$auth.loginWith(social, params)
        .then(() => {
          this.SET_EVENT('sign-up');
        });
    },
    onError(data) {
      const errors = parseRequestErrors(data);
      this.errorText = errors[0];
      this.$bvModal.show('modal-error-register');
    },
  },
};
</script>
<style lang="scss">
.input-error-text {
  margin: 8px 0;
}

.registration-form__checkbox.error {
  color: inherit;
  animation: my-animation 3s;
}

@keyframes my-animation {
  0% {
    color: $red;
  }

  100% {
    color: $red;
  }
}

.button-primary__icon {
  width: 18rem;
  height: 14rem;
}
</style>

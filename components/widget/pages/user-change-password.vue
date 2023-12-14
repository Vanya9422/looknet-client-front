<template lang="pug">
form.edit-field.settings__field
  .edit-field___wrap(v-if="edit")
    .edit-field__row
      .edit-field__column.edit-field__column_left
        .edit-field__label.color-gray.p {{ content.currentPassword.label }}
      .edit-field__column.edit-field__column_center
        form-input.pb-4(
          :activeInput="true",
          v-model="form.current_password",
          :placeholder="content.currentPassword.placeholder",
          :icon="isPassword1 ? 'eyeHide' : 'eyeShow'",
          :type="isPassword1 ? 'password' : 'text'",
          :error="$v.form.current_password.$error",
          :valid="$v.form.current_password.$dirty && !$v.form.current_password.$error",
          @click="isPassword1 = !isPassword1",
          @input="$v.form.current_password.$touch()"
        )
      .edit-field__column.edit-field__column_right
        .edit-field__nav
          .edit-field__nav-item
            .edit-field__link.color-gray(@click="closeEdit")
              svg-icon.edit-field__icon.edit-field__icon-close(name="close")
          .edit-field__nav-item
            .edit-field__link.color-blue(@click="saveEdit")
              svg-icon.edit-field__icon.edit-field__icon-checked(name="check")
    .edit-field__row
      .edit-field__column.edit-field__column_left
        .edit-field__label.color-gray.p {{ content.password.label }}
      .edit-field__column.edit-field__column_center
        form-input(
          :activeInput="true",
          v-model="form.password",
          :placeholder="content.password.placeholder",
          :error="$v.form.$dirty && ($v.form.password.$error || recommendedError)",
          :valid="$v.form.password.$dirty && !$v.form.password.$error",
          :icon="isPassword2 ? 'eyeHide' : 'eyeShow'",
          :type="isPassword2 ? 'password' : 'text'",
          @click="isPassword2 = !isPassword2",
          @input="recommendedPassword(form.password)"
        )
    .edit-field__row
      .edit-field__column.edit-field__column_left
      .edit-field__column.edit-field__column_center
        password-rules(
          :dirty="$v.form.$dirty"
          :recommended="recommended"
          :rules="PAGE_REGISTRATION.password?.rules")
    .edit-field__row
      .edit-field__column.edit-field__column_left
        .edit-field__label.color-gray.p {{ content.newPassword.label }}
      .edit-field__column.edit-field__column_center
        form-input.modal-field__input(
          :activeInput="true",
          v-model="form.password_confirmation",
          :placeholder="content.newPassword.placeholder",
          @click="isPassword3 = !isPassword3",
          @input="$v.form.password_confirmation.$touch()",
          :error="$v.form.password_confirmation.$error || $v.form.password.$error",
          :valid="$v.form.password_confirmation.$dirty && !$v.form.password_confirmation.$error",
          :icon="isPassword3 ? 'eyeHide' : 'eyeShow'",
          :type="isPassword3 ? 'password' : 'text'"
        )
    modal-thank(@close="closeEdit")
    modal-delete(
      :title="content.safetyError",
      :desc="errorText",
      withOutBtn,
    )
    modal-confirmation(@send="changePass")
    modal-confirm(
      :info="{ confirmation_auth: $auth.user[confirmationType], ...form }",
      :isShow="isShow",
      :title="confirmContent?.title"
      :desc="confirmContent?.desc"
      @reset="resetCode",
      @error="openErrorModal",
      @success="showThank"
    )

  .edit-field__row(v-else)
    .edit-field__column.edit-field__column_left
      .edit-field__label.color-gray.p {{ content.password.label }}
    .edit-field__column.edit-field__column_center
      .edit-field__placeholder.h4 ••••••••••
    .edit-field__column.edit-field__column_right
      .edit-field__nav.mobile-hidden
        .edit-field__nav-item
          .edit-field__link.color-blue(@click="showEdit")
            svg-icon.edit-field__icon(name="edit")
      .edit-field__nav.mobile-visible
          .edit-field__nav-item
            .edit-field__link.color-blue(
              @click="$bvModal.show(`fieldPassword`)"
            )
              svg-icon.edit-field__icon(name="edit")
    modal-field#fieldPassword(
      :title="content.safety",
      :closeAuto="false"
      @save="saveEdit",
      @hide="closeEdit",
    )
      .modal-field__list
        .modal-field__item
          .modal-field__label {{ content.currentPassword.label }}
          form-input.modal-field__input(
            :activeInput="true",
            v-model="form.current_password",
            :placeholder="content.currentPassword.placeholder",
            :icon="isPassword1 ? 'eyeHide' : 'eyeShow'",
            :type="isPassword1 ? 'password' : 'text'",
            :error="$v.form.current_password.$error",
            :valid="$v.form.current_password.$dirty && !$v.form.current_password.$error",
            @click="isPassword1 = !isPassword1",
            @input="$v.form.current_password.$touch()"
          )
        .modal-field__item
          .modal-field__label {{ content.password.label }}
          form-input.modal-field__input(
            :activeInput="true",
            v-model="form.password",
            :placeholder="content.password.placeholder",
            @click="isPassword2 = !isPassword2",
            @input="recommendedPassword(form.password)",
            :icon="isPassword2 ? 'eyeHide' : 'eyeShow'",
            :type="isPassword2 ? 'password' : 'text'",
            :error="$v.form.$dirty && ($v.form.password.$error || recommendedError)",
            :valid="$v.form.password.$dirty && !$v.form.password.$error"
          )
        .modal-field__item
          password-rules(
            :dirty="$v.form.$dirty"
            :recommended="recommended"
            :rules="PAGE_REGISTRATION.password?.rules"
          )
        .modal-field__item
          .modal-field__label {{ content.newPassword.label }}
          form-input.modal-field__input(
            :activeInput="true",
            v-model="form.password_confirmation",
            :placeholder="content.newPassword.placeholder",
            @click="isPassword3 = !isPassword3",
            @input="$v.form.password_confirmation.$touch()",
            :error="$v.form.password_confirmation.$error || $v.form.password.$error",
            :valid="$v.form.password_confirmation.$dirty && !$v.form.password_confirmation.$error",
            :icon="isPassword3 ? 'eyeHide' : 'eyeShow'",
            :type="isPassword3 ? 'password' : 'text'"
          )
        modal-thank(@close="closeEdit" :desc="POPUP_THANK.passwordChanged")
        modal-delete(
          :title="content.safetyError",
          :desc="errorText",
          withOutBtn,
        )
        modal-confirmation(@send="changePass")
        modal-confirm(
          :info="{ confirmation_auth: $auth.user[confirmationType], ...form }",
          :isShow="isShow",
          :title="confirmContent?.title"
          :desc="confirmContent?.desc"
          @reset="resetCode",
          @error="openErrorModal",
          @success="showThank"
        )

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import recommendedPassword from "@/mixins/auth/recommendedPassword";
import { minLength, required, sameAs } from "vuelidate/lib/validators";
import { parseRequestErrors } from '~/misc/utils/errors';

export default {
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      edit: false,
      form: {
        current_password: "",
        password: "",
        password_confirmation: "",
      },
      isPassword1: true,
      isPassword2: true,
      isPassword3: true,
      isShow: false,
      confirmationType: null,
      errorText: '',
    };
  },
  mixins: [recommendedPassword],
  validations: {
    form: {
      current_password: { required },
      password: { required, minLength: minLength(8) },
      password_confirmation: { required, sameAsPassword: sameAs("password") },
    },
  },
  computed: {
    ...mapGetters({
      POPUP_CONFIRM: 'popup/POPUP_CONFIRM',
      PAGE_REGISTRATION: "pages/PAGE_REGISTRATION",
      POPUP_THANK: 'popup/POPUP_THANK',
    }),
    confirmContent() {
      if (this.confirmationType === 'email') {
        return this.POPUP_CONFIRM.confirmEmail;
      }
      if (this.confirmationType === 'phone') {
        return this.POPUP_CONFIRM.confirmPhone;
      }
      return {};
    },
  },
  created() {
    this.SET_POPUP_CONFIRM();
    this.SET_PAGE_REGISTRATION();
    this.SET_POPUP_THANK();
  },
  methods: {
    ...mapActions({
      SET_POPUP_CONFIRM: 'popup/SET_POPUP_CONFIRM',
      SET_PAGE_REGISTRATION: "pages/SET_PAGE_REGISTRATION",
      SET_POPUP_THANK: 'popup/SET_POPUP_THANK',
    }),
    openErrorModal(data) {
      if (data) {
        const errors = parseRequestErrors(data);
        this.errorText = errors[0] || '';
      }
      this.$bvModal.show(`modal-delete`);
    },
    changePasswordCorrent() {
      this.$v.form.current_password.$touch();
      this.current_password_error = false;
    },
    showEdit() {
      this.edit = true;
    },
    closeEdit() {
      this.edit = false;
      this.$v.form.$reset();
      this.form = {
        current_password: "",
        password: "",
        password_confirmation: "",
      };
      this.isShow = false;
      this.$root.$emit("bv::hide::modal", "fieldPassword");
    },
    showThank() {
      this.$bvModal.show('modal-thank')
    },
    async resetCode() {
      if (this.$v.form.$error && this.recommendedPasswordCount !== 5) return;
      try {
        const form = {
          confirmation_auth: this.$auth.user[this.confirmationType],
          confirmation_type: this.confirmationType,
        };
        const { instances } = await this.$axios.$options(this.$authApi.getCodeTypes);
        if (!instances) {
          throw new Error("no code types");
        }
        form.code_type = instances.CHANGE_PASSWORD_CONFIRMATION_CODE;
        await this.$axios.$post(this.$api.changeSettings.confirmation, form);
      } catch (error) {
        console.error(error);
      }
    },
    saveEdit() {
      this.$v.form.$touch();
      if (!this.$v.form.$error && this.recommendedPasswordCount === 5) {
        this.$root.$emit('bv::show::modal', 'modal-confirmation');
      }
    },
    changePass(confirmationType) {
      this.confirmationType = confirmationType;
      this.isShow = true;
      this.$bvModal.show('modal-confirm');
    },
  },
};
</script>

<style scoped>
</style>

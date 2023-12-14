<template>
  <div class="edit-field settings__field">
    <div class="edit-field__row">
      <div class="edit-field__column edit-field__column_left">
        <div class="edit-field__label color-gray p">{{ content.email.label }}</div>
      </div>
      <div class="edit-field__column edit-field__column_center">
<!--        <div name="emailTakenTip">-->
<!--          Email taken-->
<!--        </div>-->
        <client-only v-if="edit">
          <form-input
            v-model="value"
            :value="value"
            :name="name"
            :placeholder="content.email.placeholder"
            :type="type"
            :error="!notError"
            name="emailInput"
          />
          <tippy
            class="tippy-hide"
            :animate-fill="false"
            distant="7"
            theme="danger"
            animation="fade"
            arrow
            to="emailInput"
            placement="bottom"
            trigger="manual"
            :visible="!isEmailFree && !isCheckingEmail"
            :content="content.email.taken"
          />
        </client-only>

        <div class="edit-field__placeholder h4" v-else>{{ value }}</div>
      </div>
      <div class="edit-field__column edit-field__column_right">
        <div class="edit-field__nav mobile-hidden" v-if="edit">
          <modal-confirmation @send="changeEmail" @close="closeEdit" />
          <modal-confirm
            :info="{ confirmation_auth: value }"
            :isShow="isShow"
            :title="confirmContent?.title"
            :desc="confirmContent?.desc"
            :confirmationCount="confirmationCount"
            @reset="sendCode"
            @success="successEdit"
            @error="$emit('error', $event)"
            @close="closeEdit"
            changeUserInfo
          />
          <div class="edit-field__nav-item">
            <div class="edit-field__link color-gray" @click="closeEdit">
              <svg-icon class="edit-field__icon edit-field__icon-close" name="close"></svg-icon>
            </div>
          </div>
          <div class="edit-field__nav-item" v-if="isEmailFree || isCheckingEmail">
            <Loader v-if="isCheckingEmail" class="white" />
            <div v-else class="edit-field__link color-blue" @click="closeSave">
              <svg-icon class="edit-field__icon edit-field__icon-checked" name="check" />
            </div>
          </div>
        </div>
        <div class="edit-field__nav mobile-hidden" v-else>
          <div class="edit-field__nav-item">
            <div class="edit-field__link color-blue" @click="showEdit">
              <svg-icon class="edit-field__icon" name="edit"></svg-icon>
            </div>
          </div>
        </div>
        <div class="edit-field__nav mobile-visible">
          <div class="edit-field__nav-item">
            <div class="edit-field__link color-blue" @click="$bvModal.show(`${modalName}`)">
              <svg-icon class="edit-field__icon" name="edit"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-field
      :id="modalName"
      :closeAuto="false"
      :title="POPUP_CONFIRM.confirmation?.email"
      @save="closeSave"
      @hide="closeEdit"
    >
      <div class="modal-field__list">
        <div class="modal-field__item">
          <div class="modal-field__label">{{content.email.label}}</div>
          <form-input
            class="modal-field__input"
            v-model="value"
            :name="name"
            :placeholder="content.email.placeholder"
            :type="type"
            :error="!notError"
            name="emailInput"
          />
          <tippy
            class="tippy-hide"
            :animate-fill="false"
            distant="7"
            theme="danger"
            animation="fade"
            arrow
            to="emailInput"
            placement="bottom-end"
            trigger="manual"
            :visible="!isEmailFree && !isCheckingEmail"
            :content="content.email.taken"
          />
        </div>
        <modal-confirmation @send="changeEmail" @close="closeEdit" />
        <modal-confirm
          :info="{ confirmation_auth: value }"
          :isShow="isShow"
          :title="confirmContent?.title"
          :desc="confirmContent?.desc"
          :confirmationCount="confirmationCount"
          @reset="sendCode"
          @success="successEdit"
          @error="$emit('error', $event)"
          @close="closeEdit"
          changeUserInfo
        />
      </div>
    </modal-field>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    content:{
      type:Object,
      default: () => {}
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      placeholder: 'Bari56@mail.ru',
      value: this.$auth.user.email,
      type: "email",
      name: "email",
      modalName: 'email',
      notError: true,
      isShow: false,
      oldValue: this.$auth.user.email,
      confirmationType: null,
      confirmationCount: 2,
      isEmailFree: true,
      isCheckingEmail: false,
    }
  },
  computed: {
    ...mapGetters({
      POPUP_CONFIRM: 'popup/POPUP_CONFIRM',
    }),
    confirmContent() {
      if (this.confirmationType === 'email') {
        if (!this.POPUP_CONFIRM.confirmEmail) return {};
        return {
          ...this.POPUP_CONFIRM.confirmEmail,
          desc: `${this.POPUP_CONFIRM.confirmEmail.desc} (${this.confirmationCount === 2 ? this.oldValue : this.value})`,
        };
      }
      if (this.confirmationType === 'phone') {
        if (!this.POPUP_CONFIRM.confirmPhone) return {};
        return {
          ...this.POPUP_CONFIRM.confirmPhone,
          desc: `${this.POPUP_CONFIRM.confirmPhone.desc} (${this.confirmationCount === 2 ? '+' + this.$auth.user.phone : this.value})`,
        };
      }
      return {};
    },
  },
  watch: {
    value(val) {
      this.isEmailFree = true;

      if (val) {
        this.notError = val.length > 2
        if (this.modalName === 'email') this.notError = this.$validateEmail(val)
        if (val === this.oldValue) this.notError = false
      }
    }
  },
  created() {
    this.SET_POPUP_CONFIRM();
  },
  methods: {
    ...mapActions({
      SET_POPUP_CONFIRM: 'popup/SET_POPUP_CONFIRM',
      LOAD_USER_INFO: "user/LOAD_USER_INFO",
    }),
    async checkEmail() {
      this.isEmailFree = false;
      this.isCheckingEmail = true;

      try {
        const res = await this.$axios.$get("/auth/check-exists", {
          params: {
            value: this.value,
            field: "email",
          }
        });

        this.isEmailFree = !res.email;
      } catch (error) {
        if (error?.response?.data) {
          this.$emit("error", error.response.data);
        }
      } finally {
        this.isCheckingEmail = false;
      }
    },
    showEdit() {
      this.$emit('edit', true);
      this.notError = true;
      this.oldValue = this.value;
    },
    closeEdit() {
      this.confirmationCount = 2;
      this.$emit('edit', false);
      this.value = this.oldValue;
    },
    successEdit() {
      this.LOAD_USER_INFO();
      this.$emit('edit', false);
      this.$bvModal.show('modal-thank-settings');
      this.$root.$emit('bv::hide::modal', this.modalName);
      this.confirmationCount = 2;
    },
    async closeSave() {
      await this.checkEmail();

      if (!this.isEmailFree) return;

      this.confirmationCount = 2;
      if (this.notError && this.value !== this.oldValue) {
        this.$root.$emit('bv::show::modal', 'modal-confirmation');
      } else {
        this.notError = false
      }
    },
    changeEmail(confirmationType) {
      this.confirmationType = confirmationType;
      this.isShow = true;
      this.$root.$emit('bv::show::modal', 'modal-confirm');
    },
    async sendCode(code) {
      try {
        const form = {
          confirmation_auth: code
            ? this.value
            : this.oldValue || this.$auth.user.phone,
        };

        if (code) {
          form.code = code;
        } else if (this.oldValue && this.confirmationType !== 'email') {
          form['confirmation_type'] = this.confirmationType;
        }

        const { instances } = await this.$axios.$options(this.$authApi.getCodeTypes);
        if (!instances) {
          throw new Error("no code types");
        }
        form.code_type = instances.CHANGE_EMAIL_OR_PHONE_SETTINGS_CONFIRMATION_CODE;
        await this.$axios.$put(this.$api.changeSettings.sendEmail, form);

        this.confirmationCount = code ? 1 : 2;
      } catch (error) {
        if (typeof error === "object" && error?.response?.data) {
          this.$emit("error", error.response.data);
        }
        this.notError = false;
      }
    },
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="edit-field settings__field">
    <div class="edit-field__row">
      <div class="edit-field__column edit-field__column_left">
        <div class="edit-field__label color-gray p">{{ content.phone.label }}</div>
      </div>
      <div class="edit-field__column edit-field__column_center">
        <client-only>
          <div
            name="phoneInput"
            class="edit-field__placeholder-lang edit-field__column_center-phone">
            <form-select-lang
              class="favorites-ad__select"
              :disabled="!edit"
              :showIconDown="edit"
              @search="searchPhones"
              @input="changeActivePhone"
              lang
              :items="phone"
              v-model="activePhone"
              :value="activePhone"
              noBorder
            />
            <div class="check-field__phone"
                 :class="edit ? 'edit-field__column_center-phone__text' : ''">
              <div class="check-field__phone-code">{{ activePhone.code }}</div>
              <input class="check-field__phone-input"
                     :placeholder="activePhone.phone"
                     :disabled="!edit"
                     v-model="value"
                     v-mask="activePhone.phone">
            </div>
          </div>
          <tippy
            class="tippy-hide"
            :animate-fill="false"
            distant="7"
            theme="danger"
            animation="fade"
            arrow
            to="phoneInput"
            placement="bottom"
            trigger="manual"
            :visible="!isPhoneFree && !isCheckingPhone"
            :content="content.email.taken"
          />
        </client-only>
      </div>
      <div class="edit-field__column edit-field__column_right">
        <div class="edit-field__nav mobile-hidden"
             v-if="edit">
          <modal-confirmation @send="changePhone"
                              @close="closeEdit" />
          <modal-confirm
            :info="info"
            :isShow="isShow"
            :title="confirmContent?.title"
            :desc="confirmContent?.desc"
            :confirmationCount="confirmationCount"
            @reset="sendCode"
            @success="successEdit"
            @error="$emit('error', $event)"
            @close="closeEdit"
            changeUserInfo
            change-phone
          />
          <div class="edit-field__nav-item">
            <div class="edit-field__link color-gray"
                 @click="closeEdit">
              <svg-icon class="edit-field__icon edit-field__icon-close"
                        name="close"></svg-icon>
            </div>
          </div>
          <div class="edit-field__nav-item">
            <Loader v-if="isCheckingPhone"
                    class="white" />
            <div v-else
                 class="edit-field__link color-blue"
                 @click="closeSave">
              <svg-icon class="edit-field__icon edit-field__icon-checked"
                        name="check"></svg-icon>
            </div>
          </div>
        </div>
        <div class="edit-field__nav mobile-hidden"
             v-else>
          <div class="edit-field__nav-item">
            <div class="edit-field__link color-blue"
                 @click="showEdit">
              <svg-icon class="edit-field__icon"
                        name="edit"></svg-icon>
            </div>
          </div>
        </div>
        <div class="edit-field__nav mobile-visible">
          <div class="edit-field__nav-item">
            <div class="edit-field__link color-blue"
                 @click="$bvModal.show(`${modalName}`)">
              <svg-icon class="edit-field__icon"
                        name="edit"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-field
      :id="modalName"
      :closeAuto="false"
      :title="POPUP_CONFIRM.confirmation?.phone"
      @save="closeSave"
      @hide="closeEdit"
    >
      <div class="modal-field__list">
        <div class="modal-field__item">
          <div class="modal-field__label">{{ content.phone.label }}
            <div class="check-field">
              <div class="check-field__content check-field__content-phone edit-field__placeholder-lang"
                   style="overflow: visible !important">
                <form-select-lang
                  class="favorites-ad__select"
                  @search="searchPhones"
                  @input="changeActivePhone"
                  lang
                  :items="phone"
                  v-model="activePhone"
                  :value="activePhone"
                  noBorder></form-select-lang>
                <div class="check-field__phone">
                  <div class="check-field__phone-code">{{ activePhone.code }}</div>
                  <input class="check-field__phone-input"
                         :placeholder="activePhone.phone"
                         v-model="value"
                         v-mask="activePhone.phone">
                </div>
              </div>
            </div>
          </div>
        </div>
        <modal-confirmation @send="changePhone"
                            @close="closeEdit" />
        <modal-confirm
          :info="info"
          :isShow="isShow"
          :title="confirmContent?.title"
          :desc="confirmContent?.desc"
          :confirmationCount="confirmationCount"
          @reset="sendCode"
          @success="successEdit"
          @error="$emit('error', $event)"
          @close="closeEdit"
          changeUserInfo
          change-phone
        />
      </div>
    </modal-field>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { parsePhoneNumber } from "libphonenumber-js";
import phoneList from "@/misc/phone.json";

export default {
  props: {
    content: {
      type: Object,
      default: () => {
      },
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      placeholder: "Bari56@mail.ru",
      value: this.$auth.user.phone,
      type: "text",
      name: "phone",
      modalName: "phone",
      notError: true,
      isShow: false,
      oldValue: this.$auth.user.phone_view,
      phone: phoneList,
      activePhone: phoneList[190],
      info: {
        confirmation_auth: this.value,
        phone_view: "",
      },
      confirmationType: null,
      confirmationCount: 2,

      isPhoneFree: true,
      isCheckingPhone: false,
    };
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
          desc: `${this.POPUP_CONFIRM.confirmEmail.desc} (${this.confirmationCount === 2 ? this.$auth.user.email : '+' + this.info.confirmation_auth})`,
        };
      }
      if (this.confirmationType === 'phone') {
        if (!this.POPUP_CONFIRM.confirmPhone) return {};
        return {
          ...this.POPUP_CONFIRM.confirmPhone,
          desc: `${this.POPUP_CONFIRM.confirmPhone.desc} (+${this.confirmationCount === 2 ? this.$auth.user.phone : this.info.confirmation_auth})`,
        };
      }
      return {};
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.notError = val.length > 2;
        // if (!isValidPhoneNumber(val, 'US')) this.notError = false
        if (val === this.oldValue) this.notError = false;
      }
    },
  },
  created() {
    this.SET_POPUP_CONFIRM();
    this.getActivePhoneItem();
  },
  methods: {
    ...mapActions({
      SET_POPUP_CONFIRM: 'popup/SET_POPUP_CONFIRM',
      LOAD_USER_INFO: "user/LOAD_USER_INFO",
    }),
    async checkEmail() {
      this.isPhoneFree = false;
      this.isCheckingPhone = true;

      try {
        const parsedNumber = parsePhoneNumber(
          `${this.activePhone.code} ${this.value}`
        ).number.substring(1);

        const res = await this.$axios.$get("/auth/check-exists", {
          params: {
            value: parsedNumber,
            field: "phone",
          }
        });

        this.isPhoneFree = !res.email;
      } catch (error) {
        if (error?.response?.data) {
          this.$emit("error", error.response.data);
        }
      } finally {
        this.isCheckingPhone = false;
      }
    },
    getActivePhoneItem() {
      if (this.oldValue) {
        const parsed = parsePhoneNumber(this.oldValue, 'US');


        if (!parsed?.country) return false;

        const findIndex = phoneList.findIndex(phone => phone.prefix === parsed.country.toLowerCase());
        if (findIndex === -1) return false;
        const nationalFormat = parsed.nationalNumber;

        this.activePhone = phoneList[findIndex];
        this.value = nationalFormat;
        this.oldValue = nationalFormat;
      }
    },
    searchPhones(val) {
      if (val === "") {
        this.phone = phoneList;
      } else {
        const phone = [];
        this.phone.forEach((item) => {
          const reg = new RegExp(val, "gi");
          if (reg.test(item.name) || reg.test(item.code)) phone.push(item);
        });
        this.phone = phone;
      }
    },
    changeActivePhone(val) {
      this.myInputModel = "";
      this.activePhone = val;
    },
    showEdit() {
      this.$emit("edit", true);
      this.notError = true;
      this.oldValue = this.value;
    },
    closeEdit() {
      this.confirmationCount = 2;
      this.$emit("edit", false);
      this.value = this.oldValue;
    },
    successEdit() {
      this.LOAD_USER_INFO();
      this.$emit("edit", false);
      this.$bvModal.show('modal-thank-settings');
      this.$root.$emit("bv::hide::modal", this.modalName);
      this.confirmationCount = 2;
    },
    async closeSave() {
      await this.checkEmail();
      if (!this.isPhoneFree) return;

      this.confirmationCount = 2;
      if (this.notError && this.value !== this.oldValue) {
        const confirmation_auth = parsePhoneNumber(
          `${this.activePhone.code} ${this.value}`
        ).number.substring(1);
        this.info = {
          confirmation_auth: confirmation_auth,
          phone_view: `${this.activePhone.code} ${this.value}`,
        };
        this.$root.$emit('bv::show::modal', 'modal-confirmation');
      } else {
        this.notError = false;
      }
    },
    changePhone(confirmationType) {
      this.confirmationType = confirmationType;
      this.isShow = true;
      this.$root.$emit('bv::show::modal', 'modal-confirm');
    },
    async sendCode(code) {
      try {
        const form = {
          confirmation_auth: code
            ? this.info.confirmation_auth
            : this.$auth.user.phone || this.$auth.user.email,
        };

        if (code) {
          form.code = code;
        } else if (this.$auth.user.phone && this.confirmationType !== 'phone') {
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
        if (error?.response?.data) {
          this.$emit("error", error.response.data);
        }
        this.notError = false;
      }
    },
  },
};
</script>

<style lang="scss">
.edit-field__column_right {
  z-index: 999;
}

.edit-field__column_center-phone {
  position: relative;
  overflow: visible !important;
  padding-left: 48px !important;

  input:disabled {
    background: #fff;
  }

  .lang-title {
    max-width: 115px !important;
  }

  &__text {
    margin-left: 15px;
  }
}

.settings {
  .edit-field__column_center-phone__text {
    margin-left: 15px;
  }
}
</style>

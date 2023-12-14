<template lang="pug">
  .edit-field__column(:class="[{isBorder:true},{error:error || isError}, {'edit-field__readonly': readonly}]")
    .edit-field__placeholder.edit-field__column_center-phone
      form-select-lang.favorites-ad__select(
        v-show="!readonly"
        @search="searchPhones"
        @input="changeActivePhone"
        lang
        :items="phone"
        v-model="activePhone"
        :value="activePhone"
        :disabled="readonly"
        noBorder)
      .check-field__phone.edit-field__column_center-phone__text
        .check-field__phone-code {{activePhone.code}}
        input.check-field__phone-input(:placeholder="activePhone.phone"
          v-model="value" v-mask="activePhone.phone" :readonly="readonly")
    //.edit-field__overlay(v-if="readonly")
</template>

<script>
import { parsePhoneNumber } from 'libphonenumber-js';
import phoneList from "@/misc/phone.json";

export default {
  props: {
    border: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    },
    phoneNumber: {
      type: String,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: this.phoneNumber || this.$auth.user.phone_view,
      error: false,
      isShow: false,
      oldValue: this.phoneNumber || this.$auth.user.phone_view,
      phone: phoneList,
      activePhone: phoneList[190],
    };
  },
  watch: {
    value(val) {
      if (val) {
        this.error = this.activePhone.phone.length !== val.length;
        this.$emit('input', `${this.activePhone.code} ${val}`);
        this.$emit('error', this.activePhone.phone.length === val.length);
      }
    },
  },
  mounted() {
    this.getActivePhoneItem();
  },
  methods: {
    getActivePhoneItem() {
      if (this.oldValue && this.oldValue.startsWith('+')) {
        const parsedNumber = parsePhoneNumber(this.oldValue);
        if (!parsedNumber.isValid()) {
          return;
        }
        const code = parsedNumber.countryCallingCode;

        const foundPhone = phoneList.find(phoneItem => phoneItem.code === `+${code}`);
        if (foundPhone) {
          this.activePhone = foundPhone;
          this.value = parsedNumber.nationalNumber;
          this.oldValue = parsedNumber.nationalNumber;
        }
      }
    },
    searchPhones(val) {
      if (val === '') {
        this.phone = phoneList;
      } else {
        const phone = [];
        this.phone.forEach(item => {
          const reg = new RegExp(val, 'gi');
          if (reg.test(item.name) || reg.test(item.code)) phone.push(item);
        });
        this.phone = phone;
      }
    },
    changeActivePhone(val) {
      this.myInputModel = '';
      this.activePhone = val;
    },
  }

};
</script>

<style lang="scss">
.isBorder {
  border: 1px solid #D2D2D7;
  height: 60px;
  display: flex;
  align-items: center;
  border-radius: 10rem;

  .edit-field__column_center-phone {
    width: 100%;
  }

  .lang-select .select__body {
    left: -22px;
  }
}

.isBorder.error {
  border-color: $red;
}

.edit-field__column_right {
  z-index: 999;
}

.edit-field__column_center-phone {
  position: relative;
  overflow: visible !important;

  input:disabled {
    background: #fff;
  }

  .lang-title {
    max-width: 115px !important;
  }

  &__text {
    margin-left: 58px;
    @include large-mobile {
      margin-left: 0 !important;
      padding-left: 0;
    }
  }
}
.edit-field {
  &__readonly {
    background-color: #F4F3F4;
    color: #6E6E73;
    pointer-events: none;
    border: none;

    input {
      background-color: #F4F3F4;
    }

    .edit-field__column_center-phone {
      padding-left: 10rem!important;
    }
  }

  &__column {
    position: relative;
  }

  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>

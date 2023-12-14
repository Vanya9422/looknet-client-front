<template lang="pug">
.check-field(:class="[{ error: error }, { valid: valid }]")
  .check-field__first
    button-primary(
      :white="activeInput !== 'email'",
      @click.prevent.native="activeInput = 'email'"
    ) {{ email }}
    button-primary(
      :white="activeInput !== 'phone'",
      @click.prevent.native="activeInput = 'phone'"
    ) {{ phoneText }}
  template(v-if="activeInput === 'phone'")
    .check-field__content.check-field__content-phone
      form-select-lang.favorites-ad__select(
        @search="searchPhones",
        @input="changeActivePhone",
        lang,
        :items="phone",
        :value="activePhone",
        noBorder
      )
      .check-field__phone
        .check-field__phone-code {{ activePhone?.code }}
        input.check-field__phone-input(
          type="tel",
          :placeholder="activePhone.phone",
          v-model="myInputModel",
          v-mask="activePhone.phone"
        )
  template(v-else)
    .check-field__content
      .check-field__email
        input.check-field__phone-input(
          type="email",
          :placeholder="placeholder",
          v-model="myInputModel"
        )
  .check-field__error.color-red(v-if="errorText !== '' && content && content[errorText]") {{ content[errorText] }}
</template>
<script>
import phoneList from "~/misc/phone.json";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";

export default {
  props: {
    error: {
      type: [Boolean, String],
      default: false,
    },
    valid: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: "email",
    },
    phoneText: {
      type: String,
      default: "phone",
    },
    placeholder: {
      type: String,
      default: "Enter your email",
    },
    check: {
      type: Boolean,
      default: false,
    },
    content: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      myInputModel: "",
      activeInput: "email",
      phone: phoneList,
      activePhone: phoneList[190],
      errorText: "",
    };
  },
  created() {
    this.getLocation();
  },
  watch: {
    activeInput() {
      this.myInputModel = "";
    },
    myInputModel(val) {
      this.errorText = false;
      if (this.activeInput !== "email") {
        const isValid = isValidPhoneNumber(this.activePhone.code + val, this.activePhone.prefix);
        this.$emit("error", !isValid);
        console.log(this.activePhone.code, val, this.activePhone.prefix, isValid);
        if (this.check && val && isValid) {
          const parse = parsePhoneNumber(this.activePhone.code + val);
          const form = {
            value: parse.number.substring(1),
            field: "phone",
          };
          this.$axios
            .$get("/auth/check-exists", { params: form })
            .then((res) => {
              this.$emit("error", res.phone ? "existPhone" : false);
              this.errorText = res.phone ? "existPhone" : false;
            })
            .finally(() =>
              this.$emit("input", `${this.activePhone.code}-${val}`)
            );
        } else {
          this.$emit("input", `${this.activePhone.code}-${val}`);
        }
      } else {
        const isValid = this.$validateEmail(val);
        this.$emit("error", !isValid);
        if (this.check && val && isValid) {
          const form = {
            value: val,
            field: "email",
          };
          this.$axios
            .$get("/auth/check-exists", { params: form })
            .then((res) => {
              this.$emit("error", res.email ? "existEmail" : false);
              this.errorText = res.email ? "existEmail" : false;
            })
            .finally(() => this.$emit("input", val));
        } else {
          this.$emit("input", val);
        }
      }
    },
  },
  methods: {
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
    async getLocation() {
      try {
        // TODO для работы geoplugin с https нужно на сайте http://www.geoplugin.net оплатить подписку
        // const result = await fetch("http://www.geoplugin.net/json.gp");
        // const res = await result.json();
        // const code = res.geoplugin_countryCode.toLowerCase();
        const result = await fetch("https://api.country.is");
        const res = await result.json();
        const code = res?.country?.toLowerCase() || 'us';
        this.activePhone = this.phone.find((item) => item.prefix === code);
        this.myInputModel = "";
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

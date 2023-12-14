import {required, minLength} from "vuelidate/lib/validators";
import { isPossiblePhoneNumber } from "libphonenumber-js";

export default {
  data() {
    return {
      form: {
        confirmation_auth: '',
        password: '',
      },
    }
  },
  validations: {
    form: {
      confirmation_auth: {required},
      password: {required, minLength: minLength(8)},
    }
  },
  computed: {
    confirmation_authError() {
      let errors = false
      if (!this.$v.form.confirmation_auth.$dirty) return errors
      if (!this.$v.form.confirmation_auth.required) errors = true
      const isEmail = this.$validateEmail(this.form.confirmation_auth)
      const isPhone = isPossiblePhoneNumber(this.form.confirmation_auth, 'US')
      // const isPhone = this.$validatePhone(this.form.confirmation_auth)
      if (!isEmail && !isPhone) errors = true
      return errors
    }
  }
}



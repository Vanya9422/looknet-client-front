import {required, minLength} from "vuelidate/lib/validators";
import {isValidPhoneNumber} from "libphonenumber-js";

export default {
  data() {
    return {
      form: {
        remember: false,
        fName: '',
        lName: '',
        confirmation_auth: '',
        password: '',
        token: Math.floor(Math.random() * 10000000)
      },
    }
  },
  validations: {
    form: {
      fName: {required},
      lName: {required},
      confirmation_auth: {required},
      password: {required, minLength: minLength(8)},
      remember: {required}
    }
  }
}



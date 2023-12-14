// TODO возможно стоит удалить, т.к. больше не используется
import {required} from "vuelidate/lib/validators";

export default {

  data() {
    return {
      form: {
        remember: false,
      },
    }
  },
  validations: {
    form: {
      remember: { required }
    }
  },
}

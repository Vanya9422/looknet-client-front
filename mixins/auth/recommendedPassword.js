import {mapActions, mapGetters} from "vuex";
import pageTranslate from "~/mixins/pageTranslate";

export default {
  data() {
    return {
      errors: {},
      recommended: {
        lowerCaseLetters: '[a-z]',
        upperCaseLetters: '[A-Z]',
        numbers: 'numbers',
        symbols: 'symbols',
        lengthText: 'Minimum 8 symbols'
      }
    }
  },
  mixins: [pageTranslate],
  computed: {
    ...mapGetters({
      PASSWORD_ERROR: 'pages/PASSWORD_ERROR'
    }),
    /**
     * recommendedType() - функция для определения типа результата (успех, предупреждение, ошибка) при создании пароля
     * Если количество рекомендованных нарушений больше 2 и меньше 5, функция возвращает "warning"
     * Если количество рекомендованных нарушений больше или равно 5, функция возвращает "success"
     * В противном случае функция возвращает "error"
     * @returns {string}
     */
    recommendedType() {
      if (this.recommendedPasswordCount > 2 && this.recommendedPasswordCount < 5) return 'warning';
      else if (this.recommendedPasswordCount >= 5) return 'success';
      else return 'error';
    },
    /**
     * recommendedError() - функция для определения наличия ошибок в рекомендациях по созданию пароля
     * Функция возвращает "true" если хотя бы одно рекомендация нарушено (нет строчных букв, прописных букв, цифр или символов)
     * @returns {string}
     */
    recommendedError() {
      return this.recommended.lowerCaseLetters || this.recommended.upperCaseLetters || this.recommended.numbers || this.recommended.symbols;
    },

    /**
     * recommendedErrorText() - функция для получения текста ошибки, если рекомендации по созданию пароля нарушены
     * Функция возвращает текст ошибки, если рекомендация по длине пароля нарушена,
     * или рекомендация по наличию строчных букв, прописных букв, цифр или символов нарушена.
     * В противном случае функция возвращает пустую строку.
     * @returns {string}
     */
    recommendedErrorText() {
      return this.recommended.lengthText || this.recommended.lowerCaseLetters || this.recommended.upperCaseLetters || this.recommended.numbers || this.recommended.symbols || '';
    },

    /**
     * recommendedPasswordCount() - функция для вычисления количества рекомендованных нарушений при создании пароля
     * @returns {number}
     */
    recommendedPasswordCount() {
      if (this.$v.form.password.$dirty) {
        const keys = Object.keys(this.recommended);
        return keys.length - keys.filter((key) => !!this.recommended[key]).length;
      }
      return 0;
    }
  },
  created() {
    this.getPageTranslate();
  },
  methods: {
    ...mapActions({
      SET_PAGE_PASSWORD_ERROR: 'pages/SET_PAGE_PASSWORD_ERROR'
    }),
    getPageTranslate() {
      this.SET_PAGE_PASSWORD_ERROR()
    },
    /**
     * Эта функция проверяет пароль на соответствие рекомендованным требованиям безопасности
     * Проверяются длина пароля (не менее 8 символов), наличие строчных и прописных букв латинского алфавита, цифр и символов
     * Если пароль не удовлетворяет требованиям, то соответствующая ошибка устанавливается в переменной recommended
     * @param pass
     */
    recommendedPassword(pass) {
      this.errors.password = false
      if (this.current_password_error) this.current_password_error = false
      this.$v.form.password.$touch()
      this.recommended.lowerCaseLetters = pass.match(/[a-z]/g) && !pass.match(/[а-з]/g) ? false : this.PASSWORD_ERROR.lowerCaseLetters
      this.recommended.upperCaseLetters = pass.match(/[A-Z]/g) && !pass.match(/[А-З]/g) ? false : this.PASSWORD_ERROR.upperCaseLetters
      this.recommended.numbers = pass.match(/[0-9]/g) ? false : this.PASSWORD_ERROR.numbers
      this.recommended.symbols = pass.match(/[.*+?^${}!@#%&_:<>()|/\-[\]\\]/g) ? false : this.PASSWORD_ERROR.symbols
      this.recommended.lengthText = pass.length >= 8 ? false : this.PASSWORD_ERROR.lengthText
    }
  }
}

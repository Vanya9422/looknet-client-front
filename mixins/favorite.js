import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      favorites: [],
      favClass: '',
    }
  },
  watch: {
    /**
     * Этот метод наблюдает за изменением вычисляемого свойства FAVOURITES.  Если значение свойства изменилось и новое значение содержит больше элементов, чем старое, то устанавливается класс header__favorite-red и через 1 секунду класс удаляется.
     * @param newVal
     * @param oldVal
     * @constructor
     */
    FAVOURITES(newVal, oldVal) {
      if (typeof oldVal === 'string')  oldVal = JSON.parse(oldVal)
      if (oldVal && newVal && newVal.length > oldVal.length) {
        this.favClass = 'header__favorite-red'
        setTimeout(() => this.favClass = '', 1000)
      }
    }

  },
  computed: {
    ...mapGetters({
      FAVOURITE: 'favourites/FAVOURITES',
      DETAIL: 'product/DETAIL',
      DETAIL_ACTIVE: 'product/DETAIL_ACTIVE'
    }),
    /**
     * userFavorites() - функция, возвращающая список избранных элементов
     * @returns {*[]}
     */
    userFavorites() {
      return this.FAVOURITE || []
    },
    /**
     * isFavorite() - функция, возвращающая id элемента
     * @returns {boolean}
     */
    isFavorite() {
      const getIndex = this.userFavorites.findIndex(i => i === this.id)
      return getIndex >= 0
    },
    /**
     * favColor() - функция, возвращающая стиль для элемента, если он является избранным
     * @returns {string}
     */
    favColor() {
      let fav = [];
      if (this.FAVOURITES) {
        if (typeof this.FAVOURITES === 'string') fav = JSON.parse(this.FAVOURITES);
        else fav = this.FAVOURITES;
      }
      const favClass = fav && fav.length > 0 ? 'header__favorite-blue' : '';

      return `${this.favClass} ${favClass}`;
    }
  },
  created() {
    this.getFavorites()
  },
  methods: {
    ...mapActions({
      SET_ADD_FAVOURITE: 'favourites/SET_ADD_FAVOURITE',
      SET_USER_FAV: 'favourites/SET_USER_FAV',
    }),
    /**
     * getFavorites() - функция, которая получает список избранных элементов. Если пользователь авторизован,
     * то список избранных элементов берется из свойства "favorites_ids" объекта пользователя, в противном случае из localStorage.
     */
    getFavorites() {
      let array = [];
      if (this.$auth.loggedIn) {
        array = this.$auth.user.favorites_ids;
      } else {
        const fav = process.client ? localStorage.getItem('favourites') : null;
        if (fav) {
          if (typeof fav === 'string') {
            array = JSON.parse(fav);
          } else {
            array = fav;
          }
        }
      }
      this.SET_USER_FAV(array);
    },
    /**
     * addFavorite() - функция для добавления элемента в список избранных
     * Используется мутация "SET_ADD_FAVOURITE" для добавления элемента в список избранных
     * Передаются параметры: id - идентификатор элемента, to - путь, auth - информация о входе пользователя в систему
     * @param id
     * @param to
     */
    addFavorite(id, to) {
      this.SET_ADD_FAVOURITE({id, to, auth: this.$auth.loggedIn});
    }
  }
}

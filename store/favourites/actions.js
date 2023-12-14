import {filter, withField} from "~/mixins/helpers/products";
import {cloneDeep} from 'lodash';

export default {
  /**
   *
   * @param commit
   * @param dispatch
   * @param haveInArray
   * @param id
   */
  SET_USER_FAVORITE({commit, dispatch}, {haveInArray, id}) {
    if (haveInArray === -1) {
      commit('SET_FAVORITES_PUSH', id)
      this.$axios.$post(this.$api.favorites.index, {advertises: [id]})
        .catch(() => commit('SET_FAVORITES_REMOVE', id))
    } else {
      commit('SET_FAVORITES_REMOVE', id)
      this.$axios.$post(this.$api.favorites.remove, {
        _method: 'DELETE',
        advertises: [id]
      }).catch(() => commit('SET_FAVORITES_PUSH', id))
    }
  },
  /**
   * @description get favourites products
   * @param commit
   */
  SET_LOGIN_FAV_PRODUCTS({commit}) {
    this.$axios.$get(this.$api.favorites.all).then(({data: {favorites}}) => {
      commit('CHANGE_FAVOURITE', {favorites, auth:true})
    })
    if (process.client) {
      localStorage.removeItem('favourites');
    }
  },
  /**
   *
   * @param commit
   * @param favorites
   * @constructor
   */
  SET_USER_FAV({commit}, favorites) {
    commit('CHANGE_FAVOURITE', {favorites, auth: true})
  },
  /**
   *
   * @param state
   * @param commit
   * @param dispatch
   * @param id
   * @param to
   * @param auth
   */
  SET_ADD_FAVOURITE({state, commit, dispatch}, {id = null, to = null, auth}) {
    let array = cloneDeep(state.favourites || [])
    let haveInArray = array.findIndex(i => i === id)
    if (auth) {
      dispatch('SET_USER_FAVORITE', {haveInArray, id})
    } else {
      if (haveInArray === -1) array.push(id)
      else array.splice(haveInArray, 1)
      commit('CHANGE_FAVOURITE', {favorites: array, auth: false})
    }
    if (to && haveInArray === -1) this.$axios.$post(`/statistics/${to}/favorite`)
  },
  /**
   *
   * @param commit
   * @param state
   * @param sort
   * @returns {Promise<unknown>}
   */
  SET_FAVOURITES_PRODUCT({commit, state}, sort) {
    return new Promise((resolve, reject) => {
      let loaded = undefined;
      let fav = state.favourites
      if (fav && fav.length > 0) {
        //status:1,0;
        // let api = `${this.$api.products}?per_page=${state.per_page}&page=${state.page}&${sort}&${filter}&${withField}&searchJoin=and&search=status:1,0;id:${fav}&searchFields=id:in`;
        let api = `${this.$api.products}?per_page=${state.per_page}&page=${state.page}&${sort}&${filter}&searchJoin=and&search=status:1,0;id:${fav}&searchFields=id:in`;
        this.$axios.$get(api)
          .then(({data, meta: {current_page, last_page}}) => {
            commit('CHANGE_FAVOURITES_PRODUCT', {products: data, page: current_page})
            commit('CHANGE_PAGE', current_page + 1)
            commit('CHANGE_LAST_PAGE', last_page)
            loaded = current_page < last_page
            resolve(loaded);
          })
          .catch((error) => {
            if (this.$axios.isCancel(error)) {
              resolve(false);
            }
            reject(error);
          });
      } else {
        resolve(false);
      }
    });
  },
  SET_FAVOURITES_PAGE({commit}) {
    commit('CHANGE_PAGE', 1)
  },
  SET_FAVOURITES__NULL({commit}) {
    commit('CHANGE_FAVOURITES__NULL', 1)
  }
}

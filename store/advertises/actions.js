export default {
  SET_ADVERTISES({commit, state}, {sort, status}) {
    return new Promise((resolve, reject) => {
      let api = `${this.$api.user.advertises}&per_page=${state.per_page}&page=${state.page}&main=1&${sort}&searchFields=status:in&search=status:`;
      if(parseInt(status) === 1) api +=`0,1`
      else if(parseInt(status) === 2) api +=`2,3`
      else api += parseInt(status)
      this.$axios.$get(api)
      .then(({data, meta: {current_page, last_page}}) => {
        data.forEach(i => {
          i.checked = false
        })
        commit('CHANGE_ADVERTISES', data, current_page)
        commit('CHANGE_PAGE', current_page + 1)
        commit('CHANGE_LAST_PAGE', last_page)
        resolve(current_page < last_page);
      })
      .catch(error => reject(error));
    });
  },
  SET_ADVERTISES_CHECKED({commit, state}, index) {
    commit('CHANGE_ADVERTISES_CHECKED', index)
  },
  // TODO REFACTORING
  /*
    rename SET_STATUS
    param ids // array
    param status // digit

    в соответствии со статусом выбирать эндпойнт
  */
  SET_DEACTIVATE_OR_ACTIVE({ commit, state }, {selectedProductId, status}) {
    let advertises = typeof selectedProductId === 'object' ? selectedProductId : [i]
    this.$axios.$put(`${this.$api.productsAction}/${status}`, { advertises })
    .then(() => {
      advertises.forEach(id => {
        const getIndex = state.advertises.findIndex(item => id === item.id)
        commit('CHANGE_ADVERTISES_REMOVE_ITEM', getIndex)
      })
      commit('CHANGE_ADVERTISES_CHECKED_ALL')
    })
  },
  SET_GO_TO_MODERATION({commit, state}, item) {
    this.$axios.$put(`/products/${item.slug}`, { status: 0 })
      .then(() => {
        const getIndex = state.advertises.findIndex(i => item.id === i.id)
        commit('CHANGE_ADVERTISES_REMOVE_ITEM', getIndex)
      })
      .catch((error) => {
        console.error(error);
      });
  },
  SET_CHANGE_STATUS({commit, state}, {status, selectedProductId}) {
    const advertises = selectedProductId ? [selectedProductId] : state.checkedList
    this.$axios.$put(`${this.$api.productsAction}/${status}`, {advertises})
        .then(() => {
          advertises.forEach(id => {
            const getIndex = state.advertises.findIndex(item => id === item.id)
            commit('CHANGE_ADVERTISES_REMOVE_ITEM', getIndex)
          })
          commit('CHANGE_ADVERTISES_CHECKED_ALL')
        })
  },
  SET_ADVERTISES_CHECKED_ALL({commit, state}, flag = false) {
    commit('CHANGE_ADVERTISES_CHECKED_ALL', flag)
  },
  SET_ADVERTISES_PAGE({ commit }, page = 1) {
    commit('CHANGE_PAGE', page)
  },
}

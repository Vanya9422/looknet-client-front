export default {
  SET_NOTIFICATIONS({commit, state}, tab) {
    return new Promise((resolve, reject) => {
      let loaded = undefined;
      if (state.lastPage < state.page) {
        resolve(loaded);
      } else {
        const sort = 'orderBy=created_at&sortedBy=desc'
        this.$axios.$get(`${this.$api.user.notifications}?tab=${tab || 'all'}&${sort}&per_page=${state.per_page}&page=${state.page}`)
            .then(({data, meta: {current_page, last_page}}) => {
              console.log(data)
              let info = []
              data.forEach((item) => {
                let items = {...item}
                if (!item.read_at) {
                  items.read_at = false
                }
                info.push(items)
              });
              commit('CHANGE_NOTIFICATIONS', info, current_page)
              commit('CHANGE_PAGE', current_page + 1)
              commit('CHANGE_LAST_PAGE', last_page)
              loaded = current_page <= last_page
              resolve(loaded);
            })
            .catch(error => reject(error));
      }
    });
  },
  SET_DELETE_NOTIFICATION({commit}, {id, index}) {
    this.$axios.$delete(`${this.$api.user.notifications}/${id}`)
        .then(() => commit('CHANGE_DELETE_NOTIFICATION', index))
  },
  SET_ACTIONS_NOTIFICATION({ commit }, { id, index }) {
    let ids = [id]
    this.$axios.$put(`${this.$api.user.notifications}`, { ids })
      .then(() => {
        commit('CHANGE_ACTIONS_NOTIFICATION', index)
        return true
      });
  },
  SET_ACTIONS_NOTIFICATION_ALL({commit, state}, {slug}) {
    let ids = []
    state.notifications.forEach(i => ids.push(i.id))
    this.$axios.$put(`${this.$api.user.notifications}`, {ids})
        .then(() => {
          commit('CHANGE_ACTIONS_NOTIFICATION_ALL', {slug})
          return true
        })
  },
  SET_NOTIFICATIONS_PAGE({commit}) {
    commit('CHANGE_PAGE', 1)
  }
}

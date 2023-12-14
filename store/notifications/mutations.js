export default {
  CHANGE_NOTIFICATIONS(state, products) {
    if (state.page === 1) state.notifications = products
    else state.notifications.push(...products)
  },
  CHANGE_DELETE_NOTIFICATION(state, index) {
    state.notifications.splice(index, 1)
  },
  CHANGE_ACTIONS_NOTIFICATION(state, index) {
    state.notifications[index].read_at = true;
  },
  CHANGE_ACTIONS_NOTIFICATION_ALL(state, {slug}) {
    if (!slug) {
      state.notifications = []
    } else {
      state.notifications.forEach(item => item.read_at = true)
    }
  },
  CHANGE_PAGE(state, page) {
    if (page === 1) state.notifications = []
    state.page = page

  },
  CHANGE_LAST_PAGE(state, page) {
    state.lastPage = page
  }
}


export default {

  CHANGE_ADVERTISES(state, products, page) {
    if (page === 1) state.advertises = products
    else state.advertises.push(...products)
  },
  CHANGE_ADVERTISES_CHECKED(state, index) {
    if (state.advertises[index].checked === true) {
      state.advertises[index].checked = false
      const getIndex = state.checkedList.findIndex(item => item === state.advertises[index].id)
      state.checkedList.splice(getIndex, 1)
    } else {
      state.advertises[index].checked = true
      state.checkedList.push(state.advertises[index].id)
    }
    state.checkedAll = state.advertises.length === state.checkedList.length
  },
  CHANGE_ADVERTISES_CHECKED_REMOVE_ITEM(state, index) {
    const getIndex = state.checkedList.findIndex(item => item === state.advertises[index].id)
    state.checkedList.splice(getIndex, 1)
    state.checkedAll = state.advertises.length === state.checkedList.length
  },
  CHANGE_ADVERTISES_REMOVE_ITEM(state, index) {
    state.advertises.splice(index, 1)
  },
  CHANGE_ADVERTISES_CHECKED_ALL(state, flag) {
    const checked = []
    state.advertises.forEach(i => {
      i.checked = flag
      if (flag) checked.push(i.id)
    })
    state.checkedList = checked
    state.checkedAll = state.advertises.length !== 0 && state.advertises.length === state.checkedList.length
  },
  CHANGE_PAGE(state, page) {
    if (page === 1) state.advertises = []
    state.page = page
  },
  CHANGE_LAST_PAGE(state, page) {
    state.lastPage = page
  }
}


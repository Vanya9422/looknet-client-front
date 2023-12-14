export default {
  CHANGE_STATISTIC(state, statistic) {
    state.statistic = statistic
  },
  CHANGE_DETAIL(state, detail) {
    state.detail = null
    state.detail = detail
  },
  CHANGE_MODAL_DETAIL(state, detail) {
    state.modal_detail = null
    state.modal_detail = detail
  },
  CHANGE_RECOMEND(state, recomend) {
    state.recomend  = recomend
  },
  CHANGE_MORE_RECOMEND(state, recomend) {
    state.recomend.push(...recomend)
  },
  CHANGE_CURRENT_PAGE_RECOMEND(state, current) {
    state.currentPageRecomend = current
  },
  CHANGE_LAST_PAGE_RECOMEND(state, lastPage) {
    state.lastPageRecomend = lastPage
      },
  CHANGE_USER_PRODUCTS(state, product) {
    state.userProduct.active = []
    state.userProduct.noActive = []
    product.forEach(item => {
      if (item.status === 1) state.userProduct.active.push(item)
      if (item.status === 2) state.userProduct.noActive.push(item)
    })
  },
  CHANGE_DETAIL_LIST(state, list) {
    state.detailList = list
  },
  CHANGE_DETAIL_ACTIVE(state, index) {
    state.detailListActive = index
  },
  CHANGE_PRODUCT_CART_TYPE(state, type) {
    if (process.client) {
      localStorage.setItem('cartType', type);
    }
    state.productCartsType = type;
  },
}


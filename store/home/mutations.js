export default {
  CHANGE_VIP_PRODUCTS(state, products) {
    state.vipProducts = products
  },
  CHANGE_PRODUCTS(state, products,page) {
    if (page === 2 || page === 1)  state.products = products
    else state.products.push(...products)
  },
  CHANGE_BANNERS(state, data) {
    state.homeBanners = []
    data.forEach(item => {
      let details = JSON.parse(item.details)
      state.homeBanners.push({
        ...details,
        img: item.banner_images,
        link: item.link,
      })
    });
  },
  CHANGE_USER_BANNERS(state, data) {
    state.userBanners = []
    data.forEach(item => {
      let details = JSON.parse(item.details)
      state.userBanners.push({
        title: details.title,
        desc: details.desc,
        showText: details.showText,
        img: item.banner_images,
      })
    })
  },
  CHANGE_PRODUCTS_NULL(state, page) {
     state.products = []
  },
  CHANGE_PAGE(state, page) {
    if (page === 1) state.products = []
    state.page = page
  },
  CHANGE_LAST_PAGE(state, page) {
    state.lastPage = page
  }
}


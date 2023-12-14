export default  {
  VIP_PRODUCTS: (state) => state.vipProducts,
  PRODUCTS: (state) => state.products,
  PRODUCTS_PAGE: (state) => +state.page,
  PRODUCTS_LAST_PAGE: (state) => +state.lastPage,
  HOME_BANNERS: (state) => state.homeBanners,
  USER_BANNERS: (state) => state.userBanners,
}

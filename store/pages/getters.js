import modalTariff from "~/misc/pages/modalTariff";
import modalStatistic from "~/misc/pages/modalStatistic";
import passwordError from "~/misc/pages/passwordError";

export default  {
  PAGE_HOME: (state) => state.home,
  PAGE_CATALOG: (state) => state.catalog,
  PAGE_PRODUCT_DETAILS: (state) => state.productDetails,
  PAGE_REGISTRATION: (state) => state.registration,
  PAGE_POPUP: (state) => state.popup,
  PAGE_SETTINGS: (state) => state.settings,
  PAGE_ERRORS: (state) => state.errors,
  PAGE_CHAT: (state) => state.chat,
  PAGE_REGISTER_CONFIRM: (state) => state.registerConfirm,
  PAGE_REGISTER_DONE: (state) => state.registerDone,
  PAGE_RESET: (state) => state.reset,
  PAGE_FAVORITE: (state) => state.favorite,
  PAGE_ADD_PRODUCT: (state) => state.addProduct,
  PAGE_MENU_DEFAULT: (state) => state.menuDefault,
  PAGE_MENU_AUTH: (state) => state.menuAuth,
  PAGE_MY_ADVERTISES: (state) => state.myAdvertises,
  PAGE_NOTIFICATIONS: (state) => state.notifications,
  PAGE_MODAL_TARIFF: (state) => state.modalTariff,
  PAGE_MODAL_STATISTIC: (state) => state.modalStatistic,
  PAGE_MODAL_MENU: (state) => state.modalMenu,
  PASSWORD_ERROR: (state) => state.passwordError,
  FOOTER: (state) => state.footer,
  LOGOUT: (state) => state.logout,
  PAGE_SMALL_FOOTER: (state) => state.smallFooter,
}

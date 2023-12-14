import registration from "~/misc/pages/registration";
import popup from "~/misc/pages/popup";
import settings from "~/misc/pages/settings";
import registerConfirm from "@/misc/pages/registerConfirm";
import registerDone from "~/misc/pages/registerDone";
import reset from "~/misc/pages/reset";
import smallFooter from "~/misc/pages/smallFooter";
import favorite from "~/misc/pages/favorites";
import addProduct from "@/misc/pages/addProduct";
import home from "@/misc/pages/home";
import errors from "@/misc/pages/errors";
import catalog from "~/misc/pages/catalog";
import productDetails from "~/misc/pages/productDetails";
import menuDefault from "~/misc/pages/menuDefault";
import menuAuth from "~/misc/pages/menuAuth";
import myAdvertises from "~/misc/pages/myAdvertises";
import notifications from "~/misc/pages/notifications";
import chat from "~/misc/pages/chat";
import modalTariff from "~/misc/pages/modalTariff";
import modalStatistic from "~/misc/pages/modalStatistic";
import modalMenu from "~/misc/pages/modalMenu";
import passwordError from "~/misc/pages/passwordError";
import logout from "~/misc/pages/logout";
export default () => ({
  home,
  catalog,
  productDetails,
  reset,
  registration,
  settings,
  registerConfirm,
  registerDone,
  favorite,
  addProduct,
  menuDefault,
  menuAuth,
  myAdvertises,
  notifications,
  modalTariff,
  modalStatistic,
  modalMenu,
  passwordError,
  logout,
  chat,
  popup,
  smallFooter,
  errors,
  footer: null,
});

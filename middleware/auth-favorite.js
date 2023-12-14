export default ({ app, redirect, i18n }) => {
  if (app.$auth.user) {
    return redirect(302, app.$locationPath('/favorites-ad'));
  }
}

export default ({ redirect, app, i18n }) => {
  const user = process.client ? JSON.parse(localStorage.getItem('user')) : null;
  if (!user) {
    return redirect(302, app.$locationPath('/settings', i18n.locale));
  }
  if (process.client) {
    localStorage.setItem('user', 0)
  }
}

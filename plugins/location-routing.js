export default ({ app, i18n, store }, inject) => {
  const locationPath = (path) => {
    const location = store.getters['location/LOCATION'];
    if(location?.slug) {
      path = `/${location.slug}${path}`
    }
    return app.localePath(path, i18n.locale)
  }
  inject('locationPath', locationPath)
}

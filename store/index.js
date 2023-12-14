export const actions = {
  async nuxtServerInit({ dispatch, getters, commit }, { $cookies, route, req, error }) {
    await dispatch('pages/SET_PAGE_HOME');
    await dispatch('pages/SET_PAGE_FOOTER');
    await dispatch('popup/SET_POPUP_COOKIE');
    await dispatch('seo/GET_SEO_HOME');
    const authToken = $cookies.get('auth._token.laravelSanctum');
    await dispatch('user/SET_USER_LOCAL', authToken);
    const user = getters['user/USER'];
    let currentCity = null;
    if (process.server && req) {
      commit('location/SET_BASE_URL', req.headers.host);
    }
    if (route?.params?.city && route.params.city !== '[object Object]') {
      const { city } = route.params;
      currentCity = await dispatch('location/GET_LOCATION_BY_CITY', { city });
      if (!currentCity) {
        error('Not found');
      }
    }
    if (currentCity) {
      await dispatch('location/SET_LOCATION', { city: currentCity });
    } else if (user?.city) {
      await dispatch('location/SET_USER_LOCATION', user);
    } else {
      let city = process.client ? localStorage.getItem('city') : $cookies.get('city');
      if (typeof city === 'string') {
        city = JSON.parse(city);
      }
      await dispatch('location/SET_LOCATION', { city });
    }
    const location = getters['location/LOCATION'];
    await dispatch('location/SET_LOCATION_STATE', location);
  }
};

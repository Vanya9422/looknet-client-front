export default {
  SET_USER({ commit }, user) {
    commit("CHANGE_USER", user);
  },
  SET_TRANSLATE({ commit }, translate) {
    commit("CHANGE_TRANSLATE", translate);
  },
  async SET_USER_LOCAL({ commit }, accessToken) {
    const storageToken = process.client
      ? localStorage.getItem("auth._token.laravelSanctum")
      : false;
    const token = accessToken ? accessToken : storageToken;

    if (token === "false" || token === false || token === null) return false;
    const redirect = this.$auth.$storage.getUniversal('redirect');
    if (!redirect) {
      this.$auth.$storage.setUniversal('redirect', this.$router.history.current.path);
    }

    this.$auth.strategy.token.set(token);
    console.log(
      'this.$auth.strategy.token.set(token)',
      token,
    )
    this.$axios.setToken(token, "Bearer");
    try {
      const result = await this.$axios.$get("/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      await this.$auth.setUser(result);
      commit("CHANGE_USER", result);
      this.$auth.$storage.setUniversal("loggedIn", true);
    } catch (error) {
      await this.$auth.setUser(null);
      commit("CHANGE_USER", null);
      this.$auth.strategy.token.set(null);
      this.$axios.setToken(false);
      this.$auth.$storage.setUniversal("loggedIn", false);
    }
  },
  async LOAD_USER_INFO({ commit }, accessToken) {
    const storageToken = process.client
      ? localStorage.getItem("auth._token.laravelSanctum")
      : false;
    const token = accessToken ? accessToken : storageToken;
    if (token === "false" || token === false || token === null) return false;
    try {
      const result = await this.$axios.$get("/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      await this.$auth.setUser(result);
      commit("CHANGE_USER", result);
    } catch (error) {
      console.log(error);
    }
  },
  async LOGOUT({ commit, dispatch, getters }) {
    const user = getters['USER'];
    let city = user?.city;
    if (!city) {
      city = process.client ? localStorage.getItem('city') : $cookies.get('city');
      if (typeof city === 'string') {
        city = JSON.parse(city);
      }
    }
    if (process.client) {
      const channels = Object.keys(this.$echo.connector.channels);
      channels.map(item => this.$echo.leave(item));
    }
    this.$axios.get(this.$authApi.logout);
    this.$auth.logout();
    this.$auth.setUser(null);
    commit('CHANGE_USER', null);
    await dispatch('location/SET_LOCATION', { city }, { root: true });
    const location = this.getters['location/LOCATION'];
    await dispatch('location/SET_LOCATION_STATE', location, { root: true });
    this.$auth.strategy.token.set(null);
    this.$axios.setToken(false);
    this.$auth.$storage.setUniversal('loggedIn', false);
  },
};

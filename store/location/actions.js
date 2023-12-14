import { parseLocation, searchLocationByZip } from '~/tools/location.function';

export default {
  SET_LOCATION({ commit }, { city, user = false }) {
    commit('CHANGE_LOCATION', city);
    if (process.client && !user) {
      localStorage.setItem('city', JSON.stringify(city));
      this.$cookies.set('city', JSON.stringify(city));
    }
  },
  SET_USER_LOCATION({ commit }, user) {
    if (process.client) {
      localStorage.removeItem('city');
      this.$cookies.remove('city');
    }
    let res = {};
    if (user.country === 1) {
      res.id = 'c1';
      res.name = this.getters['pages/PAGE_HOME'].search.city;
    } else {
      if (user.city) {
        res.id = user.city.id;
        res.name = user.city.name;
        res.state_id = user.city.state.id;
        res.state_code = user.city.state_code;
        res.state_minimal_select = {
          id: user.city.state.id,
          name: user.city.state.name,
        };
      }
      if (user.latitude) res.latitude = user.latitude;
      if (user.longitude) res.longitude = user.longitude;
    }
    commit('CHANGE_LOCATION', res);
  },
  SET_LOCATION_STATES({ commit, state }) {
    if (state.locationStates.length === 0) {
      this.$axios.$get(`${this.$api.countries.states}?filter=id;name`)
        .then(({ data }) => commit('CHANGE_LOCATION_STATES', data))
        .catch(e => console.log(e));
    }

  },
  SET_LOCATION_STATE({ commit, state }, val) {
    commit('CHANGE_LOCATION_CITY_PAGE', 1);
    commit('CHANGE_LOCATION_STATE', val);
  },
  SET_LOCATION_CITY({ commit, state }, val) {
    commit('CHANGE_LOCATION_CITY', val);
  },
  SET_LOCATION_CITIES({ commit, state }) {
    return new Promise((resolve, reject) => {
      let loaded = undefined;
      let api = `${this.$api.countries.search}?searchJoin=and&with=state_minimal_select&page=${state.locationCityPage}`;
      if (state.locationState) api += `&search=state_id:${state.locationState.state_id || state.locationState.id}`;
      this.$axios.$get(api)
        .then(({ data, meta: { current_page, last_page } }) => {
          commit('CHANGE_LOCATION_CITIES', data, current_page);
          commit('CHANGE_LOCATION_CITY_PAGE', current_page + 1);
          loaded = current_page < last_page;
          resolve(loaded);
        })
        .catch(error => reject(error));
    });
  },
  SET_LOCATION_CITIES_SEARCH_PAGE({ commit }, page) {
    commit('CHANGE_LOCATION_CITY_SEARCH_PAGE', page);
  },
  SET_LOCATION_CITIES_PAGE({ commit }, page) {
    commit('CHANGE_LOCATION_CITY_PAGE', page);
  },
  async SET_LOCATION_CITIES_SEARCH({ commit, state, dispatch }, search) {
    const checkString = !isNaN(parseInt(search));
    const city = checkString
      ? await searchLocationByZip(search)
      : { name: search };
    if (!city) return;
    try {
      const { data, meta: { current_page, last_page } } = await dispatch('GET_LOCATION_BY_CITY_STATE', {
        city,
        params: {
          page: state.searchCityPage,
        },
      });
      commit("CHANGE_ZIPCODE", checkString);
      commit("CHANGE_LOCATION_CITY_SEARCH_PAGE", current_page);
      commit("CHANGE_LOCATION_CITIES_SEARCH", data, current_page);
      commit("CHANGE_LOCATION_CITY_SEARCH_PAGE_LAST", last_page);
      const loaded = current_page < last_page;
      return loaded;
    } catch (error) {
      return false;
    }
  },
  async GET_LOCATION_BY_CITY_STATE(_, payload = {}) {
    try {
      console.log(payload);
      const { city, params = {} } = payload;
      let search = city.name ? `name:${city.name}` : undefined;
      if (search && city.state_code) {
        search += `;state_code:${city.state_code}`;
      }
      const query = {
        search,
        searchJoin: 'and',
        with: 'state_minimal_select',
        ...params,
      };
      const { data, meta } = await this.$axios.$get(this.$api.countries.search, { params: query });
      let result = [];
      if (city.state_code) {
        const cityData = data.find((c) => c.name === city.name && c.state_code === city.state_code);
        if (cityData) {
          cityData.latitude = city.location.lat;
          cityData.longitude = city.location.lng;
          result.push(cityData);
        }
      } else {
        result = data;
      }
      return { data: result, meta };
    } catch (error) {
      throw new Error(error);
    }
  },

  async GET_LOCATION_BY_CITY(context, payload = {}) {
    try {
      const { city } = payload;
      let search = city ? `name:${city}` : undefined;
      const { data } = await this.$axios.$get(`${this.$api.countries.city}/${city}`);

      if (data.length) {
        return data[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
};

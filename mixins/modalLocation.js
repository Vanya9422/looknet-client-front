import { mapActions, mapGetters } from "vuex";
import { findRouteIndex, parseLocation } from "~/tools/location.function";

const isTest = process.client ? JSON.parse(localStorage.getItem("isTest")) : null;
const fakeLocation = isTest ? JSON.parse(localStorage.getItem("fakeLocation")) : null;

export default {
  data: () => ({
    originLocation: {
      latitude: null,
      longitude: null,
      // client address:
      // latitude: 26.3896474,
      // longitude: -80.2013572,
    },
    isReady: false,
  }),
  computed: {
    ...mapGetters({
      GOOGLE_KEY: "location/GOOGLE_KEY",
      user: 'user/USER',
    }),
  },
  created() {
    this.getCurrentPosition();
  },
  methods: {
    ...mapActions({
      SET_LOCATION_STATE: "location/SET_LOCATION_STATE",
    }),
    /**
     * getCurrentPosition() - функция, которая получает широту и долготу пользователя
     * @param update - параметр определяет, запрашивать ли заново координаты, если они уже имеются
     */
    async getCurrentPosition(update) {
      if (!update) {
        const city = this.user
          ? this.user.city
          : process.client
            ? JSON.parse(localStorage.getItem('city'))
            : null;
        if (city?.latitude && city.longitude) {
          this.originLocation.latitude = city.latitude;
          this.originLocation.longitude = city.longitude;
        }
        if (this.originLocation.latitude && this.originLocation.longitude) {
          this.isReady = true;
          return this.originLocation;
        }
      }
      return new Promise((resolve, reject) => {
        if (process.client && navigator.geolocation) {
          // this.$sentryReady().then((sentry) => sentry.captureMessage('start 2'))
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              this.originLocation.latitude = fakeLocation?.latitude || pos.coords.latitude;
              this.originLocation.longitude = fakeLocation?.longitude || pos.coords.longitude;
              resolve(this.originLocation);
              this.isReady = true;
            },
            (error) => {
              reject(error);
              this.isReady = true;
            },
            // { timeout: 5000 }
          );
        } else {
          reject();
          this.isReady = true;
        }
      });
    },
    /**
     * detectLocation() - функция, которая определяет местоположение пользователя
     */
    async detectLocation(update) {
      try {
        const pos = await this.getCurrentPosition(update);
        console.log('CURRENT POSITION', this.originLocation.latitude, this.originLocation.longitude);
        await this.geoLocationSuccess(pos);
      } catch (error) {
        this.geoLocationError;
      }
    },
    /**
     * getLocationInfo() - функция, которая получает координаты пользователя и возвращает город и штат, полученные через гугл
     * @param latitude
     * @param longitude
     */
    async getLocationInfo(latitude, longitude) {
      try {
        const [locationDataEn, locationData] = await Promise.all([
          new Promise((resolve, reject) => {
            fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.GOOGLE_KEY}&language=en`
            ).then((locationRes) => locationRes.json().then(resolve).catch(reject)).catch(reject);
          }),
          new Promise((resolve, reject) => {
            fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.GOOGLE_KEY}`
            ).then((locationRes) => locationRes.json().then(resolve).catch(reject)).catch(reject);
          }),
        ]);
        const routeIndex = findRouteIndex(locationData.results);
        const { city, state } = parseLocation(locationDataEn.results[routeIndex]);
        const { address } = parseLocation(locationData.results[routeIndex]);
        return { city, state, address };
      } catch (error) {
        return {};
      }
    },
    /**
     * geoLocationSuccess() - функция, которая получает адрес пользователя
     * @param pos
     */
    async geoLocationSuccess(pos) {
      const { latitude, longitude } = pos;
      try {
        const { city, state, address } = await this.getLocationInfo(latitude, longitude);
        if (!city || !state || !address) {
          this.locationErrorCity = true;
          return;
        }
        const { data: searchLocation } = await this.$axios.$get('/check-city', { params: {
          state_code: state,
          city_name: city,
        }});
        // this.$sentryReady().then((sentry) => sentry.captureMessage(JSON.stringify({search:data})))
        if (!searchLocation?.city) {
          this.locationErrorCity = true;
          return;
        }
        this.city = searchLocation.city;
        this.locationErrorCity = false;
        this.locationError = false;
        this.error = false;
        this.editCity = true;
        this.state = {
          state_code: searchLocation.city.state_code,
          latitude,
          longitude,
          country_id: searchLocation.city.country_id,
          ...searchLocation.city.state_minimal_select,
        };
        this.stateName = this.state.name;
        this.SET_LOCATION_STATE(this.state);
        this.SET_LOCATION_CITY(this.city);
        this.canChangeState = true;
        this.editCity = true;
        this.newCity = { ...this.city, latitude, longitude };
        this.address = address;
        // this.$sentryReady().then((sentry) => sentry.captureMessage(JSON.stringify({address:this.address})))
      } catch (error) {
        this.locationErrorCity = true;
      }
    },
    geoLocationError(error) {
      // this.$sentryReady().then((sentry) => sentry.captureMessage(JSON.stringify({error})))

      this.locationError = true;
    },
  },
};

export default {
  CHANGE_LOCATION(state, city) {
    if(city && Object.keys(city).length === 0) city = null
    state.location = city
  },
  CHANGE_LOCATION_STATES(state, city) {
    state.locationStates = city
    state.locationStates.unshift({id:'c1'})
  },
  CHANGE_LOCATION_STATE(state, city) {
    state.locationState = city
  },
  CHANGE_LOCATION_CITY(state, city) {
    state.locationCity = city
  },
  CHANGE_LOCATION_CITY_SEARCH_PAGE_FIRST(state) {
    state.searchCityPage = 0
    state.searchCities = []
  },
  CHANGE_LOCATION_CITIES(state, city) {
    state.locationCities.push(...city)
  },
  CHANGE_LOCATION_CITIES_SEARCH(state, city) {
    if (state.searchCityPage === 1) state.searchCities = city
    else state.searchCities.push(...city)
  },
  CHANGE_ZIPCODE(state, status) {
    state.checkZipCode = status
  },
  CHANGE_LOCATION_CITY_PAGE(state, page) {
    if (page === 1) state.locationCities = []
    state.locationCityPage = page
  },
  CHANGE_LOCATION_CITY_SEARCH_PAGE(state, page) {
    if (page === 1) state.searchCities = []
    state.searchCityPage = page
  },
  CHANGE_LOCATION_CITY_SEARCH_PAGE_LAST(state, page) {
    state.searchCityPageLast = page
  },
  SET_BASE_URL(state, payload) {
    state.baseURL = payload
  }
}


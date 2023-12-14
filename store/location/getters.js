export default  {
  LOCATION: (state) => state.location,
  LOCATION_STATES: (state) => state.locationStates,
  LOCATION_STATE: (state) => state.locationState,
  LOCATION_CITIES: (state) => state.locationCities,
  LOCATION_CITIES_SEARCH: (state) => state.searchCities,
  GET_ZIPCODE: (state) => state.checkZipCode,
  GOOGLE_KEY: (state) => state.googleKey,
  LOCATION_CITY: (state) => state.locationCity,
  CITY_LAST_PAGE: (state) => state.searchCityPageLast,
  CITY_PAGE: (state) => state.searchCityPage,
  GET_BASE_URL: (state) => state.baseURL,
}

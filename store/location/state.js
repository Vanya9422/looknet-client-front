export default () => ({
  baseURL: '',
  locationStates:[],
  locationState:null,
  locationCities:[],
  locationCity:null,
  locationCityPage:1,
  searchCities:[],
  checkZipCode: false,
  googleKey: process.env.GOOGLE_KEY,
  searchCityPage:0,
  searchCityPageLast:1,
  location: process.client && localStorage.getItem('city') ? JSON.parse(localStorage.getItem('city')) : null,
})



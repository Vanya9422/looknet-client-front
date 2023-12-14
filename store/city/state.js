export default () => ({
  cities: [],
  citiesRecomendation: [],
  city:
    process.client && typeof window !== "undefined" && localStorage.getItem("city")
      ? JSON.parse(localStorage.getItem("city"))
      : {},
  page: 1,
  lastPage: 10,
  per_page: 10,
});

export default {
  CHANGE_PAGE(state,page){
    if(page === 1) {
      state.cities = []
      state.page = 1
    }else{
      state.page = page
    }

  },
  CHANGE_LAST_PAGE(state, page) {
    state.lastPage = page
  },
  CHANGE_CITIES(state, {data,current_page}) {
    if(current_page === 1) state.cities = data
    else state.cities.push(...data)
  },
  CHANGE_CITIES_RECOMMENDATION(state, {data,current_page}) {
     state.citiesRecomendation = data
  }
}


export default {
  CHANGE_FAVOURITE(state, {favorites, auth}) {
    state.favourites = favorites
    if (process.client && !auth) {
      localStorage.setItem('favourites', JSON.stringify(favorites));
    }
  },
  SET_FAVORITES_PUSH(state, id) {
    state.favourites.push(id)
  },
  SET_FAVORITES_REMOVE(state, id) {
    const index = state.favourites.findIndex(i => i === id)
    if (index >= 0) state.favourites.splice(index, 1)
  },
  CHANGE_FAVOURITES_PRODUCT(state, {products, page}) {
    if (page === 1) state.favouritesProduct = products
    else state.favouritesProduct.push(...products)
  },
  CHANGE_PAGE(state, page) {
    if (page === 1) state.favouritesProduct = []
    state.page = page
  },
  CHANGE_FAVOURITES__NULL(state, page) {
    state.favouritesProduct = []
    state.page = 1
  },
  CHANGE_LAST_PAGE(state, page) {
    state.lastPage = page
  },
}


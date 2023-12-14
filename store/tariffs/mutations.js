export default {
  CHANGE_GROUP(state, group) {
    state.group = group
  },
  CHANGE_TARIFFS(state, data) {
    state.tariffs = []
    data.forEach(item => {
      try {
        const description = JSON.parse(item.description);
        state.tariffs.push({ ...item, description });
      } catch (error) {
        console.error(`Tariff ${item.name} description error`);
      }
    })
  },
  CHANGE_GROUP_ACTIVE(state, active){
    state.active = active
  }
}


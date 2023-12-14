const statesKeys = ["administrative_area_level_1", "state"];
const citiesKeys = ["locality", "city", "town", "village", "sublocality_level_1"];

const findLocationComponent = (addressComponents, keys) =>
  addressComponents
    .reverse()
    .find((addressComponent) =>
      addressComponent.types.some((type) => keys.includes(type))
    );

export const parseLocationComponents = (addressComponents) => {
  const cityComponent = findLocationComponent(addressComponents, citiesKeys);
  const stateComponent = findLocationComponent(addressComponents, statesKeys);
  return { cityComponent, stateComponent };
};

export const parseLocation = (locationData) => {
  const { cityComponent, stateComponent } = parseLocationComponents(locationData.address_components);
  const city = cityComponent?.short_name || cityComponent?.long_name; // TODO возможно стоит поменять местами
  const state = stateComponent?.short_name || stateComponent?.long_name;
  const address = locationData.formatted_address;
  return { city, state, address };
};

export const findRouteIndex = (locationData) => {
  const index = locationData.findIndex((data) => data.types.includes('route'));
  if (index === -1) return 0;
  return index;
}

export const searchLocationByZip = async (zipcode) => {
  try {
    const locationRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zipcode}&language=en&key=${process.env.GOOGLE_KEY}`
    );
    const locationData = await locationRes.json();
    const routeIndex = findRouteIndex(locationData.results);
    const { city: cityName, state: stateCode } = parseLocation(locationData.results[routeIndex]);
    const city = {
      name: cityName,
      state_code: stateCode,
      location: locationData.results[routeIndex].geometry.location,
    };
    return city;
  } catch (error) {
    return null;
  }
};

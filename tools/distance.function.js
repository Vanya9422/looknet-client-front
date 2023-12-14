const earthRadius = 6371;
const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
const radiansToDegrees = (radians) => radians * (180 / Math.PI);
const greatCircleDistance = (angle) =>
  2 * Math.PI * earthRadius * (angle / 360);
const centralSubtendedAngle = (locationX, locationY) => {
  const locationXLatRadians = degreesToRadians(locationX.latitude);
  const locationYLatRadians = degreesToRadians(locationY.latitude);
  return radiansToDegrees(
    Math.acos(
      Math.sin(locationXLatRadians) * Math.sin(locationYLatRadians) +
        Math.cos(locationXLatRadians) *
          Math.cos(locationYLatRadians) *
          Math.cos(
            degreesToRadians(
              Math.abs(locationX.longitude - locationY.longitude)
            )
          )
    )
  );
};
const distanceBetweenLocations = (locationX, locationY) =>
  greatCircleDistance(centralSubtendedAngle(locationX, locationY));
const LatLng = ({ latitude, longitude }) => ({
  latitude: parseFloat(latitude),
  longitude: parseFloat(longitude),
});

/**
 * @description - функция, возвращающая расстояние между двумя точками
 * @param origins
 * @param destinations
 * @returns {boolean|*}
 */
export const getDistance = (origins, destinations) => {
  try {
    let origin = LatLng(origins);
    let destination = LatLng(destinations);
    return distanceBetweenLocations(origin, destination);
  } catch (e) {
    return false;
  }
};
/**
 * @description - функция, возвращающая расстояние в милях
 * @param distance
 * @returns {string,number}
 */
export const getMills = (distance) => {
  let res = distance * 0.621371;
  return res.toFixed(1);
};

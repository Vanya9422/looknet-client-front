import { mapGetters } from "vuex";
import { getDistance, getMills } from "../tools/distance.function";

export default {
  computed: {
    ...mapGetters({
      LOCATION: "location/LOCATION",
    }),
    /**
     * distance() - функция, возвращающая расстояние между двумя точками
     * @returns {boolean|*}
     */
    distance() {
      let productCoordinates = this.coordinates;
      let myCoordinates = this.LOCATION;
      let res = false;
      if (myCoordinates) {
        if (typeof myCoordinates === "string") {
          myCoordinates = JSON.parse(myCoordinates);
        }
        // если id не равен c1, то вычисляется расстояние между двумя точками
        if (
          myCoordinates.id !== "c1" &&
          myCoordinates.latitude &&
          myCoordinates.longitude
        ) {
          let distance = getDistance(myCoordinates, productCoordinates);
          if (typeof distance === "number") {
            res = getMills(distance);
          }
        }
      }
      return res;
    },
  },
};

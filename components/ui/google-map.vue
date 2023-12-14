<template lang="pug">
  gmap-map(
    :center="{lat: +lat,lng: +lng}"
    map-type-id='terrain'
    class='map' id='map'
    :options="mapOptions"
  )
    gmap-marker(
      v-if="!hideMarker"
      :position="{ lat: +lat, lng: +lng }"
      :draggable="draggable"
      @dragend="onMarkerDragEnd"
      :icon="require('@/assets/img/icons/Iconmap.svg')"
    )
    gmap-circle(
      v-if="!draggable && !hideCircle"
      :center="{ lat: +lat, lng: +lng }"
      :options="options"
      :radius="radius"
    )
</template>

<script>

import {mapGetters} from "vuex";
import { findRouteIndex, parseLocation } from "~/tools/location.function";

export default {
  props: {
    lng: {
      type: [String, Number]
    },
    lat: {
      type: [String, Number]
    },
    draggable: {
      type: Boolean,
      default: false
    },
    hideCircle: {
      type: Boolean,
      default: false,
    },
    hideMarker: {
      type: Boolean,
      default: false
    },
    radius: {
      type: Number,
      default: 200,
    },
    zoom: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {
      options:{
        strokeColor:'#556DEE',
        fillColor:'#556DEE',
        fillOpacity:0.14,
        strokeOpacity:1,
        strokeWeight:2,
        visible:true
      },
      mapOptions: {
        zoom: this.zoom,
        disableDefaultUI: true,
        styles: []
      },
    }
  },
  computed: {
    ...mapGetters({
      GOOGLE_KEY: 'location/GOOGLE_KEY',
    })
  },
  methods: {
    onMarkerDragEnd(event) {
      const latitude = event.latLng.lat()
      const longitude = event.latLng.lng()
      this.getAddress({ latitude, longitude });
      this.updateSelectValue({ latitude, longitude });
    },
    async getAddress({ latitude, longitude }) {
      try {
        const data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.GOOGLE_KEY}`);
        const result = await data.json();
        const routeIndex = findRouteIndex(result.results);
        const { address } = parseLocation(result.results[routeIndex]);
        this.$emit('changeLocation', { latitude, longitude, address });
      } catch (error) {
        console.log(error)
      }
    },
    async updateSelectValue({ latitude, longitude }) {
      try {
        const data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.GOOGLE_KEY}&language=en`);
        const result = await data.json();
        const routeIndex = findRouteIndex(result.results);
        const { city, state } = parseLocation(result.results[routeIndex]);
        if (!city || !state) return;
        this.$emit('updateCity', {
          name: city,
          state_code: state,
          location: {
            lat: latitude,
            lng: longitude,
          },
        });
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>


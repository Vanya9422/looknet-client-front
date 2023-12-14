<template lang="pug">
  .modal-location__list-active.modal-location__item.active(v-if="LOCATION_STATE || LOCATION_CITY")
    .modal-location__list-name
      template(v-if="withoutCity") {{ LOCATION_STATE.state_minimal_select ? LOCATION_STATE.state_minimal_select.name : LOCATION_STATE.name || PAGE_HOME.search.city }}
      template(v-else)
        template(v-if="LOCATION_CITY.id === 'c1'") {{ PAGE_HOME.search.city }}
        template(v-else )  {{LOCATION_CITY.name}}
        span(v-if="LOCATION_CITY && LOCATION_CITY.id !== 'c1' && (!withoutCity || LOCATION_CITY.name)") {{LOCATION_CITY.state_code || ''}}
    .modal-location__list-edit(@click="$emit('change')") {{POPUP_GLOBAL.edit}}
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {
    withoutCity: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      LOCATION_STATE: 'location/LOCATION_STATE',
      LOCATION_CITY: 'location/LOCATION_CITY',
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
      PAGE_HOME: "pages/PAGE_HOME",
    })
  },
}
</script>

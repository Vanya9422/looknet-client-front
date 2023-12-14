<template>
  <div class="single-map">
    <div class="single-map__head">
      <div class="single-map__row flex flex_justify flex_bottom">
        <div class="single-map__info">
          <h3 class="single-map__title h3">{{ PAGE_PRODUCT_DETAILS.onMap }}</h3>
          <div class="single-map__addr h4 color-gray">{{ city }}</div>
          <div class="single-map__addr h4 color-gray" v-if="!hideAddress && !IsOpened">{{ addr }}</div>
        </div>
        <button-toggle class="single-map__toggle" @click.native="ToggleMapView" :active="IsOpened">
          {{ ButtonLabel }}
        </button-toggle>
      </div>
      <part-icon-list class="single-map__list" :list="fields" v-if="IsOpened"></part-icon-list>
    </div>
    <div class="single-map__bottom" v-if="IsOpened">
      <client-only>
        <google-map
          :lat="coordinates.latitude"
          :lng="coordinates.longitude"
          :hideMarker="hideAddress"
          :radius="hideAddress ? 800 : 200"
          :zoom="hideAddress ? 14 : 16"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import distanceMixin from "@/mixins/distanceMixin";

export default {
  props: {
    coordinates: {
      type: Object,
      default: () => {}
    },
    longitude: {
      type: [String, Number]
    },
    latitude: {
      type: [String, Number]
    },
    addr: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    openAtStartup: {
      type: Boolean,
      default: false,
    },
    hideAddress: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      IsOpened: false,
    }
  },
  created() {
    if (this.openAtStartup) {
      this.IsOpened = true;
    }
  },
  mixins: [distanceMixin],
  computed: {
    ButtonLabel() {
      return this.IsOpened ? this.PAGE_PRODUCT_DETAILS.hideMap || "Hide map" : this.PAGE_PRODUCT_DETAILS.more || "Show map";
    },
    fields() {
      let array = this.hideAddress ? [] : [
        {
          text: this.addr,
          icon: "map-field.svg"
        }
      ]
      if (this.distance) {
        array.push({
          text: `${this.distance} mils near you`,
          icon: "distance-field.svg"
        })
      }
      return array
    },
    ...mapGetters({
      PAGE_PRODUCT_DETAILS: 'pages/PAGE_PRODUCT_DETAILS'
    })
  },

  methods: {
    ToggleMapView() {
      this.IsOpened = !this.IsOpened
    }
  }
}
</script>

<style lang="scss">
.single-map {

  &__title {
    margin-right: 30rem;
    margin-bottom: 15rem;
  }

  &__toggle {
    margin-bottom: 15rem;

    @include large-mobile {
      position: absolute;
      left: 0;
      bottom: 0;

      margin-bottom: 0;
    }
  }

  &__addr {
    margin-top: 20rem;
    font-family: 'Gilroy';
    font-weight: normal;
    margin-bottom: 15rem;

    @include large-mobile {
      font-size: 14rem;
      line-height: 120%;
      margin-bottom: 20rem;
    }
  }

  &__row {
    margin-bottom: -15rem;

    @include large-mobile {
      display: block;
      margin-bottom: 0;

    }
  }

  &__head {
    @include large-mobile {
      position: relative;
      padding-bottom: 15rem;
      margin-bottom: 20rem;
    }
  }

  &__image {
    border-radius: 10rem;

    @include large-mobile {
      height: 300rem;
      object-fit: cover;
    }
  }

  &__list {
    margin-top: 30rem;
    margin-bottom: 15rem;

    @include large-mobile {
      margin-bottom: 17rem;
    }
  }
}

#map {
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
}
</style>

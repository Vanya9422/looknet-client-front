<template lang="pug">
  .select__location-detect-block(v-if="showDetectLocation")
    .select__location-detect
      .tippy-roundarrow
        tippy-arrow-icon
      button-close.modal__close.select__location-detect-close(@click.native="DETECT_LOCATION(false)")
      .select__location-detect-content
        h4.select__location-detect-title {{ locationState ? POPUP_LOCAL.isItYourCity : POPUP_LOCAL.weCantFindYourCity }}
        p.select__location-detect-city {{ locationState ? `${locationState.name}${locationState.state_code ? `, ${locationState.state_code}` : ''}` : PAGE_HOME.search.city }}
        button-primary(blue medium @click.native="DETECT_LOCATION(false);").select__location-detect-done {{ locationState ? POPUP_GLOBAL.yes : POPUP_GLOBAL.ok }}
        button-primary(medium gray @click.native="changeLocation").select__location-detect-change {{ POPUP_GLOBAL.change }}
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import modalLocation from "@/mixins/modalLocation";
export default {
  mixins: [modalLocation],
  data() {
    return {
      isReadyWatcher: null,
    }
  },
  created() {
    this.isReadyWatcher = this.$watch('isReady', this.onOriginLocationLoaded);
  },
  mounted() {
    setTimeout(this.onOriginLocationLoaded, 2500);
  },
  computed: {
    ...mapGetters({
      location: 'location/LOCATION',
      user: 'user/USER',
      locationState: 'location/LOCATION_STATE',
      showDetectLocation: 'modal/DETECT_LOCATION',
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
      POPUP_LOCAL: 'popup/POPUP_LOCAL',
      PAGE_HOME: "pages/PAGE_HOME",
    }),
  },
  methods: {
    ...mapActions({
      SET_USER_LOCATION: 'location/SET_USER_LOCATION',
      SET_LOCATION: 'location/SET_LOCATION',
      SET_LOCATION_STATE: 'location/SET_LOCATION_STATE',
    }),
    ...mapMutations({
      DETECT_LOCATION: 'modal/DETECT_LOCATION',
    }),
    changeLocation() {
      this.$bvModal.show('modal-location');
      this.DETECT_LOCATION(false);
    },
    setLocation() {
      if (this.user?.city) {
        if (this.locationState) {
          this.$axios.$put(this.$api.settings, this.locationState)
          this.SET_USER_LOCATION(this.locationState)
        } else {
          this.$axios.$put(this.$api.settings, { country: 1 })
          this.SET_USER_LOCATION({ country: 1 })
        }
      } else {
        if (this.locationState) {
          this.SET_LOCATION({ city: this.locationState })
        } else {
          this.SET_LOCATION({ city: { id: "c1" } })
        }
      }
    },
    async checkLocation() {
      if (this.location) return;
      await this.detectLocation();
      this.setLocation();
      this.DETECT_LOCATION(true);
    },
    onOriginLocationLoaded() {
      if (!this.isReadyWatcher) return;
      this.checkLocation();
      this.isReadyWatcher();
      this.isReadyWatcher = null;
    },
  }
}
</script>
<style lang="scss">
.select {
  &__location-detect {
    position: absolute;
    z-index: 10;
    width: 237rem;
    background-color: #fff;
    top: calc(100rem + 7px);
    left: -30rem;
    border: 1px solid #D2D2D7;
    border-radius: 10rem;

    @include large-mobile {
      border-radius: 10rem;
      position: fixed;
      z-index: 1000;
      width: 100%;
      height: 300rem;
      padding-top: 20rem;
      bottom: 0;
      top: auto;
      left: 0;
      background-image: none;
      background-color: #fff;
    }

    .tippy-roundarrow {
      left: 98px;
      top: -7px;
      @include large-mobile {
        display: none;
      }
    }

    &-block {
      position: absolute;
      z-index: 10;
      background-color: initial;
      top: 0;

      @include large-mobile {
        z-index: 100;
        width: 100vw;
        height: 100vh;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    &-close {
      display: none !important;

      @include large-mobile {
        display: flex !important;
      }
    }

    &-content {
      margin-top: 30rem;
      padding: 0 20rem 20rem;
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    &-title {
      font-size: 15rem;
      color: #062439;
      font-weight: 600;
      text-align: center;
    }

    &-city {
      padding-top: 5rem;
      font-size: 15rem;
      color: #556DEE;
      font-weight: 600;
    }

    &-done {
      width: 100%;
      margin-top: 10rem;

      @include large-mobile {
        margin-top: 30rem;
      }
    }

    &-change {
      width: 100%;
      margin-top: 10rem;
    }
  }
}</style>

<template lang="pug">
.select.city-search(:class="Mods")
  .select__label.p.color-gray(v-if="label") {{ label }}
  .select__wrap
    .select__head(v-b-modal.modal-location)
      .select__color(:class="`${color}`", v-if="color")
      .select__value
        slot(name="input")
      svg-icon.select__location-image(name="location", viewBox="0 0 11 7")
  modal-detect
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    citySearch: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "Select",
    },
    search: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    big: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: Boolean,
      default: false,
    },
    borderRight: {
      type: Boolean,
      default: false,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    default: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false,
    },
    items: {
      type: [Array, Object],
      default: () => [],
    },
    recomendation: {
      type: [Array, Object],
      default: () => [],
    },
    active: {
      type: Object,
      default: () => ({ name: "" }),
    },
  },
  watch: {
    citySearch() {
      if (!this.firstOpen) {
        this.firstOpen = true;
      } else {
        if (
          !this.listOn &&
          this.citySearch !== "" &&
          this.currentValue === ""
        ) {
          this.listOn = true;
        }
      }
    },
    listOn(open) {
      this.$emit("isOpened", open);
      if (!open) {
        this.SET_CITIES_PAGE(1);
      }
    },
  },

  data() {
    return {
      listOn: false,
      firstOpen: false,
      currentValue: "",
    };
  },
  computed: {
    ...mapGetters({
      location: "location/LOCATION",
    }),
    Mods() {
      return {
        select_lang: this.lang,
        select_big: this.big,
        "select_border-right": this.borderRight,
        "select_no-border": this.noBorder,
        select_default: this.default,
        select_top: this.top,
      };
    },
  },
  methods: {
    ...mapActions({
      SET_CITIES_PAGE: "city/SET_CITIES_PAGE",
    }),
    toggleList() {
      this.listOn = !this.listOn;
      if (this.listOn) this.$emit("open");
      if (this.listOn) this.$emit("close");
    },
    closeList() {
      this.listOn = false;
    },
    updateValue(val) {
      this.listOn = false;
      this.$emit("change", val);
    },
  },
  mounted() {
    const cityName = this.$route.query.city_name;
    if (cityName) {
      setTimeout(() => (this.firstOpen = true), 3000);
    }
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss">
.select__item.order:has(+ .select__item:not(.order)) {
  border-bottom: 1px solid #d2d2d7;
  padding-bottom: 3px;
  margin-bottom: 5px;
}
.select__list > .order {
  border-bottom: 1px solid #d2d2d7;
  padding-bottom: 3px;
  margin-bottom: 5px;
}
.select__btn-text-bold {
  font-weight: 700;
}
.select {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  &__list {
    max-height: 300px;
  }

  &_lang {
    .select {
      &__head {
        height: 40rem;
        font-size: 17rem;
        color: $default;
        font-weight: 600;
      }

      &__arrow {
        stroke: $default;
        margin-left: 5rem;
      }
    }

    @include large-mobile {
      .select {
        &__head {
          height: 20rem;
          font-size: 14rem;
        }
      }
    }
  }

  &_big {
    .select {
      &__head {
        font-size: 17rem;
        color: $default;
        font-weight: 600;
      }

      &__arrow {
        stroke: $default;
        margin-left: 14rem;
      }
    }

    @include large-mobile {
      .select {
        &__head {
          height: 20rem;
          font-size: 14rem;
        }
      }
    }
  }

  &_border-right {
    .select {
      &__head {
        border-left: 0;
        border-right: 1px solid $light-gray;
      }
    }
  }

  &_no-border {
    font-size: 17rem;
    font-weight: 600;

    .select {
      &__head {
        height: auto;
        padding: 0 5rem;
        height: auto;
        border: 0;
        color: $default;
      }

      &__arrow {
        margin-left: 6rem;
      }

      &__list {
        left: -15rem;
      }
    }
  }

  &_default {
    height: 60rem;
    display: flex;
    font-size: 17rem;
    font-weight: 500;
    font-family: "Gilroy";

    .select {
      &__wrap {
        width: 100%;
        height: 100%;
      }

      &__head {
        height: 100%;
        border: 1px solid $light-gray;
        border-radius: 10rem;
        padding: 15rem 20rem;
        width: 100%;
      }

      &__body {
        width: 100%;
        border-radius: 10rem;
        margin-top: 5px;
      }

      &__btn {
        color: $gray;
      }
    }
  }

  &_top {
    .select {
      &__body {
        top: auto;
        bottom: 100%;
        margin-bottom: 5px;
      }
    }
  }

  @include large-mobile {
    &_no-border {
      .select {
        &__head {
          padding: 0 5rem;
          height: auto;
          border: 0;
        }

        &__list {
          left: -15rem;
        }
      }
    }
    &_default {
      height: 50rem;
    }
  }

  &__label {
    @include large-mobile {
      padding-bottom: 1px;
    }
  }

  &__wrap {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__head {
    position: relative;
    border-left: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56rem;
    color: $gray;
    padding: 0 30rem;
    cursor: pointer;
    white-space: nowrap;
    @include small-tablet {
      padding: 0 20rem;
    }

    @include large-mobile {
      height: 20rem;
      font-size: 14rem;
      padding: 0;
      border: 0;
    }
  }

  &__color {
    width: 10rem;
    height: 10rem;
    flex-shrink: 0;
    margin-right: 10rem;
    border-radius: 10px;
    display: inline-flex;

    &.red {
      background: $red;
    }

    &.blue {
      background: $blue;
    }

    &.brown {
      background: $brown;
    }

    &.green {
      background: $green;
    }
  }

  &__value {
    margin-right: auto;

    input {
      border: none;
      font-weight: 600;
      color: #062439;
      max-width: 110px;
      cursor: pointer;
    }
  }

  &__arrow {
    flex-shrink: 0;
    margin-left: 5px;
    width: 11rem;
    height: 7rem;
    fill: none;
    stroke: $gray;
    stroke-width: 2;
    margin-left: 18rem;

    @include small-tablet {
      margin-left: 10rem;
    }

    @include large-mobile {
      width: 9rem;
      height: 6rem;
    }
  }

  &__body {
    position: absolute;
    top: 100%;
    margin-top: 10rem;
    z-index: 100;
    left: 0;
    width: calc(100% + 30rem);
    background: #fff;
    padding: 10rem;
    border: 1px solid #d2d2d7;
    border-radius: 5px 5px 15rem 15rem;
  }

  &__btn {
    cursor: pointer;
    display: block;

    &-input {
      display: none;

      &:checked {
        & + .select__btn-text {
          background: #f5f5f7;
          color: $default;
        }
      }
    }

    &-text {
      padding: 10rem 20rem;
      border-radius: 5px;
      transition: ease 0.2s;
      display: block;
      font-size: 17rem;

      &:hover {
        color: $blue;
      }
      .grey-item {
        display: block;
        font-size: 14px;
        color: #6e6e73;
      }
    }

    @include large-mobile {
      &-text {
        font-size: 14rem;
        padding: 8rem 10rem;
      }
    }
  }
}
.select__item {
  position: relative;
}
.select__btn-close-icon {
  width: 22px;
  height: 22px;
  background: $blue;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    stroke: #fff;
    width: 12px;
    height: 12px;
  }
}
.active-item {
  background: #f5f5f7;
  border-radius: 5px;
  .select__btn-text-name {
    max-width: calc(100% - 12px);
    @include max-rows(17 * 1.2, 1);
  }
}
.city-search {
  .select__head {
    padding: 0 30rem 0 0;
    &::before {
      display: block;
      margin-right: 30px;
      content: "";
      width: 1px;
      height: 56px;
      background-color: $light-gray;
    }
  }
  .select__btn-input:checked + .select__btn-text {
    background: transparent;
  }
  .select__body {
    width: calc(100% + 45rem);
  }
}
.loading-select {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}
</style>

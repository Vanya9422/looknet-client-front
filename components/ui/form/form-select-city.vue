<template lang="pug">
  .select.select-city(:class="Mods" v-click-outside="closeList")
    .select__label.p.color-gray(v-if="label") {{ label }}
    .select__wrap
      template(v-if="showInput")
        input.select__input(type="hidden" :name="name" :value="currentValue")
        .select__head(@click="toggleList(true)")
          //- .select__value.select__value-checked(v-if="currentValue.name")
          //-   | {{currentValue.name}}
          //-   span {{currentValue.state_code }}
          //- .select__value(v-else) {{selectText}}
          .select__search.w-100
            form-input(
              v-model="search"
              :prependIcon="true"
              name="search"
              :placeholder="placeholder"
              icon="search"
              @input="searchCity"
            )
          .select__arrow
            svg-icon(name="arrowDown" viewBox="0 0 11 7")
        transition(name="DropDown")
          .select__body(v-if="listOn")
            //- .select__search
            //-   form-input(v-model="search" @input="searchCity" name="search" placeholder="Search" icon="search" )
            .select__list.css-scrollbar
              .select__item(v-for="(item, i) in items" :key="i" @click="changeValue(item)")
                label.select__btn
                  input.select__btn-input(
                    type="radio"
                    :name="name"
                    :value="item"
                    @change="closeList(); updateValue();"
                    v-model="currentValue"
                  )
                  span.select__btn-text
                    |{{ item.name || '' }}
                    span {{ item.state_minimal_select?.name || '' }}
              client-only
                infinite-loading(:distance="20" :identifier="infiniteId" ref="infiniteLoading" @infinite="getCity")
                  div(slot="no-results")
                  div(slot="no-more")
                  div(slot="spinner")
            slot
      .select__head.selected(v-else)
        div {{ currentValue.name }}
          span(v-if="currentValue.state_code") {{ currentValue.state_code }}
        .modal-location__list-edit(@click="showInput = true") {{POPUP_GLOBAL.edit}}

</template>

<script>
import ClickOutside from 'vue-click-outside';
import { mapGetters, mapActions } from "vuex";
import { searchLocationByZip } from '~/tools/location.function';

export default {
  props: {
    value: {
      type: [Object,Boolean],
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    // selectText: {
    //   type: String,
    //   default: 'Selected'
    // },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      listOn: false,
      currentValue: this.value || {},
      items: [],
      search: this.value?.name || '',
      infiniteId: 1,
      page: 1,
      per_page: 20,
      showInput: !this.value?.name,
    };
  },

  computed: {
    ...mapGetters({
      GOOGLE_KEY: 'location/GOOGLE_KEY',
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
    }),
    Mods() {
      return {
        'select_error': this.error,
      }
    }
  },
  methods: {
    ...mapActions({
      GET_LOCATION_BY_CITY_STATE: 'location/GET_LOCATION_BY_CITY_STATE',
    }),
    toggleList(value) {
      this.listOn = value || !this.listOn;
    },
    closeList() {
      this.listOn = false;
    },
    updateValue(canUpdate = true) {
      this.showInput = !this.currentValue?.name;
      if (!this.showInput) {
        this.search = this.currentValue.name;
      }
      if (canUpdate) {
        this.$emit('input', this.currentValue);
      }
    },
    changeValue(item, canUpdate = true) {
      this.currentValue = item;
      this.closeList();
      this.updateValue(canUpdate);
    },
    searchCity() {
      if (!this.showInput) return;
      this.page = 1;
      this.items = [];
      this.infiniteId += 1;
    },
    async updateCity(city) {
      try {
      this.page = 1;
      this.items = [];
      const { data } = await this.getLocationCityState(city);
      if (!data.length) return;
      this.changeValue(data[0], false);
      } catch (error) {
        console.log(error);
      }
    },
    async getLocationCityState(city) {
      return this.GET_LOCATION_BY_CITY_STATE({
        city,
        params: {
          orderBy: 'order;id',
          sortedBy: 'desc;asc',
          page: this.page,
          per_page: this.per_page,
        },
      });
    },
    getCity: _.debounce(async function ($state) {
      const infiniteId = this.infiniteId;
      try {
        const checkString = !isNaN(parseInt(this.search));
        const city = checkString
          ? await searchLocationByZip(this.search)
          : { name: this.search };
        if (!city || infiniteId !== this.infiniteId) {
          $state.complete();
          return;
        };
        const { data, meta: { current_page, last_page } } = await this.getLocationCityState(city);
        if (infiniteId !== this.infiniteId) {
          $state.complete();
          return;
        };
        if (checkString) {
          this.changeValue(data[0]);
        }
        if (current_page === 1) {
          this.items = data;
        } else {
          this.items.push(...data);
        }
        this.page = current_page + 1
        if (current_page < last_page) {
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (error) {
        console.log(error);
        $state.complete();
      }
    }, 500),
  },
  directives: {
    ClickOutside,
  }
}
</script>

<style lang="scss">
.select {
  position: relative;
  display: inline-flex;
  align-items: center;

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
        padding: 0 15rem;
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
    font-family: 'Gilroy';

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
    border-left: 1px solid $light-gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56rem;
    color: $gray;
    padding: 0 30rem;
    cursor: pointer;
    white-space: nowrap;
    &.selected {
      background: #F4F3F4;
      font-size: 20rem;
      color: #062439;
      @include large-mobile {
        font-size: 16rem;
      }
      span {
        font-weight: 400;
        font-size: 17px;
        color: #6E6E73;
        padding-left: 10px;
        @include large-mobile {
          font-size: 14rem;
        }
      }
    }

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
    border: 1px solid #D2D2D7;
    border-radius: 5px 5px 15rem 15rem;
  }

  &__btn {
    cursor: pointer;
    display: block;

    &-input {
      display: none;

      &:checked {
        & + .select__btn-text {
          background: #F5F5F7;
          color: $default;
        }
      }
    }

    &-text {
      padding: 10rem 20rem;
      border-radius: 5px;
      transition: ease .2s;
      display: block;
      font-size: 17rem;

      &:hover {
        color: $blue;
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
.select-city{
  &.select_error{
    .select__head{
      border-color: $red;
    }
  }
  .select__search{
    .input__icon{
      stroke: #D2D2D7;
    }
    input {
      border: none;
      padding: 0;
      height: auto;
      border-radius: 0;
    }
    .input__icon {
      right: 0;
    }
  }
  .select__list{
    margin-top: 10px;
  }
  .select__item .select__btn-text{
    padding: 15px ;
    @include large-mobile{
      padding: 10px;
    }
    &:hover{
      background: #F5F5F7;
      color: $default;
    }
  }
  .select__head{
    border: 1px solid #D2D2D7;
    border-radius: 10rem;
    height: 60px;
    padding: 0 20px;
    @include large-mobile{
      height: 50px !important;
      margin-top: 10px;
      padding: 0 15px;
    }
  }
  .select__body{
    width: 100%;
  }
  &,.select__wrap,.select__head{
    width: 100%;

  }
  .select__value-checked{
    color: $default;
    span{
      font-size: 14px;
      color: #6E6E73;
      padding-left: 10px;
    }
    @include large-mobile{
      font-size: 14px;
      span{
        font-size: 12px;
      }
    }
  }
  .select__value,
  .select__btn-text{
    font-size: 18px;
    span{
      font-size: 14px;
      color: #6E6E73;
      padding-left: 10px;
    }
    @include large-mobile{
      font-size: 16px;
      span{
        font-size: 14px;
      }
    }
  }
}
</style>

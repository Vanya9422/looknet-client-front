<template>
  <b-modal
    id="modal-create3"
    size="create-size"
    modal-class="modal-create"
    body-class="modal-create__body"
    header-class="modal-create__header"
    footer-class="modal-create__footer"
    :centered="$screen.st"
    @show="openModal">
    <template #modal-header="{ close }">
      <button-close
        class="modal__close modal__close-header"
        @click.native="close()"></button-close>
    </template>
    <form class="form-create"
          v-if="category">
      <div class="form-create__fields">
        <div class="form-create__field form-create__field_first">
          <div class="form-create__column form-create__column_left">
            <div class="form-create__label form-create__label_mobile h4">
              {{ content.mainCategory.title }}
            </div>
          </div>
          <div class="form-create__column form-create__column_right">
            <button-category
              class="form-create__category"
              :img="category.picture?category.picture.original_full_url:''"
              :text="category.name"
              :editText="content.mainCategory.edit"
              edit
              @click.prevent.native="$emit('openModalCategory')"></button-category>
          </div>
          <div class="form-create__column form-create__column_left"></div>
          <div class="form-create__column form-create__column_right">
            <div class="form-create__nav flex flex_justify">
              <div class="form-create__breadcrumbs color-blue p">
                <span
                  class="form-create__breadcrumbs-item"
                  v-for="(item,index) in breadcrumbs"
                  :key="index">{{ item.name }}</span>
              </div>
              <button-link-arrow class="form-create__link-all"
                                 @click.prevent.native="$emit('openModalCategory')">{{ content.mainCategory.all }}
              </button-link-arrow>
            </div>
          </div>
        </div>
        <part-pin-filters
          v-model="form.answers"
          :category-id="category.id"
          :origin-answers="originAnswers"
          @validation="setFilterValidationStatus"
        />
        <div class="form-create__field">
          <div class="form-create__column form-create__column_left">
            <div class="form-create__label h4">{{ content.mainCategory.link.label }}</div>
          </div>
          <div class="form-create__column form-create__column_right">
            <form-input
              class="form-create__input"
              :placeholder="content.mainCategory.link.placeholder"
              name="YoutubeLink"
              type="url"
              v-model="checkLinkYoutube"
              @input="getId()"
              :error="$v.form.link.$error && !link"
            />
          </div>
        </div>
        <div class="form-create__field"
             v-if="!$v.form.link.$error && link ">
          <iframe
            class="form-create-youTube"
            :src="`https://www.youtube.com/embed/${link}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
        <div class="form-create__field">
          <div class="form-create__column form-create__column_left">
            <div class="form-create__label h4">
              {{ content.mainCategory.address.label }}
            </div>
          </div>
          <div class="form-create__column form-create__column_right">
            <form-select-city
              :key="openModalKey"
              :placeholder="content.mainCategory.selectedPlaceholder"
              :value="city"
              :error="cityError"
              ref="selectCity"
              @input="changeCity"></form-select-city>
          </div>
        </div>
        <div class="form-create__field"
             v-if="city">
          <form-input
            class="form-create__input w-100"
            :debounce="true"
            :placeholder="content.mainCategory.address.placeholder"
            :key="keyAddress"
            name="link"
            type="type"
            v-model="address"
            @input="setValueCoordinates()"
            :error="$v.form.address.$error || addressErrorGoogle"></form-input>
        </div>
        <div class="form-create__field"
             v-if="city">
          <div class="form-create__column form-create__column_left">
            <div class="form-create__label h4">{{ content.mainCategory.address.hideAddress.label }}</div>
          </div>
          <div class="form-create__column form-create__column_right">
            <form-radio-switch

              :checked="hideAddress"
              v-tippy="{content:`<div class='form-create__column-tippy'>${content.mainCategory.address.hideAddress.info}</div>`,placement:'bottom-end'}"
              @change="hideAddress = !hideAddress">
              {{ content.mainCategory.address.hideAddress.placeholder }}
            </form-radio-switch>
          </div>
          <div class="form-create__field-map">
            <client-only>
              <google-map
                :draggable="!hideAddress"
                :lat="city.latitude"
                :lng="city.longitude"
                ref="google-map"
                :hideMarker="hideAddress"
                :hideCircle="!hideAddress"
                :radius="hideAddress ? 800 : 200"
                :zoom="hideAddress ? 14 : 16"
                @updateCity="$refs.selectCity.updateCity($event)"
                @changeLocation="changeLocation"></google-map>
            </client-only>
          </div>
        </div>
        <div class="form-create__field">
          <div class="form-create__column form-create__column_left">
            <div class="form-create__label h4">{{ content.mainCategory.phone.label }}</div>
          </div>
          <div class="form-create__column form-create__column_right"
               v-show="form.contacts !== 2 && hasPhone">
            <change-phone
              :isError="phoneError"
              :phoneNumber="form.contact_phone"
              readonly
              @input="(val) => form.contact_phone = val"
              @error="changePhoneError"></change-phone>
          </div>
          <div class="form-create__column form-create__column_left"
               v-if="form.contacts !== 2"></div>
          <div class="form-create__column form-create__column_right">
            <div class="form-create__checkboxes flex"
                 :class="{'pt-0':form.contacts === 2}">
              <form-checkbox
                class="form-create__checkbox"
                :checked="form.contacts === item.status"
                @change="changePhoneStatus(item.status)"
                v-for="(item,index) in contactTypes"
                :key="index"
                v-tippy="{content:`<div class='form-create__column-tippy'>${item.info}</div>`,placement:'bottom-start'}">
                <div class="p color-gray">{{ item.text }}</div>
              </form-checkbox>
            </div>
          </div>
        </div>
        <div class="form-create__field">
          <div class="form-create__column form-create__column_left">
            <div class="form-create__label h4">
              {{ content.mainCategory.renewal.label }}
            </div>
          </div>
          <div class="form-create__column form-create__column_right">
            <form-radio-switch
              :checked="form.auto_renewal"
              v-tippy="{content:`<div class='form-create__column-tippy'>${content.mainCategory.renewal.info}</div>`,placement:'bottom-end'}"
              @change="form.auto_renewal = form.auto_renewal === 0 ? 1 : 0">
              {{ content.mainCategory.renewal.placeholder }}
            </form-radio-switch>
          </div>
          <div class="form-create__column form-create__column_left"></div>
          <div class="form-create__column form-create__column_right"></div>
        </div>
      </div>
      <div class="form-create__bottom flex flex_vertical flex_justify"></div>
    </form>
    <template #modal-footer="{ close }">
      <div class="modal-create__footer-row"
           v-if="errorArray">
        <div class="alert-error w-100"
             v-for="(item,key) in Object.values(errorArray)"
             :key="key">{{ item[0] }}
        </div>
      </div>
      <div class="modal-create__footer-row flex flex_justify">
        <button-primary
          class="modal-create__cancel modal-create__cancel_desktop"
          border
          @click.native="close()"
        >
          {{ content.mainCategory.buttons.cancel }}
        </button-primary>
        <div class="modal-create__footer-buttons flex">
          <button-primary
            class="modal-create__footer-btn"
            gray
            :loading="loadingDraft"
            @click.native="addProduct(5)"
          >
            {{ content.mainCategory.buttons.draft }}
          </button-primary>
          <button-primary
            class="modal-create__footer-btn"
            blue
            :loading="loading"
            @click.native="addProduct()"
          >
            {{ content.mainCategory.buttons.save }}
          </button-primary>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { url, requiredIf } from "vuelidate/lib/validators";
import { getIdFromUrl } from 'vue-youtube';
import { mapGetters } from "vuex";
import { findRouteIndex } from "~/tools/location.function";

export default {
  props: {
    originForm: {
      type: Object,
      required: true,
    },
    originAnswers: {
      type: Array,
      default: () => {
      }
    },
    content: {
      type: Object,
      default: () => {
      }
    },
    category: {
      type: Object,
      default: () => {
      }
    },
    getCity: {
      type: Object,
      default: null
    },
    breadcrumbs: {
      type: Array,
      default: () => []
    },
    addressError: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingDraft: {
      type: Boolean,
      default: false
    },
    errorArray: {
      type: [Object, Array],
      default: (() => null)
    },
    isFake: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      openModalKey: 0,
      cityError: false,
      phoneError: false,
      addressErrorGoogle: false,
      filters: [],
      answers: this.originAnswers,
      address: '',
      city: this.getCity,
      form: this.originForm,
      keyAddress: 0,
      filterValidationStatus: false,
      hideAddress: !!this.originForm.hide_address,
    };
  },
  computed: {
    ...mapGetters({
      GOOGLE_KEY: 'location/GOOGLE_KEY',
    }),
    checkLinkYoutube: {
      get() {
        return this.form.link;
      },
      set(value) {
        const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]/;
        if (value !== '') {
          if (youtubeUrlRegex.test(value)) {
            this.form.link = value;
          } else {
            this.form.link = 'false';
          }
        } else {
          this.form.link = '';
        }
      }
    },
    link() {
      if (this.form.link === '' || this.form.link === undefined) return false;
      else return getIdFromUrl(this.form.link);
    },
    hasPhone() {
      return Boolean(this.originForm.contact_phone);
    },
    contactTypes() {
      const items = this.content?.mainCategory?.phone?.list || [];
      if (this.hasPhone) {
        return items;
      }
      return items.filter((item) => {
        return item.status === 2;
      });
    }
  },
  validations: {
    form: {
      link: { url },
      address: {
        required: requiredIf(function () {
          return this.city && this.city.id;
        }),
      },
    }
  },
  watch: {
    async address(val) {
      this.form.address = val;
    },
    async category() {
      await this.getCategories();
    }
  },
  methods: {
    setFilterValidationStatus(status) {
      this.filterValidationStatus = status;
    },
    triggerFilterValidations() {
      this.$nuxt.$emit('trigger-filter-validaton');
    },
    setValueCoordinates() {
      this.$v.form.address.$touch();
      this.getCoordinates();
    },
    async getCategories() {
      const filterField = `filter=id;name;order`;
      const withField = `with=answers`;
      const order = `orderBy=order&sortedBy=desc`;
      await this.$axios.$get(`${this.$api.filters}?category_id=${this.category.id}&${order}&with=answers`)
        .then(({ data }) => {
          this.filters = data;
          this.answers = [];
          // this.form.answers = []
          this.filters.forEach(item => {
            if (item.answers[0]) {
              this.answers.push(item.answers[0].name);
              // this.form.answers.push(item.answers[0].id)
            }
          });
        });
    },
    getId() {
      this.$v.form.link.$touch();
    },
    changePhoneStatus(status) {
      this.form.contacts = status;
      if (status === 2) this.phoneError = false;
    },
    changeLocation({ latitude, longitude, address }) {
      this.form.latitude = latitude;
      this.form.longitude = longitude;
      this.form.address = address;
      this.address = address;
      this.keyAddress++;
      this.addressErrorGoogle = false;
    },
    changePhoneError(val) {
      this.phoneError = !val;
    },
    async getCoordinates() {
      try {
        if (this.address !== '') {
          this.addressErrorGoogle = false;
          const activeCity = `${this.city.name} ${this.city.state_minimal_select.name}`;
          const key = this.GOOGLE_KEY;
          const data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${activeCity} ${this.address}&key=${key}`);
          const response = await data.json();
          const routeIndex = findRouteIndex(response.results);
          const { lat, lng } = response.results[routeIndex].geometry.location;
          this.city.latitude = lat;
          this.city.longitude = lng;
        }
      } catch (error) {
        this.addressErrorGoogle = true;
      }
    },
    changeCity(val) {
      if (!val) return;
      this.cityError = false;
      this.address = '';
      this.form.address = '';
      this.city = val;
      this.form.city_id = val.id || 1;
      this.form.latitude = val.latitude;
      this.form.longitude = val.longitude;
      if (!val) return;
      this.$nextTick(() => this.$nextTick(() => {
        this.$refs['google-map'].getAddress({
          latitude: val.latitude,
          longitude: val.longitude,
        });
      }));
    },
    hasAddress(val) {
      this.$axios.get(`https://nominatim.openstreetmap.org/search?q=${val}&format=json`)
        .then(res => {
          if (res.data.length > 0) {
            this.$emit('addressError', false);
            const { lat, lon } = res.data[0];
            this.form.latitude = lat;
            this.form.longitude = lon;
            this.$axios.$get(`/check-city?latitude=${lat}&longitude=${lon}`)
              .then(({ data: { city } }) => {
                if (city) {
                  this.form.city_id = city.id || 1;
                } else this.$emit('addressError', true);
              });
          } else {
            this.$emit('addressError', true);
          }
        });
    },
    changeAnswers(val, index) {
      this.answers[index] = val;
      // this.form.answers[index] = val.id
    },
    checkPhone() {
      let status = 2
      this.$nextTick(()=> {
        if (this.originForm.contact_phone) {
          status = 0
        }
        this.changePhoneStatus(status);
      })
    },
    openModal() {
      this.$v.form.$reset();
      this.address = this.originForm.address;
      this.form = this.originForm;
      this.checkPhone();
      const order = `orderBy=order&sortedBy=desc`;
      this.$axios.$get(`${this.$api.filters}?category_id=${this.category.id}&${order}&with=answers`)
        .then(({ data }) => {
          this.filters = [];
          this.answers = [];
          if (this.originAnswers.length > 0) {
            this.originAnswers.forEach((elem) => {
              data.forEach(item => {
                const index = item.answers.find(i => elem.id === i.id);
                if (index) {
                  this.answers.push(index);
                  this.filters.push(item);
                }
              });
            });
          } else {
            this.filters = data;
            this.filters.forEach(item => this.answers.push(item.answers[0]));
          }
        });
      this.openModalKey++;
    },
    addProduct(status = 0) {
      // this.form.zip_code = 10001
      this.$v.form.$touch();
      this.triggerFilterValidations();

      if (this.form.contacts !== 2 && this.form.contact_phone.length === 0) this.phoneError = true;
      if (!this.city) this.cityError = true;
      if (
        !this.$v.form.$error &&
        !this.addressError &&
        !this.addressErrorGoogle &&
        !this.phoneError &&
        !this.cityError &&
        this.filterValidationStatus
      ) {
        const form = {
          ...this.form,
          hide_address: this.hideAddress ? 1 : 0,
          status,
        };
        this.$emit('close', form);
        // console.log('submit product trigger', form)
      } else {
        console.error('submit denied');
      }
    },
  }
};
</script>

<style lang="scss">
@import '~/assets/сss/components/modal-create.scss';

.modal__close-header {
  @include large-mobile {
    display: flex !important;
  }
}

.form-create {
  &__field {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &:not(:first-child) {
      margin-top: 40rem;
    }

    @include large-mobile {
      display: block;
      &:not(:first-child) {
        margin-top: 20rem;
      }
      &_first {
        padding-bottom: 20rem;
        border-bottom: 1px solid $light-gray;
      }
    }
  }

  &__column {
    &_left {
      width: 33.75%
    }

    &_right {
      width: 66.25%;
    }

    @include large-mobile {
      width: 100%;
    }
  }

  &__nav {
    margin-top: 23rem;

    @include large-mobile {
      margin-top: 30rem;
    }
  }

  &__breadcrumbs {
    line-height: 1;

    &-item {
      &:not(:first-child) {
        &:before {
          content: ' / '
        }
      }
    }

    @include large-mobile {
      font-size: 16rem;
      width: 100%;
    }
  }

  &__link-all {
    @include large-mobile {
      margin-top: 17rem;
    }
  }

  &__label {
    font-family: 'Gilroy';
    font-weight: 600;
    @include large-mobile {
      font-size: 16rem;
      &_mobile {
        font-size: 20rem;
      }
    }
  }

  &__text {
    margin-top: 8rem;
    line-height: 1;

    @include large-mobile {
      margin-top: 5rem;
    }
  }

  &__select {
    @include large-mobile {
      margin-top: 15rem;
    }
  }

  &__input {
    @include large-mobile {
      margin-top: 10rem;
    }
  }

  &__checkboxes {
    padding-top: 20rem;
    @include large-mobile {
      padding-top: 5rem;
    }
  }

  &__checkbox {
    margin-right: 30rem;
    margin-top: 10rem;

    &:last-child {
      margin-right: 0;
    }

    @include large-mobile {
      margin-top: 15rem;
      margin-right: 0;
      width: 100%;
    }
  }

  &__category {
    @include large-mobile {
      margin-top: 20rem;
    }
  }
}

.form-create__field-map {
  width: 100%;
  height: 300px;
  border-radius: 10px;
  margin-top: 28px;

  #map {
    height: inherit;
  }
}

.form-create__column-tippy {
  max-width: 150px;
  width: 100%;
  text-align: left;
}

.form-create-youTube {
  width: 100%;
  height: 400px;
  border-radius: 10px;
}
</style>

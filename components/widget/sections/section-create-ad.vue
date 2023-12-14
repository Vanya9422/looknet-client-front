<template>
  <section class="create-ad">
    <div class="create-ad__step js-step isActive">
      <div class="create-ad__inner">
        <h3 class="create-ad__title h3"
            v-if="step === 1 && $route.params.product === undefined">{{ content.addGallery.title }}</h3>
        <div class="create-ad__desc p color-gray flex flex_center flex_vertical"
             v-if="step === 1 && $route.params.product === undefined"><span>{{ content.addGallery.skip1 }}</span>
          <button-primary class="create-ad__desc-skip"
                          light
                          verysmall
                          @click.native="nextStep"
                          v-if="$route.params.product === undefined">{{ content.mainCategory.buttons.skip }}
          </button-primary>
          <span>{{ content.addGallery.skip2 }}</span>
        </div>
        <form class="create-ad__form"
              id="form"
              ref="send-form">
          <part-specific-user-info v-if="step !== 1 && anotherUserPermission"
                                   :enable="enableAnotherUser"
                                   :preview="anotherUserPreviewImage"
                                   :validation="$v.anotherUser"
                                   v-model="anotherUser"
                                   @changeEnable="changeEnabledAnotherUserStatus"></part-specific-user-info>
          <!--input.d-none(type="file" id="test" name="pictures[]" multiple)-->
          <div class="create-ad__field"
               v-if="step !== 1">
            <label class="create-ad__label h4">{{ content.form.title.label }}</label>
            <form-input :activeInput="false"
                        :placeholder="content.form.title.placeholder"
                        v-model="form.name"
                        @input="$v.form.name.$touch()"
                        :error="$v.form.name.$error"></form-input>
          </div>
          <part-create-gallery class="create-ad__gallery"
                               v-if="getFiles.length > 0"
                               :content="content.form.gallery"
                               :thumbnails="getFiles"
                               :active="activeImag"
                               @changeOrder="orderFiles"
                               @change="changeFilesDt('files2')"
                               @changeActive="(activeItem) => this.activeImag = activeItem"
                               @deleteItem="deleteItemDtModal"
                               @top="fileToTop"></part-create-gallery>
          <part-add-photo class="create-ad__add-photo"
                          v-else-if="showAddPhoto || step === 1 && $route.params.product === undefined"
                          :firstText="content.addGallery.description"
                          :secondText="content.addGallery.subTitle"
                          :list="content.addGallery.list"
                          @change="changeFilesDt('files3')"></part-add-photo>
        </form>
        <template v-if="step !== 1">
          <create-product-tab :content="content.form"
                              @desc="changeDesc"
                              :key="step + active"
                              :error="$v.form.description.$error"
                              :costError="priceError"
                              :price="form.price"
                              :description="form.description"
                              :active="active"
                              :available_cost="form.available_cost"
                              @price="changePrice"
                              @change="changeActive"
                              @changeCost="form.available_cost = form.available_cost === 0 ? 1 : 0"></create-product-tab>
        </template>
      </div>
      <div class="create-ad__bottom flex flex_justify"
           v-if="step === 1">
        <div class="create-ad__bottom-column">
          <button-primary class="create-ad__bottom-btn"
                          v-if="$route.params.product === undefined"
                          border
                          :to="$locationPath('/announcements')">{{ content.mainCategory.buttons.cancel }}
          </button-primary>
        </div>
        <div class="create-ad__bottom-column flex">
          <button-primary class="create-ad__bottom-btn"
                          gray
                          @click.native="nextStep"
                          v-if="step === 1 && $route.params.product === undefined">
            {{ content.mainCategory.buttons.skip }}
          </button-primary>
          <!--button-primary.create-ad__bottom-btn(blue @click.native="nextStep" v-else) {{content.mainCategory.buttons.next}}-->
        </div>
      </div>
      <div class="create-ad__bottom flex flex_justify"
           v-else>
        <div class="create-ad__bottom-column">
          <button-primary class="create-ad__bottom-btn"
                          border
                          :to="$locationPath('/announcements')">{{ content.mainCategory.buttons.cancel }}
          </button-primary>
        </div>
        <client-only>
          <div class="create-ad__bottom-column flex"
               v-if="$screen.st">
            <button-primary class="create-ad__bottom-btn"
                            blue
                            @click.prevent.native="showNext"> {{ content.mainCategory.buttons.next }}
            </button-primary>
          </div>
        </client-only>
        <client-only>
          <div class="create-ad__bottom-column flex"
               v-if="$screen.width < 581">
            <button-primary class="create-ad__bottom-btn"
                            gray
                            @click.native="nextStep"
                            v-if="step === 1">{{ content.mainCategory.buttons.skip }}
            </button-primary>
            <button-primary class="create-ad__bottom-btn"
                            blue
                            @click.native="showNext"
                            v-else>{{ content.mainCategory.buttons.next }}
            </button-primary>
          </div>
        </client-only>
      </div>
    </div>
    <modal-question @change="changeFilesDt('files1')"
                    @close="step = 2"
                    :content="content.addGalleryModal"></modal-question>
    <modal-question2 :content="content.mainCategory.buttons"></modal-question2>
    <modal-create :edit="editModalCreate"
                  :categoryParentId="activeCategoryParentId"
                  :name="form.name"
                  @close="changeCategory"
                  @closeModal="showAllCategories = false"
                  :showAllCategories="showAllCategories"
                  :content="content.category"
                  :contentAllCategory="content.mainCategory.all"></modal-create>
    <modal-create2 :content="content"></modal-create2>
    <client-only>
      <modal-create3 :key="step"
                     :content="content"
                     :category="category"
                     :breadcrumbs="breadcrumbs"
                     :getCity="city"
                     :originAnswers="answers"
                     :addressError="addressError"
                     @addressError="(val) => addressError = val"
                     @openModalCategory="openModalCategory"
                     @close="addProduct"
                     :originForm="form"
                     :loading="loading"
                     :loadingDraft="loadingDraft"
                     :errorArray="errorArray"
                     :isFake="enableAnotherUser"></modal-create3>
    </client-only>
    <modal-create4 :content="content"></modal-create4>
    <modal-tariffs :productId="product?.data?.id"
                   @close="openThanks"></modal-tariffs>
    <modal-thank :redirect-to="$locationPath('/announcements')"></modal-thank>
    <modal-delete @deleteItem="deleteItemDt"
                  @cancel="deleteIndex = null"></modal-delete>
  </section>
</template>

<script>
import addProductGallery from "@/mixins/addProduct/addProductGallery.js";
import { minLength, maxLength, required, requiredIf } from "vuelidate/lib/validators";
import { parsePhoneNumber } from "libphonenumber-js";
import activeProduct from "@/mixins/addProduct/activeProduct";
import { cloneDeep, omit } from "lodash";
import { serialize } from 'object-to-formdata';
import filterController from "~/core/controllers/filterController";
import { mapGetters } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "What do you want to sell?"
    },
    content: {
      type: Object,
      default: () => {
      }
    },
  },
  data() {
    return {
      active: 0,
      activeImag: 0,
      deleteIndex: 0,
      showAllCategories: false,
      loading: false,
      loadingDraft: false,
      showAddPhoto: false,
      editModalCreate: false,
      nav: [
        {
          text: 'Cost',
          class: 'isActive',
          status: 1,
        },
        {
          text: 'For free',
          status: 0,

        },
        {
          text: 'Exchange',
          status: 2,

        },
        {
          text: 'Contractual',
          status: 3,
        },
      ],
      step: 1,
      form: {
        name: '',
        description: '',
        price: '',
        available_cost: 0,
        price_policy: 1,
        answers: [],
        link: '',
        address: '',
        contact_phone: this.USER?.phone_view || '',
        contacts: 0,
        auto_renewal: 0,
        city_id: '',
        latitude: '',
        longitude: '',
        hide_address: 0,
      },
      answers: [],
      priceError: false,
      addressError: false,
      category: null,
      city: null,
      breadcrumbs: null,
      product: null,
      errorArray: null,

      enableAnotherUser: false,
      anotherUserPreviewImage: '',
      anotherUser: {
        name: '',
        secondName: '',
        image: null
      }
    };
  },
  validations: {
    form: {
      name: { required, minLength: minLength(2), maxLength: maxLength(255) },
      description: { required, minLength: minLength(20), maxLength: maxLength(5000) },
    },
    anotherUser: {
      name: {
        required: requiredIf(function () {
          return this.anotherUserPermission && this.enableAnotherUser;
        }),
      },
      secondName: {
        required: requiredIf(function () {
          return this.anotherUserPermission && this.enableAnotherUser;
        }),
      },
    }
  },
  computed: {
    ...mapGetters({
      USER: "user/USER",
    }),
    imgError() {
      let flag = this.allFiles.length >= 10;
      this.allFiles.forEach(item => {
        if (item.size > 2500000) flag = true;
      });
      return flag;
    },
    anotherUserPermission() {
      const permissions = this.USER?.permissions || [];
      const permissionName = 'special_advertise_account';
      const havePermission = permissions.findIndex(permission => permission.name === permissionName);
      return havePermission !== -1;
    }
  },
  watch: {
    active(val) {
      this.priceError = false;
      this.form.price_policy = this.nav[this.active].status;
    },

    enableAnotherUser(value) {
      if (value) return false;

      this.anotherUserPreviewImage = '';
      this.anotherUser = {
        name: '',
        secondName: '',
        image: null
      };
    }
  },
  mixins: [addProductGallery, activeProduct],

  methods: {
    changeEnabledAnotherUserStatus(status) {
      this.enableAnotherUser = status;
    },
    openModalCategory(params) {
      if (params === 'edit') {
        this.editModalCreate = true;
        this.showAllCategories = false;
        this.form.name = '';
      } else {
        this.editModalCreate = false;
        this.showAllCategories = true;
      }
      this.$nextTick(() => {
        this.$bvModal.show('modal-create');
      });

    },
    changeActive(val) {
      this.active = val;
      // if (val === 0) this.form.price = ''
    },
    deleteItemDtModal(id) {
      this.showAddPhoto = true;
      this.deleteIndex = id;
      this.deleteItemDt();
      // this.$root.$emit('bv::show::modal', 'modal-delete')
    },
    changePrice(val) {
      this.form.price = val;
      if (this.active === 0) this.priceError = val.length < 1;
    },
    changeDesc(val) {
      this.form.description = val;
      this.$v.form.description.$touch();
    },
    changeCategory({ category, breadcrumbs }) {
      this.breadcrumbs = breadcrumbs;
      this.category = category;
      this.$nextTick(() => {
        this.$root.$emit('bv::hide::modal', 'modal-create');
        this.$root.$emit('bv::show::modal', 'modal-create3');
      });

    },
    openThanks() {
      this.$root.$emit('bv::show::modal', 'modal-thank');
    },
    nextStep() {
      if (process.client && this.dt.files.length === 0 && localStorage.getItem('withoutPhoto')) {
        this.step = 2;
      } else {
        this.$root.$emit('bv::show::modal', 'modal-question');
      }
    },
    showNext() {
      this.changePrice(this.form.price);

      const formValidation = this.$v.form;
      const userValidation = this.$v.anotherUser;

      formValidation.$touch();
      userValidation.$touch();

      if (!userValidation.$error && !formValidation.$error && !this.priceError) {
        if (this.form.id) this.$root.$emit('bv::show::modal', 'modal-create3');
        else this.$root.$emit('bv::show::modal', 'modal-create');
      }
    },
    addProduct(formModal) {
      if (!this.loading || !this.loadingDraft) {
        let form = cloneDeep(formModal);
        if (!form.link) form.link = '';
        if (form.contacts !== 2) {
          form.contact_phone_numeric = parsePhoneNumber(formModal.contact_phone).number.substring(1);
          form.contact_phone = form.contact_phone.substring(1);
        } else {
          form = omit(form, ['contact_phone']);
          this.form = omit(this.form, ['contact_phone']);
        }

        this.loading = formModal.status === 0;
        this.loadingDraft = formModal.status === 5;
        const data = {
          ...this.form,
          price_policy: this.nav[this.active].status,
          category_id: this.category.id,
          type: 0,
          ...form,
        };
        if (+data.price_policy === 1) {
          data.price = data.price * 1;
        } else {
          data.price = 0;
        }

        //

        const formData = new FormData(this.$refs['send-form']);

        const repository = filterController.getRepository('selection');
        const formattedData = { formatted_filters: repository?.formatted || [] };
        const formattedFormData = serialize(formattedData, { indices: true }); // allowEmptyArrays: true

        for (var pair of formattedFormData.entries()) {
          formData.append(pair[0], pair[1]);
        }

        if (this.anotherUserPermission) {
          const image = this.anotherUser?.image;
          const name = this.anotherUser?.name || '';
          const secondName = this.anotherUser?.secondName || '';
          const isFake = this.enableAnotherUser === true ? 1 : 0;

          formData.append('is_fake', isFake);
          formData.append('fake_data[first_name]', name);
          formData.append('fake_data[last_name]', secondName);

          if (image) formData.append('file', this.anotherUser.image);
        }

        for (const [key, value] of Object.entries(data)) {
          if (typeof value === 'object') {
            if (key === 'answers') {
              const answersData = { answers: value };
              const answersFormData = serialize(answersData, { indices: true });
              for (var pair of answersFormData.entries()) {
                formData.append(pair[0], pair[1]);
              }
            } else {
              for (let i = 0; i < value.length; i++) {
                formData.append(`${key}[]`, value[i]);
              }
            }
          } else {
            if (key === 'contact_phone' && form.contacts !== 2) {
              formData.append(key, value);
            } else {
              formData.append(key, value);
            }
          }
        }

        this.allFiles.map((item, index) => {
          if (item.id) formData.append(`pictures[${index}][media_id]`, item.id);
          else {
            let element = this.dataURLtoFile(item.file, item.name);
            formData.append(`pictures[${index}][file]`, element, item.name);
          }

          formData.append(`pictures[${index}][order]`, item.order_column);
        });

        const slug = this.$route.params.product;
        let api = '/products';
        if (slug) {
          formData.append(`_method`, 'put');
          api += `/${slug}`;
        }
        this.errorArray = null;
        this.$axios.$post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            this.product = res;
            if (!this.$route.params.product && formModal.status !== 5) {
              this.$root.$emit('bv::show::modal', 'modal-tariffs');
            } else {
              this.openThanks();
            }
            // this.$root.$emit('bv::show::modal', 'modal-tariffs')
            this.$root.$emit('bv::hide::modal', 'modal-create3');
          })
          .catch((error) => {
            if (this.$axios.isCancel(error)) return;
            const { response: { data: { errors } } } = error;
            if (errors) {
              this.errorArray = errors;
            } else {
              this.errorArray = ['Unknown error occured'];
            }
            // this.$root.$emit('bv::show::modal', 'modal-error')
          })
          .finally(() => {
            this.loading = false;
            this.loadingDraft = false;
          });
      }
    },
    dataURLtoFile(dataurl, filename) {

      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    }
  },


};
</script>

<style lang="scss">
.create-ad {
  position: relative;
  height: 100%;
  padding-top: 50rem;

  @include small-tablet {
    padding-bottom: 53rem;
  }

  @include large-mobile {
    padding-top: 38rem;
    padding-bottom: 0;
  }

  &__step {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    animation: fadeIn .3s ease-in-out;

    &:not(.isActive) {
      display: none;
    }
  }

  &__inner {
    max-width: 872rem;
    width: 100%;
    margin: 0 auto;
    flex: 1 1 auto;
  }

  &__bottom {
    width: 100%;
    margin-top: 40rem;
    padding: 20rem 0;
    position: sticky;
    z-index: 100;
    bottom: 0;
    background: #fff;
    background: linear-gradient(to top, #fff 0%, #fff 66%, rgba(#fff, 0) 100%);
    @include large-mobile {
      background: #fff;
    }

    &-btn {
      min-width: 160rem;

      &:not(:last-child) {
        margin-right: 15rem;
      }
    }

    @include large-mobile {
      margin-left: -15rem;
      width: calc(100% + 30rem);
      padding: 10rem 15rem;
      border-top: 1px solid $light-gray;
      margin-top: 30rem;
      &-btn {
        min-width: 86rem;
        padding: 0 20rem;
        height: 40rem;

        &:not(:last-child) {
          margin-right: 5rem;
        }

        &_create {
          min-width: 120rem;
        }
      }
    }
  }

  &__add-photo {
    margin-top: 40rem;

    @include large-mobile {
      margin-top: 30rem;
    }
  }

  &__title {
    text-align: center;

    @include large-mobile {
      font-size: 24rem;
    }
  }

  &__desc {
    margin-top: 15rem;

    &-skip {
      min-width: 90rem;
      margin: 0 10rem;
    }

    @include large-mobile {
      &-skip {
        margin: 0 5rem;
        min-width: inherit;
        height: auto;
        font-size: 14rem;
        color: $gray;
        padding: 0;
        background: none !important;
      }
    }
  }

  &__form {
    @include large-mobile {
      margin-top: -18rem;
    }
  }

  &__field {
    &:not(:first-child) {
      margin-top: 28rem;
    }
  }

  &__label {
    display: block;
    margin-bottom: 14rem;
    font-family: 'Gilroy';
    font-weight: 600;

    @include large-mobile {
      margin-bottom: 10rem;
    }
  }

  &__tabs {
    position: relative;
    margin-top: 53rem;

    &-list {
      margin-top: 25rem;
    }

    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__tab {
    display: none;

    &.isActive {
      display: block;
      animation: fadeIn .3s ease-in-out;
    }
  }

  &__switch {
    position: absolute;
    right: 0;
    top: 0;

    @include large-mobile {
      position: static;
      margin-top: 15rem;
    }
  }

  &__gallery {
    margin-top: 17rem;
  }
}
</style>

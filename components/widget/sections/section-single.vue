<template>
  <section
    class="section-single"
    v-if="DETAIL"
  >
    <div class="wrap">
      <client-only>
        <part-search-category
          class="section-single__form"
          v-if="$screen.st"
          @search="searchProducts"
        />
      </client-only>
      <div class="section-single__row flex flex_justify">
        <div class="section-single__column section-single__column_content">
          <part-single-gallery
            class="section-single__gallery"
            :TestImages="$galleryListNew(DETAIL.gallery, DETAIL.link)"
            openImages></part-single-gallery>

          <client-only>
            <part-breadcrumbs
              class="section-single__breadcrumbs section-single__breadcrumbs-desktop"
              v-if="DETAIL.category"
              :category="DETAIL.category"
            />
          </client-only>
          <div class="section-single__breadcrumbs-mobile">
            <client-only>
              <part-breadcrumbs
                class="section-single__breadcrumbs"
                v-if="DETAIL.category"
                :category="DETAIL.category"
              />
            </client-only>
          </div>
          <hr class="section-single__divider"
              v-if="DETAIL.category" />
          <part-single-content
            class="section-single__part"
            :title="PAGE_PRODUCT_DETAILS.overview"
            v-if="filters.length"
          >
            <template #content>
              <part-single-print-answers :answers="filters" />
            </template>
          </part-single-content>

          <part-single-content
            class="section-single__part"
            :description="DETAIL.description"
            :content="PAGE_PRODUCT_DETAILS"
            :category="DETAIL.category"
          />
          <part-single-map
            class="section-single__part section-single__part_map"
            :addr="address"
            :city="city"
            :coordinates="{ latitude: DETAIL.latitude ?? DETAIL.city?.latitude, longitude: DETAIL.longitude ?? DETAIL.city?.longitude }"
            :hideAddress="!!DETAIL.hide_address"
            openAtStartup
          />
          <client-only>
            <div
              class="section-single__part section-single__part_user"
              v-if="!$screen.lt"
            >
              <module-user-info
                :id='DETAIL.author.id'
                :fake='fakeData'
                :avatar="DETAIL.author.avatar"
                :content="`<strong>${DETAIL.author.phone ? 'Phone /' : ''}  ${DETAIL.author.email ? 'Еmail confirmed' : ''}</strong>`"
                :name="DETAIL.author.full_name"
                :about="getRegistred"
                :verified="DETAIL.author.verified_at !== null"
                :rating_reviews='DETAIL.author.rating_reviews'
                :advertise-id="DETAIL.id"
              />
              <button-border
                class="section-single__other"
                icon="usersAdds"
                @click.native="showUserModal">{{ PAGE_PRODUCT_DETAILS.openModalBtn }}
              </button-border>
            </div>
          </client-only>
          <part-single-recommend
            class="section-single__part"
            :recommendTitle="PAGE_PRODUCT_DETAILS.recommend"
            :moreText="PAGE_PRODUCT_DETAILS.showMoreProduct"
            v-if="recomend.length > 0"
            :products="recomend"
            @more="moreProducts"
            :showMore="LAST_PAGE_RECOMEND > CURRENT_PAGE_RECOMEND"
          />
        </div>
        <div
          class="section-single__column section-single__column_sidebar"
          v-if="DETAIL"
        >
          <part-single-sidebar
            class="section-single__info"
            v-if="DETAIL"
            :id="DETAIL.id"
            :title="DETAIL.name"
            :cost="cost"
            :user="DETAIL.author"
            :fake="fakeData"
            :info="DETAIL"
            :contacts="DETAIL.contacts"
            :phoneNumber="DETAIL.contact_phone"
            :products="USER_PRODUCT.active.length + USER_PRODUCT.noActive.length || 0"
          />
        </div>
      </div>
    </div>
    <modal-users-adds :userId="DETAIL.author.id" />
    <modal-users-fake-adds :product="DETAIL" />
  </section>
</template>

<script>
import { numberWithSpaces } from "~/assets/js/functions";
import { mapActions, mapGetters } from "vuex";
import fakeService from "~/core/services/fakeService";
import moment from "moment";

export default {
  data() {
    return {
      numberWithSpaces,
    };
  },
  computed: {
    ...mapGetters({
      DETAIL: "product/DETAIL",
      RECOMEND: "product/RECOMEND",
      LAST_PAGE_RECOMEND: "product/LAST_PAGE_RECOMEND",
      CURRENT_PAGE_RECOMEND: "product/CURRENT_PAGE_RECOMEND",
      USER_PRODUCT: "product/USER_PRODUCT",
      DETAIL_ACTIVE: "product/DETAIL_ACTIVE",
      PAGE_PRODUCT_DETAILS: "pages/PAGE_PRODUCT_DETAILS",
    }),
    cost() {
      if (this.DETAIL.price_policy === 1)
        return `$ ${this.numberWithSpaces(this.DETAIL.price)}`;
      if (this.DETAIL.price_policy === 2) return "Exchange";
      return "Free";
    },
    recomend() {
      if (this.RECOMEND.length === 0) return [];

      if (!this.DETAIL || this.DETAIL.id === "undefined") {
        return [];
      }

      return this.RECOMEND.filter((ad) => ad.id !== this.DETAIL.id);
    },
    fakeData() {
      const data = fakeService.getFaked(this.DETAIL);
      return data;
    },
    getRegistred() {
      const text = fakeService.getRegistred({
        fake: this.fakeData,
        created_at: this.DETAIL?.author?.created_at,
        registered: this.PAGE_PRODUCT_DETAILS?.registered,
        getDate: this.getDate,
      });
      return text;
    },
    city() {
      if (!this.DETAIL?.city) return "";
      let city = this.DETAIL?.city?.name;
      if (this.DETAIL?.city?.state_code) {
        city += `, ${this.DETAIL?.city?.state_code}`;
      }
      return city;
    },
    address() {
      if (!this.DETAIL.hide_address) return this.DETAIL.address;
      return "";
    },

    filters() {
      return this?.DETAIL?.formatted_filters || [];
    }
  },
  methods: {
    ...mapActions({
      SET_MORE_RECOMEND: "product/SET_MORE_RECOMEND",
    }),
    async moreProducts() {
      await this.SET_MORE_RECOMEND(this.DETAIL.category.id);
    },
    searchProducts(filter) {
      this.$router.push({
        path: this.$locationPath("/catalog"),
        query: { ...filter },
      });
    },
    getDate(date) {
      if (!date) return "";
      return moment(date).utc().format("MMMM yyyy");
    },
    showUserModal() {
      const modalName = this.fakeData?.isFake
        ? "fake-users-adds"
        : "users-adds";
      this.$bvModal.show(modalName);
    },
  },
};
</script>

<style lang="scss">
.section-single {
  padding-bottom: 50rem;

  @include large-mobile {
    padding-bottom: 10rem;
  }

  &__divider {
    width: 100%;
    border-radius: 1rem;
    height: 1rem;
    border: none;
    background-color: #d2d2d7;
    margin-top: 40rem;
  }

  &__form {
    margin-bottom: 40rem;

    @include large-mobile {
      display: none !important;
    }
  }

  &__user {
    margin-bottom: 30rem;

    @include large-mobile {
      margin-bottom: 18rem;
    }
  }

  &__gallery {
    margin-bottom: 70rem;

    @include small-tablet {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
  }

  &__breadcrumbs {
    margin-bottom: 30rem;

    & + .section-single__divider {
      margin-top: 20rem;
    }

    &-desktop {
      display: block;
      @include large-mobile {
        display: none;
      }
    }

    &-mobile {
      display: none;
      @include large-mobile {
        display: block;
      }

      & + .single-content__heading {
        margin-top: 30rem;
      }
    }
  }

  &__info {
    position: sticky;
    top: 110rem;
    @include small-tablet {
      position: relative;
      top: 0;
      margin-top: 59.973545%;

      border-bottom: 1px solid #d2d2d7 !important;
      margin-bottom: 50rem;
    }

    @include large-mobile {
      padding-top: 20rem !important;
      padding-bottom: 10rem !important;
      margin-bottom: 30rem;
      margin-top: div(250, 345) * 100%;
    }

    // max-height: calc(100vh - 40rem);
  }

  &__column {
    &_content {
      width: div(1001, 1400) * 100%;
      padding-right: 20rem;
    }

    &_sidebar {
      width: div(399, 1400) * 100%;
      padding-bottom: 50rem;
    }

    @include small-tablet {
      width: 100%;
      padding-right: 0;
      padding-bottom: 0;
    }
  }

  &__row {
    @include small-tablet {
      position: relative;
      flex-direction: column-reverse;
    }
  }

  &__part {
    margin-top: 35rem;
    padding-bottom: 35rem;

    &_hide-top {
      padding-bottom: 0 !important;
    }

    &:not(:last-child) {
      margin-bottom: 35rem;
      border-bottom: 1px solid #d2d2d7;
    }

    @include small-tablet {
      &_hide-top {
        margin-top: 0;
      }
      &_map {
        &:not(:last-child) {
          border-bottom: none;
          padding-bottom: 0;
        }
      }
    }

    @include large-mobile {
      padding-bottom: 40rem;
      &:not(:last-child) {
        margin-bottom: 40rem;
      }

      &_map {
        &:not(:last-child) {
          margin-bottom: 30rem;
        }
      }

      &_user {
        &:not(:last-child) {
          margin-bottom: 50rem;
          padding-bottom: 0;
          border-bottom: none;
        }
      }
    }
  }
}
</style>

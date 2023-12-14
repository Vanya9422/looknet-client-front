<template lang="pug">
  .single-sidebar
    button-action.single-sidebar__favorite(
      v-if="info",
      :blue="isFavorite",
      @click.native.prevent="addFavorite(info.id, info.slug)",
      gray,
      :key="DETAIL_ACTIVE"
    )

    h2.single-sidebar__title.h2.text-wrap {{ title }}
    .flex.flex_vertical
      .single-sidebar__price.h2 {{ cost }}
      span.single-sidebar__price-span.color-gray(
        v-if="info.available_cost === 1"
      ) {{ PAGE_PRODUCT_DETAILS.available_cost || "Available cost" }}
    .flex-1
      //span {{PAGE_PRODUCT_DETAILS.contacts}}
    template(v-if="contacts !== 2")
      button-primary.single-sidebar__button.single-sidebar__button_number(
        blue,
        v-if="phone"
      )
        span.phone {{ `+${phoneNumber}` }}
      button-primary.single-sidebar__button.single-sidebar__button_number(
        icon="phone",
        blue,
        v-else,
        @click.native="showPhone"
      ) {{ PAGE_PRODUCT_DETAILS.show.number }}
    button-primary.single-sidebar__button.single-sidebar__button_message(
      v-if="contacts !== 1 && showMessage",
      @click.native.prevent="addConversation",
      icon="chatting",
      light
    ) {{ PAGE_PRODUCT_DETAILS.message }}
    client-only
      module-user-info.single-sidebar__user(
        v-if="showAvatarMobile"
        :id="user.id"
        :fake='fake'
        :avatar="user.avatar",
        :name="user.full_name",
        :content="`<strong>${user.phone ? 'Phone /' : ''}  ${user.email ? 'Еmail confirmed' : ''}</strong>`",
        :about="getRegistred",
        :verified="user.verified_at !== null",
        :rating_reviews="user.rating_reviews"
        :advertise-id="id"
      )
      module-user-info.single-sidebar__user(
        v-else-if="$screen.lt"
        :id="user.id"
        :fake='fake'
        :avatar="user.avatar",
        :name="user.full_name",
        :content="`<strong>${user.phone ? 'Phone /' : ''}  ${user.email ? 'Еmail confirmed' : ''}</strong>`",
        :about="getRegistred",
        :verified="user.verified_at !== null",
        :rating_reviews="user.rating_reviews"
        :advertise-id="id"
      )
      button-primary.single-sidebar__more(
        v-if="moreDetails",
        @click.prevent.native="showMore",
        gray,
        icon="info"
      ) {{ PAGE_PRODUCT_DETAILS.show.more }}
      div(v-else)
        button-border.single-sidebar__other(
          icon="usersAdds",
          v-if="$screen.lt",
          @click.native="showUserModal"
        )
          | {{ fake.isFake && fake.isFake === 1 ? fakeProductDetails[locale] || PAGE_PRODUCT_DETAILS.openModalBtn : PAGE_PRODUCT_DETAILS.openModalBtn }}

    .single-sidebar__bottom.flex
      .single-sidebar__label.single-sidebar__label_date.color-gray {{ formatDistance(new Date(info.created_at), new Date(), { addSuffix: true }) }}
      .single-sidebar__label.single-sidebar__label_id.color-gray {{ PAGE_PRODUCT_DETAILS.id }} {{ info.id }}
      module-single-views.single-sidebar__views {{ info.show_details }}
</template>

<script>
import { numberWithSpaces } from "~/assets/js/functions";
import favorite from "@/mixins/favorite";
import { formatDistance } from "date-fns";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import fakeService from "~/core/services/fakeService";

export default {
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    cost: {
      type: [Number, String],
    },
    products: {
      type: Number,
    },
    contacts: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: String,
      default: "+ 1 376 266 5353",
    },
    showAvatarMobile: {
      type: Boolean,
      default: false,
    },

    moreDetails: {
      type: Boolean,
      default: false,
    },

    user: {
      type: Object,
      default: () => ({}),
    },

    info: {
      type: Object,
      default: () => ({}),
    },

    fake: {
      type: Object,
      default: null,
    },
  },
  mixins: [favorite],

  data() {
    return {
      phone: false,
      numberWithSpaces,
      formatDistance,
      locale: this.$i18n.locale,
      fakeProductDetails: {
        en: "1 User Ads",
      }
    };
  },
  computed: {
    ...mapGetters({
      PAGE_PRODUCT_DETAILS: "pages/PAGE_PRODUCT_DETAILS",
    }),
    showMessage() {
      if (this.$auth.loggedIn) {
        return this.$auth.user.id !== this.user.id;
      } else {
        return true;
      }
    },
    getRegistred() {
      const text = fakeService.getRegistred({
        fake: this.fake,
        created_at: this.user?.created_at,
        registered: this.PAGE_PRODUCT_DETAILS?.registered,
        getDate: this.getDate,
      });
      return text;
    },
  },
  methods: {
    ...mapActions({
      ADD_CONVERSATION: "chat/ADD_CONVERSATION",
      GET_CHAT_USERS_LIST: "chat/GET_CHAT_USERS_LIST",
    }),
    showUserModal() {
      const modalName = this.fake?.isFake ? "fake-users-adds" : "users-adds";
      this.$bvModal.show(modalName);
    },
    getDate(date) {
      if (!date) return "";
      return moment(date).utc().format("MMMM yyyy");
    },
    addConversation() {
      if (this.$auth.loggedIn) {
        this.ADD_CONVERSATION({
          participant_id: this.user.id,
          advertise_id: this.id,
        });
        if (!this.$screen.lt) {
          this.GET_CHAT_USERS_LIST({ query: "buying" });
        }
      } else {
        this.$bvModal.show(`modal-login`);
        if (process.client) {
          localStorage.setItem(
            "send_message",
            JSON.stringify({
              participant_id: this.user.id,
              advertise_id: this.id,
            })
          );
        }
      }
    },
    showPhone() {
      this.phone = true;
      this.$axios
        .$post(`${this.$api.user.statistics}${this.info.slug}/phone-view`)
        .then((res) => console.log(res));
    },
    showMore() {
      this.$router.push(this.$locationPath("/product/" + this.info.slug));
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.flex-1 {
  flex: 1;
}

.single-sidebar {
  padding: 30rem 30rem 15rem;
  border: 1px solid $light-gray;
  border-radius: 20rem;

  .button-primary {
    @include min-large-desktop {
      height: 70rem;
    }
    @include large-mobile {
      height: 60rem;
    }
  }

  .single-sidebar__favorite {
    right: 10rem;
    top: 10rem;
    @include large-mobile {
      top: 15rem;
      right: -5rem;
    }
  }

  @include large-tablet {
    padding: 20rem 20rem 10rem;
  }

  @include small-tablet {
    padding: 40rem 0;
    border: none;
    border-radius: 0;
  }

  &__bottom {
    margin-top: 26rem;

    @include large-desktop {
      margin-top: 25rem;
    }

    @include small-tablet {
      align-items: flex-start;
    }

    @include large-mobile {
      margin-top: 10rem;
    }
  }

  &__favorite {
    position: absolute;
    right: 10rem;
    top: 10rem;

    @include large-mobile {
      top: 15rem;
      right: -8rem;
    }
  }

  &__views {
    margin-left: auto;
    margin-bottom: 15rem;
    @include large-tablet {
      margin-bottom: 10rem;
    }
  }

  &__label {
    font-weight: 600;
    margin-right: 30rem;
    margin-bottom: 15rem;

    @include large-tablet {
      margin-right: 15rem;
      margin-bottom: 10rem;
    }

    @include small-tablet {
      margin-right: 30rem;
    }

    @include large-mobile {
      font-size: 14rem;
      line-height: 1em;
    }
  }

  &__title {
    margin-bottom: 20rem;
    padding-right: 80rem;

    @include large-desktop {
      padding-right: 20rem;
      margin-bottom: 20rem;
    }

    @include large-mobile {
      padding-right: 100rem;
      margin-bottom: 10rem;
    }
  }

  &__user {
    margin-top: 62rem;

    @include large-desktop {
      margin-top: 25rem;
    }
  }

  &__price {
    color: $blue;
    margin-bottom: 30rem;
    @include large-desktop {
      margin-bottom: 20rem;
    }

    @include large-mobile {
      line-height: 1em;
    }

    &-span {
      font-weight: 500;
      letter-spacing: 0;
      margin-left: 15rem;
      margin-bottom: 30rem;
      @include large-desktop {
        margin-bottom: 20rem;
        font-size: 12rem;
        margin-left: 8rem;
      }

      @include large-mobile {
        line-height: 1em;
      }
    }
  }

  &__other {
    margin-top: 10rem;
  }

  &__button {
    width: 100%;
    margin-bottom: 10rem;

    @include large-mobile {
      height: 60rem;
    }
  }

  &__more {
    width: 100%;
  }
}
</style>

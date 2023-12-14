<template lang="pug">
.user-info(:class="Mods")
  .user-info__content
    .user-info__avatar(@click="$emit('change-avatar-icon')")
      .user-info__avatar-img
        set-img(
          img-class="object-fit",
          :src="userInformation.image",
          :default-img="require('~/assets/img/user.jpg')"
          small
        )
      slot

      .user-info__edit(v-if="edit", v-b-modal.modal-avatar)
        svg-icon(name="edit")
    .user-info__data
      .user-info__name.h5(v-if="userInformation && userInformation.name")
        | {{ userInformation.name }}
        template(v-if="verified")
          client-only
            part-verified.user-info__verified(:content="content")
      part-stars-rating.user-info__part-stars-rating(
        v-if='rating_reviews.isSimple'
        v-model='isModalReviewsShown'
        :average-rating='rating_reviews.average_rating'
        :review-count='rating_reviews.review_count'
        :is-simple='rating_reviews.isSimple'
        @setModalReviewsState='handleModelReviewsStateChange'
      )
      //.user-info__about.color-gray(v-b-modal.modal-location) {{LOCATION ? LOCATION.state_minimal_select.name + ', '+ LOCATION.name :  POPUP_LOCAL.title }}
      .user-info__about.color-gray(v-if="!isLocation") {{ about }}
      .user-info__about.color-gray(v-else, v-b-modal.modal-location) {{ locationText }}
      .user-info__confimed(v-if="vertical")
        .user-info__confimed-icon
          img(src="~/assets/img/verified.svg")
        .user-info__confimed-text(v-html="content")
  client-only
    part-stars-rating.user-info__part-stars-rating(
      v-if='!rating_reviews.isHidden && (!rating_reviews.isSimple || (rating_reviews.isSimple && !this.$screen.st))'
      v-model='isModalReviewsShown'
      :average-rating='rating_reviews.average_rating'
      :review-count='rating_reviews.review_count'
      @setModalReviewsState='handleModelReviewsStateChange'
      is-btn
    )
  client-only
    modal-reviews(
			v-if='!rating_reviews.isHidden'
      v-model='isModalReviewsShown'
      :advertise-id="advertiseId"
      :user='{ id: userInformation.id, avatar: userInformation.image, name: userInformation.name, content: content, about: about, verified: verified, rating_reviews: rating_reviews, fake: fake }'
      @setModalReviewsState='handleModelReviewsStateChange'
    )
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isModalReviewsShown: false,
    };
  },

  props: {
    id: {
      type: [Number, Boolean],
      default: null,
    },
    avatar: {
      type: [Object, String],
    },
    name: {
      type: String,
    },
    about: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    isLocation: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
    },
    big: {
      type: Boolean,
    },
    edit: {
      type: Boolean,
    },
    content: {
      type: String,
      default: "<strong>Phone / Еmail confirmed</strong>",
    },
    user: {
      type: Object,
      default: () => {},
    },
    fake: {
      type: Object,
      default: null,
    },
    rating_reviews: {
      type: [Object, Boolean],
      default: false,
    },
    advertiseId: {
      type: [Number, Boolean],
      default: null,
    },
  },
  computed: {
    userInformation() {
      const data = {
        id: this?.id || this?.user?.id,
        name: this.fake?.isFake ? this.fake?.fakeName : this.name,
        image: this.fake?.isFake ? this.fake?.image : this.avatar,
      };
      return data;
    },
    Mods() {
      return {
        "user-info_vertical": this.vertical,
        "user-info_big": this.big,
      };
    },
    ...mapGetters({
      POPUP_LOCAL: "popup/POPUP_LOCAL",
      LOCATION: "location/LOCATION",
      PAGE_HOME: "pages/PAGE_HOME",
    }),
    locationText() {
      let text = this.POPUP_LOCAL.title;
      if (this.LOCATION) {
        if (this.LOCATION.id === "c1") {
          text = this.PAGE_HOME.search.city;
        } else {
          text = `${this.LOCATION.name}`;
          if (this.LOCATION.state_minimal_select) {
            text += `, ${this.LOCATION.state_minimal_select.name}`;
          }
        }
      }
      return text;
    },
  },

  methods: {
    handleModelReviewsStateChange(modalReviewsState) {
      this.isModalReviewsShown = modalReviewsState;
    },
  },
};
</script>

<style lang="scss">
.user-info {
  margin-bottom: 10px;

  @include large-mobile {
    margin-bottom: 8px;
  }

  @include min-large-mobile {
    &_vertical {
      .user-info {
        &__verified {
          display: none;
        }

        &__data {
          display: flex;
          align-items: center;
        }

        &__about {
          margin-top: 0;
          margin-left: 20rem;
        }
      }
    }
  }

  &_big {
    .user-info {
      &__content {
        text-align: center;
        display: block;
        @include large-tablet {
          display: flex;
        }
      }

      &__avatar {
        width: 165rem;
        margin: 0 auto 0 auto;
      }

      &__data {
        margin-top: 32rem;
        width: auto;
        max-width: unset;
      }

      &__name {
        font-size: 26rem;
      }

      &__about {
        font-size: 18rem;
        line-height: 1.5;
        color: rgba(6, 36, 57, 0.5);
        margin-top: 10rem;
        @include large-tablet {
          text-align: left;
        }
      }
    }

    @include large-tablet {
      text-align: left;
      display: flex;
      margin: 0;

      .user-info {
        &__avatar {
          width: 120rem;
        }

        &__data {
          margin-left: 20rem;
          margin-top: 0;
        }
      }
    }

    @include large-mobile {
      .user-info {
        &__avatar {
          width: 63rem;
        }

        &__name {
          font-size: 20rem;
        }

        &__about {
          margin-top: 5rem;
          font-size: 14rem;
          line-height: 1;
        }
      }
    }
  }

  &__content {
    display: flex;
    align-items: center;
  }

  &__edit {
    width: 38rem;
    height: 38rem;
    border-radius: 100%;
    background: $blue;
    position: absolute;
    right: 11rem;
    bottom: -6rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
      fill: #fff;
      width: 16rem;
      height: 16rem;
    }

    @include large-mobile {
      width: 24rem;
      height: 24rem;
      right: -2rem;
      bottom: 0;

      svg {
        width: 10rem;
        height: 10rem;
      }
    }
  }

  &__avatar {
    flex: 0 0 auto;
    width: 38rem;
    margin-right: 10rem;
    position: relative;

    &:before {
      padding-top: 100%;
      content: "";
      display: block;
    }

    img {
      border-radius: 50%;
    }
  }

  &__name {
    max-width: 200px;
    @extend %text-overflow;
  }

  &__about {
    // margin-top: 10rem;
    font-weight: 500;
    margin-top: 5rem;

    // line-height: 1em;

    // @extend %text-overflow;

    @include large-mobile {
      font-size: 14rem;
      line-height: 1em;
      margin-top: 6rem;
    }
  }

  &__verified {
    margin-left: 3rem;

    @include large-mobile {
      margin-left: 11rem;
    }
  }

  &__data {
    flex: 1 1 auto;
  }

  &__confimed {
    display: flex;
    align-items: center;
    margin-left: 20rem;

    &-icon {
      width: 12rem;
      height: 12rem;
      margin-right: 10rem;
    }

    @include large-mobile {
      display: none;
    }
  }

  &__part-stars-rating {
    &:not(.part-stars-rating_simple) {
      margin-top: 14rem;
    }

    &.part-stars-rating_simple {
      margin-left: 34rem;
    }
  }

  @include large-mobile {
    &__content {
      justify-content: center;
    }

    &__data {
      flex-grow: 0;
      flex-basis: auto;
    }
  }
}
</style>

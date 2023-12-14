<template lang="pug">
  section.item-review
    header.item-review__header.flex.flex_nowrap.flex_start
      .item-review__person.flex._nowrap._start
        .item-review__person-avatar()
          set-img(
            img-class="object-fit",
            :src="reviewContent.author.avatar",
            :default-img="require('~/assets/img/user.jpg')"
            small
          )
        .item-review__person-content
          h5.item-review__person-name.h5(v-if='reviewContent.author')
            | {{ reviewContent.author.full_name }}
          .item-review__person-row.flex
            module-stars.item-review__person-rating(
              v-if='reviewContent.star'
              :score="reviewContent.star"
            )
            .item-review__person-status.h6.color-gray.flex(v-if='reviewContent.translated_status && reviewContent.product && reviewContent.product.name')
              span {{ reviewContent.translated_status }}
              span {{ reviewContent.product.name }}
      client-only(v-if='showComplaintButton')
        tippy(
          ref='itemReviewTooltip'
          :animate-fill="false"
          :interactive="true"
          distant="0"
          theme="light"
          animation="fade"
          trigger="click"
          arrow
          placement="bottom-end"
          appendTo='parent'
        )
          template(v-slot:trigger)
            button.item-review__more-trigger
              svg-icon(name='dots')
          button.item-review__more-button(
            @click='handleButtonMoreComplaint'
          )
            | {{ content.tooltipButton }}
    .item-review__content
      .item-review__text.h6(v-if='reviewContent.comment')
        | {{ reviewContent.comment }}
      .item-review__attachments.flex(v-if='reviewContent.has_image')
        .item-review__attachments-item(v-for='(photo, photoIndex) in reviewContent.pictures' :key='photoIndex')
          set-img(
            img-class="object-fit",
            :src="photo",
            :default-img="require('~/assets/img/user.jpg')"
            small
          )
        //img.object-fit(:src="photo.original_full_url" :alt='photo.name')
    footer.item-review__footer
      time.item-review__time.flex.color-gray(v-if='createTime')
        span {{ createTime.date }}
        span {{ createTime.hours }}
</template>

<script>
import { format } from "date-fns";

export default {
  props: {
    reviewContent: {
      type: Object,
      default: () => ({}),
    },

    content: {
      type: Object,
      default: () => ({}),
    },

    showComplaintButton: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    createTime() {
      const createdAtDate = new Date(this.reviewContent.created_at);

      return {
        date: format(createdAtDate, "dd.MM.yyyy"),
        hours: format(createdAtDate, "hh.mm aaa"),
      };
    },
  },

  methods: {
    handleButtonMoreComplaint() {
      this.$emit("modalComplaintTriggered", this.reviewContent.id);
      this.$refs?.["itemReviewTooltip"]?.tip?.hide();
    },
  },
};
</script>

<style lang="scss">
.item-review {
  .tippy-popper[x-placement="bottom-end"] .tippy-tooltip .tippy-roundarrow {
    left: calc(100% - 29px) !important;
  }

  &__header {
    gap: 20rem;
  }

  &__person {
    flex: 1;
    min-width: 0;
    gap: 20rem;

    @include large-tablet() {
      gap: 15rem;
    }

    @include large-mobile() {
      gap: 10rem;
    }

    &-avatar {
      position: relative;
      flex: 0 0 auto;
      width: 38rem;
      height: 38rem;
      border-radius: 50%;
      overflow: hidden;
    }

    &-content {
      padding-top: 2rem;
      flex: 1;
      min-width: 0;
    }

    &-name {
      letter-spacing: -0.51px;
    }

    &-row {
      margin-top: 6rem;
      gap: 10rem 20rem;

      @include large-mobile() {
        flex-flow: column nowrap;
        align-items: flex-start;
      }
    }

    &-status {
      gap: 6rem 12rem;
      letter-spacing: -0.16px;
      line-height: 1;

      @include large-mobile() {
        font-size: 16rem;
        flex-flow: column nowrap;
        align-items: flex-start;
      }
    }
  }

  &__more {
    &-trigger {
      flex: 0 0 auto;
      fill: #000;

      svg {
        width: 16rem;
        height: 16rem;
      }
    }

    &-button {
      transition-property: color;
      transition-duration: 0.2s;

      &:hover {
        color: $blue;
      }
    }

    &-trigger,
    &-button {
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  }

  &__content {
    width: 100%;
    max-width: calc(100% - 58rem);
    margin: 14rem 0 0 auto;

    @include large-mobile() {
      margin-top: 16rem;
      max-width: calc(100% - 48rem);
    }
  }

  &__text {
    line-height: 1.1;
    letter-spacing: -0.16px;
    margin-bottom: 0;

    @include large-mobile() {
      font-size: 16rem;
    }
  }

  &__attachments {
    margin-top: 23rem;
    gap: 18rem;

    @include large-tablet() {
      gap: 14rem;
      margin-top: 18rem;
    }

    @include large-mobile() {
      gap: 10rem;
      margin-top: 16rem;
    }

    &-item {
      flex: 0 0 auto;
      position: relative;
      width: 73rem;
      overflow: hidden;
      border-radius: 10rem;

      &::before {
        content: "";
        padding-top: 83.56%;
        display: block;
      }

      @include large-tablet() {
        width: 65rem;
      }

      @include large-mobile() {
        width: 57rem;
      }
    }
  }

  &__footer {
    width: 100%;
    max-width: calc(100% - 58rem);
    margin: 14rem 0 0 auto;

    @include large-mobile() {
      max-width: calc(100% - 48rem);
    }
  }

  &__time {
    gap: 10rem 20rem;
    letter-spacing: -0.14px;

    @include large-mobile() {
      gap: 8rem 16rem;
    }
  }
}
</style>

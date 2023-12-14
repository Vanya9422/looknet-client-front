<template lang="pug">
.item-notification(:class="Mods", @click.prevent="$emit('detail')")
  .item-notification__row
    .item-notification__column.item-notification__column_left.flex
      .item-notification__cell.item-notification__cell_left
        .item-notification__title.h4.text-wrap(v-html="title") {{ title }}
      .item-notification__cell.item-notification__cell_right(@click.stop="")
        module-date.item-notification__date.hidden {{ getDate(date) }}
        .item-notification__desc.content.text-wrap(
          v-html="descMin",
          ref="desc",
          :class="Class"
        )
        button-link-arrow.item-notification__more(
          v-if="showMore",
          more,
          black,
          :showText="content.moreDetailed",
          :hideText="content.rollUp",
          :class="Class",
          @click.stop.native="toggleContent"
        )
    .item-notification__column.item-notification__column_right
      .item-notification__top.flex.flex_right.flex_start
        module-date.item-notification__date {{ getDate(date) }}
      .item-notification__bottom.flex.flex_right(@click.stop="")
        button-medium.item-notification__btn(
          gray,
          @click.native.prevent="$emit('delete')"
        ) {{ content.delete }}
        span.item-notification__btn.button-medium_blue.button-medium(
          @click.prevent="openLink(link)",
          v-if="link !== '' && btn !== ''"
        )
          span.button-medium__text {{ btn }}
</template>

<script>
import moment from "moment";

export default {
  props: {
    content: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: "",
    },
    btn: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    columns: {
      type: Boolean,
      default: false,
    },
    unread: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
      descMin: "",
      showMore: false,
    };
  },
  created() {
    // console.log(this.desc)
    this.getDesc();
  },
  computed: {
    Mods() {
      return {
        "item-notification_unread": this.unread,
      };
    },
    Class() {
      return {
        isActive: this.active,
      };
    },
  },
  watch: {
    active(val) {
      if (val === true) {
        this.descMin = this.desc;
      } else {
        this.getDesc();
      }
    },
  },
  methods: {
    getDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD.MM.yyyy");
    },
    openLink(link) {
      this.$emit("actions");
      if (process.client) {
        window.open(link, "_blank");
      }
    },
    getDesc() {
      let words = this.desc.split(" ");
      if (words.length > 40) {
        words = words.slice(0, 40);
        this.showMore = true;
      }
      this.descMin = words.join(" ");
    },
    toggleContent() {
      this.active = !this.active;
    },
  },
};
</script>

<style lang="scss">
.item-notification {
  padding-left: 52rem;
  position: relative;
  cursor: pointer;

  &_unread {
    .item-notification {
      &__title {
        color: $blue;

        &:before {
          content: "";
          display: block;
          position: absolute;
          left: -32rem;
          top: 9rem;
          width: 8rem;
          height: 8rem;
          border-radius: 5px;
          background: $blue;
        }
      }
    }
  }

  @include large-tablet {
    padding-left: 23rem;
    &_unread {
      .item-notification {
        &__title {
          &:before {
            left: -23rem;
          }
        }
      }
    }
  }

  &__row {
    display: flex;
    @include large-mobile {
      flex-wrap: wrap;
    }
  }

  &__column {
    &_left {
      width: 66.66%;
    }

    &_right {
      width: 33.33%;
      display: flex;
      flex-direction: column;
    }

    @include large-tablet {
      &_left {
        width: 75%;
      }
      &_right {
        width: 25%;
      }
    }

    @include large-mobile {
      width: 100%;
    }
  }

  &__top {
    flex: 1 1 auto;
    @include large-mobile {
      display: none;
    }
  }

  &__bottom {
    margin-top: 30rem;
    gap: 10px;
    .item-notification__btn:not(:last-child) {
      margin-bottom: 0;
      margin-right: 0;
    }
  }

  &__title {
    position: relative;

    @include large-mobile {
      font-size: 16rem;
      line-height: 1.2;
      width: calc(100% - 50rem);
    }
  }

  &__desc {
    font-size: 17rem;
    line-height: 1.3;
    color: $gray;
    max-width: 500rem;
    @include max-rows(17 * 1.3, 3);

    &.isActive {
      max-height: 100%;
      -webkit-line-clamp: inherit;
    }

    p {
      &:not(:first-child) {
        display: none;
      }
    }

    &.isActive {
      p {
        &:not(:first-child) {
          display: block;
          animation: fadeIn 0.3s ease-in-out;
        }
      }
    }

    &:not(:first-child) {
      margin-top: 15rem;
    }

    @include large-tablet {
      font-size: 14rem;
      @include max-rows(14 * 1.3, 2);
    }
  }

  &__date {
    &:not(:first-child) {
      margin-top: 25rem;
    }

    &.hidden {
      display: none;
    }

    @include large-mobile {
      &.hidden {
        display: inline-flex;
      }
    }
  }

  &__btn {
    min-width: 135rem;

    &:not(:last-child) {
      margin-right: 10rem;
    }

    @include large-tablet {
      &:not(:last-child) {
        margin-right: 0;
        margin-bottom: 10rem;
      }
    }
  }

  &__actions {
    position: absolute;
    right: 0;
    top: 30rem;
    display: none;
    @include large-mobile {
      display: inline-flex;
    }
  }

  &__dots.button-medium {
    position: absolute;
    right: -5rem;
    top: 22rem;
    display: none;
    @include large-mobile {
      display: inline-flex;
    }
  }

  &__cell {
    &_left {
      width: 39%;
      padding-right: 30rem;
    }

    &_right {
      width: 61%;
    }

    @include large-tablet {
      width: 100%;
      &_right {
        margin-top: 15rem;
      }
    }
  }

  &__more {
    margin-top: 20rem;

    @include large-mobile {
      margin-top: 15rem;
    }
  }
}
</style>

<template lang="pug">
.back-nav(:class="Mods")
  .back-nav__row.flex.flex_justify
    .back-nav__column.back-nav__column_left
      .back-nav__list.flex
        .back-nav__item(v-for="(item, i) in SIDEBAR_NAV")
          NuxtLink.back-nav__btn(
            :active-class="activeRouterClass",
            :class="{ isActive: number == i }",
            :to="$locationPath(item.to)",
            @click.native="changeTab(i, item.text)",
            v-if="item.to !== '' ? item.to : false"
          )
            | {{ PAGE_CHAT.nav[i].text }}
            span.back-nav__counter(v-if="item.counter") {{ item.counter }}
          .back-nav__btn(
            :class="{ isActive: number == i }",
            @click="$emit('change', i)",
            v-else
          )
            | {{ PAGE_CHAT.nav[i].text }}
            span.back-nav__counter(v-if="item.counter") {{ item.counter }}
    .back-nav__column.back-nav__column_right
      slot
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      number: 0,
    };
  },
  props: {
    nav: {
      type: Array,
      default: () => [],
    },
    blue: {
      type: Boolean,
      default: false,
    },
    mobile: {
      type: Boolean,
      default: false,
    },
    mobileBlue: {
      type: Boolean,
      default: false,
    },
    activeRouterClass: {
      type: String,
      default: "nuxt-link-active",
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      ACTIVE_CONVERSATION_ID: "chat/GET_ACTIVE_CONVERSATION_ID",
      CONVERSATION_PAGE: "chat/CONVERSATION_PAGE",
      CONVERSATION_MESSAGES_PAGE: "chat/CONVERSATION_MESSAGES_PAGE",
      CHAT_USERS_LIST: "chat/CHAT_USERS_LIST",
      SIDEBAR_NAV: "chat/SIDEBAR_NAV",
      PAGE_CHAT: "pages/PAGE_CHAT",
    }),
    conversationMessagesPage: {
      get() {
        return this.CONVERSATION_MESSAGES_PAGE;
      },
      set(val) {
        this.CHANGE_CONVERSATION_MESSAGES_PAGE(val);
      },
    },
    conversationPage: {
      get() {
        return this.CONVERSATION_PAGE;
      },
      set(val) {
        this.CHANGE_CONVERSATION_PAGE(val);
      },
    },
    Mods() {
      return {
        "back-nav_blue": this.blue,
        "back-nav_mobile": this.mobile,
        "back-nav_mobile-blue": this.mobileBlue,
      };
    },
  },
  methods: {
    ...mapActions({
      GET_CHAT_USERS_LIST: "chat/GET_CHAT_USERS_LIST",
      FETCH_CONVERSATION_MESSAGES: "chat/FETCH_MESSAGES",
    }),
    ...mapMutations({
      CHANGE_CONVERSATION_PAGE: "chat/CHANGE_CONVERSATION_PAGE",
      CHANGE_CONVERSATION_MESSAGES_PAGE:
        "chat/CHANGE_CONVERSATION_MESSAGES_PAGE",
      SET_CONVERSATION_LIST: "chat/SET_CONVERSATION_LIST",
      SET_CONVERSATION_MESSAGES: "chat/SET_CONVERSATION_MESSAGES",
      SET_ACTIVE_USER: "chat/SET_ACTIVE_USER",
      SET_ACTIVE_CONVERSATION_ID: "chat/SET_ACTIVE_CONVERSATION_ID",
      SET_SEARCH: "chat/SET_SEARCH",
      CHANGE_CHECKED_REMOVE_ALL: "chat/CHANGE_CHECKED_REMOVE_ALL",
      SET_SIDEBAR_SCROLL_IDENTIFIER: "chat/SET_SIDEBAR_SCROLL_IDENTIFIER",
    }),
    changeTab(i, tabName) {
      this.number = i;
      this.conversationPage = 1;
      this.conversationMessagesPage = 1;
      this.SET_ACTIVE_USER(null);
      this.SET_ACTIVE_CONVERSATION_ID();
      this.SET_CONVERSATION_LIST([]);
      this.SET_SIDEBAR_SCROLL_IDENTIFIER();
      this.SET_CONVERSATION_MESSAGES([]);
      this.CHANGE_CHECKED_REMOVE_ALL();
      this.SET_SEARCH("");
      this.$emit("clearSearch", Math.random());

      this.GET_CHAT_USERS_LIST({query:tabName || 'resell'});
      if (this.ACTIVE_CONVERSATION_ID) {
          this.FETCH_CONVERSATION_MESSAGES(this.ACTIVE_CONVERSATION_ID)
      }
    },
  },
  mounted() {
    if (this.$route.query.tab !== undefined) {
      const number = this.SIDEBAR_NAV.findIndex((object) => {
        return (
          object.text.toLowerCase() === this.$route.query.tab.toLowerCase()
        );
      });
      this.number = number;
    }
  },
};
</script>

<style lang="scss">
.back-nav {
  border-bottom: 1px solid $light-gray;

  @include large-mobile {
    &_mobile {
      border: 1px solid $light-gray;
      border-radius: 10rem;
      padding: 2px;

      .back-nav {
        &__btn {
          width: 100%;
          height: 38rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 10rem !important;
          border: 0;
          border-radius: 8rem;
          margin-bottom: 0;
          font-size: 15rem;

          &.isActive {
            background: #f4f3f4;
          }
        }

        &__item {
          border: 0;
        }
      }

      &-blue {
        .back-nav {
          &__btn {
            color: $default;

            &.isActive {
              background: $blue;
              color: #fff;
            }
          }
        }
      }
    }
    &:not(.back-nav_mobile) {
      overflow: hidden;
      //overflow-x: hidden;
      margin-left: -15rem;
      margin-right: -15rem;
      border-bottom: 0;

      .back-nav {
        &__list {
          overflow-x: auto;
          overflow-y: hidden;
          padding-left: 15rem;
          padding-right: 15rem;
          margin-bottom: -40px;
          padding-bottom: 41px;
        }
      }
    }
  }

  &_blue {
    .back-nav {
      &__btn {
        &.isActive {
          border-color: $blue;
          color: $blue;
        }
      }
    }
  }

  &__sort {
    font-weight: 600;
    font-size: 17rem;
    color: $default;

    .select {
      &__value {
        color: $default;
      }

      &__arrow {
        margin-left: 6rem;
      }

      &__label {
        color: #9a9a9a;
      }

      &__head {
        padding-right: 0;
      }
    }
  }

  &__column {
    @include large-mobile {
      width: 100%;
      &_right {
        display: none;
      }
    }
  }

  &__list {
    width: 100%;
    flex-wrap: nowrap;
  }

  &__item {
    @include large-mobile {
      width: 100%;
      border-bottom: 1px solid $light-gray;
    }
  }

  &__btn {
    padding: 0 25rem 10rem 25rem;
    display: inline-flex;
    margin-bottom: -1px;
    position: relative;
    transition: ease 0.15s;
    color: #9a9a9a;
    font-weight: 600;
    font-size: 16rem;
    line-height: 19rem;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    text-align: center;
    text-transform: capitalize;
    &.isActive,
    &.nuxt-link-active {
      color: $default;
      border-color: $default;

      .back-nav__counter {
        color: $blue;
      }
    }

    @include large-mobile {
      padding-left: 25rem;
      padding-right: 25rem;
      white-space: nowrap;
    }
  }

  &__grid-switch {
    margin-left: 30rem;
    padding-top: 3rem;
  }

  &__buttons {
    @include large-mobile {
      width: 100%;
      justify-content: space-between;
    }
  }

  &__read {
    font-size: 16rem;
    font-weight: 500;

    &.color-gray {
      color: #9a9a9a;
    }
  }

  &__counter {
    color: $gray;
    margin-left: 5rem;
  }
}
</style>

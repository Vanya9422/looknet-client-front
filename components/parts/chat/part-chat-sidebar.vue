<template>
  <div class="chat-sidebar" :class="Mods">
    <div class="chat-sidebar__top">
      <button-link-arrow class="chat-sidebar__back" :to="backLink" v-if="moderator === true"></button-link-arrow>
      <div class="chat-sidebar__title h3">{{ title }}<span class="color-blue" v-if="ALL_MESSAGES_UNREAD_COUNT">({{ ALL_MESSAGES_UNREAD_COUNT }})</span></div>
      <part-chat-search class="chat-sidebar__search" :key="key" :placeholder="POPUP_GLOBAL.search" :disabledAction="disabledAction" @clearSearch="(val) => (key = val)"></part-chat-search><!--part-back-nav.favorites-ad__nav(:nav="nav" :activeRouterClass="'active_tab'")-->
      <part-back-nav-chat class="chat-sidebar__nav" :nav="nav" :activeRouterClass="'active_tab'" @clearSearch="(val) => (key = val)"></part-back-nav-chat>
      <client-only>
        <form-checkbox class="chat-sidebar__select-all" :all="!!CHECKED_LIST.length && CHECKED_LIST.length < list.length" :checked="!!CHECKED_LIST.length" @change.native="SET_CHECKED_ALL" v-if="$screen.st && moderator === false && list.length > 0"><span class="color-gray h6">{{ PAGE_CHAT.sidebar.selectAll }}</span></form-checkbox>
      </client-only>
    </div>
    <div class="chat-sidebar__stat" v-if="statText">
      <div class="chat-sidebar__stat-text">{{ statText }}<span class="color-blue">({{ statCounter }})</span></div>
    </div>
    <div class="chat-sidebar__container">
      <div class="chat-sidebar__container-wrap">
        <div class="chat-sidebar__list" :class="(!list || list.length === 0) && $route.query.tab !== 'support' ? 'no-message__list' : ''">
          <support-item-chat v-if="$route.query.tab === 'support'" name="Support" button v-b-modal:modal-help :desc="PAGE_CHAT.sidebar.contact"></support-item-chat>
          <item-chat
            class="chat-sidebar__item"
            v-for="(item, i) in list"
            :key="i"
            :name="item.participants ? item.participants.messageable.first_name : ''"
            :avatar="item?.participants?.messageable?.avatar || null"
            :time="item.last_message ? new Date(item.last_message.created_at).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' }) : ''"
            :counter="item.unread_messages_count"
            :desc="item.advertise ? cutStringWithDots(item.advertise.name, 20) : ''"
            :status="item.status"
            :last_message="item.last_message || {}"
            :conversation_id="item.conversation_id"
            :checked="item.checked" :small="small"
            :fakeData="item.advertise?.fake_data"
            :fakeImage="item.advertise?.fake_image"
            :isFake="item.advertise?.is_fake === 1"
            button
            :class="{ isActive: number === item.conversation_id }"
            @changeCheckbox="checkedItem(i)"
            @change="(val) => tabList(val, item)"
          >
            {{ item.last_message ? cutStringWithDots(item.last_message.body, 30) : "" }}
          </item-chat>
          <div class="no-message-container max-tablet-hidden" v-if="(!list || list.length === 0) && $route.query.tab !== 'support'">
            <part-not-notification class="section-notifications__not-notification">{{ mobileNoMessage }}</part-not-notification>
          </div>
          <client-only>
            <infinite-loading :distance="20" :identifier="sidebarScrollIdentifier" @infinite="infinite">
              <div slot="no-results"></div>
              <div slot="no-more"></div>
              <div slot="spinner"></div>
            </infinite-loading>
          </client-only>
          <modal-help></modal-help>
          <modal-thank :desc="'Our manager will write to you shortly'" notRedirectToHome></modal-thank>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "Messages",
    },
    mobileNoMessage: {
      type: String,
      default: "No Message",
    },
    counter: {
      type: Number,
      default: 20,
    },
    disabledAction: {
      type: Boolean,
      default: false,
    },
    statCounter: {
      type: Number,
      default: null,
    },
    statText: {
      type: String,
      default: "",
    },
    search: {
      type: Boolean,
      default: true,
    },
    moderator: {
      type: Boolean,
      default: false,
    },
    checkbox: {
      type: Boolean,
      default: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
    backLink: {
      type: String,
      default: "#",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      key: 0,
      nav: [
        {
          text: "Resell",
          class: "isActive",
          counter: "3",
          to: "/chat?tab=resell",
        },
        {
          text: "Buying",
          counter: "2",
          to: "/chat?tab=buying",
        },
      ],
      panelOpen: false,
      i: 0,
    };
  },
  computed: {
    ...mapGetters({
      NUMBER: "chat/NUMBER",
      CHECKED_LIST: "chat/CHECKED_LIST",
      CONVERSATION_MESSAGES_PAGE: "chat/CONVERSATION_MESSAGES_PAGE",
      SIDEBAR_SCROLL_IDENTIFIER: "chat/SIDEBAR_SCROLL_IDENTIFIER",
      ALL_MESSAGES_UNREAD_COUNT: "chat/ALL_MESSAGES_UNREAD_COUNT",
      POPUP_GLOBAL: "popup/POPUP_GLOBAL",
      PAGE_CHAT: "pages/PAGE_CHAT",
    }),
    number() {
      return this.NUMBER;
    },
    conversationMessagesPage() {
      return this.CONVERSATION_MESSAGES_PAGE;
    },
    sidebarScrollIdentifier() {
      return this.SIDEBAR_SCROLL_IDENTIFIER;
    },
    Mods() {
      return {
        "chat-sidebar_moderator": this.moderator,
      };
    },
  },
  methods: {
    ...mapMutations({
      SET_ACTIVE_CONVERSATION_ID: "chat/SET_ACTIVE_CONVERSATION_ID",
      SET_ACTIVE_USER: "chat/SET_ACTIVE_USER",
      CHANGE_CONVERSATION_MESSAGES_PAGE:
        "chat/CHANGE_CONVERSATION_MESSAGES_PAGE",
      SET_CHAT_TOP_USER_DATA: "chat/SET_CHAT_TOP_USER_DATA",
      SET_MESSAGES: "chat/SET_MESSAGES",
      SET_FOCUS_AFTER_MESSAGE_SEND: "chat/SET_FOCUS_AFTER_MESSAGE_SEND",
    }),
    ...mapActions({
      SET_CHECKED: "chat/SET_CHECKED",
      SET_CHECKED_ALL: "chat/SET_CHECKED_ALL",
    }),
    infinite($state) {
      this.$emit("fetchMoreData", $state);
    },
    checkedItem(i) {
      this.SET_CHECKED(i);
    },
    tabList(conversation_id, data) {
      this.SET_ACTIVE_CONVERSATION_ID(conversation_id);
      this.SET_ACTIVE_USER(conversation_id);

      this.CHANGE_CONVERSATION_MESSAGES_PAGE(1);

      this.SET_MESSAGES({ data: [], current_page: 1 });
      this.SET_CHAT_TOP_USER_DATA(data);
      this.SET_FOCUS_AFTER_MESSAGE_SEND();

      if (process.client && window.innerWidth < 1121) {
        if (document.querySelector(".section-chat__column_left")) {
          document.querySelector(".section-chat__column_left").style.display =
            "none";
        }
      }
    },
    cutStringWithDots(string, max) {
      let dots = string.length > max ? "..." : "";
      return string.substring(0, max) + dots;
    },
  },
};
</script>

<style lang="scss">
.chat-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  // padding-bottom: 20rem;

  // @include small-tablet {
  //   padding-bottom: 60rem;
  // }
  &__nav {
    margin-top: 30px;
  }

  &_moderator {
    .chat-sidebar {
      &__top {
        min-height: 91rem;
        border-bottom: 1px solid $light-gray;
        padding-top: 20rem;
        padding-bottom: 20rem;
        display: flex;
        align-items: center;
      }
    }
  }

  &__back {
    margin-right: 25rem;

    .link-arrow {
      &__icon {
        width: 15rem;
        height: 17rem;
        transform: rotate(180deg);
        stroke: $default;
      }
    }
  }

  &__top {
    padding: 32rem 25rem 14rem 25rem;

    @include large-tablet {
      padding-right: 0;
    }

    @include small-tablet {
      padding: 20rem var(--wrapper-offset) 5rem var(--wrapper-offset);
    }
  }

  /**/
  &__container {
    flex: 1 1 auto;
    position: relative;
    overflow: hidden;

    &-wrap {
      // position: absolute;
      // left: 0;
      // top: 0;
      width: calc(100% - 4px);
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 4px;
      padding-left: 10px;

      &::-webkit-scrollbar {
        width: 2px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: none;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: $blue;
        border-radius: 5px;
      }
    }

    // @include small-tablet {
    //   &-wrap {
    //     width: calc(100% + 12rem);
    //     padding: 0 32rem 0 20rem;
    //   }
    // }
  }

  &__title {
    font-family: "Atyp Display";
    line-height: 0.8;
    @include large-mobile {
      font-weight: 500;
    }
  }

  &__search {
    margin-top: 24rem;

    @include large-mobile {
      margin-top: 17rem;
    }
  }

  &__select-all {
    margin-top: 25rem;

    @include large-mobile {
      display: none;
    }
  }

  &__panel {
    margin-top: -50rem;
  }

  &__item {
    &:not(:first-child) {
      border-top: 1px solid #f4f3f4;
    }
  }

  &__stat {
    padding: 22rem 10rem 14rem 30rem;
    font-size: 16rem;
    font-weight: 600;
  }
}
.no-message {
  &-container {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-content: center;
    min-height: 320px;
    max-height: 500px;
  }
  &__list {
    height: 100% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
  &-margin {
    &__top {
      margin-top: 20px;
    }
  }
  &__font {
    font-size: 20rem;
  }
}
</style>

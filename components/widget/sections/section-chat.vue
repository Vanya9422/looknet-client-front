<template>
  <section class="section-chat" :style="{ '--chat-input-height': chatInputHeight ? `${chatInputHeight}px` : '60rem' }">
    <div class="section-chat__row">
      <div class="section-chat__column section-chat__column_left" :class="{ 'no-active': activeConversationId }">
        <part-chat-sidebar
          class="section-chat__sidebar"
          :mobileNoMessage="mobileNoMessage"
          :list="chatUsersList"
          :title="sidebarTitle"
          :disabledAction="true"
          @fetchMoreData="handleLoadMoreConversations"
          :key="key"
        />
      </div>
      <div class="section-chat__column section-chat__column_right" :class="{ active: activeConversationId }">
        <part-chat-body
          class="section-chat__body"
          v-if="activeConversationId"
          @resize-form="chatInputHeight = $event"
        >
          <client-only>
            <infinite-loading :distance="20" ref="infiniteLoading" identifier="exhibitLoader" :direction="'top'"
                              @infinite="handleLoadMoreMessages">
              <div slot="no-results"></div>
              <div slot="no-more"></div>
              <div slot="spinner"></div>
            </infinite-loading>
          </client-only>
          <div class="chat-body__item" ref="chatLast"></div>
        </part-chat-body>
        <div class="not-notification" v-else>
          <set-img :default-img="require('~/assets/img/not-notification___chat.png')"></set-img>
          <p>{{ noMessage }}</p>
        </div>
      </div>
    </div>
    <client-only>
      <transition name="fade">
        <part-chat-panel class="chat-sidebar__panel" v-if="$screen.st && CHECKED_LIST.length > 0"
                         :count="CHECKED_LIST.length" @closePanel="CHANGE_CHECKED_REMOVE_ALL()"></part-chat-panel>
      </transition>
    </client-only>
    <modal-safety :title="PAGE_CHAT.safety.title">
      <p>{{ PAGE_CHAT.safety.message1 }}</p>
      <p>{{ PAGE_CHAT.safety.message2 }}</p>
    </modal-safety>
    <modal-action>
      <div class="modal-panel__item">
        <button-border class="modal-panel__btn" icon="noneUser"
                       v-if="!bodyTopData.is_blocked && $route.query.tab !== 'support'" @click.native="blockUser"
                       BigIcon gray>{{ PAGE_CHAT.body.block }}
        </button-border>
      </div>
      <div class="modal-panel__item">
        <button-border class="modal-panel__btn" v-if="$route.query.tab !== 'support'" icon="closeCircle"
                       @click.prevent.native="hideModal" BigIcon v-b-modal:modal-complaint gray>
          {{ PAGE_CHAT.body.complaint }}
        </button-border>
      </div>
      <div class="modal-panel__item">
        <button-border class="modal-panel__btn" icon="delete" @click.prevent.native="hideModal" BigIcon gray
                       v-b-modal:modal-delete>{{ PAGE_CHAT.body.delete }}
        </button-border>
      </div>
    </modal-action>
    <modal-delete @deleteItem="deleteChatModal" :desc="PAGE_CHAT.delete.areYourShure"></modal-delete>
    <modal-complaint></modal-complaint>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "Settings",
    },
    sidebarTitle: {
      type: String,
      default: "Messages",
    },
    mobileNoMessage: {
      type: String,
      default: "No Message",
    },
    noMessage: {
      type: String,
      default: "You have not Notifications",
    },
    blacklist: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      key: 0,
      pageLoading: true,
      chatInputHeight: 0
    };
  },
  watch: {
    activeConversationId(newVal, oldVal) {
      if (!process.client) return;
      if (newVal) {
        const ref = this.$refs.infiniteLoading;
        if (ref) this.$refs.infiniteLoading.stateChanger.reset();
        this.connect(newVal);
        this.fetchConversationMessages(newVal);
      }

      if (oldVal) {
        this.disconnect(oldVal);
      }
    },
  },
  computed: {
    ...mapGetters({
      CHAT_USERS_LIST: "chat/CHAT_USERS_LIST",
      ACTIVE_CONVERSATION_ID: "chat/GET_ACTIVE_CONVERSATION_ID",
      CONVERSATION_PAGE: "chat/CONVERSATION_PAGE",
      CONVERSATION_MESSAGES_PAGE: "chat/CONVERSATION_MESSAGES_PAGE",
      GET_CONVERSATION_MESSAGES: "chat/GET_CONVERSATION_MESSAGES",
      // CONVERSATION_PER_PAGE: 'chat/CONVERSATION_PER_PAGE',
      CONVERSATION_LAST_PAGE: "chat/CONVERSATION_LAST_PAGE",
      CONVERSATION_MESSAGES_LAST_PAGE: "chat/CONVERSATION_MESSAGES_LAST_PAGE",
      CHECKED_LIST: "chat/CHECKED_LIST",
      SEARCH: "chat/SEARCH",
      CHAT_TOP_USER_DATA: "chat/CHAT_TOP_USER_DATA",
      PAGE_CHAT: "pages/PAGE_CHAT",
    }),
    chatUsersList() {
      return this.CHAT_USERS_LIST;
    },
    activeConversationId() {
      return this.ACTIVE_CONVERSATION_ID;
    },
    conversationMessages() {
      return this.GET_CONVERSATION_MESSAGES;
    },
    conversation_last_page() {
      return this.CONVERSATION_LAST_PAGE;
    },
    conversation_message_last_page() {
      return this.CONVERSATION_MESSAGES_LAST_PAGE;
    },
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
    bodyTopData: {
      get() {
        return this.CHAT_TOP_USER_DATA;
      },
      set(val) {
        this.SET_BLOCKED_FLAG_FOR_USER(val);
      },
    },
  },
  methods: {
    ...mapActions({
      GET_CHAT_USERS_LIST: "chat/GET_CHAT_USERS_LIST",
      FETCH_CONVERSATION_MESSAGES: "chat/FETCH_MESSAGES",
      DELETE_CONVERSATION: "chat/DELETE_CONVERSATION",
      BLOCK_USER: "chat/BLOCK_USER",
    }),
    ...mapMutations({
      SET_MESSAGE_TO_LIST: "chat/SET_MESSAGE_TO_LIST",
      CHANGE_LIST_FROM_EVENT: "chat/CHANGE_LIST_FROM_EVENT",
      CHANGE_SIDEBAR_WHEN_SEND_MESSAGE: "chat/CHANGE_SIDEBAR_WHEN_SEND_MESSAGE",
      SET_ACTIVE_CONVERSATION_ID: "chat/SET_ACTIVE_CONVERSATION_ID",
      CHANGE_CHAT_USERS_LIST: "chat/CHANGE_CHAT_USERS_LIST",
      CHANGE_CONVERSATION_PAGE: "chat/CHANGE_CONVERSATION_PAGE",
      CHANGE_CONVERSATION_MESSAGES_PAGE:
        "chat/CHANGE_CONVERSATION_MESSAGES_PAGE",
      CHANGE_CHECKED_REMOVE_ALL: "chat/CHANGE_CHECKED_REMOVE_ALL",
      SET_CHAT_TOP_USER_DATA: "chat/SET_CHAT_TOP_USER_DATA",
      SET_SEARCH: "chat/SET_SEARCH",
      SET_MESSAGES: "chat/SET_MESSAGES",
      SET_BLOCKED_FLAG_FOR_USER: "chat/SET_BLOCKED_FLAG_FOR_USER",
      SET_ACTIVE_USER: "chat/SET_ACTIVE_USER",
      SET_CHAT_CLOSED_STATUS_BY_MODERATOR:
        "chat/SET_CHAT_CLOSED_STATUS_BY_MODERATOR",
      SET_FOCUS_AFTER_MESSAGE_SEND: "chat/SET_FOCUS_AFTER_MESSAGE_SEND",
    }),
    connect(active_conversation_id) {
      if (active_conversation_id === null) return;
      if (active_conversation_id === undefined) return;

      this.$echo
        .private("send-message." + active_conversation_id)
        .listen(".private-send-message", (res) => {
          this.SET_MESSAGE_TO_LIST(res.message);
          if (!process.client) return;
          setTimeout(function () {
            let lastChild = document.querySelector(
              ".chat-body__container-wrap"
            );
            lastChild.scrollTop = lastChild.scrollHeight;
          }, 200);
        });
    },
    disconnect(old_active_conversation_id) {
      this.$echo.leave("send-message." + old_active_conversation_id);
    },
    deleteChatModal() {
      if (this.CHECKED_LIST.length > 0) {
        this.DELETE_CONVERSATION(this.CHECKED_LIST);
        this.CHANGE_CHECKED_REMOVE_ALL();
      } else {
        this.DELETE_CONVERSATION([this.ACTIVE_CONVERSATION_ID]);
      }
    },
    deleteConversationFromLocalStorage() {
      if (process.client && !localStorage.getItem("conversation")) return;

      this.DELETE_CONVERSATION().finally(() => {
        if (process.client) {
          localStorage.removeItem("conversation");
        }
      });
    },
    fetchConversationMessages(active_conversation_id) {
      this.FETCH_CONVERSATION_MESSAGES(active_conversation_id);
    },
    changeStorageValueIfFirstMessageWasSent(conversation) {
      if (!conversation) return;
      if (!conversation.message) return;

      conversation.message = false;

      const newConversation = JSON.stringify(conversation);
      if (process.client) {
        localStorage.setItem("conversation", newConversation);
      }
    },
    deleteActiveUserWhenPageReloadedAndNotSendFirstMessage(conversation) {
      if (!conversation) return;
      if (conversation.message) return;
      if (performance.navigation.type !== 1) return;

      this.deleteConversationFromLocalStorage();
    },
    handleLoadMoreConversations($state) {
      let search = null;
      if (this.conversationPage > this.conversation_last_page) {
        return;
      }

      // this.conversationPage++;

      if (this.SEARCH) {
        search = this.SEARCH;
      }

      this.GET_CHAT_USERS_LIST({
        query: this.$route.query.tab || "resell",
        search: this.SEARCH,
      }).then((loadState) => {
        if (loadState) $state.loaded();
        else $state.complete();
      });
    },
    async handleLoadMoreMessages($state) {
      // console.log(1)
      // this.conversationMessagesPage++;
      // await this.FETCH_CONVERSATION_MESSAGES(this.activeConversationId)
      if (this.conversationMessagesPage > this.conversation_message_last_page) {
        return;
      }

      this.FETCH_CONVERSATION_MESSAGES(this.activeConversationId).then(
        (loadState) => {
          if (loadState) $state.loaded();
          else $state.complete();
        }
      );
    },
    blockUser() {
      this.hideModal();
      this.BLOCK_USER(this.bodyTopData.participants.messageable_id).then(
        (res) => {
          if (res.data.status === "Success") {
            this.bodyTopData = this.bodyTopData.participants.messageable_id;
          }
        }
      );
    },
    hideModal() {
      this.$bvModal.hide("modal-action");
    },
    /* mounted */
    async loadMounted() {
      if (!process.client) return;
      const conversation = JSON.parse(localStorage.getItem("conversation"));
      this.deleteActiveUserWhenPageReloadedAndNotSendFirstMessage(conversation);
      if (
        conversation &&
        !conversation.message &&
        performance.navigation.type === 1
      ) {
        this.deleteConversationFromLocalStorage();
      }

      this.changeStorageValueIfFirstMessageWasSent(conversation);
      if (conversation && conversation.message) {
        conversation.message = false;
        const newConversation = JSON.stringify(conversation);
        if (process.client) {
          localStorage.setItem("conversation", newConversation);
        }
      }
    },

  },
  async created() {
    if (!process.client) return;
    const conversation = JSON.parse(localStorage.getItem("conversation"));
    // if (performance.navigation.type === 1) {
    //   await this.DELETE_CONVERSATION();
    // }
    await this.GET_CHAT_USERS_LIST({
      query: this.$route.query.tab || "resell",
    });

    this.deleteActiveUserWhenPageReloadedAndNotSendFirstMessage(conversation);

    this.changeStorageValueIfFirstMessageWasSent(conversation);

    // this.$echo.private('chat-conversation-started.' + this.$auth.user.id)
    //     .listen('.private-chat-conversation-started', (e) => {
    //       console.log('start', e);
    //       this.CHANGE_LIST_FROM_EVENT(e.conversation);
    //     })
    //   console.log(this.$auth.strategy.token.get());
    // console.log(this.$echo.connector.options.auth.headers.Authorization);
    this.$echo
      .private("chat-conversation-updated." + this.$auth.user.id)
      .listen(".private-chat-conversation-updated", (res) => {
        console.log("start", res);
        this.SET_CHAT_CLOSED_STATUS_BY_MODERATOR(res);
        this.CHANGE_LIST_FROM_EVENT(res);
        this.key++;
        // this.CHANGE_SIDEBAR_WHEN_SEND_MESSAGE(res);
      });
    if (this.activeConversationId) {
      this.$echo
        .private("send-message." + this.activeConversationId)
        .listen(".private-send-message", (res) => {
          this.SET_MESSAGE_TO_LIST(res.message);
          setTimeout(function () {
            let lastChild = document.querySelector(
              ".chat-body__container-wrap"
            );
            lastChild.scrollTop = lastChild.scrollHeight;
          }, 200);
        });
    }
  },
  beforeDestroy() {
    if (process.client) {
      this.disconnect(this.activeConversationId);
    }
    this.SET_CHAT_TOP_USER_DATA([]);
    this.SET_SEARCH("");
    this.SET_ACTIVE_CONVERSATION_ID();
    this.deleteConversationFromLocalStorage();
    this.CHANGE_CONVERSATION_PAGE(1);
    this.SET_MESSAGES({ data: [], current_page: 1 });
    this.CHANGE_CHAT_USERS_LIST({ data: [], current_page: 1 });
    this.SET_ACTIVE_USER();
    this.SET_FOCUS_AFTER_MESSAGE_SEND();
    if (process.client) {
      this.$echo.leave("chat-conversation-updated." + this.$auth.user.id);
    }
  },
  async mounted() {
    await this.loadMounted();
  },
};
</script>

<style lang="scss">
.section-chat {
  // --chat-input-height: 60rem;
  position: relative;
  border-top: 1px solid $light-gray;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  @include small-tablet {
    margin-bottom: calc(48rem + var(--chat-input-height));
  }

  //&__body {
  //@include  large-mobile {
  //  max-height: calc(100vh - 140px);
  //}
  //}

  @include small-tablet {
    margin-left: -32px;
    margin-right: -32px;
    border-top: 0;
  }

  @include large-mobile {
    margin-left: -15rem;
    margin-right: -15rem;
  }

  &__row {
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    max-width: 1500rem;
    position: relative;
    width: 100%;
    height: 100%;
    // padding-right: 50rem;
    padding-right: 10rem;

    @include large-desktop {
      // padding-right: 40rem;
    }

    @include large-tablet {
      flex-wrap: wrap;
    }

    @include small-tablet {
      // padding: 0;
    }
  }

  &__column {
    height: 100%;
    position: relative;

    &_left {
      width: 423rem;
      min-width: 423rem;

      &.no-active {
        @include large-tablet {
          display: none;
        }
      }

      @include large-tablet {
        width: 100% !important;
      }
    }

    &_right {
      width: 100%;
      border-left: 1px solid $light-gray;

      .not-notification {
        top: 0%;
        left: 4%;
        position: absolute;
        @include min-large-desktop {
          left: 26%;
        }

        p {
          font-size: 20px;
          margin-top: 28px;
        }
      }

      @include small-tablet {
        width: 100% !important;
      }
    }

    @include large-tablet {
      width: calc(100% - 210rem);

      &_left {
        min-width: inherit;
      }
      &_right {
        border-left: 0;
      }
      &.active {
        // position: fixed;
        // height: calc(100% - 87px - 50px);
        // top: 87px;
        width: 100%;
      }
    }
    // @include small-tablet {
    //   &.active {
    //     position: fixed;
    //     height: calc(100% - 57px - 50px);
    //     top: 57px;
    //   }
    // }
  }

  @include large-mobile {
    .button-file {
      width: 36px !important;
      //height: 36px !important;
    }
  }
}
</style>

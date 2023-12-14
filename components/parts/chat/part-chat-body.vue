<template>
  <div class="chat-body">
    <div class="chat-body__top">
      <div class="chat-body__row flex flex_justify flex_vertical">
        <div class="chat-body__column chat-body__column_left">
          <component
            class="chat-body__back"
            :is="to !== '' ? 'NuxtLink' : 'div'"
            :to="to !== '' ? to : false"
            @click="showSidebar">
            <svg-icon name="prev"></svg-icon>
          </component>
          <item-chat
            @click.native="showUserModal"
            v-if="ACTIVE_CONVERSATION_ID"
            :avatar="bodyTopData.participants.messageable.avatar || null"
            :name="bodyTopData.participants.messageable.first_name"
            :time="bodyTopData.last_message ? new Date(bodyTopData.last_message).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })  : ''"
            :desc="bodyTopData.advertise ? bodyTopData.advertise.name : ''"
            :slug="bodyTopData.advertise ? '/product/' + bodyTopData.advertise.slug : '/'"
            :fakeData="bodyTopData.advertise?.fake_data"
            :fakeImage="bodyTopData.advertise?.fake_image"
            :isFake="bodyTopData.advertise?.is_fake === 1"
            isClickable
            :checkbox="false"
          >
            {{ text }}
          </item-chat>
        </div>
        <div class="chat-body__column chat-body__column_right flex"
             v-if="moderator">
          <div class="chat-body__buttons flex">
            <button-primary class="chat-body__btn mobile-hidden"
                            gray="gray"><span
              class="color-gray">{{ PAGE_CHAT.body.close }}</span></button-primary>
            <button-primary class="chat-body__btn mobile-hidden"
                            blue="blue">{{
                PAGE_CHAT.body.waitingForAnswer
              }}
            </button-primary>
            <button-medium class="chat-body__more mobile-visible"
                           icon="dotsRotate"
                           white="white"
                           square="square"
                           v-b-modal.modal-action></button-medium>
          </div>
        </div>
        <div class="chat-body__column chat-body__column_right flex"
             v-else>
          <div class="chat-body__buttons flex align-items-center">
            <button-medium
              class="chat-body__btn"
              gray="gray"
              icon="infoCircle"
              @click.native.prevent="showSafetyModal"
              v-if="$route.query.tab !== 'support'"
            >
              <span class="p">{{ PAGE_CHAT.body.forYourSafety }}</span>
            </button-medium>
            <button-primary
              class="button-primary_blue
              chat-body__btn"
              @click.native.prevent="closeChat"
              blue="blue"
              v-else-if="bodyTopData.status"
            >
              <span>{{ PAGE_CHAT.body.close }}</span>
            </button-primary>
            <button-medium
              class="chat-body__btn mobile-hidden"
              v-show="CHECKED_LIST.length &lt; 1"
              gray="gray"
              square="square"
              icon="dots"
              name="chatAction"
            />
            <button-medium
              class="chat-body__btn mobile-visible"
              gray="gray"
              square="square"
              icon="dots"
              v-b-modal.modal-action
            />
          </div>
          <client-only>
            <tippy class="tippy-hide"
                   to="chatAction"
                   placement="bottom-end"
                   trigger="click">
              <div class="chat-body__action">
                <div class="chat-body__action-item">
                  <button-medium
                    class="chat-body__action-btn"
                    v-if="!bodyTopData.is_blocked &amp;&amp; $route.query.tab !== 'support'"
                    @click.native="blockUser"
                    white="white"
                  >
                    {{ PAGE_CHAT.body.block }}
                  </button-medium>
                </div>
                <div class="chat-body__action-item">
                  <button-medium
                    class="chat-body__action-btn"
                    v-if="$route.query.tab !== 'support'"
                    white="white"
                    v-b-modal:modal-complaint
                  >
                    {{ PAGE_CHAT.body.complaint }}
                  </button-medium>
                </div>
                <div class="chat-body__action-item">
                  <button-medium class="chat-body__action-btn"
                                 @click.native="deleteChat"
                                 white="white">
                    {{ PAGE_CHAT.body.delete }}
                  </button-medium>
                </div>
              </div>
            </tippy>
          </client-only>
        </div>
      </div>
    </div>
    <div class="chat-body__container"
         :key="ACTIVE_CONVERSATION_ID">
      <div class="chat-body__container-wrap css-scrollbar"
           @scroll="onScroll"
           ref="infoBox">
        <slot></slot>
        <div class="chat-body__section"
             v-for="(message, i) in conversationMessages"
             :key="i">
          <div class="chat-body__date"
               v-if="message.date">
            <div class="chat-body__date-text">{{ message.date }}</div>
          </div>
          <div class="chat-body__date"
               v-else>
            <div class="chat-body__date-text">{{ message.date }}</div>
          </div>
          <div class="chat-body__list">
            <template v-for="(item, i) in message.messages">
              <item-chat-message
                class="chat-body__item"
                :key="i"
                :id="item.id"
                :avatar="item?.participation?.messageable?.avatar ? item.participation.messageable.avatar : ''"
                :name="item.participation.messageable.first_name"
                :time="new Date(item.created_at).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' }) "
                :content="[{ text: item.body, read: item.read_at ? true : false }]"
                :answer="item.answer"
                :messagable_id="item.participation.messageable_id"
                :gallery="item.files"
              />
            </template>
            <item-chat-message
              class="chat-body__item"
              v-if="$route.query.tab === 'support' &amp;&amp; !bodyTopData.status"
              chat-end="chat-end"
              :time="getTime(bodyTopData.updated_at)"
              :avatar="require('~/assets/sprite/svg/headphones.svg')"
              name="Emkin web site"
              :content="[{ text: 'A pleasure to contact with you again!', read: false }]"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="chat-body__bottom"
         v-if="$route.query.tab === 'support'">
      <part-chat-form class="chat-body__form"
                      v-if="bodyTopData.status"
                      :files="files"></part-chat-form>
    </div>
    <div class="chat-body__bottom"
         v-else
         ref="chatForm">
      <part-chat-form
        class="chat-body__form"
        :key="BLOCKED_KEY"
        :files="files"
        :blocked="bodyTopData.is_blocked"
        :unBlockedId="bodyTopData.participants.messageable_id"
        @check-size="$emit('resize-form', $refs.chatForm.clientHeight)"
      />
      <modal-users-adds
        v-if="$route.query.tab !== 'support'"
        :userId="bodyTopData.participants.messageable_id" />
      <modal-users-fake-adds
        v-if="$route.query.tab !== 'support'"
        :product="bodyTopData.advertise" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import moment from "moment";

export default {
  props: {
    avatar: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
    moderator: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: [Object, Array],
      default: () => [],
    },
  },
  data() {
    return {
      lastMessage: null,
      key: 0,
      files: [
        {
          img: "create-gallery__img5_small.jpg",
        },
        {
          img: "create-gallery__img1_small.jpg",
        },
        {
          img: "create-gallery__img2_small.jpg",
        },
        {
          name: "Macbook pro 2016 4k",
          size: "73КБ",
        },
      ],
      deleteFlag: false,
    };
  },
  watch: {
    lastMessageOfList(newVal, oldVal) {
      if (newVal) {
        this.matchHeight(newVal);
      }
    },
  },
  computed: {
    ...mapGetters({
      MESSAGES_PER_PAGE: "chat/MESSAGES_PER_PAGE",
      ACTIVE_CONVERSATION_ID: "chat/GET_ACTIVE_CONVERSATION_ID",
      GET_CONVERSATION_MESSAGES: "chat/GET_CONVERSATION_MESSAGES",
      CONVERSATION_MESSAGES_PAGE: "chat/CONVERSATION_MESSAGES_PAGE",
      CHAT_TOP_USER_DATA: "chat/CHAT_TOP_USER_DATA",
      SCROLL_ID: "chat/SCROLL_ID",
      CHECKED_LIST: "chat/CHECKED_LIST",
      BLOCKED_KEY: "chat/BLOCKED_KEY",
      USER_PRODUCT: "product/USER_PRODUCT",
      PAGE_CHAT: "pages/PAGE_CHAT",
      IS_SAFETY_MESSAGE_SHOWED: "chat/IS_SAFETY_MESSAGE_SHOWED"
    }),
    conversationMessages() {
      return this.GET_CONVERSATION_MESSAGES;
    },
    bodyTopData: {
      get() {
        return this.CHAT_TOP_USER_DATA;
      },
      set(val) {
        this.SET_BLOCKED_FLAG_FOR_USER(val);
      },
    },
    lastMessageOfList: {
      get() {
        let lastMessageOfList = this.$collect(this.conversationMessages).last()
          ? this.$collect(
            this.$collect(this.conversationMessages).last().messages
          ).last()
          : null;
        this.SET_LAST_MESSAGE_OF_LIST(lastMessageOfList);
        return lastMessageOfList;
      },
      set() {
        this.SET_LAST_MESSAGE_OF_LIST_MAKE_SEEN();
      },
    },
  },
  methods: {
    ...mapActions({
      BLOCK_USER: "chat/BLOCK_USER",
      CLOSE_CHAT: "chat/CLOSE_CHAT",
    }),
    ...mapMutations({
      RESET_UNREAD_MESSAGES: "chat/RESET_UNREAD_MESSAGES",
      SET_LAST_MESSAGE_OF_LIST: "chat/SET_LAST_MESSAGE_OF_LIST",
      SET_LAST_MESSAGE_OF_LIST_MAKE_SEEN:
        "chat/SET_LAST_MESSAGE_OF_LIST_MAKE_SEEN",
      SET_BLOCKED_FLAG_FOR_USER: "chat/SET_BLOCKED_FLAG_FOR_USER",
      SET_ACTIVE_CONVERSATION_ID: "chat/SET_ACTIVE_CONVERSATION_ID",
      SET_CLOSED_FLAG_FOR_USER: "chat/SET_CLOSED_FLAG_FOR_USER",
      SET_SAFETY_MESSAGE: "chat/SET_SAFETY_MESSAGE"
    }),
    showUserModal() {
      const modalName = this.bodyTopData?.advertise?.is_fake
        ? "fake-users-adds"
        : "users-adds";
      this.$bvModal.show(modalName);
    },
    showSafetyModal() {
      this.$bvModal.show('modal-safety');
    },
    getTime(date) {
      if (!date) return "";
      return moment(date).utc().format("hh mm ss");
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        if (
          this.lastMessageOfList &&
          this.$auth.user.id !==
          this.lastMessageOfList.participation.messageable_id &&
          !this.lastMessageOfList.read_at
        ) {
          this.makeSeen();
        }
      }
    },
    matchHeight(lastMessage) {
      let height = this.$refs.infoBox;
      let isHeight =
        height.scrollTop + height.clientHeight >= height.scrollHeight;
      if (
        lastMessage &&
        isHeight &&
        this.$auth.user.id !== lastMessage.participation.messageable_id &&
        !lastMessage.read_at
      ) {
        this.makeSeen();
      }
    },
    makeSeen() {
      this.$axios
        .put(
          this.$chat.getConversations +
          `/${this.lastMessageOfList.conversation_id}/readAll`
        )
        .then((res) => {
          this.lastMessageOfList = 1;
          this.RESET_UNREAD_MESSAGES();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    infinite($state) {
      this.$emit("fetchMoreMessages", $state);
    },
    blockUser() {
      this.BLOCK_USER(this.bodyTopData.participants.messageable_id).then(
        (res) => {
          if (res.data.status === "Success") {
            this.bodyTopData = this.bodyTopData.participants.messageable_id;
          }
        }
      );
    },
    closeChat() {
      this.CLOSE_CHAT(this.ACTIVE_CONVERSATION_ID).then((res) => {
        if (res.status === "Success") {
          this.SET_CLOSED_FLAG_FOR_USER(this.ACTIVE_CONVERSATION_ID);
        }
      });
    },
    deleteChat() {
      this.$bvModal.show("modal-delete");
    },
    showSidebar() {
      this.SET_ACTIVE_CONVERSATION_ID();

      if (
        process.client &&
        document.querySelector(".section-chat__column_left")
      ) {
        document
          .querySelector(".section-chat__column_left")
          .removeAttribute("style");
      }
    },
    checkSafetyModalShowing() {
      if (!process.client) return;
      if (!this.IS_SAFETY_MESSAGE_SHOWED) {
        this.$nextTick(() => {
          this.showSafetyModal();
        });
        this.SET_SAFETY_MESSAGE(true);
      }
    }
  },
  mounted() {
    this.matchHeight();
    this.checkSafetyModalShowing();
  },
};
</script>

<style lang="scss">
.chat-body__container-wrap {
  scroll-padding-top: 10em;
}

.chat-body {
  display: flex;
  flex-direction: column;
  height: 100%;

  @include small-tablet {
    /*padding-bottom: 50rem;*/
  }

  &__top {
    padding: 15rem 0 16rem 25rem;
    position: relative;

    &:before {
      content: "";
      display: block;
      width: 3000px;
      height: 1px;
      background: $light-gray;
      position: absolute;
      left: 0;
      bottom: 0;
    }

    @include small-tablet {
      border-top: 1px solid $light-gray;
      border-bottom: 1px solid $light-gray;
      padding: 14rem var(--wrapper-offset);
      &:before {
        display: none;
      }
    }
  }

  &__column {
    &_left {
      display: flex;
      align-items: center;
    }
  }

  &__back {
    width: 22rem;
    height: 22rem;
    margin-right: 8rem;
    margin-left: -5rem;
    cursor: pointer;
    flex-shrink: 0;
    fill: #464646;

    svg {
      width: 100%;
      height: 100%;
    }

    @include min-large-tablet {
      display: none;
    }

    @include large-mobile {
    }
  }

  &__container {
    flex: 1 1 auto;
    position: relative;
    margin-top: 10rem;

    &-wrap {
      padding-top: 2px;
      padding-bottom: 2px;
      position: absolute;
      left: 0;
      top: 0;
      width: calc(100% + 10rem);
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 10rem;
      padding-left: 25rem;
    }

    @include large-mobile {
      margin-top: 0;
      &-wrap {
        padding: 10rem calc(var(--wrapper-offset) + 10rem) 10rem var(--wrapper-offset);
      }
    }
  }

  &__btn {
    &:not(:last-child) {
      margin-right: 10rem;
    }

    &.button-primary {
      padding-left: 30rem;
      padding-right: 30rem;
    }

    @include large-mobile {
      padding: 0;
      width: 40rem;
      &:not(:last-child) {
        margin-right: 5rem;
      }
      .button-medium {
        &__icon {
          margin-right: 0;
        }

        &__text {
          display: none;
        }
      }
    }
  }

  &__action {
    text-align: left;
    margin: -10rem;
    min-width: 220rem;

    &-btn {
      padding: 5rem 19rem;
      font-size: 17rem;
      width: 100%;
      justify-content: flex-start;
      font-weight: 500;

      &:hover {
        background: #f5f5f7;
      }
    }
  }

  &__bottom {
    padding: 24rem 0 20rem 25rem;

    @include small-tablet {
      padding: 5rem var(--wrapper-offset);
      position: fixed;
      bottom: 48rem;
      width: 100%;
      background: #fff;
    }

    @include large-mobile {
      border-top: 1px solid $light-gray;
    }
  }

  &__section {
    &:not(:first-child) {
      margin-top: 40rem;
    }

    @include large-mobile {
      &:not(:first-child) {
        margin-top: 30rem;
      }
    }
  }

  &__date {
    display: flex;
    overflow: hidden;
    justify-content: center;

    &-text {
      position: relative;
      color: $gray;

      &:before,
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        height: 1px;
        width: 1000px;
        background: $light-gray;
      }

      &:before {
        right: 100%;
        margin-right: 20rem;
      }

      &:after {
        left: 100%;
        margin-left: 20rem;
      }
    }

    @include large-mobile {
      &-text {
        &:before {
          margin-right: 15rem;
        }

        &:after {
          margin-left: 15rem;
        }
      }
    }
  }

  &__list {
    &:not(:first-child) {
      margin-top: 40rem;
    }

    @include large-mobile {
      &:not(:first-child) {
        margin-top: 30rem;
      }
    }
  }

  &__item {
    &:not(:first-child) {
      margin-top: 30rem;
    }
  }

  &__more {
    margin-right: -10rem;
  }
}
</style>

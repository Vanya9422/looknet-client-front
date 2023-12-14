<template lang="pug">
.item-chat(:class="Mods")
  form-checkbox.item-chat__checkbox(
    v-if="checkbox",
    :checked="checked",
    @change.native="$emit('changeCheckbox')"
  )
  component.item-chat__wrap(
    :is="to !== '' ? 'NuxtLink' : 'div'",
    :to="to !== '' ? to : false",
    :class="Mods",
    @click="$emit('change', conversation_id)"
  )
    span.item-chat__avatar(v-if="currentAvatar")
      set-img(img-class="object-fit",
        :src="currentAvatar",
        :default-img="require(`~/assets/img/user.jpg`)"
        small)
    span.item-chat__icon(v-else)
      svg-icon(name="headphones")
    span.item-chat__info
      span.item-chat__head
        span.item-chat__name.p.b {{ currentName }}
        span.item-chat__time(v-if="small == false") {{ time }}
      span.item-chat__body
        span.item-chat__content
          component.item-chat__desc(
            :is="isClickable ? 'NuxtLink' : 'span'",
            :to="isClickable ? slug : false",
            v-if="desc"
          ) {{ desc }}
          span.item-chat__text
            span.item-chat__text-inner
              slot
            span.chat-message__read(
              :class="{ 'is-read': last_message.is_seen }",
              v-if="isSender"
            )
              svg-icon(name="readMessage")
        span.item-chat__counter(v-if="counter") {{ counter }}
        span.item-chat__time(v-if="small == true") {{ time }}
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    avatar: {
      type: Object,
      default: () => ({}),
    },
    last_message: {
      type: Object,
      default: () => ({}),
    },
    name: {
      type: String,
      default: "Support",
    },
    time: {
      type: String,
      default: "07:00 am",
    },
    conversation_id: {
      type: Number,
      default: 0,
    },
    desc: {
      type: String,
      default: "",
    },
    counter: {
      type: Number,
      default: null,
    },
    to: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
      default: false,
    },
    button: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    checkbox: {
      type: Boolean,
      default: true,
    },
    isClickable: {
      type: Boolean,
      default: false,
    },

    fakeData: {
      type: Object,
      default: () => ({}),
    },
    fakeImage: {
      type: Object,
      default: () => ({}),
    },
    isFake: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      ACTIVE_CONVERSATION_ID: "chat/GET_ACTIVE_CONVERSATION_ID",
    }),
    isSender() {
      return this.last_message.is_sender === 0;
    },
    Mods() {
      return {
        "item-chat_btn": this.button,
        "is-small": this.small,
      };
    },
    chatType(){
      return this.$route?.query?.tab || '';
    },
    currentName(){
      return this.chatType === 'buying' && this.isFake ? this.fakeData?.first_name : this.name
    },
    currentAvatar(){
      return this.chatType === 'buying' && this.isFake ? this.fakeImage?.original_full_url : this.avatar
    },
  },
  methods: {
    ...mapMutations({
      SET_MESSAGES_SEEN: "chat/SET_MESSAGES_SEEN",
      SET_MESSAGES_SEEN_ON_SIDEBAR: "chat/SET_MESSAGES_SEEN_ON_SIDEBAR",
    }),
    disconnect(conversation_id) {
      if (!process.client) return;
      this.$echo.leave("send-message." + conversation_id);
    },
    loadData() {
      if (!process.client) return;
      if (this.conversation_id === undefined) return;
      if (this.conversation_id === null) return;
      this.$echo
        .private(
          `chat-conversation-readAt-all.${this.conversation_id}-${this.$auth.user.id}`
        )
        .listen(".chat-conversation-readAt-all", (res) => {
          this.SET_MESSAGES_SEEN(res.conversation);
          this.SET_MESSAGES_SEEN_ON_SIDEBAR(res.conversation);
        });
    },
  },
  beforeDestroy() {
    if (this.ACTIVE_CONVERSATION_ID)
      this.disconnect(this.ACTIVE_CONVERSATION_ID);
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="scss">
.item-chat {
  position: relative;

  &_btn {
    cursor: pointer;

    .item-chat {
      &__wrap {
        padding: 13rem 18rem 13rem 54rem;
        border-radius: 7rem;
        transition: ease 0.15s;
      }

      &__head {
        justify-content: space-between;
      }

      &__body {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &__content {
        width: 100% !important;
      }

      &__desc {
        white-space: nowrap;
        overflow: hidden;
        max-width: 133rem;
        text-overflow: ellipsis;
      }

      &__text {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 100% !important;
        &-inner {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          max-width: 210rem;
        }
      }
    }

    &:hover,
    &.isActive {
      .item-chat__wrap {
        background: #f5f7fb;
      }
    }

    &.is-small {
      .item-chat {
        &__wrap {
          padding-left: 20rem;
          padding-right: 4px;
          @include small-mobile {
            padding-right: 35px;
          }
        }

        &__content {
          margin-top: 5rem;
        }

        &__desc {
          max-width: 100%;
        }

        &__body {
          align-items: flex-end;
        }
      }
    }

    @include large-tablet {
      .item-chat {
        &__desc {
          max-width: 90%;
        }

        &__text {
          max-width: 90%;
        }
      }
    }

    @include large-mobile {
      .item-chat {
        &__wrap {
          padding: 15rem 10rem;
          border-radius: 0;
        }

        &__name {
          font-size: 17rem;
        }

        &__icon,
        &__avatar {
          width: 60rem;
          min-width: 60rem;
          height: 60rem;
          margin-right: 15rem;
        }

        &__info {
          width: calc(100% - 75rem);
        }
      }
    }
  }

  &__wrap {
    display: flex;
    align-items: center;
  }

  &__checkbox {
    &.checkbox {
      position: absolute;
      left: 15rem;
      top: 50%;
      margin-top: -12rem;

      @include large-mobile {
        display: none;
      }
    }
  }

  &__icon,
  &__avatar {
    width: 60rem;
    min-width: 60rem;
    height: 60rem;
    border-radius: 100%;
    margin-right: 15rem;
    @include large-mobile {
      width: 40rem;
      min-width: 40rem;
      height: 40rem;
      margin-right: 10rem;
    }
  }

  &__avatar {
    position: relative;
    overflow: hidden;
  }

  &__icon {
    background: $blue;
    fill: none;
    stroke: #fff;
    stroke-width: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 24rem;
      height: 24rem;
    }
  }

  &__info {
    width: 100%;
    display: block;
  }

  &__name {
    @include large-mobile {
      font-size: 16rem;
    }
  }

  &__head {
    display: flex;
    align-items: center;
  }

  &__time {
    white-space: nowrap;
    margin-left: 13rem;
    padding-top: 3rem;
    color: #aeaeae;
    @include large-mobile {
      padding-top: 1px;
      font-weight: 400;
    }
  }

  &__content {
    display: block;
    margin-top: 7rem;

    @include large-mobile {
      margin-top: 5rem;
    }
  }

  &__desc {
    font-size: 15rem;
    display: block;
    font-weight: 500;

    &:not(:last-child) {
      margin-bottom: 2px;
    }
  }

  &__text {
    color: #aeaeae;
    display: block;
  }

  &__counter {
    width: 22rem;
    height: 22rem;
    flex-shrink: 0;
    background: $blue;
    border-radius: 100%;
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 4rem;
  }

  &__status {
    display: inline-flex;
    align-items: center;
    height: 23rem;
    padding: 0 7rem;
    background: #f4f3f4;
    border-radius: 3px;
    font-size: 13rem;
    color: $gray;
  }
}
</style>

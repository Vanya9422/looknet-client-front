<template lang="pug">
div
  form.chat-form(action="/chat" v-if="!blocked" ref="send-form")
    button-file.chat-form__file( @changeFiles="changeFiles()" accept="image/png, image/jpeg" name="files[]")
    .chat-form__field
      form-textarea.chat-form__textarea(
        v-model="message"
        ref="focusMe"
        :max="299"
        @enter="sendMessage()"
        :test="test"
        :key="key"
        :placeholder="PAGE_CHAT.form.placeholder"
        small
        @input="checkSize"
        @keydown="checkSize"
      )
      .chat-form__files(v-if="files.length > 0" )
        .chat-form__files-wrap
          .chat-form__files-item(v-for="(file, i) in files" :key="i")
            item-file.chat-form__item-file(
              @delete="deleteItem(i)"
              :img="isImage(file.type) ? file.file : ''"
              :isImage="isImage(file.type)"
              :docName="file.name"
              :docSize="Math.floor(file.size/1000) + ' KB'"
            )
    button.chat-form__send(@click.prevent="sendMessage")
      svg-icon(name="send")
  div.chat-blocked(v-else-if="blocked" @click.prevent="unBlock")
    button {{ PAGE_CHAT.body.unblock }}
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import inputMultiple from "@/mixins/inputMultiple";

export default {
  props: {
    blocked: {
      type: Boolean,
      default: false
    },
    unBlockedId: {
      type: Number,
      default: 0
    },
    is_closed: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      test:false,
      message: '',
      key: 0,
    }
  },
  created() {
    this.ifPageScroll()
  },
  computed: {
    ...mapGetters({
      ACTIVE_CONVERSATION_ID: 'chat/GET_ACTIVE_CONVERSATION_ID',
      CONVERSATION_TYPE: 'chat/CONVERSATION_TYPE',
      PAGE_CHAT: "pages/PAGE_CHAT",
    }),
  },
  mixins: [inputMultiple],
  methods: {
    ...mapActions({
      SEND_MESSAGE: 'chat/SEND_MESSAGE',
      UNBLOCK_USER: 'chat/UNBLOCK_USER'
    }),
    ...mapMutations({
      SET_SENDER_SIDEBAR: 'chat/SET_SENDER_SIDEBAR',
      SET_UNBLOCKED_FLAG_FOR_USER: 'chat/SET_UNBLOCKED_FLAG_FOR_USER',
      SET_FOCUS_AFTER_MESSAGE_SEND: 'chat/SET_FOCUS_AFTER_MESSAGE_SEND'
    }),
    ifPageScroll() {
      // let lastScrollTop = 0;
      //
      // window.addEventListener('scroll',  () => {
      //   const currentScrollTop = window.scrollY || window.pageYOffset;
      //   if (currentScrollTop  > lastScrollTop + 5 || currentScrollTop < lastScrollTop - 5) {
      //     this.$refs.focusMe.$el.firstChild.blur()
      //   }
      //   lastScrollTop = currentScrollTop;
      // });
    },
    isImage(str) {
      return str.includes('image')
    },
    unBlock() {
      this.UNBLOCK_USER(this.unBlockedId).then(res => {
        if (res.data.status === 'Success') {
          this.SET_UNBLOCKED_FLAG_FOR_USER(this.unBlockedId)
        }
      });
    },
    checkSize: _.throttle(function() {
        this.$emit('check-size');
    }, 500, { trailing: true, leading: false }),
    sendMessage() {
      let conversationType = '';
      this.$emit('send');
      const form = this.$refs['send-form'];
      const formData = new FormData(form);
      this.message !== '' ? formData.append('message', this.message) : null;

      this.SET_FOCUS_AFTER_MESSAGE_SEND(true);
      this.message = '';
      this.deleteItemAll();
      this.key++;


      if (this.CONVERSATION_TYPE === 'buying') {
        conversationType = 'resell';
      } else if (this.CONVERSATION_TYPE === 'resell') {
        conversationType = 'buying';
      }
      formData.append('conversation_type', conversationType);

      this.SEND_MESSAGE({data: formData, conversation_id: this.ACTIVE_CONVERSATION_ID})
        .then(res => {

        })
        .catch(err => {
          if (err.response.status === 422) {
            console.log('err', err.response.data.errors);
          }
        })
        .finally(() => {
          // console.log(this.$refs.focusMe);
          // this.$refs.focusMe.$el.firstChild.focus()
          this.$emit('send');
          if (process.client && localStorage.getItem('conversation')) {
            localStorage.removeItem('conversation');
          }
        });

    }

  },
}
</script>

<style lang="scss">
.chat-blocked {
  position: absolute;
  width: calc(100% + 10px);
  height: 44px;
  left: 0;
  bottom: 0;
  background: rgba(#FA8C8C, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border: none;
    outline: none;
    background: transparent;
    font-size: 17px;
    font-weight: 700;
    color: $red;
  }

  @include small-tablet {
    position: static;
    bottom: 40px;
    width: calc(100% + 50px);
    margin-left: -25px;
    margin-top: -5px;
    margin-bottom: -10px;
  }
}

.chat-form {
  position: relative;

  @include large-mobile {
    display: flex;
    align-items: flex-end;
  }


  &__file {
    position: absolute !important;
    left: 0;
    top: 0;
    z-index: 3;
    width: 50rem;
    padding-left: 12rem;

    .button-file {
      &__wrap {
        border: 0;

        svg {
          stroke: #464646;

        }
      }
    }

    @include large-mobile {
      left: 10px;
      position: relative;
      width: 28rem;
      min-width: 28rem;
      height: 28rem;
      padding-left: 0;
      margin-top: 10rem;
      margin-right: 10rem;
      .button-file {
        &__wrap {
          svg {
            stroke: #D2D2D7;

          }
        }
      }
    }
  }

  &__field {
    @include large-mobile {
      border: 1px solid $light-gray;
      border-radius: 10rem;
      max-width: calc(100% - 82rem);
      width: 100%;
      flex: 1 1 auto;
      position: relative;
      z-index: 5;
    }
  }

  &__textarea {
    position: relative;
    padding-left: 57rem;
    padding-right: 70rem;
    border: 1px solid #D2D2D7;
    border-radius: 10rem;

    &.textarea_small textarea {
      border-radius: 0;

    }

    @include large-mobile {
      padding: 15rem;
      border: 0;
      background: none;
      .textarea {

      }
      &.textarea_small {
        padding-top: 15px;
        padding-bottom: 15px;
        border-radius: 0;

        .textarea__field {
          height: 10px;
          padding-top: 0;
          padding-bottom: 0;
          border-radius: 0;
          overflow-y: auto;
        }

        textarea {
          //max-height: 80px !important;
        }
      }
    }

    .textarea {
      &__field {
        border: none;
        padding-left: 0;
        padding-right: 0;
        //padding-left: 57rem;
        //padding-right: 70rem;
      }
    }

    @include large-mobile {
      margin: -1px;
      .textarea {
        //&__field {
        min-height: 48px !important;
        // padding-left: 40rem;
        // padding-right: 0rem;

        //}
      }

    }
  }

  &__send {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    height: 60rem;
    width: 65rem;
    border: 0;
    background: none;
    cursor: pointer;
    fill: $blue;

    svg {
      width: 24rem;
      height: 24rem;
    }

    @include large-mobile {
      position: static;
      width: 48rem;
      min-width: 48rem;
      height: 48rem;
      background: $blue;
      border-radius: 15rem;
      fill: #fff;
      margin-left: 5rem;
      svg {
        width: 18rem;
        height: 18rem;
      }
    }
  }

  &__files {
    margin: 10rem -5rem 0 -5rem;
    overflow: hidden;

    &-wrap {
      display: flex;
      padding: 0 5rem;
      overflow-y: hidden;
      overflow-x: auto;
      margin-bottom: -40rem;
      padding-bottom: 40rem;
    }

    &-item {
      width: 100rem;
      flex-shrink: 0;

      &:not(:last-child) {
        margin-right: 10rem;
      }
    }

    @include large-mobile {
      margin: -5rem 10rem 10rem 10rem;
      &-wrap {
        padding-left: 0;
        padding-right: 0;
      }
      &-item {
        width: 78rem;

        &:not(:last-child) {
          margin-right: 6rem;
        }
      }
    }
  }

}

@include large-mobile {
  .section-chat .button-file.chat-form__file {
    width: 48px !important;
    height: 48px;
    left: auto;
    bottom: auto;
    transform: initial;
    position: relative !important;
    margin-top: 0;
  }
  .chat-form__send {
    //min-height: 42px !important;
    //height: 42px !important;
  }
  .chat-form__textarea .textarea__field {
    //min-height: 42px !important;
    //height: 42px !important;
  }
}
</style>

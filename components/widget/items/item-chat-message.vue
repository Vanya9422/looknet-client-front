<template lang="pug">
  .chat-message(:class="Mods")
    .chat-message__avatar
      set-img.object-fit(v-if="avatar" :src="avatar" small)
      svg-icon(v-else name="user")
    .chat-message__info
      .chat-message__head
        .chat-message__name.p.b {{name}}
        .chat-message__time {{time}}
      .chat-message__list
        .chat-message__item(v-for="(item, i) in content" :key="i" :data-id="id")
          .chat-message__item-wrap(v-if="item.text")
            .chat-message__text.p(v-html="item.text")
            .chat-message__read(:class="{'is-read':item.read}" v-if="isAuthIdEqualMessageableId")
              svg-icon(name="readMessage")
      .chat-message__gallery.flex(v-if="gallery.length > 0")
        CoolLightBox(
          :items="media"
          :index="index"
          @close="index = null"
          closeOnClickOutsideMobile
          :slideshow="false"
          overlayColor=" rgba(6, 36, 57, 0.34)"
        )
          template(#icon-previous)
            button-close.modal__close.modal-left(icon="arrowRight")
          template(#icon-next)
            button-close.modal__close.modal-right(icon="arrowRight")
          template(#loading)
            div
          template(#close)
            button-close.modal__close(@click.native='index = null')
        .chat-message__gallery-item(v-for="(img, i) in gallery" :key="i")
          .chat-message__gallery-img
            img.object-fit(:src="img.original_url ||img.original_full_url" @click="index = i")
</template>

<script>
export default {
  data() {
    return {
      index: null,
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    avatar: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: "Johnson"
    },
    time: {
      type: String,
      default: "07:00 am"
    },
    answer: {
      type: Boolean,
      default: false
    },
    messagable_id: {
      type: Number,
      default: 0
    },
    content: {
      type: Array,
      default: () => ([])
    },
    gallery: {
      type: Array,
      default: () => ([])
    },
    chatEnd: {
      type: Boolean,
      default: false
    }
  },

  computed: {

    isAuthIdEqualMessageableId() {
      return this.$auth.user.id === this.messagable_id;
    },
    Mods() {
      return {
        'chat-message_answer': this.isAuthIdEqualMessageableId,
        'chat-message_end': this.chatEnd
      }
    },
    media() {
      if (!this.gallery) return {}
      return this.gallery.map(element => {
        return element.original_url || element.original_full_url
      });
    }
  }
}
</script>

<style lang="scss">
.chat-message {
  display: flex;

  &_answer {
    justify-content: flex-end;

    .chat-message {
      &__head {
        justify-content: flex-end;
      }

      &__name {
        order: 2;
      }

      &__time {
        margin-left: 0;
        margin-right: 10rem;
      }

      &__avatar {
        order: 2;
      }

      &__info {
        order: 1;
        margin-left: 0;
        margin-right: 20rem;
        @include large-mobile {
          margin: 0;
        }
      }

      &__item {
        display: flex;
        justify-content: flex-end;

        &-wrap {
          background: #EEF1FE;
        }

        &:first-child {
          .chat-message__item-wrap {
            border-radius: 10rem 0 10rem 10rem;
          }
        }
      }
    }

    .chat-message__gallery {
      justify-content: flex-end;
    }

    @include large-mobile {
      .chat-message {
        &__info {
          // margin-right: 0;
        }
      }
    }
  }

  &__avatar {
    width: 40rem;
    height: 40rem;
    min-width: 40rem;
    position: relative;
    overflow: hidden;
    border-radius: 100%;

    @include large-mobile {
      display: none;
    }
  }

  &__info {
    margin-left: 20rem;
    width: 100%;
    @include large-mobile {
      margin: 0;
    }
  }

  &__head {
    display: flex;
  }

  &__name {
    @include large-mobile {
      font-size: 16rem;
    }
  }

  &__time {
    margin-left: 10rem;
    padding-top: 3rem;
    color: #AEAEAE;
    @include large-mobile {
      padding-top: 2rem;
      font-weight: normal;
    }
  }

  &__list {
    margin-top: 5rem;
  }

  &__item {
    &:not(:first-child) {
      margin-top: 10rem;
    }

    &-wrap {
      display: inline-flex;
      align-items: flex-end;
      padding: 15rem 20rem;
      background: #F4F3F4;
      border-radius: 10rem;
      max-width: 530rem;
    }

    &:first-child {
      .chat-message__item-wrap {
        border-radius: 0 10rem 10rem 10rem;

        div {
          overflow-wrap: anywhere;
        }
      }
    }
  }

  &__read {
    width: 18rem;
    height: 11rem;
    flex-shrink: 0;
    stroke: #AEAEAE;
    stroke-width: 1.5;
    fill: none;
    margin-left: 15rem;
    margin-bottom: 4rem;

    &.is-read {
      stroke: $blue;

    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__gallery {
    padding-top: 5rem;
    margin-left: -10rem;

    &-item {
      width: 265rem;
      margin-left: 10rem;
      margin-top: 10rem;
    }

    &-img {
      position: relative;
      overflow: hidden;
      padding-top: 100%;
      border-radius: 6rem;
      cursor: pointer;
    }

    @include large-mobile {
      &-item {
        width: calc(50% - 10rem);
      }
    }
  }
  &_end {
    .chat-message {

      &__avatar {
        background: $blue;
      }
      &__item-wrap {
        max-width: 100%;
        width: 100%;
        padding: 28px 20px;
      }
    }

    img {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 18px;
      height: 18px;
    }
  }
}
  .chat-message__avatar{
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
      width: 20rem;
      height: 20rem;
      fill: transparent;
      stroke: #fff;
    }
    @include large-mobile {
      display: none;
    }
}
</style>

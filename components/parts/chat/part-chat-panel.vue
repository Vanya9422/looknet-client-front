<template lang="pug">
  .chat-panel
    .chat-panel__row.flex.flex_vertical.flex_justify
      .chat-panel__column
        form-checkbox.chat-panel__select(checked light @change.native="$emit('closePanel')") {{ count }} {{ PAGE_CHAT.panel.selected }}
      .chat-panel__column.flex.flex_vertical
        button-medium.chat-panel__btn(icon="delete" blue small @click.native.prevent="deleteChat") {{ POPUP_GLOBAL.delete }}
        <!--button-medium.chat-panel__btn(icon="noneUser" blue small ) Deactivate-->
        button-medium.chat-panel__btn(  blue small @click.native="$emit('closePanel')") {{ POPUP_GLOBAL.cancel }}
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      PAGE_CHAT: "pages/PAGE_CHAT",
      POPUP_GLOBAL: "popup/POPUP_GLOBAL",
    })
  },
  methods:{
    deleteChat() {
      this.$bvModal.show(`modal-delete`)
    },
  }
}
</script>

<style lang="scss">
.chat-panel {
  position: absolute;
  right: 0;
  left: 0;
  background: $blue;
  color: #fff;
  padding: 13rem 10rem 13rem 20rem;
  border-radius: 18rem;
  bottom: 20rem;
  margin-left: 10rem;
  margin-right: 10rem;
  flex: none !important;
  z-index: 3;
  @include large-tablet {
    padding: 20rem;
  }

  &__row {
    width: 100%;

  }

  &__btn {

  }

  &__cancel {
    margin-left: 10rem;
  }
}
</style>

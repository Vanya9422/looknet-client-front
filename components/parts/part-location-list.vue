<template lang="pug">
  .modal-location__list-item
    .modal-location__list-header
      //.modal-location__list-title {{title}}
      button.modal-location__list-all(v-if="showAllButton" @click="$emit('state',{id: 'c1'})") {{ PAGE_HOME.search.city }}
        img(src="~/assets/img/location-black.svg")
      button.modal-location__list-helper(v-if="!withOutAuth" @click="$emit('help')") {{POPUP_LOCAL.automatically}}
        img(src="~/assets/img/location-white.svg")
    .modal-location__item(
      v-for="(item,index) in list"
      v-if="item.name"
      :key="'new-key-' + index"
      @click="$emit('state',item)"
      :class="{active:active === item.id && index !== 0}"
    )
      template {{item.name}}
      span(v-if="showState") {{ item.state_minimal_select.name}}
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: 'State'
    },
    showAllButton: {
      type: Boolean,
      default: false
    },
    active: {
      type: [Number,String],
      default: 0
    },
    list: {
      type: [Array, Object],
      default: () => []
    },
    showState: {
      type: Boolean,
      default: false
    },
    withOutAuth:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      POPUP_LOCAL: 'popup/POPUP_LOCAL',
      PAGE_HOME: "pages/PAGE_HOME",
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.modal-location {
  &__list-header {
    gap: 10px;
  }

  &__list-all,
  &__list-edit {
    flex-grow: 1;
  }
}
</style>

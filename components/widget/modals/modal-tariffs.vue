<template lang="pug">
  b-modal(
    id="modal-tariffs"
    ref="modal-tariffs"
    size="tariffs-size"
    modal-class="modal-tariffs"
    body-class="modal-tariffs__body"
    header-class="modal-tariffs__header"
    footer-class="modal-tariffs__footer"
    centered
    :hide-footer="true"
    @show="openModal"
    @hide="hideModal"
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='hideModal()')
    .modal-tariffs__container.css-scrollbar
      h3.modal-tariffs__title.h3 {{PAGE_MODAL_TARIFF.title}}
      .modal-tariffs__desc.color-gray.h4 {{PAGE_MODAL_TARIFF.desc}}
      button-switcher.modal-tariffs__switcher(:items="GROUP" @change="SET_GROUP_ACTIVE" :active="GROUP_ACTIVE")
      .modal-tariffs__list.flex(v-if="TARIFFS.length > 0")
        item-tariff.modal-tariffs__item(
          v-for="(tariff, i) in TARIFFS"
          :key="i"
          :img="tariff.avatar"
          :id="tariff.id"
          :productId="productId"
          :title="tariff.name"
          :price="tariff.price"
          :time="PAGE_MODAL_TARIFF.month"
          :choose="PAGE_MODAL_TARIFF.choose"
          :more="PAGE_MODAL_TARIFF.more"
          :list="tariff.description"
          :status="'Top'"
          :blue="i === 1"
        )
      .modal-tariffs__empty(v-else)
        img(class="modal-tariffs__empty-image" :src="require(`~/assets/img/not-notification___chat.png`)")

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    productId: {
      type: [Number, String, Array],
      default: null,
    }
  },
  computed: {
    ...mapGetters({
      GROUP: 'tariffs/GROUP',
      TARIFFS: 'tariffs/TARIFFS',
      GROUP_ACTIVE: 'tariffs/GROUP_ACTIVE',
      PAGE_MODAL_TARIFF: 'pages/PAGE_MODAL_TARIFF',
    })
  },
  watch:{
    '$i18n.locale'(){
      this.SET_PAGE_MODAL_TARIFF(this.$i18n.locale)
    }
  },
  created() {
    this.SET_PAGE_MODAL_TARIFF(this.$i18n.locale)
  },
  methods: {
    ...mapActions({
      SET_GROUP_ACTIVE: 'tariffs/SET_GROUP_ACTIVE',
      SET_PAGE_MODAL_TARIFF: 'pages/SET_PAGE_MODAL_TARIFF'
    }),
    openModal() {
      this.SET_GROUP_ACTIVE()
    },
    hideModal() {
      this.$refs['modal-tariffs'].hide()
      this.$emit('close')
    }
  }
}
</script>

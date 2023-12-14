<template lang="pug">
  b-modal(
    id="modal-faq"
    ref="modal-faq"
    size="faq"
    modal-class="modal-faq"
    body-class="modal-faq__body"
    header-class="modal-faq__header"
    footer-class="modal-faq__footer"
    centered
    :hide-footer="true"
    @hide="closeModal"
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='closeModal')
    .modal-faq__title.h3 {{ title }}
    .modal-faq__list
      item-faq.faq__item(
        v-for="(item, i) in faqList"
        :key="i"
        :title="item.title"
        :content="item.desc"
        :active="item.active"
        groupName="i"
      )

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Beware of scrammersy'
    },
    faqList: {
      type: Array,
      default: () => ([]),
    },
  },
  methods: {
    closeModal() {
      this.$refs['modal-faq'].hide();
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss">
.modal-faq {
  @include large-mobile {
    padding: 0 !important;
  }

  &__title {
    padding-left: 10rem;
  }

  &__list {
    margin-top: 10rem;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 70vh;
    margin-right: -30px;
    padding-right: 30px;
  }
}
</style>
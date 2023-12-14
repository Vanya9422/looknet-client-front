<template lang="pug">
  b-modal(
    id="modal-tariff-status"
    ref="modal-tariff-status"
    size="thank-size"
    modal-class="modal-thank"
    body-class="modal-thank__body"
    header-class="modal-thank__header"
    footer-class="modal-thank__footer"
    centered
    @hide="hideModal"
    :hide-footer="true"
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='hideModal()')
    div(:class="status === 'success'?'modal-thank__icon':'modal-thank-error__icon'")
      svg-icon(name="check")
    .modal-thank__title.h2.h2_big {{status === 'success' ? POPUP_THANK.title : 'ERROR'}}
    .modal-thank__desc.color-gray.h4 {{POPUP_THANK.desc}}
    button-primary.modal-thank__btn(to="/" :blue="status === 'success' " :red="status !== 'success' ") {{POPUP_THANK.btn}}
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    status: {
      type: String,
      default: 'error'
    }
  },
  computed: {
    ...mapGetters({
      POPUP_THANK: 'popup/POPUP_THANK'
    })
  },
  created() {
    this.getPage()
  },
  methods: {
    ...mapActions({
      SET_POPUP_THANK: 'popup/SET_POPUP_THANK'
    }),
    getPage() {
      this.SET_POPUP_THANK(this.$i18n.locale)
    },
    hideModal(){
      this.$refs['modal-tariff-status'].hide()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.modal-thank {
  .modal-content {
    padding-top: 70rem;
    padding-bottom: 70rem;
  }

  @include large-mobile {
    padding: 0 !important;
    .modal-content {
      border-radius: 10rem 10rem 0 0;
      padding: 50rem 15rem 20rem 15rem;
    }
  }

  &__body {
    text-align: center;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 77rem;
    height: 77rem;
    background: #EEF1FE;
    border-radius: 100%;
    margin: 0 auto;

    svg {
      width: 30rem;
      height: 23rem;
      fill: none;
      stroke: $blue;
      stroke-width: 1.5;
    }
  }

  &__title {
    margin-top: 30rem;

    @include large-mobile {
      font-family: 'Atyp Display';
      margin-top: 25rem;
      line-height: 1;
      font-weight: 500;
    }
  }

  &__desc {
    margin: 20rem auto 0 auto;
    font-weight: 400;
    max-width: 400rem;
    @include large-mobile {
      line-height: 1.3;
      font-size: 16rem;
      max-width: 272rem;
    }
  }

  &__btn {
    min-width: 190rem;
    margin-top: 40rem;

    @include large-mobile {
      width: 100%;
      margin-top: 60rem;
    }
  }
}
.modal-thank-error__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 77rem;
  height: 77rem;
  background: #FCE7E7;
  border-radius: 20rem;
  margin: 0 auto;

  svg {
    width: 30rem;
    height: 23rem;
    fill: transparent;
    stroke: $red;
    stroke-width: 1.5;
  }
}
</style>

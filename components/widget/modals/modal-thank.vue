<template lang="pug">
  b-modal(
    :id="id || 'modal-thank'"
    ref="modal-thank"
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
    .modal-thank__icon
      svg-icon(name="check")
    .modal-thank__title.h2.h2_big {{ title || POPUP_THANK.title }}
    .modal-thank__desc.color-gray.h4 {{ desc || POPUP_THANK.changesSaved }}
    template(v-if="showButton")
      button-primary.modal-thank__btn(v-if="notRedirectToHome" @click.native.prevent="hideModal()" blue) {{ POPUP_GLOBAL.close }}
      button-primary.modal-thank__btn(v-else :to="redirectTo || $locationPath('/')" blue) {{ POPUP_THANK.btn }}
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    notRedirectToHome: {
      type: Boolean,
      default: false
    },
    redirectTo: {
      type: String,
    },
    id: {
      type: String,
      default: '',
    },
    showButton: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      POPUP_THANK: 'popup/POPUP_THANK',
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
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
    hideModal() {
      this.$refs['modal-thank'].hide();
      this.$emit('close');
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
</style>

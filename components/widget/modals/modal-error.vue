<template lang="pug">
b-modal(
  :id="id || 'modal-error'"
  ref="modal-error"
  size="error-size"
  modal-class="modal-error"
  body-class="modal-error__body"
  header-class="modal-error__header"
  footer-class="modal-error__footer"
  centered
  @hide="hideModal"
  :hide-footer="true"
)
  template(#modal-header='{ close }')
    button-close.modal__close(@click.native='hideModal()')
  .modal-error__icon
    img(src="@/assets/sprite/svg/danger2.svg")
  .modal-error__title.h2.h2_big {{ title || POPUP_ERROR.title }}
  .modal-error__desc.h4 {{ desc || POPUP_ERROR.desc }}
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
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters({
      POPUP_ERROR: 'popup/POPUP_ERROR',
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
    })
  },
  created() {
    this.getPage()
  },
  methods: {
    ...mapActions({
      SET_POPUP_ERROR: 'popup/SET_POPUP_ERROR',
    }),
    getPage() {
      this.SET_POPUP_ERROR();
    },
    hideModal() {
      this.$refs['modal-error'].hide()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.modal-error {
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
    @include large-mobile {
      padding-top: 65rem;
      padding-bottom: 65rem;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 77rem;
    height: 77rem;
    margin: 0 auto;
    pointer-events: none;
    user-select: none;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
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
    color: #EB5757;

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

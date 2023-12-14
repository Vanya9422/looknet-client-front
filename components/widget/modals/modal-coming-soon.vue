<template>
  <b-modal
    :id="id || 'modal-coming-soon'"
    size="thank-size"
    modal-class="modal-coming-soon"
    body-class="modal-coming-soon__body"
    header-class="modal-coming-soon__header"
    footer-class="modal-coming-soon__footer"
    centered="centered"
    :hide-footer="true"
  >
    <template #modal-header="{ close }">
      <button-close class="modal__close" @click.native="$bvModal.hide('modal-coming-soon')" />
    </template>
    <div class="modal-coming-soon__title h2 h2_big">
      {{ POPUP_COMING_SOON.title }}
    </div>
    <template v-if="showButton">
      <button-primary
        class="modal-coming-soon__btn"
        @click.native.prevent="$bvModal.hide('modal-coming-soon')"
        blue="blue"
      >
        {{ POPUP_GLOBAL.close }}
      </button-primary>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: ''
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
      POPUP_COMING_SOON: "popup/POPUP_COMING_SOON",
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
    })
  },
  async fetch() {
    await this.SET_POPUP_COMING_SOON();
  },
  methods: {
    ...mapActions({
      SET_POPUP_COMING_SOON: 'popup/SET_POPUP_COMING_SOON',
    }),
  }
}
</script>

<style lang="scss">
.modal-coming-soon {
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

  &__title {
    margin-top: 30rem;
    padding: 40rem 0;

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
}</style>

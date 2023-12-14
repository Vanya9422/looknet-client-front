<template lang="pug">
  b-modal(
    id="modal-logout-confirm"
    ref="modal-logout-confirm"
    size="thank-size"
    modal-class="modal-logout-confirm"
    body-class="modal-logout-confirm__body"
    header-class="modal-logout-confirm__header"
    footer-class="modal-logout-confirm__footer"
    centered
    @hide="closeModal"
    :hide-footer="true"
  )
    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='closeModal')

    .modal-logout-confirm__icon
      svg-icon(name="User")

    .modal-logout-confirm__title.h2.h2_big {{ PAGE_LOGOUT.title }}
    .modal-logout-confirm__desc.color-gray.h4 {{ PAGE_LOGOUT.description }}
    .modal-logout-confirm__btns
      button-primary.modal-logout-confirm__btn(@click.native.prevent="closeModal") {{ PAGE_LOGOUT.cancel }}
      button-primary.modal-logout-confirm__btn(@click.native.prevent="LOGOUT" class="red") {{ PAGE_LOGOUT.exit }}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pageTranslate from "@/mixins/pageTranslate";

export default {
  async fetch() {
    await this.getPageTranslate();
  },
  mixins: [pageTranslate],
  computed: {
    ...mapGetters({
      PAGE_LOGOUT: 'pages/LOGOUT',
    })
  },
  methods: {
    ...mapActions({
      SET_PAGE_LOGOUT: 'pages/SET_PAGE_LOGOUT',
      LOGOUT: 'user/LOGOUT',
    }),
    async getPageTranslate() {
      await this.SET_PAGE_LOGOUT();
    },
    closeModal() {
      this.$root.$emit('bv::hide::modal', 'modal-logout-confirm')
    },
  }
}
</script>

<style lang="scss">
.modal-logout-confirm {
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
    background: #FCE7E7;
    border-radius: 20rem;
    margin: 0 auto;

    svg {
      width: 30rem;
      height: 23rem;
      stroke: none;
      fill: $red;
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
    min-width: 131rem;
    margin-top: 40rem;
    background: #F4F3F4;
    border-radius: 10px;

    @include large-mobile {
      width: 100%;
      margin-top: 60rem;
    }

    &s {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 13px;
    }

    &:hover {
      color: inherit;
    }

    &.red,
    &.green {
      color: #fff !important;
      border-radius: 10px;

      &:hover {
        color: #fff;
      }
    }

    &.red {
      background: #EB5757 !important;
    }

    &.green {
      background: $green !important;
    }
  }

}

.modal-success__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 77rem;
  height: 77rem;
  background: rgba($green, 0.1);
  border-radius: 20rem;
  margin: 0 auto;

  svg {
    width: 30rem;
    height: 23rem;
    stroke: none;
    fill: $green;
    stroke-width: 1.5;
  }
}</style>

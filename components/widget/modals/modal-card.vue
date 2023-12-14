<template lang="pug">
  b-modal(
    id="modal-card"
    ref="modal-card"
    size="card-size"
    modal-class="modal-card"
    body-class="modal-card__body"
    header-class="modal-card__header"
    footer-class="modal-card__footer"
    centered
    :hide-footer="true"
    v-show="DETAIL"
    @hide="closeModal"
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='closeModal')
    swiper-nav.modal-card__nav(
      light
      @prev="changeDetails(true)"
      @next="changeDetails"
      :notShowPrev="DETAIL_ACTIVE > 0"
      :notShowNext="DETAIL_ACTIVE < DETAIL_LIST.length - 1"
    )
    transition(v-if="DETAIL")
      .modal-card__row.flex.flex_justify
        .modal-card__column.modal-card__column_left
          part-single-gallery.modal-card__gallery(v-if="DETAIL" :TestImages="DETAIL.gallery")
        .modal-card__column.modal-card__column_right(v-if="DETAIL")
          part-single-sidebar.modal-card__info(
            showAvatarMobile
            :fake='fakeData'
            :id="DETAIL.id"
            :title="DETAIL.name"
            :cost="cost"
            :user="DETAIL.author"
            :info="DETAIL"
            :contacts="DETAIL.contacts"
            :phoneNumber="DETAIL.contact_phone"
            moreDetails
            @close="closeModal"
          )
    .mobile-card__footer
      swiper-nav.mobile-card__footer-nav(
        light
        @prev="changeDetails(true)"
        @next="changeDetails"
        :notShowPrev="DETAIL_ACTIVE > 0"
        :notShowNext="DETAIL_ACTIVE < DETAIL_LIST.length - 1"
      )
      button-primary.mobile-card__footer-button(@click.native='closeModal') {{PAGE_PRODUCT_DETAILS.close}}
    transition(v-if="!DETAIL")
      .loading-block
        loader.white.big

</template>

<script>
import {numberWithSpaces} from "~/assets/js/functions"
import {mapActions, mapGetters} from "vuex";
import fakeService from "~/core/services/fakeService";

export default {
  data() {
    return {
      numberWithSpaces
    }
  },
  computed: {
    ...mapGetters({
      DETAIL: 'product/MODAL_DETAIL',
      DETAIL_LIST: 'product/DETAIL_LIST',
      DETAIL_ACTIVE: 'product/DETAIL_ACTIVE',
      PAGE_PRODUCT_DETAILS:'pages/PAGE_PRODUCT_DETAILS'
    }),

    cost() {
      if (this.DETAIL.price_policy === 1) return `$ ${this.numberWithSpaces(this.DETAIL.price)}`
      if (this.DETAIL.price_policy === 2) return "Exchange"
      return  "Free"
    },
    fakeData(){
      const data = fakeService.getFaked(this.DETAIL)
      return data;
    }
  },
  methods: {
    ...mapActions({
      SET_MODAL_DETAIL: 'product/SET_MODAL_DETAIL',
      SET_DETAIL_LIST: 'product/SET_DETAIL_LIST',
      SET_DETAIL_ACTIVE: 'product/SET_DETAIL_ACTIVE',
    }),
    changeDetails(flag) {
      const getItem = this.DETAIL_LIST
      let getActive = this.DETAIL_ACTIVE
      if (flag) {
        if (getActive > 0) getActive--
      } else {
        if (getActive < getItem.length) getActive++
      }
      this.SET_DETAIL_ACTIVE(getActive)
      const slug = getItem[getActive]
      this.$axios.$post(`/statistics/${slug}/view-details`)
      this.SET_MODAL_DETAIL(slug)
    },
    closeModal() {
      this.SET_DETAIL_LIST([])
      this.SET_DETAIL_ACTIVE(0)
      this.$refs['modal-card'].hide();
    },
    openModal(event){
      event.preventDefault()
      // this.$refs['modal-card'].show();
    },
  }

}
</script>

<style lang="scss">
.mobile-card__footer {
  display: none;
  @include large-mobile{
    display: block;
    position: fixed;
    width: 100%;
    height: 70px;
    background: #fff;
    bottom: 0;
    left: 0;
    padding: 7px 0 12px;
    z-index: 99;

    &-nav {
      position: relative;
      padding: 0 75px;

      .button-arrow {
        width: 50px;
        height: 50px;
        position: absolute;
        padding: 0;
        margin: 0;

        &.swiper-button-prev {
          left: 15px;
        }

        &.swiper-button-next {
          right: 15px;
        }
      }
    }
    &-button{
      width: calc(100% - 150px);
      margin: 0 75px;
    }
  }

}

.modal-card {
  @include large-mobile {
    padding: 0 !important;
    .modal-content{
      position: relative;
      overflow: hidden;
      height: auto;
    }

    .single-gallery__slider  img {
        border-radius: 10px;
        overflow: hidden;
      }
    .single-gallery__preview {
      margin-right: 15px;
      margin-top: 0;
      margin-left: 15px;
    }
    .modal-card__column_left {
      padding-right: 0;
      overflow: hidden;
      min-height: 300rem;
    }

    .modal-card__column_right {
      min-width: 100%;
      width: 100%;
    }
    .modal-card__nav .swiper-button {
      display: none;
    }
    .modal__close {
      display: none;
    }
    .modal-card__column_left {
      width: 100%;
    }
    .modal-content {
      padding: 0  !important;
    }
  }

  .modal-dialog.modal-card-size {
    transform: none;
  }

  @include small-tablet {
    .modal-card__column_right { // TODO поправить дизайн
      min-width: 100%;
      width: 100%;
    }
  }

  @include large-tablet {
    .modal-content {
      padding-left: 30rem;
      padding-right: 30rem;
    }
    .modal-dialog.modal-card-size {
      transform: translate(0, 30rem);
    }
    &.show .modal-dialog.modal-card-size {
      transform: none;
    }
  }

  &__nav {
    .swiper-button {
      position: absolute;
      top: 50%;
      margin-top: -25rem;
      z-index: 100;

      &.swiper-button-prev, &-prev {
        right: 100%;
        margin-right: 20rem;
      }

      &-next {
        left: 100%;
        margin-left: 20rem;
      }
    }

    @include large-tablet {
      .swiper-button {
        &.swiper-button-prev, &-prev {
          margin-right: -40rem;
        }

        &-next {
          margin-left: -40rem;
        }
      }
    }
  }

  &__body {
    position: static;
  }

  &__row {
    flex-wrap: nowrap;
    @include small-tablet {
      flex-direction: column;
    }
    @include large-mobile{
      overflow-y: auto;
      max-height: 80vh;
      padding: 0 10px 90px;
      margin: 10px 0;
    }
  }

  &__column {
    &_left {
      width: calc(100% - 400rem);
      padding-right: 20rem;
      @include large-desktop {
        width: calc(100% - 350rem);
      }
      @include small-tablet {
        width: 100%;
        padding-right: 0;
      }

      .single-gallery__slider {
        @include small-tablet {
          border-radius: 10rem;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }
        @include large-mobile {
          border-radius: 0;
          width: calc(100% + var(--wrapper-offset) * 2);
          margin-left: calc(-1 * var(--wrapper-offset));
          margin-right: calc(-1 * var(--wrapper-offset));
        }
      }
    }

    &_right {
      width: 400rem;
      min-width: 400rem;
      position: relative;
      margin-right: -7px;
      @include large-desktop {
        width: 350rem;
        min-width: 350rem;
      }
      @include large-mobile {
        padding: 0 5px 10px;
      }
      //@include small-tablet {
      //  width: 100%
      //}
    }

  }

  &__info {
    height: 100%;
  }

  .single-sidebar {
    display: flex;
    flex-direction: column;

    &__user {
      margin-top: 30rem;
      @include large-mobile {
        margin-top: 17px;
        margin-bottom: 0;
      }

    }

    @include large-mobile {
      padding: 10px 0;
      .button-primary_gray {
        margin: 18px 0 10px;
        height: 50px
      }
    }
  }

  .single-gallery {
    &__preview {
      padding-top: 61%;
    }
  }

  @include large-desktop {
    .single-gallery {
      &__preview {
        padding-top: 72%;
      }
    }
  }

  @include large-mobile {
    .single-gallery {
      &__preview {
        padding-top: 290rem;
      }
    }
  }

  .loading-block {
    height: 65vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

}
</style>

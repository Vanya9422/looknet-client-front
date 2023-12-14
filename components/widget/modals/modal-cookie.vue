<template lang="pug">
.modal-cookie
  .modal-cookie__container
    .modal-cookie__left
      .modal-cookie__text {{ POPUP_COOKIE.title1 }}&nbsp;
      a.modal-cookie__link(:href="$locationPath('/privacy-policy')" target="_blank") {{ POPUP_COOKIE.title2 }}&nbsp;
      .modal-cookie__text {{ POPUP_COOKIE.title3 }}
    .modal-cookie__right
      button-primary.modal-cookie__btn(@click.native.prevent="accept") {{ POPUP_COOKIE.allow }}
      button-primary.modal-cookie__btn(@click.native.prevent="close") {{ POPUP_COOKIE.decline }}
  </template>

  <script>
  import { mapActions, mapGetters } from "vuex";

  export default {
    computed: {
      ...mapGetters({
        POPUP_COOKIE: 'popup/POPUP_COOKIE',
      }),
    },
    created() {
      this.getPage();
    },
    methods: {
      ...mapActions({
        SET_POPUP_COOKIE: 'popup/SET_POPUP_COOKIE',
        SET_EVENT: 'gtm/SET_EVENT'
      }),
      getPage() {
        this.SET_POPUP_COOKIE();
      },
      close() {
        this.SET_EVENT('cookies-decline')
        this.$emit('close');
      },
      accept() {
        if (process.client) {
          localStorage.setItem('acceptedCookies', true);
        }
        this.SET_EVENT('cookies-allow')
        this.close();
      },
    }
  }
  </script>

  <style lang="scss">
  .modal-cookie {
    position: fixed;
    width: 100%;
    bottom: 35rem;
    z-index: 1000;
    @include large-mobile {
      bottom: 70px;
    }
    &__container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: auto;
      padding: 15rem;
      border-radius: 10rem;
      width: 700rem;
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      backdrop-filter: saturate(180%) blur(20px);
      background-color: rgba(249,248,253,.7);
      @include small-tablet {
        width: 90vw;
      }
    }
    &__left, &__right {
      display: flex;
      align-items: center;
      flex-direction: row;
    }
    &__left {
      font-size: 16rem;
      padding : 0 10rem;
      flex-wrap: wrap;
      @include small-mobile {
        font-size: 14rem;
      }
    }
    &__btn {
      border: 1px solid #212324;
      background: none;
      height: 47rem;
      padding: 0 18rem;
      margin-left: 8rem;
      transition: background-color 0.3s ease 0s;
      &:hover {
        color: #fff !important;
        background: #212324;
      }
      @include small-mobile {
        height: 30rem;
        padding: 0 10rem;
        font-size: 14rem;
      }
    }
    &__link {
      text-decoration: underline !important;
      &:hover {
        color: #556DEE;
      }
    }
  }
  </style>

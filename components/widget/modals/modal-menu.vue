<template lang="pug">
  b-modal(
    id="modal-menu"
    ref="modal-menu"
    size="languages"
    modal-class="modal-menu"
    body-class="modal-menu__body"
    header-class="modal-menu__header"
    footer-class="modal-menu__footer"
    :hide-footer="true"
    @hide="closeModal"
    centered
  )
    template(#modal-header)
      button-close.modal__close(@click.native='closeModal()')
    h3.modal-menu__title.h3 {{ PAGE_MODAL_MENU.title }}
    .modal-menu__list.modal-menu__list-1
      .modal-menu__item(v-for="(item,i) in menu" :key="i" v-if="!item.isUser || $auth.loggedIn === true && item.isUser" :class="`btn-item-${item.icon}`")
        button-border.w-full(
          :icon="item.icon"
          :to="!item.action ? $locationPath(item.to) : null"
          :class="{'button-nav_notif' : item.notif}"
          @click.native="navigationClick(item)"
        )
          | {{item.text}}
      .modal-menu__item
        button-border.w-full(icon="lang" v-b-modal.modal-languages)  {{PAGE_MODAL_MENU.lang}}
      .modal-menu__item
        button-border.w-full(v-if="$auth.loggedIn" red icon="exit" v-b-modal.modal-logout-confirm ) {{PAGE_MODAL_MENU.exit}}
    template(v-if="!$auth.loggedIn")
      h3.modal-menu__title.h3 {{PAGE_MODAL_MENU.log}}
      .modal-menu__list
        .modal-menu__item
          button-primary.w-full(blue v-b-modal.modal-login) {{PAGE_MODAL_MENU.logIn}}
        .modal-menu__item
          button-primary.w-full(light :to="$locationPath('/auth/registration')")  {{PAGE_MODAL_MENU.register}}
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import pageTranslate from "@/mixins/pageTranslate";
import { cloneDeep } from 'lodash';

export default {
  props: {
    title: {
      type: String,
      default: 'Technical assistance'
    },
  },
  computed: {
    ...mapGetters({
      PAGE_MODAL_MENU: 'pages/PAGE_MODAL_MENU',
    }),
    menu() {
      let menu = cloneDeep(this.PAGE_MODAL_MENU.menu);
      let unreadMessagesCount = this.$auth.loggedIn ? this.$auth.user.isset_unread_chat_messages : 0;
      menu.forEach(item => {
        item.notif = false
        if (item.icon === 'chatBorder' && unreadMessagesCount) item.notif = 1
        if (item.icon === 'bell') item.notif = this.$auth.loggedIn ? this.$auth.user.unread_notifications_count : 0
      });
      return menu
    },
  },
  created() {
    this.getPageTranslate();
  },
  watch: {
    $route(to, from) {
      this.$bvModal.hide('modal-menu')
    }
  },
  mixins: [pageTranslate],
  methods: {
    ...mapActions({
      SET_PAGE_MODAL_MENU: 'pages/SET_PAGE_MODAL_MENU',
      SET_LOCATION: 'location/SET_LOCATION'
    }),
    getPageTranslate() {
      if (process.client && !this.$screen.ld) this.SET_PAGE_MODAL_MENU()
    },
    // logOut() {
    //   const channels = Object.keys(this.$echo.connector.channels);
    //   channels.map(item => this.$echo.leave(item));
    //   this.$auth.logout();
    //   // this.SET_LOCATION({city: null})
    // },
    closeModal() {
      this.$bvModal.hide('modal-menu');
      this.$emit('closeToggle', false)
    },

    navigationClick(item){
      if(item?.action){
        this[item.action](item)
      }
    },
    feedbackHandler(item){
      this.$root.$emit('bv::show::modal', 'modal-self-reviews')
    }
  }
}
</script>
<style lang="scss">
.modal-menu {
  padding: 0;

  &.modal-dialog {
    max-width: 632px;
    width: 100%;
  }

  .modal-content {
    padding: 50rem;
	  transition: opacity 0.1s linear;
    // transition: ease 0.3s !important;
    // transition-delay: unset !important;


    @include large-mobile {
      padding: 30rem 20rem;
    }
  }

  .modal__close {
    width: 34rem;
    height: 34rem;
  }

  &__title {
    font-weight: 500;
    font-family: 'Atyp Display';
    margin-bottom: 16px;
  }

  &__list-1 {
    margin-bottom: 32px;

    .button-border {
      justify-content: flex-start;
      line-height: 1;

      .button-border__icon {
        fill: transparent;
        stroke: #6E6E73;
        width: 18px;
        height: 18px;
      }

      &.button-border_red .button-border__icon {
        stroke: $red;
      }
    }
  }

  &__item {
    margin-bottom: 8px;

    &:nth-last-child(1) {
      margin-bottom: 0;
    }

    .button-primary {
      width: 100%;
    }
  }

  .button-nav_notif {
    position: relative;

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 7rem;
      height: 7rem;
      background: #EB5757;
      border: 1px solid #F4F3F4;
      border-radius: 5px;
      left: 30px;
      top: 15rem;
    }
  }

}

.modal-menu .btn-item-chatBorder {
  .button-nav_notif::before {
    left: 32px;
  }
}
</style>

<template lang="pug">
  .back-sidebar
    .back-sidebar__top
      button-back.back-sidebar__roll-up(@click.native.prevent="back") {{ POPUP_GLOBAL.back }}
    .back-sidebar__body
      .back-sidebar__nav
        .back-sidebar__nav-item(v-for="(item, i) in menu" :key="i" :class="`btn-item-${item.icon}`")
          button-nav.back-sidebar__nav-btn(
            v-if="item.action"
            :icon="item.icon"
            :notif="item.notif"
            @click.native="navigationClick(item)"
          ) {{item.name}}
          button-nav.back-sidebar__nav-btn(
            v-else
            :icon="item.icon"
            :to="$locationPath(item.to)"
            :notif="item.notif"
          ) {{item.name}}
    .back-sidebar__bottom
      button-nav.back-sidebar__logout(red small icon="logout" @click.native.prevent="logOut") {{PAGE_MENU_AUTH.exit}}
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import pageTranslate from "@/mixins/pageTranslate";
import {cloneDeep} from 'lodash';

export default {
  async fetch() {
    await this.getPageTranslate();
  },
  computed: {
    ...mapGetters({
      PAGE_MENU_AUTH: 'pages/PAGE_MENU_AUTH',
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
    }),
    menu() {
      let route = this.$route.path;
      let menu = cloneDeep(this.PAGE_MENU_AUTH.menu);
      menu.forEach(item => {
        item.notif = false
        if (item.icon === 'chat' && this.$auth.user?.isset_unread_chat_messages && !route.includes('chat')) item.notif = 1
        if (item.icon === 'bell' && this.$auth.user?.unread_notifications_count &&  !route.includes('notifications')) item.notif = 1
      });
      return menu
    }
  },
  mixins: [pageTranslate],
  methods: {
    ...mapActions({
      SET_PAGE_MENU_AUTH: 'pages/SET_PAGE_MENU_AUTH',
      SET_LOCATION: 'location/SET_LOCATION',
    }),
    async getPageTranslate() {
      await this.SET_PAGE_MENU_AUTH()
    },
    back() {
      this.$router.go(-1)
    },
    logOut() {
      this.$root.$emit('bv::show::modal', 'modal-logout-confirm')
    },
    navigationClick(item){
      if(item?.action){
        this[item.action](item)
      }
    },

    feedbackHandler(item){
      this.$root.$emit('bv::show::modal', 'modal-self-reviews')
    }
  },
  beforeDestroy() {
    if (!process.client || !this.$auth.user) return;
    this.$echo.leave(`chat-conversation-unread-messages-count.${this.$auth.user.id}`)
  },
  created() {
    if (!process.client || !this.$auth.user) return;
    this.$echo.private(`chat-conversation-unread-messages-count.${this.$auth.user.id}`)
      .listen('.chat-conversation-unread-messages-count', (res) => {
        // console.log('unread_count', res);
        const updateUser = {...this.$auth.user};
        updateUser.isset_unread_chat_messages = res.unread_messages_count;
        this.$auth.setUser(updateUser)
      })
  }
}
</script>

<style lang="scss">
.back-sidebar {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30rem 15rem;
  position: sticky;
  top: 0;

  &__body {
    margin-top: 75rem;
    flex: 1 1 auto;
  }

  &__bottom {
    margin-top: 75rem;
  }

  &__logout {
    width: 100%;
  }

  &__nav {
    &-item {
      &:not(:first-child) {
        margin-top: 20rem;
      }
    }

    &-btn {
      width: 100%;
    }
  }
}

.btn-item-chat {
  .button-nav_notif .button-nav__icon:before {
    right: 2px;
  }
}
</style>

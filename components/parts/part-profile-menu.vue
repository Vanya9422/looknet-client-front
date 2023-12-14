<template>
  <div class="profile-menu">
    <div class="profile-menu__section" v-for="(menu, i) in $auth.loggedIn ? PAGE_MENU_DEFAULT.menu1 : PAGE_MENU_DEFAULT.menu" :key="i">
      <ul class="profile-menu__list">
        <li class="profile-menu__item" v-for="(item, i) in menu.items" :key="i">
          <NuxtLink
            class="profile-menu__link"
            v-if="item.loginModal"
            to=""
            v-html="item.text"
            v-b-modal.modal-login="item.loginModal"
          />
          <NuxtLink class="profile-menu__link" v-else :to="$locationPath(item.to)" v-html="item.text"></NuxtLink>
        </li>
      </ul>
    </div>
    <div class="profile-menu__section">
      <ul class="profile-menu__list">
        <li class="profile-menu__item">
          <NuxtLink class="profile-menu__link" to="" v-b-modal.modal-languages>{{ PAGE_MENU_DEFAULT.lang }}</NuxtLink>
        </li>
        <li class="profile-menu__item" v-if="$auth.loggedIn">
          <NuxtLink class="profile-menu__link color-red" to="" @click.prevent.native="showModalLogout">{{ PAGE_MENU_DEFAULT.exit }}</NuxtLink>
          <modal-logout-confirm></modal-logout-confirm>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import pageTranslate from "@/mixins/pageTranslate";

export default {
  async fetch() {
    await this.getPageTranslate();
  },
  mixins:[pageTranslate],
  computed: {
    ...mapGetters({
      PAGE_MENU_DEFAULT: 'pages/PAGE_MENU_DEFAULT',
    })
  },
  methods: {
    ...mapActions({
      SET_PAGE_MENU_DEFAULT: 'pages/SET_PAGE_MENU_DEFAULT',
      SET_LOCATION:'location/SET_LOCATION'
    }),
    async getPageTranslate() {
      await this.SET_PAGE_MENU_DEFAULT()
    },
    showModalLogout(){
      this.$bvModal.show( 'modal-logout-confirm')
    }
  }
}
</script>

<style lang="scss">
.profile-menu {

  text-align: left;
  padding: 10rem 0;
  font-size: 14rem;
  line-height: 1;
  font-weight: 600;
  width: 166rem;

  &__section {
    &:not(:first-child) {
      padding-top: 20rem;
      border-top: 1px solid $light-gray;
    }

    &:not(:last-child) {
      padding-bottom: 20rem;
    }
  }

  &__list {
    list-style: none;
  }

  &__item {
    &:not(:first-child) {
      margin-top: 15rem;
    }
  }

  &__link {
    transition: ease .12s;

    &:hover:not(.color-red) {
      color: $blue;
    }
  }
}
</style>

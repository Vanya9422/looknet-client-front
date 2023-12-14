<template lang="pug">
  .mobile-menu
    .mobile-menu__list.flex.flex_vertical.flex_justify
      .mobile-menu__item
        button-action.mobile-menu__btn(
          :class="{active: isHomePage}"
          icon="home" :to="$locationPath('/')")
      transition(name="fade")
        .mobile-menu__item(v-if="showSearch")
          button-action.mobile-menu__btn( icon="cross-menu" @click.native.prevent="hideSearchModal")
        .mobile-menu__item(v-else)
          button-action.mobile-menu__btn(icon="search" @click.native.prevent="showSearchModal")
      .mobile-menu__item
        button-action.mobile-menu__btn(icon="add" @click.native.prevent="addAdvert")
      .mobile-menu__item
        button-action.mobile-menu__btn(
          icon="heart"
          :to="$locationPath(!$auth.loggedIn ?  '/favorites' : '/favorites-ad')"
          :class="{active: isFavoritesPage}"
        )
      transition(name="fade" out-in)
        .mobile-menu__item(v-if="showMenu")
          button-action.mobile-menu__btn( icon="cross-menu" @click.native.prevent="ToggleClass")
        .mobile-menu__item(v-else)
          item-profile.mobile-menu__profile(:active="showMenu" @toggle="ToggleClass")
    modal-menu(@closeToggle="closeClass")
</template>

<script>
import ModalSearch from "~/components/widget/modals/modal-search.vue";

export default {
  components: { ModalSearch },
  data() {
    return {
      active: false,
      showSearch: false,
      showMenu: false
    };
  },
  watch: {
    showMenu(val) {
      // console.log(val)
      this.$root.$emit(`bv::${!this.showMenu ? 'hide' : 'show'}::modal`, 'modal-menu');
    }
  },
  computed: {
    isHomePage() {
      return this.$route?.name?.includes('index') || false;
    },
    isFavoritesPage() {
      return this.$route?.path?.includes('favorites') || false;
    }
  },
  mounted() {
    this.$root.$on('bv::hide::modal', (modalId) => {
      if (modalId === 'modal-search') {
        this.showSearch = false;
      }
    });
  },
  beforeDestroy() {
    this.$root.$off('bv::hide::modal');
  },
  methods: {
    addAdvert() {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show("modal-login");
      }
      this.$router.push(this.$locationPath('/create-ad'));
    },
    showSearchModal() {
      this.showMenu = false;
      this.$root.$emit(`bv::show::modal`, 'modal-search');
      this.showSearch = true;
    },
    hideSearchModal() {
      this.$root.$emit(`bv::hide::modal`, 'modal-search');
      this.showSearch = false;
    },
    ToggleClass() {
      this.hideSearchModal();
      this.showMenu = !this.showMenu;
    },
    closeClass() {
      this.showMenu = false;
    }

  }
};
</script>

<style lang="scss">
.mobile-menu {
  position: fixed;
  bottom: -2px;
  left: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #DDE1E3;
  padding: 0 22rem;
  z-index: 1041;
  display: none;
  @include small-tablet {
    display: block;
  }

  &__list {
    min-height: 48rem;
  }

  &__item {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 36rem;
    display: flex;
    justify-content: center;
  }

  &__btn {
    width: 30rem;
    height: 30rem;
  }
}
</style>

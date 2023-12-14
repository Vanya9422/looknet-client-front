<template>
  <section class="settings">
    <div class="settings__row">
      <div class="settings__column settings__column_left">
        <part-profile-box class="settings__profile-box" :avatar="userAvatar" isLocation></part-profile-box>
      </div>
      <div class="settings__column settings__column_right">
        <h1 class="section-notifications__title h3">{{ title }}</h1>
        <div class="settings__nav">
          <part-back-nav class="settings__nav-wrap" :nav="nav"></part-back-nav>
        </div>
        <slot />
      </div>
    </div>
    <modal-thank id="modal-thank-settings" notRedirectToHome :desc="POPUP_THANK.changesSaved"></modal-thank>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  async fetch() {
    await this.SET_POPUP_THANK();
  },
  props: {
    title: {
      type: String,
      default: "Settings",
    },
    nav: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      USER: "user/USER",
      POPUP_THANK: 'popup/POPUP_THANK',
    }),
    userAvatar() {
      return this.USER?.avatar;
    },
  },
  methods: {
    ...mapActions({
      SET_POPUP_THANK: 'popup/SET_POPUP_THANK',
    }),
  }
};
</script>

<style lang="scss">
.settings {
  padding: 44rem 0 80rem 0;

  @include large-mobile {
    padding: 13rem 0 60rem 0;
  }

  &__row {
    display: flex;

    @include large-tablet {
      flex-wrap: wrap;
    }
  }

  &__column {
    &_left {
      width: 310rem;
      min-width: 310rem;
    }

    &_right {
      width: 100%;
      margin-left: 70rem;
      padding-top: 20rem;
    }

    @include large-tablet {
      width: 100%;
      &_right {
        margin-left: 0;
        margin-top: 30rem;
        padding-top: 0;
      }
    }
  }

  &__nav {
    margin-top: 30rem;
    margin-left: -20rem;

    &-wrap {
      padding-left: 20rem;
    }

    @include large-tablet {
      margin-left: 0;
      &-wrap {
        padding-left: 0;
      }
    }
  }

  &__item {
    margin-top: 60rem;

    @include large-mobile {
      margin-top: 40rem;
    }
  }

  &__field {
    padding: 20rem;
    margin-left: -20rem;
    border-bottom: 1px solid $light-gray;

    @include small-desktop {
      padding-right: 0;
    }

    @include large-tablet {
      padding: 15rem 0;
      margin-left: 0;
    }

    @include large-mobile {
      padding: 27rem 0 20rem 0;
    }
  }

  &__blacklist {
    padding-top: 20rem;

    &-item {
      padding: 20rem;
      margin-left: -20rem;
      border-bottom: 1px solid $light-gray;
    }

    @include small-desktop {
      &-item {
        padding-right: 0;
      }
    }

    @include large-tablet {
      &-item {
        padding: 20rem 0;
        margin-left: 0;
      }
    }

    @include large-mobile {
      padding-top: 12rem;
      &-item {
        padding: 15rem 0;
      }
    }
  }

  &__not-found {
    margin-top: 150rem;

    @include large-mobile {
      margin-top: 0;
    }
  }
}
</style>

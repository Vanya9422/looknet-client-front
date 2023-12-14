<template>
  <div class="profile" :class="Mods" @click="ToggleClass">
    <div class="profile__avatar">
      <set-img
        img-class="object-fit"
        :src="$auth.loggedIn && $auth.user.avatar ? userAvatar : require(`~/assets/img/${avatar}`)"
        :default-img="require(`~/assets/img/${avatar}`)"
        small
      />
    </div>
    <div class="profile__name p strong">{{ $auth.loggedIn ? $auth.user.first_name : "" }}</div>
    <div class="profile__arrow" :class="{ 'ml-0': !$auth.loggedIn }">
      <svg-icon name="arrowDown" viewBox="0 0 11 7"></svg-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    avatar: {
      type: String,
      default: "user.jpg",
    },
    mobile: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      USER: "user/USER",
    }),
    userAvatar() {
      return this.USER?.avatar || this.$auth.user?.avatar || ''
    },
    Mods() {
      let unreadMessagesCount = this.$auth.loggedIn
        ? this.$auth.user.isset_unread_chat_messages
        : 0;
      return {
        "is-active": this.active,
        loginIn: !this.active && unreadMessagesCount,
      };
    },
  },
  methods: {
    ToggleClass() {
      this.$emit("toggle");
    },
  },
};
</script>

<style lang="scss">
.profile {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: ease 0.12s;

  &:hover,
  &.is-active {
    color: $blue;
  }

  @include small-tablet {
    position: relative;
    &.loginIn:not(.is-active) {
      &:after {
        content: "";
        display: block;
        width: 5px;
        height: 5px;
        background: $red;
        border-radius: 3px;
        position: absolute;
        top: 0;
        right: 3px;
      }
    }
  }

  &.is-active {
    .profile__arrow {
      svg {
        transform: rotate(-180deg);
      }
    }
  }

  &__avatar {
    width: 35rem;
    height: 35rem;
    flex-shrink: 0;
    margin-right: 15rem;
    overflow: hidden;
    position: relative;
    border-radius: 100%;

    @include small-tablet {
      margin-right: 0;
      width: 28rem;
      height: 28rem;
    }

    @include large-mobile {
      width: 24rem;
      height: 24rem;
    }
  }

  &__name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 86rem;

    @include small-tablet {
      display: none;
    }
  }

  &__arrow {
    flex-shrink: 0;
    stroke: $default;
    stroke-width: 2;
    margin-left: 20rem;
    width: 11rem;
    height: 7rem;
    fill: none;

    svg {
      width: 100%;
      height: 100%;
      transition: ease 0.15s;
    }

    @include small-tablet {
      display: none;
    }
  }
}
</style>

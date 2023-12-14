<template lang="pug">
section.section-notifications
  h1.section-notifications__title.h3 {{ PAGE_NOTIFICATIONS.title }}
  part-back-nav.section-notifications__nav(
    :nav="PAGE_NOTIFICATIONS.nav",
    :keyActive="activeKey",
    activeRouterClass="",
    mobile
  )
    //a.back-nav__read.color-gray(href="#" v-if="notificationsLang.length > 0" @click.prevent="actionsAllElement") {{PAGE_NOTIFICATIONS.all}}
  .section-notifications__list(v-if="notificationsLang.length > 0")
    item-notification.section-notifications__item(
      v-for="(item, i) in notificationsLang",
      :key="i",
      v-if="(item.data.description || item.data.message) && item.data.title"
      :title="item.data.title",
      :link="item.data.link",
      columns,
      :unread="!item.read_at",
      :desc="item.data.description || item.data.message",
      :btn="item.data.details",
      :date="item.created_at",
      :content="PAGE_NOTIFICATIONS",
      @delete="deleteElement(item.id, i)",
      @detail="showDetail(item.id, i)"
      @actions="read(item.id, i)"
    )
    client-only
      infinite-loading(
        :distance="20",
        ref="infiniteLoading",
        @infinite="infinite",
        v-if="!loading"
      )
        div(slot="no-results")
        div(slot="no-more")
        div(slot="spinner")
  .section-notifications__center(v-else)
    part-not-notification.section-notifications__not-notification {{ PAGE_NOTIFICATIONS.noData }}
  modal-delete(@deleteItem="modalDelete", @cancel="deleteItem = null")
  modal-notification(
    v-if="activeNotification"
    :date="activeNotification.date",
    :title="activeNotification.title",
    :content="activeNotification.content",
    @hide="$nextTick(() => activeNotification = null)",
    @delete="deleteElement(activeNotification.id, activeNotification.index)",
  )
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      list: [],
      item: null,
      text: "You have not Notifications",
      loadingPage: false,
      deleteItem: null,
      activeKey: this.$route.params.slug || "new",
      notificationsLang: [],
      activeNotification: null,
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      NOTIFICATIONS: "notifications/NOTIFICATIONS",
      PAGE_NOTIFICATIONS: "pages/PAGE_NOTIFICATIONS",
    }),
  },
  async created() {
    let tab = this.$route.params.slug || "new";
    await this.SET_NOTIFICATIONS(tab);
    await this.SET_PAGE_NOTIFICATIONS(this.$i18n.locale);
    this.getNotifications();
    this.loading = false;
  },
  watch: {
    "$route.params.slug": {
      handler: function (slug) {
        this.SET_NOTIFICATIONS_PAGE();
        const ref = this.$refs.infiniteLoading;
        if (ref) this.$refs.infiniteLoading.stateChanger.reset();
      },
      deep: true,
      immediate: true,
    },
    "$i18n.locale"() {
      this.SET_PAGE_NOTIFICATIONS(this.$i18n.locale);
    },
    NOTIFICATIONS() {
      this.getNotifications();
    },
  },
  methods: {
    ...mapActions({
      SET_NOTIFICATIONS: "notifications/SET_NOTIFICATIONS",
      SET_NOTIFICATIONS_PAGE: "notifications/SET_NOTIFICATIONS_PAGE",
      SET_DELETE_NOTIFICATION: "notifications/SET_DELETE_NOTIFICATION",
      SET_ACTIONS_NOTIFICATION: "notifications/SET_ACTIONS_NOTIFICATION",
      SET_ACTIONS_NOTIFICATION_ALL: "notifications/SET_ACTIONS_NOTIFICATION_ALL",
      SET_PAGE_NOTIFICATIONS: "pages/SET_PAGE_NOTIFICATIONS",
    }),
    infinite($state) {
      let tab = this.$route.params.slug || "new";
      this.SET_NOTIFICATIONS(tab).then((loadState) => {
        if (loadState) $state.loaded();
        else $state.complete();
      });
    },
    deleteElement(id, index) {
      this.deleteItem = { id, index };
      this.$bvModal.show("modal-delete");
    },
    modalDelete() {
      this.SET_DELETE_NOTIFICATION(this.deleteItem);
      this.deleteItem = null;
    },
    read(id, index) {
      if (this.notificationsLang[index].read_at) return;
      this.notificationsLang[index].read_at = true;
      this.SET_ACTIONS_NOTIFICATION({ id, index });
    },
    showDetail(id, index) {
      this.read(id, index);
      const { link } = this.notificationsLang[index];
      if (link) {
        if (process.client) {
          window.open(link, "_blank");
        }
        return;
      }
      const { created_at, data } = this.notificationsLang[index];
      if (!created_at || !data) return;
      this.activeNotification = {
        date: moment(created_at).format("DD.MM.YYYY hh:mm"),
        title: data.title,
        content: data.description || data.message,
        id,
        index,
      }
      this.$nextTick(() => {
        this.$bvModal.show("modal-notification");
      });
      // if (!this.NOTIFICATIONS[index].read_at) {
      //   this.SET_ACTIONS_NOTIFICATION({
      //     id,
      //     index,
      //     slug: this.$route.params.slug,
      //   });
      //   setTimeout(
      //     () => this.$auth.fetchUser().catch(() => this.$auth.logout()),
      //     1000
      //   );
      // }
    },
    actionsAllElement() {
      this.SET_ACTIONS_NOTIFICATION_ALL({ slug: this.$route.params.slug });
      setTimeout(
        () => this.$auth.fetchUser().catch(() => this.$auth.logout()),
        1000
      );
    },
    getNotifications() {
      const lang = this.$i18n.locale;
      const notifications = [];
      const newNotifications = this._.cloneDeep(this.NOTIFICATIONS);
      newNotifications.forEach((item) => {
        let notification = { ...item };
        const data = Object.entries(item.data);
        data.forEach(([key, value]) => {
          if (value && typeof value === "object") {
            notification.data[key] = value[lang] || value["en"];
          } else {
            notification.data[key] = value;
          }
        });
        if (!notification.data.title || (!notification.data.message && !notification.data.description)) return;
        notifications.push(notification);
      });
      this.notificationsLang = notifications;
    },
  },
  beforeDestroy() {
    this.activeNotification = null;
  },
};
</script>

<style lang="scss">
.back-nav__read {
  cursor: pointer;
  transition: 0.3s;
  @include min-large-tablet {
    &:hover {
      color: $blue;
    }
  }
}

.section-notifications {
  padding: 70rem 0;
  @include large-mobile {
    padding: 20rem 0 70rem 0;
  }

  &__title {
    font-family: "Atyp Display";
    font-weight: 500;
    transition: 0.3s;
  }

  &__nav {
    margin-top: 30rem;

    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__list {
    margin-top: 4rem;
    margin-left: -20rem;

    @include large-desktop {
      margin-left: 0;
    }

    @include large-mobile {
      margin-top: 0;
    }
  }

  &__item {
    padding-top: 40rem;
    padding-bottom: 40rem;
    border-bottom: 1px solid $light-gray;
    @include large-mobile {
      padding-top: 30rem;
      padding-bottom: 30rem;
      padding-left: 0 !important;
    }
    @include min-large-tablet {
      &:hover {
        .item-notification__title {
          text-decoration: underline;
        }
      }
    }
  }
  &__center {
    padding-top: 20px;
  }
}
</style>

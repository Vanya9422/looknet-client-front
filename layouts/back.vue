<template lang="pug">
  .container
    .container__row
      .container__column.container__column_left
        part-back-sidebar
      .container__column.container__column_right
        .container__inner
          part-header(back :login="$auth.$state.loggedIn" showSearch :small="$auth.$state.loggedIn")
        Nuxt
        part-mobile-menu
        client-only
          modal-search
        modal-location
        modal-languages
        modal-card
        modal-logout-confirm
        client-only
          modal-reviews(
            modal-id="modal-self-reviews"
            :user='reviewsUser'
          )
</template>
<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  middleware: ['auth-user'],
  head: {
    bodyAttrs: {
      class: 'admin'
    }
  },
  computed: {
    ...mapGetters({
      USER: "user/USER",
    }),
    reviewsUser(){
      return {
        id: this.USER.id,
        avatar: this.USER.avatar,
        name: this.USER.full_name,
        content:`<strong>${this.USER.phone ? 'Phone /' : ''}  ${this.USER.email ? 'Еmail confirmed' : ''}</strong>`,
        about: moment(this.USER.created_at).utc().format("MMMM yyyy"),
        verified: this.USER.verified_at !== null,
        rating_reviews: this.USER.rating_reviews,
        fake: null
      }
    }
  }
};
</script>
<style lang="scss">
.admin {
  // overflow: hidden;

  .back-sidebar__body {
    overflow: auto;

    &::-webkit-scrollbar {
      opacity: 0;
      width: 0;
    }
  }

  .container__column_right {
    height: 100vh;
    overflow: auto;

    @include large-mobile{
      padding-bottom: 48px;
      width: 100vw;
    }
  }
}

.admin.modal-open {
  .container__column_right {
    // overflow: hidden;
  }
}
</style>

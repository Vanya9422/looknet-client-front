<template lang="pug">
section.chat-moderator
  .chat-moderator__row
    .chat-moderator__column.chat-moderator__column_left
      part-chat-sidebar.chat-moderator__sidebar(
        :list="list",
        :title="sidebarTitle",
        search="false",
        moderator,
        backLink="/support-chat",
        :checkbox="false",
        small,
        statText="Register",
        :statCounter="5"
      )
    .section-chat__column.chat-moderator__column_right
      part-chat-body.chat-moderator__body(
        :messages="messages",
        avatar="User4.jpg",
        name="Johnson",
        text="Was 20 minutes ago",
        moderator,
        to="/support-chat"
      )
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Settings",
    },
    sidebarTitle: {
      type: String,
      default: "Advertises",
    },
    blacklist: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      list: [
        {
          name: "Johnson",
          avatar: "User4.jpg",
          desc: "I forgot my password",
          text: "A pleasure to contact with you pleasure to contact with you",
          status: "Wait for answer",
        },
        {
          name: "Alexandr",
          avatar: "User3.jpg",
          desc: "I forgot my password",
          text: "A pleasure to contact with you pleasure to contact with you",
          status: "Wait for answer",
        },
        {
          name: "Johnson",
          avatar: "User4.jpg",
          desc: "I forgot my password",
          text: "A pleasure to contact with you pleasure to contact with you",
          status: "Wait for answer",
        },
        {
          name: "Alexandr",
          avatar: "User3.jpg",
          desc: "I forgot my password",
          text: "A pleasure to contact with you pleasure to contact with you",
          status: "Wait for answer",
        },
        {
          name: "Johnson",
          avatar: "User4.jpg",
          desc: "I forgot my password",
          text: "A pleasure to contact with you pleasure to contact with you",
          status: "Wait for answer",
        },
      ],
      messages: [
        {
          list: [
            {
              avatar: "User3.jpg",
              name: "Alexandr",
              time: "06:50 am",
              answer: true,
              content: [
                {
                  text: "A pleasure to contact with you again! A pleasure to contact with you again!",
                  read: true,
                },
              ],
            },
            {
              avatar: "User4.jpg",
              name: "Janson",
              content: [
                {
                  text: "A pleasure to contact with you again!",
                },
              ],
              gallery: ["create-gallery__img5_big.jpg", "item-card__img4.jpg"],
            },
          ],
        },
        {
          date: "Today",
          list: [
            {
              avatar: "User3.jpg",
              name: "Alexandr",
              time: "06:50 am",
              answer: true,
              content: [
                {
                  text: "A pleasure to contact with you again!",
                  read: true,
                },
              ],
            },
            {
              avatar: "User4.jpg",
              name: "Janson",
              content: [
                {
                  text: "A pleasure to contact with you again!",
                },
                {
                  text: "A pleasure to contact with you again! A pleasure to contact with you again!",
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.chat-moderator {
  position: relative;
  border-top: 1px solid $light-gray;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  @include small-tablet {
    margin-left: -32px;
    margin-right: -32px;
    border-top: 0;
  }

  @include large-mobile {
    margin-left: -15rem;
    margin-right: -15rem;
  }

  &__row {
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    max-width: 1500rem;
    padding-right: 50rem;

    @include large-desktop {
      padding-right: 40rem;
    }

    @include large-tablet {
      flex-wrap: wrap;
    }

    @include small-tablet {
      padding: 0;
    }
  }

  &__column {
    height: 100%;
    position: relative;
    &_left {
      width: 423rem;
      min-width: 423rem;
    }
    &_right {
      width: 100%;
      border-left: 1px solid $light-gray;
    }

    @include large-tablet {
      width: 100%;
      &_left {
        display: none;
      }
      &_right {
        border-left: 0;
      }
    }
  }
}
</style>
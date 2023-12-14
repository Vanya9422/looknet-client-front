<template lang="pug">
section.section-user
  .section-user__row
    .section-user__column.section-user__column_left
      part-user-box.section-user__box(
        :buttonText="buttonText",
        :list="userList"
      )
    .section-user__column.section-user__column_right
      .section-user__settings(v-if="moderator")
        .section-user__settings-list
          .section-user__settings-item(v-for="(item, i) in settings", :key="i")
            .section-user__settings-title.h3 {{ item.title }}
            part-edit-fields.section-user__settings-field(
              v-for="(field, i) in item.fields",
              :key="i",
              :label="field.label",
              :list="field.list",
              :placeholder="field.placeholder",
              :modalName="field.modalName",
              :groupName="field.groupName",
              :icon="field.icon",
              v-if="field.option == 'groupFields'"
            )
            part-edit-field.section-user__settings-field(
              v-for="(field, i) in item.fields",
              :key="i",
              :label="field.label",
              :value="field.value",
              :name="field.name",
              :type="field.type",
              :placeholder="field.placeholder",
              :modalName="field.modalName",
              :groupName="field.groupName",
              v-if="!field.option"
            )
            part-edit-select.section-user__settings-field(
              v-for="(field, i) in item.fields",
              :key="i",
              :label="field.label",
              :value="field.value",
              :name="field.name",
              :type="field.type",
              :topPositionSelect="field.topPosition",
              :topPositionForm="field.topPosition",
              :placeholder="field.placeholder",
              :modalName="field.modalName",
              :groupName="field.groupName",
              v-if="field.option == 'select'"
            )
      .section-user__publications(v-else)
        h3.section-user__title.h3 {{ title }}
        part-back-nav.section-user__nav(:nav="nav", mobile, mobileBlue)
        .section-user__publications-list.flex
          item-card.section-user__publications-item(
            v-for="(item, i) in catalog",
            :key="i",
            :name="item.name",
            :contacts="item.contacts",
            :city="item.city",
            :coordinates="{ longitude: item.longitude, latitude: item.latitude }",
            :date="item.created_at",
            :phoneNumber="item.phoneNumber",
            :price="item.price",
            :pricePolicy="item.price_policy",
            :gallery="item.gallery",
            :status="item.status",
            :to="item.to",
            :id="item.id"
          )
  modal-card
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Publications",
    },
    buttonText: {
      type: String,
      default: "",
    },
    moderator: {
      type: Boolean,
      default: false,
    },
    userList: {
      type: Array,
      default: () => [],
    },
    settings: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      nav: [
        {
          text: "Active",
          class: "isActive",
        },
        {
          text: "Inactive",
        },
        {
          text: "Сanceled",
        },
      ],
      catalog: [
        {
          name: "Объектив SLR Magic. Sony E. 25mm f1.4 2",
          city: "New Your",
          distance: "2 km near you",
          date: "4 days ago",
          price: 22228,
          phoneNumber: "+ 1 376 266 5353",
          gallery: ["item-card__img1.jpg"],
        },
        {
          name: "Объектив SLR Magic. Sony E. 25mm f1.2",
          city: "New Your",
          distance: "3 km near you",
          date: "5 days ago",
          price: 128,
          phoneNumber: "+ 1 379 266 5353",
          gallery: ["item-card__img2.jpg"],
        },
        {
          gallery: ["item-card__img3.jpg"],
        },
        {
          gallery: ["item-card__img4.jpg"],
        },
        {
          gallery: ["item-card__img5.jpg"],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.section-user {
  padding: 30rem 0 80rem 0;

  @include large-mobile {
    padding: 10rem 0 70rem 0;
  }

  &__row {
    display: flex;
    @include large-tablet {
      flex-wrap: wrap;
    }
  }

  &__column {
    &_left {
      width: 355rem;
      min-width: 355rem;
    }
    &_right {
      width: 100%;
      margin-left: 40rem;
    }

    @include large-tablet {
      width: 100%;
      min-width: inherit;
      &_right {
        margin-left: 0;
        margin-top: 50rem;
      }
    }

    @include large-mobile {
      &_right {
        margin-top: 38rem;
      }
    }
  }
  &__title {
    font-family: "Atyp Display";
    font-weight: 500;
  }

  &__nav {
    margin-top: -15rem;
    .back-nav__row {
      justify-content: flex-end;
    }

    @include large-mobile {
      margin-top: 15rem;
    }
  }

  &__publications {
    &-list {
      @include items(3, 5);
      padding-top: 10rem;
    }
    &-item {
      margin-top: 25rem;
    }

    @include min-large-mobile {
      .item-card__gallery {
        padding-top: 67.27%;
      }
    }

    @include large-mobile {
      &-list {
        @include items(2, 5);
      }
      &-item {
        margin-top: 15rem;
      }
    }
  }

  &__settings {
    &-item {
      &:not(:first-child) {
        margin-top: 60rem;
      }
      @include large-mobile {
        &:not(:first-child) {
          margin-top: 40rem;
        }
      }
    }
    &-field {
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
  }
}
</style>

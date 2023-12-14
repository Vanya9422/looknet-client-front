<template lang="pug">
  .item-blacklist
    .item-blacklist__row
      .item-blacklist__column.item-blacklist__column_left
        .item-blacklist__avatar
          //span {{avatar}}
          set-img(img-class="object-fit" :src="avatar" small :default-img="require(`~/assets/img/user.jpg`)")
        .item-blacklist__info
          .item-blacklist__name.h4 {{name}}
          .item-blacklist__desc.p.color-gray(v-if="removed") {{ PAGE_SETTINGS.blacklist.wasRemoved }}
      .item-blacklist__column.item-blacklist__column_right
        .item-blacklist__link.item-blacklist__link_removed.p.color-blue.c-pointer(v-if="removed" @click="deleteElement")
          | {{ PAGE_SETTINGS.blacklist.removed }}
          span  {{ PAGE_SETTINGS.blacklist.fromTheList }}
        .item-blacklist__link.p.color-blue(v-else @click="remove") {{ PAGE_SETTINGS.blacklist.delete }}

</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    avatar: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      default: "Alexandr Bairamov"
    },
    removed: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapGetters({
      PAGE_SETTINGS: "pages/PAGE_SETTINGS",
    }),
  },
  methods: {
    remove() {
      this.$emit('remove')
    },
    deleteElement() {
      this.$emit('delete')
    }
  }
}
</script>

<style lang="scss">
.item-blacklist {
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__column {
    &_left {
      display: flex;
      align-items: center;
    }
  }

  &__avatar {
    width: 58rem;
    height: 58rem;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    border-radius: 100%;

    @include large-mobile {
      width: 36rem;
      height: 36rem;
    }
  }

  &__name {
    font-family: 'Gilroy';
    font-weight: 500;
    margin-right: 40rem;

    @include small-tablet {
      margin-right: 20rem;
    }

    @include large-mobile {
      font-size: 16rem;
      line-height: 1;
      margin-right: 0;
      font-weight: 500;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 23rem;
    @include large-mobile {
      display: block;
      margin-left: 10rem;
    }
  }

  &__desc {
    line-height: 1;
    margin-top: 3rem;
    @include large-mobile {
      margin-top: 5rem;
    }
  }

  &__link {
    cursor: pointer;
    white-space: nowrap;

    &_removed {
      cursor: text;
    }

    @include small-tablet {
      &_removed {
        span {
          display: none;
        }
      }
    }
  }
}
</style>

<template lang="pug">
  .faq
    h2.faq__title.h2.h2_big {{ title }}
    .faq__row
      .faq__column.faq__column_left
        .faq__nav
          .faq__nav-item(v-for="(item, i) in accordion" :key="i")
            button-faq.faq__nav-btn(
              :class="{isActive:number == i}"
              @click.native="tabList(i)"
            ) {{ item.name }}
      .faq__column.faq__column_right
        .faq__list
          item-faq.faq__item(
            v-for="(item, i) in accordion[number].list"
            :key="i"
            :title="item.title"
            :content="item.desc"
            :active="item.active"
            groupName="i"
          )
    .faq__mobile
      .faq__mobile-nav
        .faq__mobile-item(v-for="(item, i) in accordion" :key="i" @click="tabList(i)")
          .faq__mobile-link(v-b-modal.modal-faq)
            .faq__mobile-text {{ item.name }}
            svg-icon.faq__mobile-arrow(name="arrowRight" viewBox="0 0 9 14")

    modal-faq(:faqList="accordion[number].list" @hide="number = 0")

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Answers & Questions'
    },
    accordion: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      number: 0,
      i: 0
    }
  },
  methods: {
    tabList(i) {
      this.number = i;
    },
  }
}
</script>

<style lang="scss">
.faq {
  &__row {
    display: flex;
    margin-top: 44rem;

    @include large-mobile {
      display: none;
    }
  }

  &__column {
    &_left {
      width: 225rem;
      min-width: 225rem;
    }

    &_right {
      margin-left: 80rem;
      width: 100%;
    }

    @include large-tablet {
      &_right {
        margin-left: 40rem;
      }
    }
  }

  &__list {
    margin-top: -30rem;

    @include large-mobile {
      margin-top: 0;
    }
  }

  &__mobile {
    display: none;

    @include large-mobile {
      display: block;
      margin-top: 10rem;
      &-item {
        border-bottom: 1px solid $light-gray;
      }
      &-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20rem 10rem 20rem 0;
        font-size: 16rem;
        line-height: 1;
        font-weight: 500;
      }
      &-arrow {
        width: 6rem;
        height: 10rem;
        fill: none;
        stroke: #9A9A9A;
        stroke-width: 1.5;
      }
    }
  }
}
</style>
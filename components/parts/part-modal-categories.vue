<template lang="pug">
  .modal-categories.modal-categories_desc(v-if="categories.length")
    .modal-categories__category-left.css-scrollbar
      div.modal-categories__block(@mouseover="$emit('active', null)")
        NuxtLink.modal-categories__category(:to="$locationPath('/catalog')")
          h2.modal-categories__title.h5 {{ PAGE_CATALOG.allCategories }}
          svg-icon.modal-categories__back(name="arrowRight")
      div.modal-categories__block(
        v-for="(category, i) in categories"
        @mouseover="$emit('active',i)"
        :key="i"
      )
        NuxtLink.modal-categories__category(
          :to="$locationPath(active !== null ? `/catalog/${categories[active].slug}/${category.slug}` : '/catalog')"
          :class="{ active: active === i }"
        )
          h2.modal-categories__title.h5 {{category.name}}
          svg-icon.modal-categories__back(name="arrowRight")
    .modal-categories__category-right.css-scrollbar(v-if="active === null || categories[active]")
      template(v-if="active !== null")
        part-modal-sub-category(
          :categories="categories[active].allSubCategories"
          :title="categories[active].name"
          :parent-path="categories[active].slug" )
      template(v-else)
        part-modal-sub-category(
          :categories="categories"
          :title="PAGE_CATALOG.allCategories")
</template>

<script>
import { mapGetters } from 'vuex';
import PartModalSubCategory from "~/components/parts/part-modal-sub-category.vue";

export default {
  components: { PartModalSubCategory },
  props: {
    categories: {
      type: Array,
      default: () => ([])
    },
    active: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      PAGE_CATALOG: 'pages/PAGE_CATALOG',
    })
  }
};
</script>

<style lang="scss">
.tippy-tooltip {
  max-width: fit-content !important;
}

.modal-categories {
  padding-bottom: 10rem;
  margin-top: 0;
  width: 1390rem;
  height: 680px;
  max-height: calc(100dvh - 260px);
  overflow-x: hidden;
  padding-right: 30rem;
  margin-right: -30rem;
  text-align: left;
  font-size: 14rem;
  line-height: 1;
  display: flex;

  &__sub-category {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &_desc {
    max-width: calc(100dvw - 100px) !important;
  }

  @include large-mobile {
    height: 100%;
    max-height: 100%
  }

  &__back {
    position: absolute;
    right: 21rem;
    width: 10rem;
    height: 10rem;
    fill: none;
    stroke: $default;
    stroke-width: 3rem;
    transition: 0.3s;
    opacity: 0;
    transition: opacity .2s linear;
  }

  &__category {
    padding: 16rem 35rem 16rem 16rem;
    margin-bottom: 12rem;
    border-radius: 11rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    color: #4B4B4B;

    &:nth-last-child(1) {
      margin-bottom: 0;
    }

    &:hover, &.active {
      color: $default;
      background: #F5F5F7;

      .modal-categories__back {
        opacity: 1;
      }
    }


    &-left {
      border-right: 1rem solid #E7E8EA;
      max-width: 320rem;
      padding-right: 15rem;
      margin-left: -5rem;
      padding-left: 5rem;
      display: flex;
      flex-direction: column;
      grid-row-gap: 13rem;
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        width: 3px !important;
      }

      &::-webkit-scrollbar-track {
        background: #D2D2D7;
        border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb {
        border: 1px solid transparent;
        background-clip: padding-box;
        background: #6E6E73;
        border-radius: 2px;
      }
    }

    &-right {
      width: calc(100% - 280rem);
      padding: 24rem 48rem;

      &::-webkit-scrollbar {
        width: 3px !important;
      }

      &::-webkit-scrollbar-track {
        background: #D2D2D7;
        border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb {
        border: 1px solid transparent;
        background-clip: padding-box;
        background: #556DEE;
        border-radius: 2px;
      }

      .h3 {
        font-weight: 600;
        margin-bottom: 48rem;
        cursor: pointer;
        display: block;

        &:hover {
          color: $blue;
        }

        span {
          margin-left: 20rem;
          color: #6E6E73;
          font-size: 14rem;
          font-weight: 500;
        }
      }

      &__list {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 48rem;
        justify-content: space-between;
      }

      &__item {
        max-width: 230rem;
      }

      &__title {
        margin-bottom: 20rem;
        cursor: pointer;
        transition: 0.3s;
        display: block;
        color: $default;

        &:hover {
          text-decoration: none;
          color: $blue;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }

      &__more-btn {
        font-size: 18rem;
        margin-top: 18rem;
        color: $blue;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;

        svg {
          width: 11rem;
          height: 7rem;
          fill: none;
          stroke: $blue;
          stroke-width: 2;
        }
      }

      &__category {
        list-style: none;

        &-item {
          margin-bottom: 18rem;
          color: #A5A5A5;
          font-size: 16rem;
          font-weight: 400;
          cursor: pointer;
          letter-spacing: -0.36px;

          &:hover {
            color: $blue;
          }

          a {
            color: inherit;
          }

          &:nth-last-child(1) {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  &__list {
    list-style: none;
    margin-top: 15rem;
  }

  &__item {
    display: block;

    &:not(:first-child) {
      margin-top: 15rem;
    }
  }

  &__link {
    display: block;
    transition: ease .12s;
    color: $gray;

    &:hover {
      color: $blue;
    }
  }
}
</style>

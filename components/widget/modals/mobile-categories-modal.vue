<template lang="pug">
  b-modal(
    id="mobile-categories-modal"
    ref="mobile-categories-modal"
    size="search"
    modal-class="modal-categories"
    body-class="modal-categories__body "
    header-class="modal-categories__header"
    footer-class="modal-categories__footer"
    :centered="$screen.st"
    :position="!$screen.st ? 'bottom' : 'center'"
    :hide-footer="true"
    @show="openModal"
    @hide="hideModel"
  )
    template(#modal-header)
      .modal-categories-header
        .modal-categories-back(@click="backActive")
          span.modal-categories__arrow
            svg-icon.modal-categories__icon(name="prev")
          span.modal-categories__text Back
        .modal-categories-header__title {{activeCategory ?  activeCategory.name : PAGE_HOME.allCategories}}
        button-close.modal__close(@click.native='closeModal')
    .modal-categories__box.css-scrollbar(v-if="categories.length > 0")
      .modal-categories__list
        .modal-categories__item.mt-0(v-if="slugs.length === 0" @click="showAllCategory")
          span.modal-categories__link
            span.modal-categories__link-text.modal-categories__link-text__blue {{PAGE_HOME.allCategories}}
            svg-icon.modal-categories__link-arrow.modal-categories__link-arrow_blue(name="arrowRight")
        .modal-categories__item.mt-0(v-if="slugs.length > 0" @click="showAllCategory")
          span.modal-categories__link
            span.modal-categories__link-text.modal-categories__link-text__blue All about {{activeCategory.name}}
            svg-icon.modal-categories__link-arrow.modal-categories__link-arrow_blue(name="arrowRight")
        .modal-categories__item.mt-0(v-for="(item, i) in categories" :key="i" @click="changeActiveCategory(i)")
          span.modal-categories__link
            span.modal-categories__link-text {{item.name}}
            svg-icon.modal-categories__link-arrow(name="arrowRight")
</template>

<script>
import mobileCategoriesModal from "@/mixins/mobileCategoriesModal";

export default {
  mixins:[mobileCategoriesModal],
}
</script>

<style lang="scss">
[position=bottom] .modal.show.modal-categories .modal-dialog .modal-content {
  max-height: 60.5vh;
  height: auto;
  overflow: hidden !important;
  .modal-body {
    padding: 0;

  }
  //padding-top: 10rem;
  //overflow-y: hidden;
}

.modal-categories {
  padding: 0 !important;
  max-width: 100vw;
  &-header {
    height: 62px;
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #E6E6EA;
    position: relative;
    margin: 0 15rem;

    .modal__close {
      position: absolute;
      right: 0;
      left: auto;
      top: auto;
    }
    &__title {
      font-weight: 600;
      font-size: 16px;
      line-height: 120%;
      color: #062439;
      font-style: normal;
    }
  }



  &__arrow {

  }

  &-back {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -8px;
    display: flex;
    align-items: center;
  }

  &__icon {
    width: 24rem;
    height: 24rem;
    fill: #9A9A9A;
  }

  &__text {
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    color: #9A9A9A;

  }

  &__box {
    height: inherit;
    max-height: calc(60.5vh - 92px);
    padding-bottom: 30px;

    &:not(:first-child) {
      margin-top: 0rem;
    }

    &-title {
      font-weight: 600;
      font-size: 16rem;
      line-height: 1.2;
    }
  }

  &__list {
    margin-top: 0;
    max-height: 100%;
    padding: 0 15rem;

  }

  &__item {
    &.mt-0 {
      margin-top: 0;
    }

    border-bottom: 1px solid rgba(#C3C8CB, .5);
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //padding: 5rem 10rem 5rem 0;
    padding: 18rem 10rem 18rem 0;
    color: $default;
    font-size: 14rem;
    line-height: 1.2;

    &:hover {
      color: #6A757C;
    }

    &-text__grey {
      color: #9A9A9A;
    }

    &-text__blue {
      color: $blue;
    }

    &-category {
      min-height: 46rem;
    }

    &-arrow {
      width: 6rem;
      height: 10rem;
      fill: none;
      stroke: #C3C8CB;
      stroke-width: 1.5;
      flex-shrink: 0;
      margin-left: 0rem;

      &_blue {
        stroke: $blue;
      }
    }
  }
}
</style>

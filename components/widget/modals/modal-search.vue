<template lang="pug">
  b-modal(
    id="modal-search"
    ref="modal-search"
    size="search"
    modal-class="modal-search"
    body-class="modal-search__body"
    header-class="modal-search__header"
    footer-class="modal-search__footer"
    :centered="$screen.st"
    :position="!$screen.st ? 'bottom' : 'center'"
    :hide-footer="true"
    @show="openModal"
    @shown="focusElement"
    @hide="hideModal"
  )

    template(#modal-header='{ close }')
    form.modal-search__form
      .modal-search__field
        form-input.modal-search__input(
          v-model="search"
          ref="searchBarButton"
          :placeholder="PAGE_HOME.search.placeholder"
          @touchstart="initiateKeyboard"
          :custom-key="resetCounter"
        )
        button-action.modal-search__btn-search(icon="search")
        transition(v-if="search !== ''" name="page")
          button-close.modal-search__clear(type="button" @click.native.prevent="searchReset")
      .modal-search__cancel-wrap
        .modal-search__cancel(@click='closeModal()') {{ POPUP_GLOBAL.cancel }}
    .modal-search__container-1(v-if="search === ''")
      .modal-categories-header.m-0
        .modal-categories-back(@click="backActive")
          span.modal-categories__arrow
            svg-icon.modal-categories__icon(name="prev")
          span.modal-categories__text  {{ POPUP_GLOBAL.back }}
      .modal-categories__box(v-if="CATEGORIES.length > 0")
        .modal-categories__list.p-0
          .modal-categories__item.mt-0(v-if="slugs.length === 0" @click="showAllCategory")
            span.modal-categories__link
              span.modal-categories__link-text.modal-categories__link-text__blue {{ PAGE_HOME.allCategories }}
              svg-icon.modal-categories__link-arrow.modal-categories__link-arrow_blue(name="arrowRight")
          .modal-categories__item.mt-0(v-if="slugs.length > 0" @click="showAllCategory")
            span.modal-categories__link
              span.modal-categories__link-text.modal-categories__link-text__blue All about {{ activeCategory.name }}
              svg-icon.modal-categories__link-arrow.modal-categories__link-arrow_blue(name="arrowRight")
          .modal-categories__item.mt-0(v-for="(item, i) in categories" :key="i" @click="changeActiveCategory(i)")
            span.modal-categories__link
              span.modal-categories__link-text {{item.name}}
              svg-icon.modal-categories__link-arrow(name="arrowRight")
    .modal-search__container-1.modal-categories__item-black(v-else)
      .modal-categories__item.mt-0(
        v-if="searchList.data && searchList.data.length > 0 "
        v-for="(item, i) in searchList.data" :key="i.id"
      )
        span.modal-categories__link.modal-categories__link-data(
          @click.prevent="changePage(getRouter(item), { search_text: item.product_name })"
        )
          span
            span.modal-categories__link-text
              | {{item.product_name}}
              //span.count ({{item.advertises_count}})
            span.modal-categories__link-category__name {{ item.name }}
          svg-icon.modal-categories__link-arrow(name="arrowRight")
      .modal-categories__item.mt-0(
        v-if=" searchList.advertises && typeof searchList.advertises === 'object' &&  Object.values(searchList.advertises).length  > 0"
        v-for="(item, i) in searchList.advertises" :key="i.id"
      )
        span.modal-categories__link(
          @click="changePage($locationPath(`/catalog`), { search_text: item.product_name })"
        )
          span
            span.modal-categories__link-text  {{ item.product_name }}
            span.search-form__link-counter ({{item.total}})
          svg-icon.modal-categories__link-arrow(name="arrowRight")
      .modal-categories__item.mt-0(
        v-if="searchList.data && searchList.data.length > 0 "
      )
        span.modal-categories__link(
          @click="changePage($locationPath(`/catalog`), { search_text: search })"
        )
          span
            span.modal-categories__link-text
              | {{ PAGE_HOME.allCategories }}
            span.count ({{totalCategories(Object.values(searchList.advertises))}})
          svg-icon.modal-categories__link-arrow(name="arrowRight")
      .modal-categories__item.mt-0(
        v-if="searchList.data && searchList.data.length === 0  "
      )
        span.modal-categories__link(
          @click="changePage($locationPath(`/catalog`), { search_text: search })"
        )
          span
            span.modal-categories__link-text
              | {{ search }}
          svg-icon.modal-categories__link-arrow(name="arrowRight")

</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import mobileCategoriesModal from "@/mixins/mobileCategoriesModal";
import sendSearchProducts from "@/mixins/search/sendSearchProducts";

export default {
  mixins: [mobileCategoriesModal, sendSearchProducts],
  props: {
    faqList: {
      type: Array,
      default: () => ([]),
    },
    // placeholder: {
    //   type: String,
    //   default: "Search for ads"
    // },
  },
  computed: {
    ...mapGetters({
      CATEGORIES: 'category/CATEGORIES',
      PAGE_HOME: 'pages/PAGE_HOME',
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
    })
  },
  data() {
    return {
      searchKey: 0,
      search: '',
      searchList: [],
      resetCounter: 0
    }
  },
  watch: {
    $route(to, from) {
      this.$refs['modal-search'].hide()
    },
    search() {
      this.getCategories()
    }
  },
  methods: {
    ...mapMutations({ CHANGE_SEARCH_TEXT: 'search/CHANGE_SEARCH_TEXT' }),
    openModal() {
      if (this.$route.query.search_text) {
        this.search = this.$route.query.search_text
      }
      setTimeout(()=>{
        this.focusElement()
      }, 200)
    },
    initiateKeyboard() {
      setTimeout(() => {
        this.$refs.searchBarInput.$el.firstChild.focus();
        let event = new KeyboardEvent('touchstart', { bubbles: true });
        this.$refs.searchBarButton.$el.firstChild.dispatchEvent(event);
      }, 180);
    },
    btnClicked() {

      let event = new KeyboardEvent('touchstart', { bubbles: true });
      this.$refs.searchBarButton.$el.firstChild.dispatchEvent(event);
    },
    getCategories() {
      if (this.search.length > 2) {
        this.$axios.$get(`${this.$api.search}${this.search}`).then(res => this.searchList = res);
      } else {
        this.searchList = {
          data: [],
          advertises: []
        }
      }
    },
    closeModal() {
      this.$refs['modal-search'].hide()
    },
    hideModal() {
      this.$root.$emit(`bv::hide::modal`, 'modal-search');
    },
    searchReset() {
      this.resetCounter++;
      this.search = '';
      this.CHANGE_SEARCH_TEXT('');
      this.searchKey++;
    },
    totalCategories(data) {
      let count = 0
      data.forEach(i => count += +i.total)
      return count
    },
    getRouter(item) {
      let slug = item.slug;
      let parentCategories = item.parentCategories;
      while (parentCategories.length > 0) {
        let parentCategory = parentCategories[0];
        slug = `${parentCategory.slug}/${slug}`;
        parentCategories = parentCategory.parentCategories;
      }
      return this.$locationPath(`/catalog/${slug}`);
    },
    changePage(path, obj) {
      if (obj.search_text) {
        this.CHANGE_SEARCH_TEXT(obj.search_text);
      }
      this.searchProducts(path);
    },
    focusElement() {
      if(this.$refs.focusMe) {
        this.$refs.focusMe.$el.firstChild.focus()
        this.$refs.focusMe.$el.firstChild.click()
      }
    }
  },
}
</script>

<style lang="scss">
.align-center {
  align-items: center;
}

.modal-search {
  padding: 0 !important;
  @include large-mobile {
    .section-search__list {
      height: 95px;
    }
    .section-search__list-wrap {
      padding-bottom: 10rem;
    }
  }

  .button-back__arrow {
    svg {
      min-width: 16px;
      min-height: 16px;
      margin-right: 5px;
      fill: #062439;
    }
  }

  .modal-content {
    border-radius: 15rem 15rem 0 0;
    padding: 27rem 15rem 0 15rem;
    display: flex;
    flex-direction: column;
    height: 80vh;
  }

  &__header {
    display: block;
  }

  &__body {
    flex: 1 1 auto;
    position: relative;
  }

  &__form {
    display: flex;
    width: 100%;
  }

  &__cancel {
    padding-left: 10rem;
    margin-left: 4rem;
    height: 100%;
    position: relative;
    color: #6A757C;
    display: flex;
    align-items: center;
  }

  .input {
    &__field {
      border-radius: 8rem;
      padding-left: 38rem;

      &:focus {
        border-width: 2px;
      }
    }
  }

  &__field {
    width: 100%;
    position: relative;
  }

  &__btn-search {
    position: absolute;
    left: 20rem;
    top: 50%;
    margin-top: -19rem;

    @include small-tablet {
      left: 2rem;
      margin-top: -20rem;
    }

    @include large-mobile {
      left: 5rem;
      margin-top: -18rem;
      svg {
        width: 14rem;
        height: 14rem;
      }
    }
  }

  &__clear {
    position: absolute;
    right: 15rem;
    top: 50%;
    margin-top: -14rem;
  }

  &__categories {
    margin: 20rem -15rem 0 -15rem;
    padding-top: 0;
    overflow: hidden;

    &-wrap {
      flex-wrap: nowrap;
      padding-left: 15rem;
      padding-right: 15rem;
      padding-bottom: 40px;
      margin-bottom: -40px;
      overflow-x: auto;
      overflow-y: hidden;
    }
  }

  &__category {
    margin: 0 10rem;
    width: 80rem;
    flex-shrink: 0;

    &:first-child {
      margin-left: 0
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__container {
    padding-top: 5rem;
  }

  &__box {
    &:not(:first-child) {
      margin-top: 27rem;
    }

    &-title {
      font-weight: 600;
      font-size: 16rem;
      line-height: 1.2;
    }
  }

  &__container {
    position: absolute;
    left: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 30px;
    height: 100%;
    width: calc(100% + 30px);
    padding-bottom: 20rem;

    &-1 {
      margin-top: 14px;
    }
  }

  &__list {
    margin-top: 10rem;

    &-sub {
      margin-left: 20px;
    }
  }

  &__item {
    border-bottom: 1px solid rgba(#C3C8CB, .5);
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5rem 10rem 5rem 0;
    min-height: 46rem;
    color: #6A757C;
    font-size: 14rem;
    line-height: 1.2;

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
      margin-left: 10rem;
    }
  }

}

.modal-categories__item-black {
  .modal-categories__link-text {
    color: #062439;
  }

  .count {
    color: $blue;
    padding-left: 5px;
  }
}

.modal-categories__link-category__name {
  display: block;
  color: #9A9A9A;
  margin-top: 6px;
}

.modal-categories__link-data {
  padding: 14px 0;
}
</style>

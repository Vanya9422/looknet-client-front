<template lang="pug">
  .filter.js-filter(:class="mods" ref="filter")
    .filter__bg(@click="closeFilter()")
    form.filter__box
      .filter__body
        .filter__body-wrap(ref="container")
          module-filter-category(:active="activeCategory")
          .filter__list
            module-filter-item.filter__accordion(
              v-for="(item, i) in allFilters"
             :key="i"
             :title="item.name"
             :list="item.answers"
             visible
              :name="item.name"
             @change="changeAnswersItem"
            )
          .filter__cost
            .filter__cost-title.b {{costText}}
            .filter__cost-fields(:key="key")
              form-input-price(:precision="0" @blur="blurCostFrom" placeholder="$ 0" v-model="costFrom"  id="from"  separator)
              form-input-price(:precision="0" @blur="blurCostTo" placeholder="$ 100.000" v-model="costTo" id="to"  separator)
      .filter__bottom
        button-primary.filter__btn(blue @click.prevent.native="readyFilterAllBtn") {{ btnText }}
    modal-catalog-filter

</template>

<script>
import {numberWithSpaces} from '~/assets/js/functions';
import {mapActions, mapGetters} from "vuex";
import {cloneDeep} from 'lodash';
import catalogFilters from "@/mixins/catalogFilters";

export default {
  props: {
    counter: {
      type: Number,
      default: 2
    },
    resetText: {
      type: String,
      default: "Reset"
    },
    btnText: {
      type: String,
      default: "Apply"
    },
    filterText: {
      type: String,
      default: "Filters"
    },
    costText: {
      type: String,
      default: "Apply"
    },
    full: {
      type: Boolean,
      default: false
    },
    filters: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      numberWithSpaces,
      show: false,
      key: 0,
      costTo: '',
      costFrom: '',
      step: 0,
      modalShow: 0,
      activeCategory: {},
    }
  },
  mixins: [catalogFilters],
  computed: {
    ...mapGetters({
      CATEGORY: 'category/CATEGORY',
      ALL_FILTERS: 'category/ALL_FILTERS',
    }),
    mods() {
      return {
        'visible': this.show,
      }
    },
    modalTitle() {
      let str = 'Filters'
      if (this.step === 1 && this.modalShow === 1) str = 'Categories'
      if (this.step === 1 && this.modalShow === 2 && this.activeFilter) str = this.activeFilter.name
      return str
    },
  },
  created() {
    this.openPage()
  },
  methods: {
    ...mapActions({
      SET_CATEGORIES: 'category/SET_CATEGORIES',
      SET_CATEGORY: 'category/SET_CATEGORY',
      SET_CATEGORY_PRODUCTS: 'category/SET_CATEGORY_PRODUCTS',
      SET_CATEGORY_PRODUCTS_PAGE: 'category/SET_CATEGORY_PRODUCTS_PAGE',
      SET_ALL_FILTERS: 'category/SET_ALL_FILTERS',
      SET_FILTERS: 'category/SET_FILTERS',
      SET_PAGE_CATALOG: 'pages/SET_PAGE_CATALOG'
    }),
    changePrice(price) {
      let filters = cloneDeep(this.ALL_FILTERS)
      filters.filters.price = price
      this.SET_ALL_FILTERS(filters)
    },
    async openPage() {
      const routeParams = this.$route.params.pathMatch
      if (routeParams) {
        const slug = routeParams.split('/')
        await this.SET_CATEGORY(slug[slug.length - 1])
        this.activeCategory = cloneDeep(this.CATEGORY)
        this.filterForm.category = cloneDeep(this.CATEGORY)
      }
      const price = this.$route.query.price
      if (price) {
        const prices = price.split(',')
        this.costFrom = prices[0]
        this.costTo = prices[1]
        this.key++
      }
      const answers = this.$route.query.answers
      if (answers) {
        if(typeof answers === 'string'){
          this.filterForm.answersIds = [answers]
        }else {
          this.filterForm.answersIds = answers
        }
        this.resetFiltersKey++
      }
    },
    mobileShowFilters(item) {
      this.step = 1
      this.modalShow = 2
      this.activeFilter = item
      this.filterForm.answersIds = cloneDeep(this.filterForm.answersIds)
    },

    getProductFilters() {
      return {
        lang: this.$i18n.locale,
      }
    },
    changeCategory(cat) {
      this.activeCategory = cat
    },
    mobileShowCategories() {
      this.step = 1
      this.modalShow = 1
    },


    closeFilter() {
      if (!process.client) return;
      this.$refs.filter.classList.remove('visible');
      document.querySelector("html").classList.remove("js-lock");
      document.querySelector("body").removeAttribute("style");
    },
    closeOrPrevModal() {
      if (this.step === 0) {
        this.$bvModal.hide('modal-catalog-filter')
      } else {
        this.step = 0
        if (this.modalShow === 1) {
          this.activeCategory = cloneDeep(this.filterForm.category)
        }
        this.modalShow = 0
      }
    }
  },
}
</script>

<style lang="scss">
.input.is-separator .input__field {
  padding: 0 20rem;
}

.filter {
  //position: sticky;
  //top: 130rem;
  //height: calc(100vh - 60rem);
  @include small-tablet {
    position: fixed;
    left: 0;
    top: -64rem;
    width: 100%;
    height: 100%;
    z-index: 999;
    visibility: hidden;
    &.visible {
      visibility: visible;

      .filter {
        &__bg {
          opacity: 1;
        }

        &__box {
          opacity: 1;
          margin-top: 0;
          transform: translateY(0);
        }
      }
    }
  }

  &__bg {
    display: none;
    @include small-tablet {
      width: 100%;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba($default, .2);
      display: block;
      opacity: 0;
      transition: ease .3s;
    }
  }

  &__box {
    display: flex;
    flex-direction: column;
    //position: relative;
    height: 100%;
    @include small-tablet {
      position: absolute;
      background: #fff;
      left: 0;
      bottom: 0;
      width: 100%;
      height: calc(70vh);
      display: flex;
      flex-direction: column;
      padding: 16rem 15rem 26rem 15rem;
      border-radius: 10rem 10rem 0 0;
      opacity: 0;
      transition: ease .5s;
      transform: translateY(30rem);
    }
    @include large-mobile {
      height: calc(100vh - 90rem);
    }
  }

  &__title {
    @include small-tablet {
      display: none;
    }
  }

  &__nav {

    @include min-small-tablet {
      &-item {
        display: flex;
        align-items: center;
        min-height: 22rem;

        &:not(:first-child) {
          margin-left: 20rem;
          border-left: 1px solid #D2D2D7;
          padding-left: 20rem;
        }
      }
    }

    @include small-tablet {
      justify-content: space-between;
    }
  }

  &__close {
    display: none;

    @include small-tablet {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28rem;
      height: 28rem;
      background: #F4F3F4;
      border-radius: 100%;
      svg {
        width: 10rem;
        height: 9rem;
        stroke: $gray;
        stroke-width: 2;
      }
    }
  }

  &__reset {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    align-items: center;
    font-weight: 600;
    color: $blue;

    &-icon {
      display: none;
    }

    @include small-tablet {
      font-size: 14rem;
      line-height: 1;
      &-icon {
        display: block;
        width: 12rem;
        height: 11rem;
        flex-shrink: 0;
        margin-right: 5rem;
        fill: $blue;
      }
      &-text {
        padding-top: 1px;
      }
    }
  }

  &__body {
    margin-top: 20rem;
    position: relative;

    &-wrap {
      width: calc(100% + 18rem);
      padding-right: 7rem;
      //max-height: calc(100vh - 300rem);
      //overflow-x: hidden;
      //overflow-y: auto;
      padding-left: 10rem;
      margin-left: -10rem;

    }

    @include small-tablet {
      margin-top: 10rem;
      flex: 1 1 auto;
      position: relative;
      &-wrap {
        position: absolute;
        left: 0;
        top: 0;
        max-height: inherit;
        height: auto;
        margin-left: 0;
        padding-left: 0;
        height: 100%;
        width: calc(100% + 30px);
        padding-right: 28px;
      }
    }
  }

  &__accordion {
    @include small-tablet {
      &:first-child {
        border-top: 0;
      }
    }
  }

  &__cost {
    border-top: 1px solid $light-gray;
    padding-top: 20rem;

    &-fields {
      display: flex;
      margin-top: 20rem;

      .input {
        width: 50%;
      }
    }

    @include large-mobile {
      &-title {
        padding-left: 10rem;
        font-size: 15rem;
      }
      &-fields {
        @include items(2, 5);
        margin-top: 15rem;
      }
    }
  }

  &__btn {
    width: 100%;
    margin-top: 30rem;

    @include small-tablet {
      margin-top: 25rem;
    }
  }

  &__bottom {
    background: #fff;
    //position: sticky;
    bottom: 30rem;
  }
}
</style>

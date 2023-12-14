<template lang="pug">
  b-modal(
    id="modal-catalog-filter"
    ref="modal-catalog-filter"
    modal-class="modal-catalog-filter"
    body-class="modal-catalog-filter__body"
    header-class="modal-catalog-filter__header"
    footer-class="modal-catalog-filter__footer"
    @hide="hideModal"
    position="top-right"
    direction="right"
    tabindex="-1"
    labelledby="exampleSideModalLabel1"
    side
  )
    template(#modal-header)
      btn-arrow.modal-catalog-filter__header-back(v-if="step === 1" icon="prev" @click.native.prevent="closeOrPrevModal") Back
      btn-arrow.modal-catalog-filter__header-close(v-else icon="close" @click.native.prevent="closeOrPrevModal") Close
      .modal-catalog-filter__header-title {{modalTitle}}
      btn-arrow.modal-catalog-filter__header-reset(icon="reset" @click.native="resetFilter") Reset
    .modal-catalog-filter__body
      template(v-if="step === 0")
        .modal-catalog-filter__item.flex(@click.prevent="mobileShowCategories")
          .modal-catalog-filter__text
            .modal-catalog-filter__title Categories
            .modal-catalog-filter__sub-title {{SEARCH_CATEGORY.name}}
          .modal-catalog-filter__item-arrow
            svg-icon.modal-catalog-filter__item-svg(name="prev")
        
        .modal-catalog-filter__item
          //- | {{ filterSelection }}
          //- br
          part-filters-selectable(
            v-if='readyCategory && readyCategory.id'
            :category-id='readyCategory.id'
            v-model='filterSelection'
            ref='filterSelection'
          )
        //- ---------------------------------------------------------
        //- .modal-catalog-filter__item.flex( v-for="(item, i) in allFilters" :key="i" @click.prevent="mobileShowFilters(item,i)")
        //-   .modal-catalog-filter__text
        //-     .modal-catalog-filter__title {{item.name}}
        //-     .modal-catalog-filter__sub-title {{item.subTitle.join(', ')}}
        //-   .modal-catalog-filter__item-arrow
        //-     svg-icon.modal-catalog-filter__item-svg(name="prev")
        //- ---------------------------------------------------------
        .modal-catalog-filter__item.modal-catalog-filter__cost
          .modal-catalog-filter__title Cost
          .modal-catalog-filter__fields(:key="key")
            form-input-price( :precision="0" @blur="blurCostFrom" placeholder="$ 0" v-model="costFrom"  id="from"  separator)
            form-input-price( :precision="0" @blur="blurCostTo" placeholder="$ 100.000" v-model="costTo" id="to"  separator)
      template(v-if="step === 1 && modalShow === 1")
        module-filter-category(mobile :active="activeCategory" :routeSlug="activeCategory.to" @changeActive="changeCategory")
      template(v-if="step === 1 && modalShow === 2")
        module-filter-item.filter__accordion(
          :key="resetFiltersKey"
          v-if="activeFilter"
          :title="activeFilter.name"
          :list="activeFilter.answers"
          visible
          @change="(value) => changeAnswersItemMobile(value)"
        )
    template(#modal-footer)
      button-primary.filter__btn(blue @click.prevent.native="() => readyFilter(filterSelection)") {{ step === 0 ? btnText : 'Ready' }}

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
      step: 0,
      modalShow: 0,
      answersList: [],
      activeCategory: {
        to: false
      },

      filterSelection: {
        filters: {},
        filters_values: {}
      }
    }
  },
  created() {
    this.updateSelectionFIlter(this.SEARCH?.answersFiltersIds)
  },
  mixins: [catalogFilters],
  computed: {
    ...mapGetters({
      CATEGORY: 'category/CATEGORY',
      ALL_FILTERS: 'category/ALL_FILTERS',
      SEARCH: 'search/SEARCH',
      SEARCH_CATEGORY: 'search/SEARCH_CATEGORY',
      SEARCH_ANSWERS_FILTERS_IDS: 'search/SEARCH_ANSWERS_FILTERS_IDS',
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
    updateSelectionFIlter(answers){
      if(!answers || !Object.values(answers).length) return false;
      const clone = JSON.parse(JSON.stringify(answers))
      this.filterSelection = clone
    },
    mobileShowFilters(item, index) {
      this.step = 1
      this.modalShow = 2
      this.activeFilter = {...item, index}
      this.answersList = cloneDeep(this.SEARCH_ANSWERS_FILTERS_IDS[index] || [])
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
    hideModal() {
      this.$bvModal.hide('modal-catalog-filter')
      this.step = 0
      this.modalShow = 0
    },
    closeOrPrevModal() {
      if (this.step === 0) {
        this.$bvModal.hide('modal-catalog-filter')
      } else {
        this.step = 0
        if (this.modalShow === 1) {
          this.activeCategory = cloneDeep(this.filterForm.category)
        }
        if (this.modalShow === 2) {
          this.activeFilter = null
          this.answersIds = cloneDeep(this.filterForm.answersIds)
        }
        this.modalShow = 0
      }
    },
    changeAnswersItemMobile(val) {
      let index = this.answersList ? this.answersList.findIndex(item => item === val.id) : -1
      if (index >= 0) this.answersList.splice(index, 1)
      else this.answersList.push(val.id)
    }
  },
}
</script>


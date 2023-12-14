<template lang="pug">
  b-modal(
    id="modal-create"
    size="create-size"
    modal-class="modal-create"
    body-class="modal-create__body"
    header-class="modal-create__header"
    footer-class="modal-create__footer"
    @show="openModal"
  @hide="closeModal"
    centered
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='close()')
      .modal-create__head.flex.flex_vertical.flex_justify
        .modal-create__title.h4 {{content.title}}
      .modal-create__breadcrumbs.color-gray.p(v-if="activeCategory && !other")
        span.modal-create__breadcrumbs-item(v-for="(item,index) in bred" :key="index") {{item.name}}
      .modal-create__nav.flex.flex_vertical.flex_justify
        div
          button-back.modal-create__back(v-if="activeCategory && !other" small gray @click.native='backCategory') {{content.back}}
        transition(name="fade")
          button-action.modal-create__head-btn(icon="search" :text="content.search" small gray @click.native="search = true" v-if="search != true")
      transition(name="fade")
        form.modal-create__search(action="/#search" v-if="search")
          .modal-create__search-field
            form-input.modal-create__search-input(:key="keySearch" :placeholder="content.searchPlaceholder" v-model="searchText" ref="InputSearch")
            button-action.modal-create__search-btn(icon="search" @click.native.prevent="searchCategory" small gray)
            button-close.modal-create__search-clear(type="button" @click.native="cleatText" white)
          .modal-create__search-cancel(@click="search = false" ) {{content.cancel}}
    .modal-create__categories.css-scrollbar(v-if="other && !search && !edit")
      .modal-create__categories-list.flex
        .modal-create__categories-item(v-for="(category, i) in recCategory" :key="i")
          button-category.modal-create__categories-btn(
            :img="category.picture?category.picture.original_full_url:''"
            :text="category.name ? category.name : contentAllCategory"
            :desc="category.desc || ''"
            :border="category.border || true"
            @click.prevent.native="checkedProduct(category)"
          )
        client-only
        infinite-loading(:distance="20" @infinite="handleLoadMore")
          div(slot="no-results")
          div(slot="no-more")
          div(slot="spinner")
    .modal-create__categories.css-scrollbar(v-else)
      .modal-create__categories-list.flex
        .modal-create__categories-item(v-for="(category, i) in categoryList" :key="i")
          button-category.modal-create__categories-btn(
            :img="category.picture?category.picture.original_full_url:''"
            :text="category.name"
            :desc="category.desc || ''"
            :border="category.border || true"
            @click.prevent.native="checkedProduct(category)"
          )
        client-only
        infinite-loading(:distance="20" @infinite="handleLoadMore")
          div(slot="no-results")
          div(slot="no-more")
          div(slot="spinner")
    template(#modal-footer='{ close }')
      button-primary.modal-create__cancel(border @click.native='close()') {{ POPUP_GLOBAL.cancel }}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    content: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      default: ''
    },
    contentAllCategory: {
      type: String,
      default: ''
    },
    showAllCategories: {
      type: Boolean,
      default: false
    },
    categoryParentId:{
      type:Number,
      default:0
    },
  },
  data() {
    return {
      search: false,
      searchText: '',
      recCategory: [],
      list: [],
      other: false,
      keySearch: 0,
      page: 0,
      per_page: 20,
      activeCategory: null,
      lastCategory: null,
      bred:[]
    }
  },
  computed: {
    categoryList() {
      // console.log('categoryList', this.activeCategory, this.searchText)
      if (this.activeCategory && this.searchText === '') {
        if (this.activeCategory.parentCategories?.length > 0) {
          return this.activeCategory.parentCategories[0].allSubCategories
        } else {
          return this.activeCategory.allSubCategories
        }
      } else {
        return this.list
      }
    },
    ...mapGetters({
      PAGE_ADD_PRODUCT: 'pages/PAGE_ADD_PRODUCT',
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
    })
  },
  watch: {
    other(val) {
      if (val === true) {
        this.page = 0
        this.handleLoad()
      }
    },
    search(val) {
      if (val === false) {
        this.page = 0
        this.handleLoad()
      }
    },
    searchText(val) {
      this.page = 0
      this.searchCategory()
    }
  },
  methods: {
    backCategory(){
      this.bred.pop()
      this.activeCategory =  this.bred[this.bred.length - 1]
    },
    cleatText() {
      this.searchText = ''
      this.keySearch++
    },
    closeModal(){
      this.$emit('closeModal')
      this.page = 0
      this.search = false
      this.searchText = ''
      this.list = []
    },
    openModal() {
      this.page = 0
      this.search = false
      this.searchText = ''
        if (this.showAllCategories) {
          this.other = false
          this.activeCategory = null
          this.bred = []
        }else{
          if (this.name !== '') {
            this.list = []
            this.$axios.$get(`${this.$api.category.top}?name=${this.name}`)
              .then(({data}) => {
                this.recCategory = data
                this.recCategory.push({text: 'Other category', border: true},)
                this.other = this.recCategory.length !== 1
              })
          } else {
            this.other = false
          }
        }
    },
    handleLoad() {
      this.fetchData().then(({data, meta: {current_page}}) => {
        this.list = []
        if (data.length > 0) {
          // this.list = data;
          this.list.push(...data);
          this.page = current_page
        }
      })
    },
    // findObjectCategories(object, arr) {
    //   for (let i = 0; i < arr.length; i++) {
    //     const item = arr[i];
    //     if (item.id === this.recCategory[0].id) {
    //       return item;
    //     } else if (item.allSubCategories.length) {
    //       const found = this.findObjectCategories(item, item.allSubCategories);
    //       if (found) {
    //         console.log(i)
    //         return found;
    //       }
    //     }
    //   }
    //   return null;
    // },
    fetchData() {
      const filterField = `filter=id;name;slug;parent_id`
      const withField = `with=picture;allSubCategories;parentCategories.allSubCategories`
      let api = `${this.$api.categories}?per_page=${this.per_page || 20}&${filterField}&${withField}&page=${this.page + 1}`;
      if (this.search && this.searchText !== '') api += `&searchFields=name->${this.$i18n.locale || 'en'}:like&search=name->${this.$i18n.locale|| 'en'}:${this.searchText}`
       else api += `&search=parent_category:0`
      return this.$axios.$get(api)
    },
    handleLoadMore($state) {
      this.fetchData()
          .then(({data, meta: {current_page}}) => {
            if (data.length > 0) {
              this.list.push(...data);
              this.page = current_page
              $state.loaded()
            } else {
              $state.complete()
            }
          })
          .catch((e) => console.log(e));
    },
    searchCategory() {
      this.page = 0
      this.other = false
      this.handleLoad()
    },
    async checkedProduct(category) {
      if(!category.border && this.other){
        const filterField = `filter=id;slug;name;parent_id`
        const withField = `with=picture;allSubCategories;parentCategories.allSubCategories`
        const categories = await this.$axios.$get(`/categories?searchFields=id:=&search=${category.id}&${filterField}&${withField}`)
        this.bred = this.$categoryBreadcrumbs(categories.data[0])
        this.activeCategory = categories.data[0]
        const breadcrumbs = this._.cloneDeep(this.bred)
        const newCategory = this._.cloneDeep(this.activeCategory)
        this.$emit('close', {category:newCategory, breadcrumbs})
      }else{
        if(category.border){
          this.other = false
          this.bred = [];
          this.recCategory = []
          this.activeCategory = undefined
        }else{
          if(this.search){
            this.search = false
            this.searchText = ''
            if (this.chatUsersPage > this.chatUsersLastPage) {return}
            this.bred = this.$categoryBreadcrumbs(category)
          }
          if (!this.activeCategory ||  category.allSubCategories.length > 0) {
            this.activeCategory = category
            this.bred.push(category);
          } else {
            const breadcrumbs = this._.cloneDeep(this.bred)
            if (category.id) {
              this.$emit('close', {category, breadcrumbs})
            } else {
              this.other = false
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/сss/components/modal-create.scss';
.modal-create__categories-item{
  cursor: pointer;
}
.modal-create__categories {
  max-height: 350rem;
  height: 260rem;
  padding-right: 10px;
  overflow-x: hidden;
}
</style>

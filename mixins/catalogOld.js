import {mapActions, mapGetters} from "vuex";
import {cloneDeep} from 'lodash';

export default {
  data() {
    return {
      apiFilter: null,
      answers: [],
      productKey: 0,
      sort: {},
      counter: 0,
      cost: '0,100000',
      search: null,
      pageLoading: false,
      resetFiltersKey: 0
    }
  },
  computed: {
    ...mapGetters({
      PRODUCT_CART_TYPE: 'product/PRODUCT_CART_TYPE',
      CATEGORY: 'category/CATEGORY',
      CATEGORY_PRODUCTS: 'category/CATEGORY_PRODUCTS',
      CATEGORY_FILTERS: 'category/CATEGORY_FILTERS',
      PAGE_CATALOG: 'pages/PAGE_CATALOG'
    })
  },
  watch: {
    async sort() {
      if (this.pageLoading) {
        // await this.getProducts()
        const order = this.getSort(this.sort.value)

        const query = cloneDeep(this.$route.query)
        query.orderBy = order.orderBy
        query.sortedBy = order.sortedBy
        this.$router.push({query})
      }
    },
    async CATEGORY() {
      this.productKey++
      this.SET_CATEGORY_PRODUCTS_PAGE()
      const ref = this.$refs.infiniteLoading
      if (ref) this.$refs.infiniteLoading.stateChanger.reset()
      this.getProductFilters()
      await this.SET_CATEGORY_PRODUCTS(this.$route)
      this.SET_FILTERS()
    },
    PAGE_CATALOG() {
      const sort = this.$route.query
      if (sort.orderBy && sort.sortedBy) {
        this.PAGE_CATALOG.sortList.forEach(item => {
          let order = this.getSort(item.value)
          if (order.orderBy === sort.orderBy && order.sortedBy === sort.sortedBy) this.sort = item
        })
      } else {
        this.sort = this.PAGE_CATALOG.sortList[0]
      }
    },
    '$route': {
      handler: async function (slug) {
        this.getProductFilters()
        await this.getProducts()
        this.resetFiltersKey++
      },
      deep: true,
      immediate: true
    },
    '$i18n.locale'() {
      this.SET_CATEGORIES_NEW(this.$i18n.lang)
    }
  },
  async created() {
    this.SET_PAGE_CATALOG()
    await this.openPage()
  },
  methods: {
    ...mapActions({
      SET_CATEGORIES: 'category/SET_CATEGORIES',
      SET_CATEGORIES_NEW: 'category/SET_CATEGORIES_NEW',
      SET_CATEGORY: 'category/SET_CATEGORY',
      SET_CATEGORY_PRODUCTS: 'category/SET_CATEGORY_PRODUCTS',
      SET_CATEGORY_PRODUCTS_PAGE: 'category/SET_CATEGORY_PRODUCTS_PAGE',
      SET_FILTERS: 'category/SET_FILTERS',
      SET_ALL_FILTERS: 'category/SET_ALL_FILTERS',
      SET_PAGE_CATALOG: 'pages/SET_PAGE_CATALOG'
    }),
    getSort(val) {
      let obj = {}
      let order = val.split('&')
      obj.orderBy = order[0].split('=')[1]
      obj.sortedBy = order[1].split('=')[1]
      return obj
    },
    async openPage() {
      const routeParams = this.$route.params.pathMatch
      await this.SET_CATEGORIES(this.$i18n.lang)
      if (routeParams) {
        const slug = routeParams.split('/')
        await this.SET_CATEGORIES(this.$i18n.lang)
        await this.SET_CATEGORY(slug[slug.length - 1])
        this.search = this.$route.query.search_text
      } else {
        // await this.getProducts()
      }

      this.pageLoading = true
    },
    async handleLoadMore($state) {
      await this.SET_CATEGORY_PRODUCTS(this.$route)
        .then(loadState => {
          if (loadState) $state.loaded()
          else $state.complete()
        })
    },
    getProductFilters() {
      const productSort = this.sort
      const filters = {
        search_text: this.search || this.$route.query.search_text || '',
        price: this.$route.query.price || '',
        mil: this.$route.query.mil || '',
        // ...this.apiFilter
      }
      if (this.cityItem) {
        if (this.cityItem.id === 'c1') filters['city.country_id'] = 1
        else filters.city_id = this.cityItem.id
      } else {
        const city_id = this.$route.query.city_id
        if (city_id) {
          if (city_id === 'c1') filters['city.country_id'] = 1
          else filters.city_id = city_id
        }
      }
      this.SET_ALL_FILTERS({
        lang: this.$i18n.locale,
        filters
      })
    },
    async getProducts() {
      this.SET_CATEGORY_PRODUCTS_PAGE()
      this.productKey++
      await this.SET_CATEGORY_PRODUCTS(this.$route)
    },
    changeFilter(id) {
      const index = this.answers.findIndex(i => i === id)
      if (index < 0) this.answers.push(id)
      else this.answers.splice(index, 1)
      this.counter = this.answers.length
    },
    async applyFilter() {
      if (this.apiFilter) {
        this.apiFilter.price = this.cost
        this.apiFilter['answers.id'] = this.answers
      } else {
        this.apiFilter = {
          price: this.cost,
          'answers.id': this.answers
        }
      }

      // await this.getProducts()
    },
    async resetFilters() {
      this.answers = []
      this.counter = this.answers.length
      this.cost = '0,100000'
      if (this.apiFilter) {
        this.apiFilter.price = this.cost
        this.apiFilter['answers.id'] = this.answers
      } else {
        this.apiFilter = {
          price: this.cost,
          'answers.id': this.answers
        }
      }
      // await this.getProducts()
    },
    async searchProducts(filters) {
      if (this.pageLoading) {
        if (typeof filters === 'string') this.apiFilter = {search_text: filters}
        else this.apiFilter = filters
        this.$router.push({query: {...filters}})
        await this.getProducts()
      }
    }
  }
}

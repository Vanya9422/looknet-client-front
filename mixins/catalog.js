import { mapActions, mapGetters, mapMutations } from "vuex";
import { decodeQuery } from "~/mixins/helpers/search";
import {cloneDeep} from 'lodash';
export default {
  data() {
    return {
      apiFilter: null,
      answers: [],
      productKey: 0,
      pageLoading: false,
      resetFiltersKey: 0
    };
  },
  computed: {
    ...mapGetters({
      PAGE_CATALOG: 'pages/PAGE_CATALOG',
      PRODUCT_CART_TYPE: 'product/PRODUCT_CART_TYPE',
      PRODUCTS: 'search/PRODUCTS',
      TOP_PRODUCTS: 'search/TOP_PRODUCTS',
      PRODUCTS_LOADING: 'search/PRODUCTS_LOADING',
      SORT: 'search/SORT',
      GET_PRODUCTS: 'search/GET_PRODUCTS',
      SEARCH_ANSWERS_IDS: 'search/SEARCH_ANSWERS_IDS',
      SEARCH: 'search/SEARCH',
    }),
    counter() {
      const answers = this.SEARCH?.answersFiltersIds?.filters || {};
      const list = Object.values(answers).flatMap(filter => {
        return Object.values(filter);
      });
      let counts = 0;
      const findInner = (row) => {
        const varType = typeof row;
        counts++;
        if (varType === 'object') {
          const inner = Object.values(row);
          for (let i = 0; i < inner.length; i++) {
            const innerEl = inner[i];
            findInner(innerEl);
          }
        }
      };
      for (let index = 0; index < list.length; index++) {
        const el = list[index];
        findInner(el);
      }
      return counts;
    },
    canGetProducts: {
      get() {
        return this.GET_PRODUCTS;
      },
      set(val) {
        this.CHANGE_GET_PRODUCTS(val);
      }
    },
    sortList() {
      return [
        {
          label: this.PAGE_CATALOG.sortList[0].label,
          text: this.PAGE_CATALOG.sortList[0].text,
          value: 'orderBy=id&sortedBy=desc'
        },
        {
          label: this.PAGE_CATALOG.sortList[1].label,
          text: this.PAGE_CATALOG.sortList[1].text,
          value: 'orderBy=id&sortedBy=asc'
        },
        {
          label: this.PAGE_CATALOG.sortList[2].label,
          text: this.PAGE_CATALOG.sortList[2].text,
          value: 'orderBy=price&sortedBy=desc'
        },
        {
          label: this.PAGE_CATALOG.sortList[3].label,
          text: this.PAGE_CATALOG.sortList[3].text,
          value: 'orderBy=price&sortedBy=asc'
        }
      ];
    },
    products() {
      return this.PRODUCTS.flatMap((product, index) => {
        const productItem = { ...product, is_top: false };
        if (index === 0 || (index + 1) % 13 === 0) {
          return [...this.TOP_PRODUCTS, productItem];
        } else {
          return productItem;
        }
      });
    },
  },
  watch: {
    '$route': {
      handler: async function (slug) {
        const sort = this.$route.query;
        if (sort.orderBy && sort.sortedBy) {
          this.sortList.forEach((item, index) => {
            let order = this.getSort(item.value);
            if (order.orderBy === sort.orderBy && order.sortedBy === sort.sortedBy) {
              this.CHANGE_SORT(index);
              this.sortKey++;
            }
          });
        }
        // if(this.GET_PRODUCTS === true){
        //   this.handleLoadMore()
        // }
      },
      deep: true,
      immediate: true
    },
    '$i18n.locale'() {
      this.SET_PAGE_CATALOG();
    },
    GET_PRODUCTS(val) {
      // console.log(val)
      // if(val === true){
      //   this.handleLoadMore()
      // }
    }
  },
  async created() {
    this.SET_PAGE_CATALOG();
    // await this.openPage()
  },
  methods: {
    ...mapActions({
      SET_PAGE_CATALOG: 'pages/SET_PAGE_CATALOG',
      SEARCH_PRODUCTS: 'search/SEARCH_PRODUCTS',
    }),
    ...mapMutations({
      CHANGE_SORT: 'search/CHANGE_SORT',
      CHANGE_SEARCH_TEXT: "search/CHANGE_SEARCH_TEXT",
    }),
    handleLoadMore($state) {
      this.SEARCH_PRODUCTS({ categoryId: this.$route.query, init: 'all' }).then(res => {
        this.canGetProducts = false;
      });
      // .then(loadState => {
      //   if (loadState) $state.loaded()
      //   else $state.complete()
      // })
    },
    getSort(val) {
      let obj = {};
      let order = val.split('&');
      obj.orderBy = order[0].split('=')[1];
      obj.sortedBy = order[1].split('=')[1];
      return obj;
    },
   changeSort(val) {
      this.CHANGE_SORT(val);
      const order = this.getSort(this.sortList[val].value);
      const query = decodeQuery(this.$route.query);
      query.orderBy = order.orderBy;
      query.sortedBy = order.sortedBy;
      const path = cloneDeep(this.$route.path);
      this.$router.push({ path, query});
      this.sortKey++;
    }
  }
};

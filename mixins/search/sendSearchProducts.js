import {encodeQuery} from "~/mixins/helpers/search";
import {mapActions} from "vuex";

export default {
  methods: {
    ...mapActions({
      SET_SEARCH_PRODUCTS: 'search/SET_SEARCH_PRODUCTS',
    }),
    searchProducts(categoryPath) {
      this.SET_SEARCH_PRODUCTS().then((search) => {
        const path = categoryPath || (this.$route.path.search('catalog') !== -1 ? this.$route.path : this.$locationPath('/catalog'));
        this.$router.push(`${path}?${encodeQuery(search)}`);
      });
    },
  }
}

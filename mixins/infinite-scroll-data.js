export default {
  data() {
    return {
      list: [],
      page: 0,
      // infiniteScrollRouteUrl: "",
    };
  },
  methods: {
    fetchData() {
      let search = `${this.infiniteScrollRouteUrl}&per_page=${this.per_page || 20}&page=${this.page + 1}`;
      return this.$axios.$get(search)
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
  },
};

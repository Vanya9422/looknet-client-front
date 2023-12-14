import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

if (process.client) {
  Vue.component('infinite-loading', InfiniteLoading);
}

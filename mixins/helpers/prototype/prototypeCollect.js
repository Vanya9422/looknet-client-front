import Vue from 'vue';
import collect from 'collect.js';


Vue.prototype.$collect = collect;

export default ({ app }, inject) => {
  inject('collect', collect)

}
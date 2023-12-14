// import Vue from 'vue'
//
// Vue.prototype.localePath = function (key,locale='en'){
//   let page_key = 'settings'
//   if (locale !== 'en') page_key += `-${locale}`
//   const url = this.$getQuery({page_key, locale})
//   this.$axios.$get(`${this.$api.page}?${url}`)
// }
//
// function getPage(key,locale='en'){
//   let page_key = 'settings'
//   if (locale !== 'en') page_key += `-${locale}`
//   const url = this.$getQuery({page_key, locale})
//   this.$axios.$get(`${this.$api.page}?${url}`)
// }
//
//
// export default ({app}, inject) => {
//   inject('changeRoute', function getPage(key,locale='en'){
//     let page_key = 'settings'
//     if (locale !== 'en') page_key += `-${locale}`
//     const url = this.$getQuery({page_key, locale})
//     this.$axios.$get(`${this.$api.page}?${url}`)
//   })
// }

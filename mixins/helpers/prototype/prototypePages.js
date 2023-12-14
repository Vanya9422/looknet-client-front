import Vue from 'vue'

Vue.prototype.$getMinutes = (duration) => {
  // Hours, minutes and seconds
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}
Vue.prototype.$getQuery = function (data, flag = false) {
  const query = data
  // this.$router.push({query})
  let str = '';
  Object.entries(query).forEach(entry => {
    const [key, value] = entry;
    if(value && typeof value !== 'undefined'){
      if ( typeof value !== 'object' ) {
        if (flag) {
          if (value !== '') str += `${key}:${value};`
        } else {
          str += `${key}=${value}&`
        }
      } else {
        if (flag) {
          if(value.length > 0){
            let test = `${key}:`;
            value.forEach((item,index) => {
              if(index === 0)test += `${item},`
              else test += `${item},`
            })
            str += test
          }
        } else {
          value.forEach(item => str += `${key}=${item}&`)
        }

      }
    }
  });
  return str.slice(0, -1)
}
Vue.prototype.$getPage = async function (locale, type, page_key) {
  // let locale = this.$i18n.locale,
  //     type = this.type,
  //     page_key = this.page_key
  if (locale !== 'en') page_key += `-${locale}`
  const url = this.$getQuery({page_key, locale, type})
  const {data} = await this.$axios.$get(`${this.$api.page}?${url}`)
  return data ? JSON.parse(data.content[0]) : null


}

Vue.prototype.$openProductModal = function (index, array) {
  const list = [];
  array.forEach(item => list.push(item.slug));
  if (process.client) {
    localStorage.setItem('productsList', list)
    localStorage.setItem('productsActive', index)
  }
}
Vue.prototype.$changePrice = function (val) {
  let price = val.split('.').join('')
  price = price.substring(2) * 1
  return price
}
Vue.prototype.$changePriceNew = function (val) {
  let price = val
  price = price.replace(",", ".").substring(2) * 1
  return price
}

Vue.prototype.$validateEmail = (email) => {
  return String(email)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};
Vue.prototype.$validatePhone = (phone) => {
  let str = phone.split(' ').join('')
  return String(str)
      .toLowerCase()
      .match(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,6}$/
      );
};


Vue.prototype.$goRegister = function () {
  this.$router.push(this.$locationPath('/auth/registration'))
}

export default (context, inject) => {
  inject('goRegister', Vue.prototype.$goRegister)
  inject('getQuery', Vue.prototype.$getQuery)
  inject('getPage', Vue.prototype.$getPage)
}

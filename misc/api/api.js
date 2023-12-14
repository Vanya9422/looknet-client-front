export default {
  categories: '/categories',
  filters: '/filters',
  searchText: '/search_texts?page=1&search=',
  products: '/products',
  favorites:{
    index:'/products/favorite',
    remove:'/products/favorite/remove',
    all:'/users/products/favorites',
  },
  advertises: {
    index: '/products',
    homeVip: '/products?searchJoin=and&per_page=10',
    home: '/products?searchJoin=and&randomResult=true&with=city;author.avatar;category;gallery&search=type:0;status:1',
  },
  countries: {
    city: '/get-city',
    states: '/states',
    search: '/search-cities',
    cities: '/cities'
  },
  page: '/text-pages',
  support: {
    add: '/supports/add-ticket'
  },
  advertisesEdit: '/products',
  settings: '/users/settings',
  statistics:'/users/products/statistics',
  user: {
    blockList: '/users/blocked-user-list',
    unblocked: '/users/unblocked-user',
    notifications: '/users/notifications',
    statistics: '/statistics/',
    advertises: '/users/products?searchJoin=and',
    favorites: '/users/products/favorites',
  },
  category: {
    top: '/categories/top-list'
  },
  search:'/search-products?search=',
  payments:'/payments/checkout',
  commercialUser:'/commercial/users?searchJoin=and&with=avatar&orderBy=created_at&sortedBy=desc&search=status:1;',
  commercialPeriod:'/commercial/period-of-stay?orderBy=created_at&sortedBy=desc',
  commercialBusCart:'/commercial/businesses?orderBy=created_at&sortedBy=desc&with=banner_images&searchJoin=and&search=type:0;status:1',
  commercialUserBusCart:'/commercial/businesses?with=banner_images&searchJoin=and&search=type:1;status:1',
  productsAction:'/products/action',
  changeSettings:{
    password:'/users/settings/change/password',
    email:'/users/settings/change/update-email-phone',
    sendEmail:'/users/settings/change/send-email-phone',
    confirmation:"/users/notifications/confirmation-send",
  }
}

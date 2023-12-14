export default () => ({
  openPage:false,
  getProducts:false,
  products: [],
  top_products: [],
  searchProductsList: [],
  page: 1,
  per_page: 40,
  total:0,
  productsLoading: false,
  search: {
    city: {id: 0, name: ''},
    searchText: '',
    mil: {text: '50 mi', key: '50'},
    sort: {
      orderBy: 'id',
      sortedBy: 'desc'
    },
    costTo: '',
    costFrom: '',
    category_id: '',
    answersFiltersIds:{}
  },
  city: {id: 0, name: ''},
  citySearch: '',
  searchText: '',
  category:{},
  mils: [
    {text: '10 mi', key: '10'},
    {text: '25 mi', key: '25'},
    {text: '50 mi', key: '50'},
    {text: '75 mi', key: '75'},
    {text: '100 mi', key: '100'},
    {text: '150 mi', key: '150'},
    {text: '200 mi', key: '200'},
    {text: '500 mi', key: '500'},
    {text: 'Nationwide', key: 'all'},
  ],
  mil: '50 mi',
  sort: 0,
  costTo: '',
  costFrom: '',
  answersIds:[],
  answersFiltersIds:{},
  sorts: ['orderBy=id&sortedBy=desc', 'orderBy=id&sortedBy=asc', 'orderBy=price&sortedBy=desc', 'orderBy=price&sortedBy=asc']
})



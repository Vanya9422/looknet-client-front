export default {
  title: 'Favorites ad',
  nav: [
    {
      text: 'Favorites',
      class: 'isActive'
    }
  ],
  sortBy:'Sort by',
  sortList:[
    {
      label: 'Newest',
      text: 'Newest',
      value: 'orderBy=id&sortedBy=desc'
    },
    {
      label: 'Older',
      text: 'Older',
      value: 'orderBy=id&sortedBy=asc'
    },
    {
      label: 'Expensive',
      text: 'Expensive',
      value: 'orderBy=price&sortedBy=desc'
    },
    {
      label: 'Cheap',
      text: 'Cheap',
      value: 'orderBy=price&sortedBy=asc'
    }
  ]
}
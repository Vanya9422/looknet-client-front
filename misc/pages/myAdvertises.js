export default  {
  title: 'My advertises',
  sortBy: 'Sort by',
  selectAll: 'Select all',
  left: 'left',
  nav: [
    {
      text: 'Active',
      slug: 'active',
      id: 1
    },
    {
      text: 'Non active',
      slug: 'nonActive',
      id: 2,
    },
    {
      text: 'Draft',
      slug: 'draft',
      id: 5
    },
  ],
  sortList: [
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
  ],
  banner: {
    name: 'Hello',
    description: 'Your analytics on all ads ',
    favorites: "Favorites",
    view: "View",
    call: "Calls"
  },
  buttons:{
    delete: 'Delete',
    draft: 'Draft',
    saleFaster: 'Sale faster',
    settings: 'Settings',
    chat: 'Chat',
    deactivation: 'Deactivation',
    active: 'Active',
    edit: 'Edit'
  },
  modals:{
    activate:{
      title: 'Active',
      description: 'Are you sure you want to activate this ad?',
      button: 'Confirm'
    },
    draft:{
      title: 'Draft',
      description: 'Are you sure you want to activate this ad?',
      button: 'Confirm'
    },
    delete:{
      title: 'Delete',
      description: 'Are you sure you want to activate this ad?',
      button: 'Confirm'
    },
    deactivate:{
      title: 'Deactivate',
      description: 'Are you sure you want to activate this ad?',
      button: 'Confirm'
    },
  }
}

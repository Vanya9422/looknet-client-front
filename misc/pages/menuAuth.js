export default  {
  menu: [
    {
      icon: 'apps',
      mobileIcon: 'chatBorder',
      to: '/announcements',
      name: 'My advertises',
      label: 'My advertises'
    },
    {
      icon: 'plus',
      to: '/create-ad',
      name: 'Create Advertise',
      label: 'Create Advertise'
    },
    {
      icon: 'favorites',
      to: '/favorites-ad',
      name: 'Favorites ad',
      label: 'Favorites ad'
    },
    {
      icon: 'favorites',
      name: 'Feedback',
      label: 'Feedback',
      to: '/favorites-ad',
    },
    {
      icon: 'chat',
      to: '/chat',
      name: 'Chat',
      label: 'Chat'
    },
    {
      icon: 'bell',
      to: '/notifications',
      name: 'Notifications',
      label: 'Notifications',
      notif: true
    },
    {
      icon: 'setting',
      to: '/settings',
      name: 'Settings',
      label: 'Settings',
    },
    {
      icon: 'support',
      to: '/support',
      name: 'Support',
      label: 'Support',
    }
  ],
  exit: 'Exit',
}

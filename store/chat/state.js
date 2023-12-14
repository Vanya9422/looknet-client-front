export default  () => ({
  list: [],
  tabs: [
      'resell',
      'buying',
      'support'
  ],
  sidebar_nav: [
    {
      text: 'resell',
      class: 'isActive',
      counter: 0,
      to: '/chat?tab=resell'
    },
    {
      text: 'buying',
      counter: 0,
      to: '/chat?tab=buying'
    },
    {
      text: 'support',
      counter: 0,
      to: '/chat?tab=support'

    },
  ],
  active_conversation_id: null,
  conversation_type: 'resell',
  messages: [],
  page:1,
  perPage:19,
  conversation_page:1,
  conversation_last_page:2,
  conversation_perPage:15,
  conversation_messages_page:1,
  conversation_messages_last_page:2,
  conversation_messages_perPage:10,
  number:null,
  storage_conv_id: process.client ? JSON.parse(localStorage.getItem('conv')) : null,
  storage_conversation: process.client ? JSON.parse(localStorage.getItem('conversation')) : null,
  checkedList:[],
  scroll_id:0,
  loading:false,
  loadingChat:false,
  search: null,
  sideBarScrollIdentifier:0,
  chatTopUserData:[],
  lastMessage:null,
  all_messages_unread_count:0,
  blockedKey:0,
  setFocusAfterMessageSend:false,
  isSafetyMessageShowed:false
})



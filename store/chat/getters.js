export default  {
  IS_SAFETY_MESSAGE_SHOWED: (state) => state.isSafetyMessageShowed,
  CHAT_USERS_LIST : (state) => state.list,
  GET_ACTIVE_CONVERSATION_ID : (state) => state.active_conversation_id,
  GET_CONVERSATION_MESSAGES : (state) => state.messages,
  MESSAGES_PER_PAGE : (state) => state.perPage,
  NUMBER : (state) => state.number,
  STORAGE_CONV_ID : (state) => state.storage_conv_id,
  CONVERSATION_PAGE : (state) => state.conversation_page,
  CONVERSATION_MESSAGES_PAGE : (state) => state.conversation_messages_page,
  CONVERSATION_PER_PAGE : (state) => state.conversation_perPage,
  CONVERSATION_LAST_PAGE : (state) => state.conversation_last_page,
  CONVERSATION_MESSAGES_LAST_PAGE : (state) => state.conversation_messages_last_page,
  CHECKED_LIST : (state) => state.checkedList,
  SCROLL_ID : (state) => state.scroll_id,
  SEARCH : (state) => state.search,
  SIDEBAR_SCROLL_IDENTIFIER : (state) => state.sideBarScrollIdentifier,
  CHAT_TOP_USER_DATA : (state) => state.chatTopUserData,
  CONVERSATION_TYPE : (state) => state.conversation_type,
  SIDEBAR_NAV : (state) => state.sidebar_nav,
  ALL_MESSAGES_UNREAD_COUNT : (state) => state.all_messages_unread_count,
  BLOCKED_KEY : (state) => state.blockedKey,
  GET_FOCUS_AFTER_MESSAGE_SEND : (state) => state.setFocusAfterMessageSend,
}

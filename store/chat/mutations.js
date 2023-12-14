import moment from 'moment'

export default {
  SET_SAFETY_MESSAGE(state, payload) {
    state.isSafetyMessageShowed = payload
  },
  CHANGE_CHAT_USERS_LIST(state, data) {
    let _this = this;

    Object.values(data.data).map((item) => {
      item.participants = item.participants.filter(participant => participant.messageable_id !== _this.$auth.user.id)[0];
      item.checked = false
    });

    if (data.current_page === 1) {
      state.list = data.data
    } else {
      state.list.push(...data.data);
    }

  },
  CHANGE_CHECKED(state, index) {
    state.list[index].checked = !state.list[index].checked
  },
  CHANGE_CHECKED_ALL(state) {
    const flag = state.list.length === state.checkedList.length;
    state.checkedList = [];
    state.list.forEach(item => {
      item.checked = !flag;
      if (!flag) state.checkedList.push(item.conversation_id)
    })
  },
  CHANGE_CHECKED_REMOVE_ALL(state) {
    state.checkedList = [];
    state.list.forEach(item => item.checked = false)
  },
  CHANGE_CHECKED_ALL_REMOVE(state, id) {
    const getIndex = state.checkedList.findIndex(item => item === id);
    state.checkedList.splice(getIndex, 1)
  },
  CHANGE_CHECKED_ALL_PUSH(state, id) {
    state.checkedList.push(id)
  },
  DELETE_USER_FROM_LIST(state, conversation_ids) {

    conversation_ids.map(function (item) {
      let index = state.list.findIndex(object => object.conversation_id === item);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    });
  },
  SET_ACTIVE_CONVERSATION_ID(state, conversation_id = 0) {
    state.active_conversation_id = conversation_id
  },
  SET_ACTIVE_USER(state, number = null) {
    state.number = number
  },
  SET_MESSAGES(state, messages) {
    if (messages.current_page === 1) {
      // state.messages = this.$collect().all();
      let newMessages = [];

      let sortedDates = Object.keys(messages.data).sort(function(a, b) {
        return moment(a,'YYYY MMMM D') - moment(b,'YYYY MMMM D');
      });

      let sortedGroups = {};

      for (let i = 0; i < sortedDates.length; i++) {
        let date = sortedDates[i];
        sortedGroups[date] = messages.data[date];
      }

      Object.entries(sortedGroups).forEach(entry => {
        const [key, value] = entry;

        newMessages.push({
          date: key,
          messages: value.reverse()
        })
      });
      state.messages = newMessages;

      state.scroll_id = newMessages[0] ? newMessages[0].messages[0].id : 0

    } else {
      state.scroll_id = state.messages[0] ? state.messages[0].messages[0].id : 0;
      let paginateMessages = [];
      let sortByDate = this.$collect(messages.data).sortKeys().all();
      Object.entries(sortByDate).forEach(entry => {
        const [key, value] = entry;

        paginateMessages.push({
          date: key,
          messages: value.reverse()
        })
      });
      let paginateLastMessage = this.$collect(paginateMessages).last();
      let allExceptLast = this.$collect(paginateMessages).where('date', '<>', paginateLastMessage.date).all();
      let data = this.$collect(state.messages).where('date', paginateLastMessage.date).all();

      if (data.length > 0) {

        data[0].messages.unshift(...paginateLastMessage.messages);
        if (allExceptLast.length > 0) {
          state.messages.unshift(...allExceptLast)
        }
      } else {
        state.messages.unshift(...paginateMessages)
      }


    }
  },
  CHANGE_CONVERSATION_PAGE(state, page) {
    state.conversation_page = page
  },
  CHANGE_CONVERSATION_MESSAGES_PAGE(state, page) {
    state.conversation_messages_page = page
  },
  SET_CONVERSATION_TYPE(state, conversation_typ) {
    state.conversation_type = conversation_typ;
  },
  SET_CONVERSATION_LIST(state, list) {
    state.list = list;
  },
  SET_CONVERSATION_MESSAGES(state, messages) {
    state.messages = messages;
  },
  SET_CONVERSATION_LAST_PAGE(state, last_page) {
    state.conversation_last_page = last_page;
  },
  SET_CONVERSATION_MESSAGES_LAST_PAGE(state, last_page) {
    state.conversation_messages_last_page = last_page;
  },
  SET_SEARCH(state, search) {
    state.search = search;
  },
  SET_FOCUS_AFTER_MESSAGE_SEND(state, val = false) {
    state.setFocusAfterMessageSend = val;
  },
  SET_SIDEBAR_SCROLL_IDENTIFIER(state) {
    state.sideBarScrollIdentifier++;
  },
  SET_CHAT_CLOSED_STATUS_BY_MODERATOR(state, data) {
    if (state.active_conversation_id === data.conversation.conversation_id && !data.conversation.status) {
      state.chatTopUserData.status = data.conversation.status
    }
  },
  SET_SIDEBAR_NAV_COUNT(state, count) {
    this.$collect(state.sidebar_nav).where('text', state.conversation_type).transform(function (item) {
      if (item.counter) item.counter -= count
    });
  },
  SET_UNBLOCKED_FLAG_FOR_USER(state, unblocked_id) {
    let index = state.list.findIndex(object => object.participants.messageable_id === unblocked_id);
    state.list[index].is_blocked = false;
    state.list[index].participants.messageable.blocked_list = [];
    state.chatTopUserData.is_blocked = false;
    state.blockedKey++
  },
  SET_BLOCKED_FLAG_FOR_USER(state, blocked_id) {
    let index = state.list.findIndex(object => object.participants.messageable_id === blocked_id);
    state.list[index].is_blocked = true;
    state.list[index].participants.messageable.blocked_list.push({user_id: this.$auth.user.id, blocked_id: blocked_id});
    state.chatTopUserData.is_blocked = true;
    state.blockedKey++
  },
  SET_CLOSED_FLAG_FOR_USER(state, active_conversation_id) {
    let index = state.list.findIndex(object => object.conversation_id === active_conversation_id);
    state.list[index].status = 0;
    state.chatTopUserData.status = 0;
  },
  SET_CHAT_TOP_USER_DATA(state, data) {
    if (Object.keys(data).length > 0) {
      let collect = this.$collect(data.participants.messageable.blocked_list)
        .where('user_id', this.$auth.user.id)
        .where('blocked_id', data.participants.messageable_id);

      if (collect.items.length > 0) {
        data['is_blocked'] = true
      } else {
        data['is_blocked'] = false
      }
    }

    // if (state.conversation_type === 'support'){
    //    data['is_chat_closed']  = true
    // }

    state.chatTopUserData = data;
  },
  SET_CHAT_TOP_USER_DATA_WHEN_CHAT_CLOSED(state, data) {
    if (Object.keys(data).length > 0) {
      let collect = this.$collect(data.participants.messageable.blocked_list)
        .where('user_id', this.$auth.user.id)
        .where('blocked_id', data.participants.messageable_id);

      if (collect.items.length > 0) {
        data['is_blocked'] = true
      } else {
        data['is_blocked'] = false
      }
    }
    state.chatTopUserData = data;
  },
  SET_LAST_MESSAGE_OF_LIST(state, value) {
    state.lastMessage = value
  },
  SET_LAST_MESSAGE_OF_LIST_MAKE_SEEN(state) {
    state.lastMessage.read_at = new Date()
  },
  SET_ALL_MESSAGES_UNREAD_COUNT(state, value) {
    state.all_messages_unread_count = value
  },
  RESET_UNREAD_MESSAGES(state) {
    let index = state.list.findIndex(object => object.conversation_id === state.active_conversation_id);
    const user = state.list[index];
    if (state.all_messages_unread_count && user) {
      state.all_messages_unread_count -= user.unread_messages_count;
      user.unread_messages_count = 0
    }

  },
  SET_MESSAGES_SEEN(state, message) {
    if (state.active_conversation_id === message.conversation_id) {
      state.messages.map(message => {
        this.$collect(message.messages).where('participation.messageable_id', this.$auth.user.id).where('read_at', null).transform((item, key) => item.read_at = new Date());
      })
    }
  },
  SET_MESSAGES_SEEN_ON_SIDEBAR(state, message) {
    let index = state.list.findIndex(object => object.conversation_id === message.conversation_id);
    state.list[index].last_message.is_seen = message.last_message.is_seen
  },
  SET_SENDER_SIDEBAR(state, data) {
    let index = state.list.findIndex(object => object.conversation_id === state.active_conversation_id);
    const user = state.list[index];

    state.list.splice(index, 1);
    state.list.unshift(user);

    if (user.last_message) {
      user.last_message.body = data.message;
      user.last_message.created_at = data.created_at;
      if (data.message) {
        user.last_message.is_sender = 0;
        user.last_message.is_seen = 0
      } else {
        user.last_message.is_sender = 1
      }
    } else {
      let is_sender;
      let is_seen;
      if (data.message) {
        is_sender = 0;
        is_seen = 0;
      } else {
        is_sender = 1;
        is_seen = 0;
      }
      user.last_message = {
        body: data.message,
        created_at: data.created_at,
        is_sender: is_sender,
        is_seen: is_seen,
      };
    }

  },
  SET_UNREAD_MESSAGES_COUNT_TO_SIDEBAR_TAB(state, {text, count}) {
    this.$collect(state.sidebar_nav).where('text', text).transform((item) => item.counter = count);
  },
  CHANGE_LIST_FROM_EVENT(state, data) {
    let index = state.list.findIndex(object => object.conversation_id === data.conversation.conversation_id);

    data.conversation.participants = data.conversation.participants.filter(participant => participant.messageable_id !== this.$auth.user.id)[0];

    if (index === -1 && state.conversation_type === data.conversation_type.toLowerCase()) {
      state.list.unshift(data.conversation);
      let all_count = [];
      state.list.map(item => {
        if (item.conversation_id === data.conversation.conversation_id) item.unread_messages_count = data.conversation.unread_messages_count;
        all_count.push(item.unread_messages_count)
      });
      state.all_messages_unread_count = all_count.reduce((sum, unread_messages_count) => sum + unread_messages_count, 0);
    } else if (index !== -1 && state.conversation_type === data.conversation_type.toLowerCase()) {

      const user = state.list[index];
      state.list.splice(index, 1);
      state.list.unshift(user);

      if (data.conversation.conversation_id === state.active_conversation_id) {
        state.number = state.active_conversation_id
      }

      let all_count = [];
      state.list.map(item => {
        if (item.conversation_id === data.conversation.conversation_id) {
          item.last_message.body = data.conversation.last_message.body;
          item.last_message.created_at = data.conversation.last_message.created_at;
          item.last_message.is_sender = !data.conversation.last_message.is_sender;

          if (state.active_conversation_id !== data.conversation.conversation_id) {
            item.unread_messages_count = data.conversation.unread_messages_count;
          }
        }
        all_count.push(item.unread_messages_count)
      });

      state.all_messages_unread_count = all_count.reduce((sum, unread_messages_count) => sum + unread_messages_count, 0);
    }
  },
  SET_MESSAGE_TO_LIST(state, message) {
    let data = this.$collect(state.messages).where('date', message.date).all();
    if (state.active_conversation_id === message.conversation_id) {

      if (data.length > 0) {
        data[0].messages.push(message);

      } else {
        state.messages.push({
          date: message.date,
          messages: [message]
        })


      }
    }

    return true
  },
}


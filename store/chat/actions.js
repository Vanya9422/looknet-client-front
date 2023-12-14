export default {
  GET_CHAT_USERS_LIST({ commit, state }, payload) {
    const { conversation_page, conversation_perPage, search } = state;

    const params = {
      page: conversation_page,
      perPage: conversation_perPage,
      sorting: "desc",
      conversation_type: payload.query.toLowerCase(),
      take_counts: true,
    };

    if (payload.search !== undefined) commit("SET_SEARCH", payload.search);

    if (payload.search) params.search = search;

    const query = state.tabs.indexOf(payload.query.toLowerCase());

    return new Promise((resolve, reject) => {
      if (query === -1) reject();

      this.$axios
        .get(this.$chat.getConversations, {
          params,
        })
        .then((res) => {
          const { meta, data, conversation_type } = res.data;
          const { resell_count, buying_count, support_count, unread_count } =
            res.data;

          if (conversation_page > 1) {
            state.list.map(function (item) {
              let index = data.findIndex(
                (object) => object.conversation_id === item.conversation_id
              );
              if (index !== -1) data.splice(index, 1);
            });
          }

          commit("SET_CONVERSATION_LAST_PAGE", meta.last_page);
          commit("CHANGE_CONVERSATION_PAGE", meta.current_page + 1);
          commit("SET_CONVERSATION_TYPE", conversation_type);
          commit("CHANGE_CHAT_USERS_LIST", {
            data: data,
            current_page: meta.current_page,
          });

          commit("SET_UNREAD_MESSAGES_COUNT_TO_SIDEBAR_TAB", {
            text: "resell",
            count: resell_count,
          });
          commit("SET_UNREAD_MESSAGES_COUNT_TO_SIDEBAR_TAB", {
            text: "buying",
            count: buying_count,
          });
          commit("SET_UNREAD_MESSAGES_COUNT_TO_SIDEBAR_TAB", {
            text: "support",
            count: support_count,
          });

          commit("SET_ALL_MESSAGES_UNREAD_COUNT", unread_count);

          if (data.length < 1 && meta.current_page === 1) {
            commit("SET_ACTIVE_CONVERSATION_ID");
          }

          const loaded = meta.current_page <= meta.last_page;

          resolve(loaded);
        });
    });
  },
  SET_CHECKED({ commit, state }, index) {
    commit("CHANGE_CHECKED", index);

    if (state.list[index].checked === true) {
      commit("CHANGE_CHECKED_ALL_PUSH", state.list[index].conversation_id);
      return;
    }

    commit("CHANGE_CHECKED_ALL_REMOVE", state.list[index].conversation_id);
  },
  SET_CHECKED_ALL({ commit }) {
    commit("CHANGE_CHECKED_ALL");
  },
  FETCH_MESSAGES({ state, commit }, conversation_id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(
          this.$chat.getMessages +
            "/" +
            conversation_id +
            `/messages?page=${state.conversation_messages_page}&perPage=${state.conversation_messages_perPage}&sorting=desc`
        )
        .then(({ data: { data, last_page, current_page } }) => {
          commit("SET_CONVERSATION_MESSAGES_LAST_PAGE", last_page);
          commit("CHANGE_CONVERSATION_MESSAGES_PAGE", current_page + 1);
          commit("SET_MESSAGES", { data, current_page });

          const loaded = current_page <= last_page;
          resolve(loaded);
        });
    });
  },
  ADD_CONVERSATION({ state, commit }, payload) {
    if (payload.participant_id === this.$auth.user.id) {
      this.$locationPath("/");
      return;
    }

    this.$axios.post(this.$chat.addConversation, payload).then((res) => {
      if (!res) return;

      let { data } = res.data;

      let conversation = {
        participant_id: payload.participant_id,
        advertise_id: payload.advertise_id,
        message: true,
      };
      conversation = {
        ...conversation,
        conversation_id: data.conversation_id,
      };

      data.participants = data.participants.filter(
        (participant) => participant.messageable_id !== this.$auth.user.id
      );
      data.participants = data.participants[0];
      data.participants.messageable["blocked_list"] = [];

      commit("SET_CHAT_TOP_USER_DATA", data);
      commit("SET_ACTIVE_CONVERSATION_ID", data.conversation_id);
      commit("SET_ACTIVE_USER", data.conversation_id);
      commit("CHANGE_CONVERSATION_MESSAGES_PAGE", 1);
      commit("SET_MESSAGES", { data: [], current_page: 1 });

      if (process.client) {
        localStorage.setItem("conversation", JSON.stringify(conversation));
      }

      this.$router.push({
        path: this.$locationPath("/chat"),
        query: { tab: "buying" },
      });
    });
  },
  SEND_MESSAGE({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(
          this.$chat.getMessages + "/" + data.conversation_id + "/messages",
          data.data
        )
        .then((res) => {
          const { data } = res.data;
          commit("SET_SENDER_SIDEBAR", {
            message: data.body,
            created_at: data.created_at,
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  DELETE_CONVERSATION({ state, commit }, conversation_ids = []) {
    if (!conversation_ids.length && state.conversation_type === "buying") {
      const index = state.list.findIndex(
        (object) => object.last_message === null
      );

      if (index !== -1) {
        conversation_ids.push(state.list[index].conversation_id);
        commit("DELETE_USER_FROM_LIST", conversation_ids);
      }
    }

    if (!conversation_ids.length && state.conversation_type !== "buying") {
      if (process.client && localStorage.getItem("conversation")) {
        const conversation = JSON.parse(localStorage.getItem("conversation"));
        conversation_ids.push(conversation.conversation_id);
      }
    }

    return new Promise((response, reject) => {
      if (conversation_ids.length > 0) {
        this.$axios
          .post(this.$chat.deleteConversation, {
            conversations: conversation_ids,
            _method: "DELETE",
          })
          .then((res) => {
            if (res) {
              commit("DELETE_USER_FROM_LIST", conversation_ids);
              commit("SET_ACTIVE_CONVERSATION_ID");
              commit("SET_ACTIVE_USER", null);
            }
            response();
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            commit("SET_SIDEBAR_NAV_COUNT", conversation_ids.length);
          });
      } else {
        commit("SET_SIDEBAR_NAV_COUNT", conversation_ids.length);
        response();
      }
    });
  },
  UNBLOCK_USER({ state, commit }, unblock_id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(this.$chat.unBlockUser, { unblock_id: unblock_id })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  BLOCK_USER({ state, commit }, blocked_id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(this.$chat.blockUser, { blocked_id: blocked_id })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  CLOSE_CHAT({ state, commit }, active_conversation_id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$put(`${this.$chat.closeChat}/${active_conversation_id}/close`)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async CHECK_CONVERSATION(context, payload) {
    const params = {
      page: 1,
      perPage: 5,
      sorting: "desc",
      conversation_type: payload.type,
      take_counts: true,
      search: payload.search,
    };
    try {
      const res = await this.$axios.get(this.$chat.getConversations, { params });
      const { data } = res.data;
      const item = data.find((item) => item.advertise_id === payload.id )
      return Boolean(item)
    } catch (e) {
      console.log(e);
    }

  }
};

<template lang="pug">
form.chat-search(action="/", v-if="!disabledAction")
  form-input.chat-search__input(
    :placeholder="placeholder",
    v-model="search",
    name="search",
    :value="value",
    @input="searchQuery",
    @enter="searchQuery"
  )
  button.chat-search__btn
    svg-icon(name="search")
  button.chat-search__clear(
    v-if="search && search.length > 0",
    type="button",
    @click="clearSearch"
  )
    svg-icon(name="closeBig")
.chat-search(v-else)
  form-input.chat-search__input(
    :placeholder="placeholder",
    v-model="search",
    name="search",
    :value="value",
    @input="searchQuery",
    @enter="searchQuery"
  )
  button.chat-search__btn
    svg-icon(name="search")
  button.chat-search__clear(
    v-if="search && search.length > 0",
    type="button",
    @click="clearSearch"
  )
    svg-icon(name="closeBig")
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  // data(){
  //  return {
  //    search:''
  //  }
  // },
  props: {
    placeholder: {
      type: String,
      default: "Serach",
    },
    value: {
      type: String,
      default: "",
    },
    disabledAction: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      CONVERSATION_PAGE: "chat/CONVERSATION_PAGE",
      SIDEBAR_SCROLL_IDENTIFIER: "chat/SIDEBAR_SCROLL_IDENTIFIER",
      SEARCH: "chat/SEARCH",
    }),
    search: {
      get() {
        return this.SEARCH;
      },
      set(val) {
        this.SET_SEARCH(val);
      },
    },
    conversationPage: {
      get() {
        return this.CONVERSATION_PAGE;
      },
      set(val) {
        this.CHANGE_CONVERSATION_PAGE(val);
      },
    },
    queryParam() {
      return this.$route.query.tab || "resell";
    },
  },
  methods: {
    ...mapMutations({
      SET_SIDEBAR_SCROLL_IDENTIFIER: "chat/SET_SIDEBAR_SCROLL_IDENTIFIER",
      CHANGE_CONVERSATION_PAGE: "chat/CHANGE_CONVERSATION_PAGE",
      SET_SEARCH: "chat/SET_SEARCH",
      SET_ACTIVE_USER: "chat/SET_ACTIVE_USER",
      SET_CONVERSATION_LIST: "chat/SET_CONVERSATION_LIST",
    }),
    ...mapActions({
      GET_CHAT_USERS_LIST: "chat/GET_CHAT_USERS_LIST",
    }),
    submitForm(event) {
      if (disabledAction) {
        event.preventDefault();
        if (process.client) {
          window.history.back();
        }
      }
    },
    clearSearch() {
      this.search = "";
      this.$emit("clearSearch", Math.random());
      this.conversationPage = 1;
      this.SET_CONVERSATION_LIST([]);
      this.SET_SIDEBAR_SCROLL_IDENTIFIER();
      // this.GET_CHAT_USERS_LIST({query:this.queryParam || 'resell'});
    },
    searchQuery() {
      this.conversationPage = 1;
      this.SET_ACTIVE_USER();
      this.SET_CONVERSATION_LIST([]);
      this.SET_SIDEBAR_SCROLL_IDENTIFIER();
      // this.GET_CHAT_USERS_LIST({query:this.queryParam,search:this.search})
    },
  },
};
</script>

<style lang="scss">
.chat-search {
  position: relative;
  &__input {
    .input {
      &__field {
        padding-left: 53rem;
      }
    }

    @include large-mobile {
      .input {
        &__field {
          padding-right: 35rem;
          padding-left: 38rem;
        }
      }
    }
  }
  &__btn {
    cursor: pointer;
    background: none;
    border: 0;
    width: 17rem;
    height: 17rem;
    position: absolute;
    left: 22rem;
    top: 50%;
    margin-top: -8rem;
    fill: $gray;
    svg {
      width: 100%;
      height: 100%;
    }

    @include large-mobile {
      width: 14rem;
      height: 14rem;
      left: 15rem;
      margin-top: -7rem;
    }
  }

  &__clear {
    width: 30rem;
    height: 30rem;
    position: absolute;
    right: 8rem;
    top: 50%;
    margin-top: -15rem;
    border: 0;
    background: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 13rem;
      height: 13rem;
      fill: $gray;
    }

    @include min-large-mobile {
      display: none;
    }
  }
}
</style>

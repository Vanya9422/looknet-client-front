<template lang="pug">
  form.search-form(action="/")
    .search-form__row
      .search-form__field(v-b-modal.modal-search)
        input.search-form__input(
          name="search"
          :placeholder="placeholder"
          autocomplete="off"
          v-model="search"
        )
        button-action.search-form__btn-search(icon="search")
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Search for ads"
    },
  },
  data() {
    return {
      search: '',
    }
  },
  watch: {
    search(search) {
      this.$emit('search', search)
    }
  },
  mounted() {
    const search = this.$route.query.search_text
    if (search) {
      this.search = search
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/сss/components/search-form.scss';
</style>
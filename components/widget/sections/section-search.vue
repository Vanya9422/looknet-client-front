<template lang="pug">
section.section-search
  //- .section-search__images
  //-   .section-search__wrap.wrap
  //-     .section-search__img.section-search__img_left
  //-       set-img(:src="boy", :default-img="boy")
  //-     .section-search__img.section-search__img_right
  //-       set-img(:src="girl", :default-img="girl")
  .section-search__wrap.wrap
    .section-search__img.section-search__img_right
    .section-search__inner
      h2.section-search__title.h1(v-if="content.search.title || content.search.titleBlue")
        template(v-if="content.search.title") {{ content.search.title }}
        span.color-blue(v-if="content.search.titleBlue") {{ ` ${content.search.titleBlue}` }}
      part-search-category.section-search__form(
        :content="content",
        @search="searchProducts",
        withOutCategory,
        withOutMil
      )
    section-search-categories
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: {
        search: {
          title: "",
          titleBlue: "",
          placeholder: "",
          button: "",
          categories: [],
          mil: [],
        },
      },
    },
  },
  data() {
    return {
      boy: require("/assets/img/bg-boy.png"),
      girl: require("/assets/img/bg-girl.png"),
    };
  },
  methods: {
    searchProducts(filter) {
      this.$router.push({ path: this.$locationPath("/catalog"), query: { ...filter } });
    },
  },
};
</script>

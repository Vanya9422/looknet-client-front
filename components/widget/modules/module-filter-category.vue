<template lang="pug">
.filter-category
  .filter-category--header(v-if="!mobile")
    span.filter-category--header_title( @click="changeCategory('/catalog')") {{ PAGE_HOME.allCategories }}
    .filter-category--number
  .filter-category--list
    .filter-category--item(v-for="item in categoriesList" :key="item.id")
      .filter-category--item_info(:class="{active:actives[0] === item.id || shows[0] === item.id}")
        span.filter-category--item_inner
          .filter-category--arrow( @click="changeCategory(null,item,0)")
            svg-icon.arrow(v-if="item.allSubCategories.length > 0" name="arrowDown")
            svg-icon.dote(v-else name="dot")
          span.filter-category--title(  :class="{active:active.id===item.id}" @click.prevent="changeCategory(`/catalog/${item.slug}`,item,0)") {{item.name}}
        span.filter-category--item_right
          .filter-category--number
          span(v-if="mobile")
            form-radio.filter-category--radio(:checked="active.id===item.id" @change="changeCategory(`/catalog/${item.slug}`,item,0)")
      transition-group(name="slide"  v-on:before-enter="beforeEnter" v-on:enter="enter"
        v-on:before-leave="beforeLeave" v-on:leave="leave")
        .filter-category--item.filter-category--item_child(
          v-for="item1 in item.allSubCategories"
          :key="item1.id"
          v-show="shows[0] === item.id"
        )
          .filter-category--item_info(:class="{active:actives[1] === item1.id || shows[1] === item1.id  }")
            span.filter-category--item_inner
              .filter-category--arrow(:class="{'opacity-0':item1.allSubCategories.length === 0}"  @click="changeCategory(null,item1,1)")
                svg-icon.arrow(v-if="item1.allSubCategories.length > 0" name="arrowDown")
                svg-icon.dote(v-else name="dot")
              span.filter-category--title(
                :class="{active:active.id===item1.id}"
                @click.prevent="changeCategory(`/catalog/${item.slug}/${item1.slug}`,item1,1)") {{item1.name}}
            span.filter-category--item_right
              .filter-category--number
              span(v-if="mobile")
                form-radio.filter-category--radio(:checked="active.id===item1.id" @change="changeCategory(`/catalog/${item.slug}/${item1.slug}`,item1,1)")
          transition-group(name="slide" v-on:before-enter="beforeEnter" v-on:enter="enter"
            v-on:before-leave="beforeLeave" v-on:leave="leave")
            .filter-category--item.filter-category--item_child(
              v-for="item2 in item1.allSubCategories" :key="item2.id"
              v-show="shows[1] === item1.id"
            )
              .filter-category--item_info(:class="{active:actives[2] === item2.id || shows[2] === item2.id}")
                span.filter-category--item_inner
                  .filter-category--arrow(:class="{'opacity-0':item2.allSubCategories.length === 0}"  @click="changeCategory(null,item2,2)")
                    svg-icon.arrow(v-if="item2.allSubCategories.length > 0" name="arrowDown")
                    svg-icon.dote(v-else name="dot")
                  span.filter-category--title(  :class="{active:active.id===item2.id}" @click.prevent="changeCategory(`/catalog/${item.slug}/${item1.slug}/${item2.slug}`,item2,2)") {{item2.name}}
                span.filter-category--item_right
                  .filter-category--number
                  span(v-if="mobile")
                    form-radio.filter-category--radio(:checked="active.id===item2.id" @change="changeCategory(`/catalog/${item.slug}/${item1.slug}/${item2.slug}`,item2,2)")
              transition-group(name="slide" v-on:before-enter="beforeEnter" v-on:enter="enter"
                v-on:before-leave="beforeLeave" v-on:leave="leave")
                .filter-category--item.filter-category--item_child(
                  v-for="item3 in item2.allSubCategories" :key="item3.id"
                  v-show="shows[2] === item2.id"
                )
                  .filter-category--item_info(:class="{active:actives[3] === item3.id || shows[3] === item3.id}")
                    span.filter-category--item_inner
                      .filter-category--arrow(:class="{'opacity-0':item3.allSubCategories.length === 0}"  @change="changeCategory(null,item3,3)" )
                        svg-icon.arrow(v-if="item3.allSubCategories.length > 0" name="arrowDown")
                        svg-icon.dote(v-else name="dot")
                      span.filter-category--title(  :class="{active:active.id===item3.id}" @click.prevent="changeCategory(`/catalog/${item.slug}/${item1.slug}/${item2.slug}/${item3.slug}`,item3,3)") {{item3.name}}
                    span.filter-category--item_right
                      .filter-category--number
                      span(v-if="mobile")
                        form-radio.filter-category--radio(:checked="active.id===item3.id" @change="changeCategory(`/catalog/${item.slug}/${item1.slug}/${item2.slug}/${item3.slug}`,item3,3)")
</template>

<script>
import { mapGetters } from "vuex";
import { cloneDeep } from "lodash";
import { decodeQuery, encodeQuery } from "@/mixins/helpers/search";

export default {
  props: {
    mobile: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Object,
      default: () => {},
    },
    routeSlug: {
      type: [String, Boolean],
      default: "",
    },
  },
  data() {
    return {
      actives: [],
      shows: [],
    };
  },
  computed: {
    ...mapGetters({
      CATEGORY: "category/CATEGORY",
      CATEGORIES: "category/CATEGORIES",
      CATEGORY_ACTIVE: "category/CATEGORY_ACTIVE",
      PAGE_HOME: "pages/PAGE_HOME",
    }),
    categoriesList() {
      return cloneDeep(this.CATEGORIES);
    },
  },
  watch: {
    CATEGORIES() {
      this.getActiveCategories();
    },
    $route: {
      handler: function (slug) {
        this.getActiveCategories();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getActiveCategories() {
      let route = "";
      route = this.routeSlug
        ? this.routeSlug.split("/")
        : this.$route.path.split("/");
      if (this.$i18n.locale !== "en") route.splice(0, 3);
      else route.splice(0, 2);
      let arr = [];
      let cat = cloneDeep(this.CATEGORIES);
      let number = 0;
      while (cat) {
        if (cat) {
          const item = cat.find((i) => i.slug === route[number]);
          if (item) {
            arr.push(item.id);
            cat = item.allSubCategories;
            number++;
          } else {
            cat = null;
          }
        } else cat = null;
      }
      this.actives = cloneDeep(arr);
      this.shows = cloneDeep(arr);
    },
    changeShow(id, item) {
      let isClose = this.shows[item] !== id;
      let arr = cloneDeep(this.shows.splice(0, item));
      if (isClose) arr.push(id);
      this.shows = arr;
    },
    beforeEnter: function (el) {
      el.style.minHeight = "0";
    },
    enter: function (el) {
      el.style.minHeight = el.scrollHeight + "px";
    },
    beforeLeave: function (el) {
      el.style.minHeight = el.scrollHeight + "px";
    },
    leave: function (el) {
      el.style.minHeight = "0";
    },
    changeCategory(slug, category, index) {
      if (this.mobile) {
        this.$emit("changeActive", {
          ...category,
          to: this.$locationPath(slug), // TODO обнулять страницу для мобильной версии
        });
        this.changeShow(category.id, index);
      } else {
        const query = decodeQuery(this.$route.query);
        query.page = 1;
        console.log(slug, category, index, query, "slug,category,index");
        if (query.answersFiltersIds) {
          delete query.answersFiltersIds;
        }
        if (slug !== null) {
          this.$router.push(`${this.$locationPath(slug)}?${encodeQuery(query)}`);
        } else {
          this.changeShow(category.id || 0, index); // TODO обнулять страницу
        }
      }
    },
  },
};
</script>
<style lang="scss">
.filter-category {
  &--header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0 10px;
    font-weight: 600;

    &_title {
      color: $default;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        color: $blue;
      }
    }
  }

  &--number {
    color: #9a9a9a;
  }

  &--arrow {
    width: 28px;
    height: 20px;
    border-radius: 59px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    margin-right: 10px;

    .arrow {
      width: 10px;
      height: 6px;
      stroke: #9a9a9a;
      fill: transparent;
    }
    .dote {
      width: 6px;
      height: 6px;
      stroke: #9a9a9a;
      fill: #9a9a9a;
    }
  }

  &--title {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #9a9a9a;
    &.active {
      color: $blue;
    }
  }

  &--radio {
    margin-left: 14px;
    margin-right: 0;

    .checkbox__text {
      display: none;
    }

    .checkbox__icon {
      border-radius: 50%;
    }
  }
  &--list {
    margin-bottom: 11px;
  }
  &--item {
    cursor: pointer;

    &_right {
      display: flex;
      align-items: center;
    }

    &_inner {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    &_info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 9px 0;
      //transition: max-height 0.5s ease-in;

      &:hover {
        .filter-category--title {
          color: $blue;
        }
      }

      &.active {
        .filter-category--arrow {
          background: $blue;

          .arrow {
            stroke: #fff;
          }
          .dote {
            stroke: #fff;
            fill: #fff;
          }
        }
      }
    }

    &_child {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      //transition: max-height 0.5s ease-in;
    }
  }

  .opacity-0 {
    opacity: 0;
  }
}

.slide-enter-active,
.slide-leave-active {
  //transition: max-height 0.5s ease-in;
}

.slide-enter,
.slide-leave-to {
  transform: translate(0, 0);
  opacity: 0;
}
</style>

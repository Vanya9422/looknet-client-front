<template lang="pug">
  section.section-catalog
    .section-catalog__wrap.wrap
      part-search-category(@search="searchProducts")
      //- part-search-mobile.section-catalog__form(v-if="!$screen.st" @search="searchProducts")


    .section-catalog__row.section-catalog__fixed
      .section-catalog__wrap.wrap.w-100
        .section-catalog__row.mt-0.pt-0
          .section-catalog__column.section-catalog__column_left
            .filter__nav.flex.flex_vertical
              button-filter.filter__title(:text="PAGE_CATALOG.filter" :counter="counter" @click.native="full = !full")
              .filter__nav-item
                .filter__reset(@click="clearFilter")
                  svg-icon.filter__reset-icon(name="reset"  viewBox="0 0 12 11")
                  .filter__reset-text {{ PAGE_CATALOG.reset }}
              .filter__close(@click="closeFilter()")
                svg-icon(name="close" viewBox="0 0 10 9")
          .section-catalog__column.section-catalog__column_right
            .section-catalog__nav.flex.flex_vertical.flex_justify
              button-filter.section-catalog__btn-filter(:text="PAGE_CATALOG.filters" :counter="ALL_FILTERS.filters['answers.id']  ? ALL_FILTERS.filters['answers.id'].length : 0 " @click.native="openFilter()")
              form-select-sort.favorites-ad__select(
                :label="PAGE_CATALOG.sortBy"
                :items="PAGE_CATALOG.sortList"
                v-model="sort" :value="sort" noBorder)
              module-grid-switch.section-catalog__grid-switch
    .section-catalog__wrap.wrap
      .section-catalog__row.mt-0
        transition(name="page")
          .section-catalog__column.section-catalog__column_left(  :class="{'opacity-0 w-0':full}")
            part-filter.section-catalog__filter.mt-0(
              :key="resetFiltersKey"
              :btnText="PAGE_CATALOG.apply"
              :resetText="PAGE_CATALOG.reset"
              :filterText="PAGE_CATALOG.filter"
              :costText="PAGE_CATALOG.cost"
              :filters="CATEGORY_FILTERS"
              :counter="counter"
              ref="catalogFilter"
              @change="changeFilter"
              @reset="resetFilters"
              @apply="applyFilter"
              @cost="(val) => cost = val"
              @full="full = !full"
              :full="full"
            )

        .section-catalog__column.section-catalog__column_right(:class="{full:full}")
          .section-catalog__tags(v-if="CATEGORY.subCategories && CATEGORY.subCategories.length>0")
            .section-catalog__tags-list
              module-tag.section-catalog__tag(
                v-for="(tag, i) in CATEGORY.subCategories"
                :key="i"
                :text="tag.name"
                :counter="tag.counter"
                :to="$route.path + '/' + tag.slug"
              )
          .section-catalog__column.section-catalog__column_right-inner(v-if="pageLoading && CATEGORY_PRODUCTS.length>0" )
            .section-catalog__list.flex(:class="{'list-inline':PRODUCT_CART_TYPE}")
              item-card.section-catalog__item(
                v-for="(item, i) in CATEGORY_PRODUCTS"
                :key="i"
                :name="item.name"
                :contacts="item.contacts"
                :city="item.city_name"
                :coordinates="{longitude:item.longitude,latitude:item.latitude}"
                :date="item.created_at"
                :showDetails="item.show_details"
                :phoneNumber="item.contact_phone"
                :desc="item.description"
                :user="item.author"
                :price="item.price"
                :status="item.type"
                :to="item.slug"
                :id="item.id"
                :author_id="item.author.id"
                :author_full_name="item.author.full_name"
                :author_avatar="item.author.avatar ? item.author.avatar?.original_full_url : ''  "
                :gallery="item.gallery"
                :pricePolicy="item.price_policy"
                @show="openProductModal(i,CATEGORY_PRODUCTS)"
                :inline="PRODUCT_CART_TYPE"
              )
              client-only
                infinite-loading(:distance="50" ref="infiniteLoading" @infinite="handleLoadMore")
                  div(slot="no-results")
                  div(slot="no-more")
                  div(slot="spinner")
          //.section-catalog__btn-wrap
          //  button-primary.section-catalog__btn(gray) {{ buttonText }}
</template>

<script>
import openProductModal from "@/mixins/openProductModal";
import {mapActions, mapGetters} from "vuex";
import catalog from "@/mixins/catalog";
import {cloneDeep} from 'lodash';

export default {
  mixins: [openProductModal, catalog],
  data() {
    return {
      show: false,
      full: false,
    }
  },
  computed: {
    ...mapGetters({
      ALL_FILTERS: 'category/ALL_FILTERS'
    }),
    mods() {
      return {
        'visible': this.show,
      }
    }
  },
  methods: {
    ...mapActions({
      SET_CATEGORY_NULL: 'category/SET_CATEGORY_NULL'
    }),
    openFilter() {
      this.$bvModal.show('modal-catalog-filter')
    },
    closeFilter() {
      if (!process.client) return;
      this.$refs.filter.classList.remove('visible');
      document.querySelector("html").classList.remove("js-lock");
      document.querySelector("body").removeAttribute("style");
    },
    clearFilter() {
      let filters = cloneDeep(this.ALL_FILTERS)
      filters.filters['answers.id'] = []
      filters.filters.answers = []
      filters.filters.price = ''
      this.SET_CATEGORY_NULL()
      this.SET_ALL_FILTERS(filters)
      let {price, answers} = this.ALL_FILTERS.filters
      let query = cloneDeep(this.$route.query)
      query.price = price
      query.answers = answers
      this.$router.push({path: this.$locationPath('/catalog'), query})
      this.$router.push({path: this.$locationPath('/catalog'), query})
    },

  }
}
</script>

<style lang="scss">
.button-select__text {
  max-width: 175px;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.section-catalog {
  padding-bottom: 85rem;

  @include large-mobile {
    padding-top: 15rem;
    padding-bottom: 50rem;
  }

  &__row {
    display: flex;
    margin-top: 50rem;
    transition: ease .3s;

    @include small-tablet {
      flex-wrap: wrap;
    }

    @include large-mobile {
      margin-top: 27rem;
    }
  }

  &__column {
    &_left {
      width: 266rem;
      padding-right: 18rem;
      border-right: 1px solid #D2D2D7;
      flex: 0 0 auto;
    }

    &_right {
      flex: 1 1 auto;
      width: 100%;
      padding-left: 20rem;
    }

    @include small-tablet {
      width: 100%;
      &_left {
        padding-right: 0;
        border-right: 0;
      }
      &_right {
        padding-left: 0;
      }
    }
  }

  &__list {
    @include items(4, 10);

    @include large-tablet {
      @include items(3, 10);
    }

    @include small-tablet {
      @include items(3, 10);
    }
    @include large-mobile {
      @include items(2, 5);
    }
  }

  &__item {
    margin-top: 35rem;
    margin-bottom: 5rem;
    @include large-mobile {
      margin-top: 20rem;
      margin-bottom: 0;
    }
  }

  &__tags {
    //margin-bottom: 25rem;
    //padding-bottom: 16rem;
    padding: 16px 0;
    //border-bottom: 1px solid $light-gray;

    &-list {
      margin: -5rem 0;
    }

    @include large-mobile {
      margin: 0 -15rem 0 -15rem;
      padding-bottom: 16rem;
      overflow: hidden;
      &-list {
        display: flex;
        flex-wrap: nowrap;
        padding-left: 15rem;
        padding-right: 15rem;
        padding-bottom: 40px;
        margin: 0 0 -40px 0;
        overflow-x: auto;
        overflow-y: hidden;
      }
    }
  }

  &__tag {
    margin: 5rem 0;

    &:not(:last-child) {
      margin-right: 25rem;
    }

    @include large-mobile {
      margin-top: 0;
      margin-bottom: 0;
      &:not(:last-child) {
        margin-right: 5rem;
      }
    }
  }

  &__nav {
    @include large-mobile {
      padding-bottom: 18rem;
      padding-top: 18rem;
      margin-left: -15rem;
      margin-right: -15rem;
      padding-left: 15rem;
      padding-right: 15rem;
      position: sticky;
      top: 0;
      background: #FFFFFF;
      z-index: 100;
    }
  }

  &__btn-filter.button-filter {
    display: none;

    @include small-tablet {
      display: inline-flex;
    }
  }

  &__btn {
    width: 100%;
    height: 40rem;
    font-size: 12rem;

    &-wrap {
      display: none;
      margin-top: 40rem;
    }

    @include large-mobile {
      &-wrap {
        display: block;
      }
    }
  }
}

.section-catalog__fixed {
  border-bottom: 1px solid #D2D2D7;
  position: sticky;
  top: 81rem;
  z-index: 9;
  background: #fff;
  @include large-desktop {
    top: 80.5px;
  }
  @include small-tablet {
    top: 71px;
  }
  @include large-mobile {
    top: 61px;
  }

  .section-catalog__column_left {
    @include small-tablet {
      display: none;
    }
  }

  .section-catalog__column_right {

  }

}

.filter__nav {
  padding-top: 10px;
  padding-bottom: 10px;
  //height: 42px;
  //margin-right: -15px;
  //padding-right: 15px;
  //padding-top: 1px;
  //padding-bottom: 10px;
  //position: sticky;
  //top: 87rem;
  //z-index: 999999;
  //background: #fff;
  //
  //&::before {
  //  content: '';
  //  position: absolute;
  //  height: 1px;
  //  bottom: 0;
  //  background: #D2D2D7;
  //  width: calc(100% + 20px);
  //  left: 0px;
  //}
}

@include small-tablet {
  .filter__nav-item {
    display: none;
  }
  .filter__box .filter__nav-item {
    display: flex;
  }
}

.section-catalog__nav {
  padding-top: 10px;
  padding-bottom: 10px;
  //height: 42px;
  //padding-top: 10px;
  //padding-bottom: 10px;
  ////border-bottom: 1px solid #D2D2D7;
  //position: sticky;
  //top: 87rem;
  //z-index: 99;
  //background: #fff;
  //
  //&::before {
  //  content: '';
  //  position: absolute;
  //  height: 1px;
  //  bottom: 0;
  //  background: #D2D2D7;
  //  width: calc(100% + 20px);
  //  left: -20px;
  //}
  //
  //@include large-desktop {
  //  top: 80px;
  //}
  //@include small-tablet {
  //  top: 71px;
  //  &::before {
  //    width: calc(100% + 60px);
  //    left: -30px;
  //  }
  //}
  //@include large-mobile {
  //  top: 66px;
  //}
}

.section-catalog__column_right {
  &.full {
    padding-left: 0;
    transition: ease .3s;

    .section-catalog__column_right-inner {
      margin-top: 25px;
    }

    .section-catalog__list {
      @include items(5, 10);
      transition: ease 0.3s;

      @include large-tablet {
        @include items(4, 10);
      }

      @include large-mobile(300) {
        @include items(3, 10);
      }
      @include large-mobile {
        @include items(2, 5);
      }

      &.list-inline {
        display: block;
        @include items(1, 1);
      }
    }


  }

}

.opacity-0.w-0 {
  opacity: 0;
  width: 0;
  padding-right: 0;
  transition: ease .3s;
}
</style>

<template lang="pug">
  .catalog-pagination(v-if="total > 1")
    .catalog-pagination-prev.catalog-pagination-btn(:class="{disabled: page === 1}" @click="changePage(page !== 1 ? page - 1 : false)")
      svg-icon(name="arrowNew")
    div(v-for="i in total" :key="i" )
      .catalog-pagination-item(v-if="start !== 1 && i === 1" @click="changePage(i)")
        span {{i}}
      .catalog-pagination-more(v-if="start > 2 && start !== 2 && i === 2" )
        span -
      .catalog-pagination-item(v-else-if="i >= start && i < start + count " :class="{active: i === page}" @click="changePage(i)")
        span {{i}}
      .catalog-pagination-more(v-else-if="i === start + count  && i !== total")
        span -
      .catalog-pagination-item(v-else-if="i === total" @click="changePage(i)")
        span {{i}}
    .catalog-pagination-next.catalog-pagination-btn(:class="{disabled: page === total}" @click="changePage(page !== total ? page + 1 : false)")
      svg-icon(name="arrowNew")

</template>

<script>
import {mapGetters} from "vuex";
import {decodeQuery, encodeQuery} from "@/mixins/helpers/search";

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      PRODUCTS_TOTAL_PAGE: 'search/PRODUCTS_TOTAL_PAGE',
      PRODUCTS_PAGE: 'search/PRODUCTS_PAGE',
      PRODUCTS_LOADING: 'search/PRODUCTS_LOADING',
    }),
    total() {
      return this.PRODUCTS_TOTAL_PAGE
      // return 20
    },
    page: {
      get() {
        return this.PRODUCTS_PAGE
        // return 7
      },
    },
    minus(){
      if (process.client && this.$screen.width < 768) return this.count  - 1
      return this.count  - 2
    },
    start() {
      const test = (this.page + 1) - this.minus
      return test <= 0 ? 1 : test
    },
    count(){
      let count = 5
      if (process.client && this.$screen.width < 768) {
        count = 3
      }
      return count
    }
  },
  methods: {
    changePage(page) {
      if (!this.PRODUCTS_LOADING && page !== false) {
        let path = this.$route.path
        let query = decodeQuery(this.$route.query)
        query.page = page
        this.$router.push(`${path}?${encodeQuery(query)}`)
      }
    },
  },
}
</script>

<style lang="scss">
.catalog-pagination {
  display: flex;
  margin: 80px -11px 0;
  @media screen and (max-width: 767px) {
    margin: 44px -7px;
    font-size: 12px;
  }
  &-btn {
    padding: 10px 25px;
    border-radius: 10px;
    max-width: 92px;
    width: 100%;
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 11px;
    background: $blue;
    border: 1px solid $blue;
    cursor: pointer;
    transition: all 0.3s ease;
    @media screen and (max-width: 767px) {
      max-width: 67px;
      height: 32px;
      margin: 0 3.5px;
      padding: 5px;
    }

    @media screen and (max-width: 350px) {
      max-width: 40px;
    }

    svg {
      width: 10px;
      height: 10px;
      stroke: #fff;
      fill: transparent;
    }
    @include min-large-mobile{
      &:hover {
        background: #4257C7;
        border: 1px solid #4257C7;

        svg {
          stroke: #fff;
        }

      }
    }


    &.disabled {
      border: 1px solid #D2D2D7;
      background: #fff;
      @media screen and (max-width: 767px) {
        //display: none;
      }

      svg {
        stroke: #062439;
      }
      @include min-large-mobile{
        &:hover {
          background: $blue;
          border: 1px solid $blue;

          svg {
            stroke: #fff;
          }
        }
      }

    }
  }

  &-prev {
    svg {
      transform: rotate(180deg);
    }
    @media screen and (max-width: 767px) {
      //display: none;
    }
  }

  &-item {
    height: 47px;
    width: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #D2D2D7;
    border-radius: 10px;
    background: #fff;
    cursor: pointer;
    color: $default;
    margin: 0 7.5px;
    transition: all 0.3s ease;
    @media screen and (max-width: 767px) {
      height: 32px;
      width: 40px;
      margin: 0 3.5px;
    }

    &.active {
      border: 1px solid $blue;
      color: $blue;
    }
    @include min-large-mobile{
      &:hover {
        color: $default;

        background: #F2F4F5;
        border: 1px solid #F2F4F5;
      }
    }

  }

  &-more {
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 7.5px;
    color: #D2D2D7;
    @media screen and (max-width: 767px) {
      height: 32px;
      margin: 0 3.5px;
    }
  }
}
</style>

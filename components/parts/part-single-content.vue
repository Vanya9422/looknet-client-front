<template>
  <div class="single-content">
    <h3 class="single-content__heading h3">{{title || PAGE_PRODUCT_DETAILS.description}}</h3>
    <div v-if="$slots.content">
      <slot name="content"></slot>
    </div>
    <div v-else class="single-content__content content h4">
      <p> {{readMore === false ? description : description.slice(0,310)+'...'}}</p>
      <span class="single-content__more blue-link p" v-if="description.split('').length > 310" @click="readMore = !readMore">
        {{readMore === false ? content.moreDesc : content.hideDesc}}
      </span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String
    },
    content: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      readMore: false,
    }
  },
  computed:{
    ...mapGetters({
      PAGE_PRODUCT_DETAILS:'pages/PAGE_PRODUCT_DETAILS'
    })}
}
</script>

<style lang="scss">
.single-content {
  &__content {
    line-height: 150%;
    font-weight: 400;
    padding-right: 45rem;
    word-break: break-word;


    & > * {
      &:not(:last-child) {
        margin-bottom: 28rem;
      }
    }

    @include small-tablet {
      padding-right: 0;
    }

    @include large-mobile {
      line-height: 21rem;

      & > * {
        &:not(:last-child) {
          margin-bottom: 20rem;
        }
      }
    }
  }

  &__more {
    margin-top: 30rem;
    cursor: pointer;

    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__heading {
    margin-bottom: 30rem;
  }

  &__list {
    gap: 15rem;

    &-item {
      display: block;
    }

    b {
      color: #212D38;
      margin-left: 10rem;
    }

    @include large-mobile {
      gap: 10rem;
    }
  }
}
</style>

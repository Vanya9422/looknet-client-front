<template>
  <div class="password-rules">
    <ul class="color-gray">
      <li v-for="(item, index) in list"
          :key="index"
          :class="[`rule-color-${item.state || 'neutral'}`]"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    dirty: {
      type: Boolean,
      default: false,
    },
    recommended: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    list() {
      let items = [];
      for (let key in this.recommended) {
        if (this.recommended.hasOwnProperty(key)) {
          let state = 'neutral';
          if (this.dirty && !!this.recommended[key]) {
            state = 'error';
          }
          if (!this.recommended[key]) {
            state = 'success';
          }
          const item = {
            text: this.rules[key] || 'rule',
            state
          };
          items.push(item);
        }
      }
      return items;
    }
  }
};
</script>

<style lang="scss">
.password-rules {
  font-weight: 500;
  font-family: "Gilroy";
  font-size: 17rem;

  &__title {
    color: #062439;
    padding-bottom: 10rem;

    img {
      padding-right: 10rem;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5rem;
    @include large-mobile {
      font-size: 14rem;
    }

    li {
      display: flex;
      align-items: flex-start;
      gap: 12rem;

      &::before {
        content: '';
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        width: 9px;
        height: 7px;
        margin-top: 5px;
      }

      &.rule-color-neutral {
        color: $gray;

        &::before {
          background-image: url("data:image/svg+xml,%3Csvg width='6' height='2' viewBox='0 0 6 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='6' height='1.5' rx='0.75' fill='%236E6E73'/%3E%3C/svg%3E%0A");
        }
      }

      &.rule-color-error {
        &::before {
          background-image: url("data:image/svg+xml,%3Csvg width='6' height='2' viewBox='0 0 6 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='6' height='1.5' rx='0.75' fill='%23EB5757'/%3E%3C/svg%3E%0A");
        }

        color: $red;
      }

      &.rule-color-success {
        &::before {
          background-image: url("data:image/svg+xml,%3Csvg width='9' height='7' viewBox='0 0 9 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.88471 0.206803C7.02558 0.0726919 7.21303 -0.00145012 7.40753 2.14954e-05C7.60202 0.00149312 7.78833 0.0784635 7.92716 0.214691C8.06598 0.350918 8.14645 0.535747 8.15159 0.730177C8.15673 0.924607 8.08614 1.11343 7.95471 1.2568L3.96471 6.2468C3.8961 6.3207 3.81329 6.38001 3.72124 6.42117C3.62919 6.46233 3.52978 6.48451 3.42896 6.48638C3.32814 6.48825 3.22798 6.46976 3.13447 6.43204C3.04095 6.39431 2.95601 6.33811 2.88471 6.2668L0.238708 3.6208C0.165022 3.55214 0.105919 3.46934 0.0649275 3.37734C0.0239355 3.28534 0.0018935 3.18603 0.00011672 3.08533C-0.00166006 2.98462 0.0168648 2.88459 0.0545858 2.79121C0.0923068 2.69782 0.148451 2.61298 0.21967 2.54176C0.290889 2.47055 0.375723 2.4144 0.469111 2.37668C0.562499 2.33896 0.662528 2.32043 0.763231 2.32221C0.863934 2.32399 0.963247 2.34603 1.05525 2.38702C1.14725 2.42801 1.23005 2.48712 1.29871 2.5608L3.39271 4.6538L6.86571 0.228803C6.87196 0.221104 6.87764 0.213759 6.88471 0.206803Z' fill='%2338900E'/%3E%3C/svg%3E%0A");
        }

        color: #38900E;
      }
    }
  }
}
</style>

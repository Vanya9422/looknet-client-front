<template lang="pug">
.recommended-inner
  .password-recommended.mt-2.mb-4(
    v-if="!withoutDots",
    :class="`password-recommended-${recommendedType}`"
  )
    .password-recommended__list(:class="recommendedType")
      .password-recommended__item(
        v-for="index in 5",
        :key="index",
        :class="{ active: index <= recommendedPasswordCount }"
      )
</template>

<script>
export default {
  name: "RecommendedPassword",
  props: {
    recommended: {
      type: Object,
      required: true,
    },
    recommendedPasswordCount: {
      type: Number,
      default: 0,
    },
    recommendedType: {
      type: String,
      default: "error",
    },
    withoutList: {
      type: Boolean,
      default: false,
    },
    withoutDots: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
$main-red: #ff5040;
$main-yellow: #ffcc33;
$main-green: #29cc44;

.entry-block__form {
  max-width: 310px;
}

.password-recommended {
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;

  &-error {
    .password-recommended__text {
      color: #cc4115;
    }

    .password-recommended__item.active {
      background: #cc4115;
    }
  }

  &-success {
    .password-recommended__text {
      color: #4bb917;
    }

    .password-recommended__item.active {
      background: #4bb917;
    }
  }

  &-warning {
    .password-recommended__text {
      color: #ddc914;
    }

    .password-recommended__item.active {
      background: #ddc914;
    }
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 12px;
  }

  &__item {
    margin: 0 1px;
    height: 4px;
    border-radius: 30px;
    width: 100%;
    background: #d1d1d1;
    transition: background 0.3s;

    &:nth-child(1) {
      margin-left: 0;
    }

    &:nth-last-child(1) {
      margin-right: 0;
    }

    &.active {
      background: $main-red;
    }
  }

  &__text {
    margin-left: 0;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: $main-red;
  }
}

.recommended {
  background: #f7f8fa;
  border: 1px solid #ebeef5;
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  padding: 8px;
  text-align: right;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #38455d;

  &-title {
    font-weight: 500;
    margin-bottom: 4px;
  }

  &-icon {
    margin-left: 8px;
  }

  &__list {
    margin-bottom: 4px;

    &:nth-last-child(1) {
      margin-bottom: 0;
    }

    li {
      display: flex;
      align-items: center;
      margin-bottom: 4px;

      .recommended-icon {
        margin-left: 8px;
      }
    }

    .recommended-error {
      color: $main-red;
    }
  }
}

.entry-block-first-change-password {
  .entry-block__right {
    padding-top: 10vh;
  }

  .entry-block__header {
    margin-bottom: 5vh;
  }
}

.popup-block {
  .recommended-inner,
  .recommended {
    height: 100%;
    background-color: #f7f8fa;
    border: none;
  }

  .recommended {
    padding: 32px;
  }

  .recommended__list li {
    margin-bottom: 8px;
  }

  @media (max-width: 767px) {
    .recommended {
      padding: 0;
    }
  }
}
</style>

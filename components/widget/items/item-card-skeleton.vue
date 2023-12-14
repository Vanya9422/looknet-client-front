<template>
  <div class="item-card-skeleton">
    <div class="item-card-skeleton__top">
      <vue-skeleton-loader
        :size="400"
        animation="wave"
        :rounded="true"
        radius="10"
      />
    </div>
    <div class="item-card-skeleton__bottom">
      <vue-skeleton-loader
        :size="400"
        animation="wave"
        :rounded="true"
        radius="10"
      />
    </div>
  </div>
</template>
<script>
import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  components: { VueSkeletonLoader },
};
</script>


<style scoped lang="scss">
.item-card-skeleton {
  display: flex;
  flex-direction: column;
  padding: 20rem 0;
  width: 100%;
  gap: 14px;
  align-items: flex-start;

  &__bottom {
    width: 80%;
    height: 24px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__top {
    width: 100%;
    aspect-ratio: 10 / 8.3;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }
}
</style>

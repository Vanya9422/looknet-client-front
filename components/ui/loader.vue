<template lang="pug">
  div.lds-ring(:class="loaderType")
    div
    div
    div
</template>

<script>
export default {
  props: {
    loaderType: {
      type: String,
      default: 'blue'
    }
  }
}
</script>

<style lang="scss" scoped>
.lds-ring {
  display: block;
  position: relative;
  width: 24px;
  height: 24px;
  &.big{
    width: 100px;
    height: 100px;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 50%;
    opacity: 0.15;
  }

  &:after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    border-radius: 50%;
    background-color: #473FEC;
  }

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height:100%;
    border: 4px solid;
    border-color: #fff transparent transparent transparent;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }

  &.white {
    &:after {
      background: #fff;
    }

    &:before {
      background-color: #473FEC;
    }

    div {
      border-color: #473FEC transparent transparent transparent;
    }
  }
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

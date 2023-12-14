<template lang="pug">
.registration-form__code
  template(v-for="item in amount")
    .input.registration-form__input.registration-form__input_code.input_big
      input.input__field(
        ref="currentIndex"
        :class="{input_error:error}"
        :key="item"
        v-model="code[item - 1]"
        type="number"
        @paste="handlePaste"
        @keyup="handleInput($event, item - 1)"
        @change="handleInput($event, item - 1)"
        @keyup.delete="onDelete($event, item - 1)"
        @keyup.enter="confirm"
        v-mask="'#'"
        placeholder="_"
        :max="9"
        autocomplete="one-time-code"
      )
</template>

<script>
import confirmCode from "@/mixins/helpers/confirmCode";

export default {
  mixins: [confirmCode],
  props: {
    error: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style lang="scss">
.registration-form__code {
  display: flex;
  @include items(6, 5);
  @include large-mobile {
    padding: 10rem 0;
  }
}
</style>

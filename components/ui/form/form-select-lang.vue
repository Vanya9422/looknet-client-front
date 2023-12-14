<template lang="pug">
.lang-select
  .select(:class="Mods", v-click-outside="closeList")
    .select__label.p.color-gray(v-if="label") {{ label }}
    .select__wrap(@click="toggleList")
      input.select__input(type="hidden", :name="name", :value="value")
      .select__head
        .select__value
          .t-input-phonemask__options-flag(
            :class="`t-input-phonemask__options-flag_${value.prefix}`"
          )
      .select__arrow(v-if="showIconDown")
        svg-icon(name="arrowDown", viewBox="0 0 11 7")
    transition(name="DropDown")
      .select__body(v-if="listOn")
        .select__body-search
          form-input(
            :value="search",
            @input="handleInput",
            name="search",
            placeholder="Сhoose your country",
            icon="search"
          )
        .select__list.css-scrollbar
          .select__item(v-for="(item, i) in items", :key="i")
            label.select__btn
              input.select__btn-input(
                type="radio",
                :name="name",
                :value="item.name",
                @change="closeList(); updateValue()",
                v-model="currentValue",
                v-if="item.name"
              )
              input.select__btn-input(
                type="radio",
                :name="name",
                :value="item",
                @change="closeList(); updateValue()",
                v-model="currentValue",
                v-else
              )
              span.select__btn-text
                span.select__btn-text-inner
                  span.t-input-phonemask__options-flag(
                    :class="`t-input-phonemask__options-flag_${item.prefix}`"
                  )
                  span.lang-title {{ item.name }}
                span.text-left(v-if="item.code") ({{ item.code }})
        slot
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  props: {
    value: {
      type: [Array, Object],
      default: () => [],
    },
    color: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    showIconDown: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: "",
    },
    big: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    borderRight: {
      type: Boolean,
      default: false,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    default: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false,
    },
    items: {
      type: [Array, Object],
      default: () => [],
    },
  },

  data() {
    return {
      listOn: false,
      currentValue: "",
      search: "",
    };
  },

  computed: {
    Mods() {
      return {
        select_lang: this.lang,
        select_big: this.big,
        "select_border-right": this.borderRight,
        "select_no-border": this.noBorder,
        select_default: this.default,
        select_top: this.top,
      };
    },
  },
  methods: {
    handleInput(e) {
      let value = e;
      value = value.replace(/\+/g, "");
      this.search = value;
      this.$emit("search", value);
    },
    toggleList() {
      if (!this.disabled) {
        this.listOn = !this.listOn;
      } else {
        if (this.listOn) this.listOn = false;
      }
    },
    closeList() {
      this.listOn = false;
    },
    updateValue(e) {
      const getItem = this.items.find(
        (item) => item.name === this.currentValue
      );
      this.$emit("input", getItem);
    },
  },
  mounted() {
    this.popupItem = this.$el;
  },
  directives: {
    ClickOutside,
  },
};
</script>
<style lang="scss">
.edit-field__placeholder.edit-field__column_center-phone {
  height: 100%;
  display: flex;
  align-items: center;
  overflow: visible !important;
  .lang-select .select__body {
    margin-top: 5px !important;
  }
  .lang-select {
    .select_lang {
      height: 100%;
    }
    .select__wrap {
      height: 100%;
    }
  }
}
</style>
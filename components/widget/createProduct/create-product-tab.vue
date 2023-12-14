<template lang="pug">
  .create-ad__tabs
    part-back-nav-without-link.create-ad__nav(  v-if="content.nav" :nav="content.nav" @change="test" :active="active" blue)
    .create-ad__tabs-list
      .create-ad__tab.js-tab.isActive
        .create-ad__field(v-if="active === 0")
          .input( ref="input" )
            input.input__field(
              :class="{'input_error': this.costError,}"
              :placeholder="content.price.placeholder"
              v-model="customPrice"
            )

          form-radio-switch.create-ad__switch(:checked="available_cost" @change="$emit('changeCost')") {{content.checkbox}}

        .create-ad__field(v-if="active === 1")
          form-input(:placeholder="content.nav[1].text" :value="content.nav[1].text" disabled)

        .create-ad__field(v-if="active === 2")
          form-input(:placeholder="content.nav[2].text" :value="content.nav[2].text" disabled)

        .create-ad__field(v-if="active === 3")
          form-input(:placeholder="content.nav[3].text" :value="content.nav[3].text" disabled)

        .create-ad__field
          label.create-ad__label.h4 {{content.description.label}}
          form-input(
            @input="(val) => $emit('desc',val)"
            :error="error"
            :value="description"
            :placeholder="content.description.placeholder"
            textarea
          )
</template>

<script>

export default {
  props: {
    content: {
      type: Object,
      default: () => {}
    },
    error: {
      type: Boolean,
      default: false
    },
    costError: {
      type: Boolean,
      default: false
    },
    available_cost: {
      type: Number,
      default: 0
    },
    active: {
      type: Number,
      default: 0
    },
    price: {
      type: [String,Number],
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  watch: {
    active() {
      // this.form.price_policy = this.nav[this.active].status
    },
    customPrice: {
      handler(newValue) {
        if (newValue === '') {
          this.$nextTick(() => this.customPrice = `$ `);
          return;
        }
        let result = newValue.replace(/[^0-9.]/g, "")
        if (result[0] === '0') {
          result = result.substring(1);
        }
        this.$nextTick(() => this.customPrice = `$ ${result}`);
        this.$emit('price', result);
      },
      deep: true
    },
  },
  data() {
    return {
      nav: [
        {
          text: 'Cost',
          class: 'isActive',
        },
        {
          text: 'For free',
        },
        {
          text: 'Exchange',
        },
        {
          text: 'Contractual',
        },
      ],
      customPrice: this.price ? `$ ${this.price}` : '',
      tabs: [{}],
      key: 0
    }
  },
  methods: {
    test(val) {
      this.$emit('change', val)
    }


  }
}
</script>

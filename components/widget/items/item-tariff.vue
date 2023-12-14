<template lang="pug">
  .item-tariff(:class="Mods")
    .item-tariff__inner
      .item-tariff__body
        .item-tariff__img
          set-img(:src="img" :defaultImg="require(`~/assets/img/diamond.png`)")
        .item-tariff__head
          .item-tariff__title.h4 {{title}}
          .item-tariff__status(v-if="status") {{status}}
        .item-tariff__box
          .item-tariff__box-bg
            svg-icon(name="tariffRect")
          .item-tariff__box-wrap
            .item-tariff__price {{ numberWithSpaces(price) }} $
            .item-tariff__time {{time}}
        ul.item-tariff__list(v-if="list" :class="Mods")
          li.item-tariff__item(v-for="(item, i) in list" :key="i") {{item.text}}
        button-link-arrow.item-tariff__more(
          v-show="list.length > 3"
          more
          small
          :blue="!blue"
          @click.native="toggle"
          :class="Mods"
        ) {{more}}
      .item-tariff__bottom
        button-primary.item-tariff__btn(border :loading="loading" small   @click.native="chooseTariff")
          span.color-gray {{choose}}

</template>

<script>
import { numberWithSpaces } from 'assets/js/functions';

export default {
  props: {
    img: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    price: {
      type: Number,
      default: 0
    },
    productId: {
      type: [Number, String],
      default: null,
    },
    time: {
      type: String,
      default: "Pery month"
    },
    choose: {
      type: String,
      default: "Choose"
    },
    more: {
      type: String,
      default: "more"
    },
    status: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: () => ([])
    },
    blue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      numberWithSpaces,
      show: false,
      loading: false,
      SERVER_URL: process.env.SERVER_URL
    }
  },
  computed: {
    Mods() {
      return {
        'isActive': this.show,
        'item-tariff_blue': this.blue,
      }
    }
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    chooseTariff() {
      console.log('aaaa', this.productId);
      if (!this.productId) return;
      this.loading = true
      const data = {
        id: this.id,
        success_url: `${this.SERVER_URL}announcements?status=success`,
        cancel_url: `${this.SERVER_URL}announcements?status=error`,
        advertise_id: this.productId,
      }
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      this.$axios.$post(this.$api.payments, formData).then(({ data: { checkout_url } }) => {
        if (process.client) {
          window.location.href = checkout_url;
        }
      }).catch(e => alert('error')).finally(() => this.loading = false)
    }
  }
}
</script>

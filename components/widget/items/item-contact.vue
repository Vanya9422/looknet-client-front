<template lang="pug">
  .item-contact
    h3.item-contact__title.h3 {{title}}
    .item-contact__row(v-if="row")
      .item-contact__column(v-for="(column, i) in row" :key="i")
        .item-contact__label {{ column.label }}
        .item-contact__list
          .item-contact__item(v-for="(item, i) in column.list"  :key="i" )
            a(v-if="$validateEmail(item.value) || $validatePhone(item.value)" :href="getRoute(item.value)" v-html="item.value" :class="{'color-blue email': $validateEmail(item.value)}")
            template(v-else)  {{item.value}}

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    row: {
      type: Array,
      default: () => ([])
    }
  },
  methods:{
    getRoute(val){
      let str = ''
      if(this.$validateEmail(val)) str +='mailto:'+val
      if(this.$validatePhone(val)) str +='tel:'+val
      return str
    }
  }
}
</script>

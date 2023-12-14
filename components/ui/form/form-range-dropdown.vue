<template lang="pug">
.form-range-dropdown
  form-range-input.form-range-dropdown__range(
    ref="range"
    v-model='sortData'
    :placeholder="placeholder"
    :use-number-controll="false"
    @inputFrom="setSearchValue"
    @inputTo="setSearchValue"

    @tippyHideFrom="tippyHideHandler"
    @tippyHideTo="tippyHideHandler"
  )
    template(v-slot:tippyFrom)
      .form-range-dropdown__inner
        ul.form-range-dropdown__list.css-scrollbar(v-if="prepareListFrom.length > 0")
          li.form-range-dropdown__list-item(
            v-for="number in prepareListFrom" :key="getItemPrint(number)"
          )
            form-checkbox.form-range-dropdown__list-checkbox(
              type='checkbox'
              :checked='getItemValue(resultData[0]) === getItemValue(number)'
              :value='getItemValue(number)'
              :name='`${_uid}-min-range`'
              :circle="true"

              @input='setResultData(0, number)'
            )
              | {{ numberWithSpaces(getItemPrint(number)) }}
        .form-range-dropdown__message(v-else) {{notFoundText}}
    template(v-slot:tippyTo)
      .form-range-dropdown__inner
        ul.form-range-dropdown__list.css-scrollbar(v-if="prepareListTo.length > 0")
          li.form-range-dropdown__list-item(
            v-for="number in prepareListTo" :key="getItemPrint(number)"
          )
            form-checkbox.form-range-dropdown__list-checkbox(
              type='checkbox'
              :checked='getItemValue(resultData[1]) === getItemValue(number)'
              :value='getItemValue(number)'
              :name='`${_uid}-min-range`'
              :circle="true"

              @input='setResultData(1, number)'
            )
              | {{ numberWithSpaces(getItemPrint(number)) }}
        .form-range-dropdown__message(v-else) {{notFoundText}}
</template>

<script>
import {numberWithSpaces} from '~/assets/js/functions';

export default {
  props: {
    value: {
      type: Array,
      default: () => [null, null]
    },
    list: {
      type: Array,
      default: () => [{}]
    },
    placeholder: {
      type: Array,
      default: () => [
          'From', 'To'
      ]
    },
  },

  data(){
    return {
      sortData: ['', ''],
      listVisible: [false, false],
      numberWithSpaces
    }
  },

  computed: {
    resultData: {
      get(){
          return this.value
      },
      set(value){
          this.$emit('input', value)
      }
    },
    listWithMax(){
      // return this.list;
      const clonedList = [...this.list];
      const getMaxValue = Math.max.apply(null, clonedList);
      clonedList.push({
        print: `${getMaxValue}+`,
        value: getMaxValue + 0.01,
        type: 'from-max-to-infinity',
      })
      return clonedList;
    },
    listFrom(){
      const clone = [...this.listWithMax];
      const sorted = clone.sort((a, b) => {
        return this.getItemValue(a) - this.getItemValue(b);
      });
      return sorted;
    },
    listTo(){
      const clone = [...this.listWithMax];
      const sorted = clone.sort((a, b) => {
        return this.getItemValue(b) - this.getItemValue(a);
      });
      return sorted;
    },
    prepareListFrom(){
      // const selectedFirstList = this.setSelectedIsBetter(this.resultData[0], this.listFrom);
      const prepareRangeList = this.setFilterFromTo(this.resultData[1], this.listFrom, "from");
      const searchList = this.searchArray(this.sortData[0], prepareRangeList);

      return searchList;
    },
    prepareListTo(){
      // const selectedFirstList = this.setSelectedIsBetter(this.resultData[1], this.listTo);
      const prepareRangeList = this.setFilterFromTo(this.resultData[0], this.listTo, "to");
      const searchList = this.searchArray(this.sortData[1], prepareRangeList);

      return searchList;
    },
    notFoundText(){
      let text = "Not found";
      switch (this.$i18n.locale) {
        case 'ru': text = "Не найдено"; break;
        case 'es': text = "No encontrado"; break;
      }
      return text;
    }
  },

  watch: {
    sortData: {
      handler(newvalue){
        for (let index = 0; index < newvalue.length; index++) {
          const value = newvalue[index];
          if(value === '') this.resetResultValue(index)
        }
      },
      deep: true
    },
    resultData: {
      handler(newvalue){
        this.resultToSearchData(newvalue)
      },
      deep: true
    },
  },

  methods: {
    getItemValue(item){
      if (typeof item === "number" || item === null) return item;
      return item.value;
    },
    getItemPrint(item){
      if (typeof item === "number" || item === null) return item;
      return item.print;
    },
    setResultData(index, value){
      const itemValue = this.getItemValue(value);
      const resultValue = this.getItemValue(this.resultData[index])

      if(resultValue !== itemValue){
        this.$set(this.resultData, index, value)
      }else{
        this.$set(this.resultData, index, null)
        this.$set(this.sortData, index, '')
      }
      this.$refs.range.hideAllTippy()
    },
    setSearchValue(index, value){
      this.$set(this.sortData, index, value)

    },
    setListVisible(index, state){
      this.$set(this.listVisible, index, state)
    },
    tippyHideHandler(index, value){
      this.selectFirstFilterdValue(index, value)
      this.removeSearchValueIfNoneExists(index);
    },
    resetResultValue(index){
      if(this.resultData[index] === null) return false;
      this.$set(this.resultData, index, null)
    },
    selectFirstFilterdValue(index, value){
      if(value === '') return false;
      const listName = this.getListNameByIndex(index);
      if(this[listName].length === 0) return false;
      const firstValue = this[listName][0];
      if(this.getItemValue(this.resultData[index]) === this.getItemValue(firstValue)) return false;
      this.setResultData(index, firstValue);
    },
    removeSearchValueIfNoneExists(index){
      const listName = this.getListNameByIndex(index);
      if(this[listName].length > 0) return false;
      this.$set(this.sortData, index, '')
    },
    getListNameByIndex(index){
      const listName = index === 0 ? "prepareListFrom" : "prepareListTo";
      return listName;
    },
    searchArray(search, list){
      let tempRecipes = list
      if (search !== '' && search) {
        tempRecipes = tempRecipes.filter((item) => {
          const itemName = this.getItemPrint(item);
          const contains = itemName.toString().includes(search)
          return contains
        })
      }
      return tempRecipes
    },
    setFilterFromTo(value, list, type = "from"){
      let tempRecipes = list
      if (value !== 0 && value) {
        tempRecipes = tempRecipes.filter((item) => {
          const itemValue = this.getItemValue(item);
          const getValue = this.getItemValue(value);
          if (type === 'from'){
            return itemValue <= getValue
          } else if(type === 'to'){
            return itemValue >= getValue
          }
        })
      }
      return tempRecipes
    },
    setSelectedIsBetter(value, list){
      let tempRecipes = [...list]
      if (value !== 0 && value) {
        tempRecipes = tempRecipes.sort((x,y) => {
          const xValue = this.getItemValue(x);
          const yValue = this.getItemValue(y);
          return xValue == value ? -1 : yValue == value ? 1 : 0;
        });
      }
      return tempRecipes
    },
    resultToSearchData(newvalue){
      for (let index = 0; index < newvalue.length; index++) {
        const value = newvalue[index];
        if(value){
          const itemName = this.getItemPrint(value);
          this.$set(this.sortData, index, itemName)
        }
      }
    }
  },
  mounted(){
    this.resultToSearchData(this.resultData)
  }
}
</script>
<style lang="scss">
.form-range-dropdown{
  &__inner{
    width: 104rem;
  }
  &__message{
    @extend %text-overflow;
  }
  &__list{
    position: relative;
    max-height: 200rem;
    margin-right: -10rem;
    padding-right: 10rem;
  }
  &__list-item{
    display: block;
    &:not(:last-child){
      margin-bottom: 12rem;
    }
  }
  &__list-checkbox{
    display: block;
    .checkbox__text{
      @extend %text-overflow;
    }
  }
  &__range{

    &.form-range-input{
      margin-bottom: 0;
    }
  }

  .tippy-tooltip{
    padding-left: 16rem;
    padding-right: 16rem;
  }
  .tippy-popper{
    max-width: none;
  }
}
</style>

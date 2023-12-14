<template lang="pug">
.model-filter-selectable-dropdown-value
  .model-filter-selectable-dropdown-value__name
    | {{ getName }}

  form-range-dropdown.model-filter-selectable-dropdown-value__input(
      v-model='values'
      :placeholder="getPlaceholder"
      :list="answersList"
  )
</template>

<script>
export default {
    props: {
      value: {
          type: Array,
          default: () => [{}]
      },
      filter: {
          type: Object,
          default: () => ({})
      },
    },

    data(){
        return {
            values: [null, null],
            result: [{}]
        }
    },
    watch: {
        value(value){
          this.passValueToValues(value);
        },
        condition(value){
            if(!value) return this.emitEmpty()
            this.emitValue({c: value})
        },
        numberValues(value){
            if(!value) return this.emitEmpty()
            this.emitValue({n: value})
        }
    },
    computed: {
        getName(){
            return this.filter?.name || 'unknown';
        },
        getPlaceholder(){
          const fromName = this.filter?.min_name || 'From';
          const toName = this.filter?.max_name || 'To';
          return [fromName, toName]
        },
        answersList(){
          const list = this.filter?.answers || [];
          const prepareList = list.map(answer => Number(answer.name))
          return prepareList
        },
        minValue(){
            // Если выбрали число с плюсом (500+), то отдаем максимальный видимый вариант
            if(typeof this.values[0] === 'object'){
              if(this.values[0]?.type === 'from-max-to-infinity') return this.values[0]?.value;
            }

            return this.values?.[0] || null;
        },
        maxValue(){
            // Если выбрали число с плюсом (500+), то отдаем null чтобы убрать макс ограничение
            if(typeof this.values[1] === 'object'){
              if(this.values[1]?.type === 'from-max-to-infinity') return null;
            }

            return this.values?.[1] || null;
        },
        isEmpty(){
            return this.minValue === null && this.maxValue === null
        },
        condition(){
            if(this.isEmpty) return null;
            if(this.minValue === null && this.maxValue) return '<='
            if(this.minValue && this.maxValue === null) return '>='
            if(this.minValue && this.maxValue) return 'between'
            return null;
        },
        numberValues(){
            // const toNumbersList = this.values.map(item => item?.value || item)
            // const list = toNumbersList.filter(field => field !== null)
            const numbersList = [this.minValue, this.maxValue]
            const list = numbersList.filter(field => field !== null && field !== '')
            const value = list.join(',')
            return value
        },

    },
    beforeDestroy(){
        this.emitEmpty()
    },
    methods: {
        toRawValues(value){
            const objValue = value[0];
            if(!value || !Object.values(objValue).length) {
                const emptyResult = [null, null]
                return emptyResult;
            }
            const arrayValue = objValue.n.split(',')
            const firstValue = objValue.c === '>=' || objValue.c === 'between' ? arrayValue[0] : '';
            const lastValue = objValue.c === '<=' ? arrayValue[0] : objValue.c === 'between' ? arrayValue[1] : '';
            const result = [Number(firstValue), Number(lastValue)];
            return result;
        },
        emitValue(value){
            const objValue = this.result[0]
            const newvalue = Object.assign(objValue, value)
            this.$emit('input', [newvalue])
        },
        emitEmpty(){
            this.$emit('input', [{}])
            return true;
        },
        passValueToValues(value){
            if(JSON.stringify(value) === JSON.stringify(this.result)) return false;
            this.result = value;
            this.values = this.toRawValues(value)
        }
    },
    mounted(){
      this.passValueToValues(this.value);
    }
}
</script>

<style lang="scss">
.model-filter-selectable-dropdown-value{
  &__name{
    font-weight: 600;
  }
}
</style>

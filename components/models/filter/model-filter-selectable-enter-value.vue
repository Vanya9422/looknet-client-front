<template lang="pug">
.model-filter-selectable-item
    form-range-input(
        v-model='values'
    )

</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            default: () => [{}]
        },
    },

    data(){
        return {
            values: ['', ''],
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
        minValue(){
            return this.values[0]
        },
        maxValue(){
            return this.values[1]
        },
        isEmpty(){
            return this.minValue === '' && this.maxValue === ''
        },
        condition(){
            if(this.isEmpty) return null;
            if(this.minValue === '' && this.maxValue) return '<='
            if(this.minValue && this.maxValue === '') return '>='
            if(this.minValue && this.maxValue) return 'between'
            return null;
        },
        numberValues(){
            const list = this.values.filter(field => field !== '')
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
                const emptyResult = ['', '']
                return emptyResult;
            }
            const arrayValue = objValue.n.split(',')
            const firstValue = objValue.c === '>=' || objValue.c === 'between' ? arrayValue[0] : '';
            const lastValue = objValue.c === '<=' ? arrayValue[0] : objValue.c === 'between' ? arrayValue[1] : '';
            const result = [firstValue, lastValue];
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
.model-filter-selectable-item__answers{
    li {
        display: block;
    }
}
</style>

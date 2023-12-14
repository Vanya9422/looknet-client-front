<template lang="pug">
.model-filter-toggle-with-value
    .model-filter-toggle-with-value__body
        form-input.model-filter-toggle-with-value__field(
            v-if="isTrueSelection"
            v-model.number="inputValue"
            :placeholder='inputPlaceholder'
            :error='error'
            :type='inputEnterType'
        )
        //- @input='beautifyInput'
        //-
</template>

<script>
import {numberWithSpaces} from '~/assets/js/functions';

export default {
    props: {
        value: {
            type: [Object],
            default: null
        },
        isTrueSelection: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        },
        filter: {
            type: Object,
            default: () => ({})
        }
    },

    data(){
        return {
            inputValue: '',
        }
    },

    watch: {
        inputValue(str){
            if (str){
                this.emitValue()
            }else{
                this.selectionDisable()
            }
        },
        isTrueSelection(status){
            if(status) return false;
            this.selectionDisable()
        },
        value: {
            handler(val){
                this.updateInputValue()
            },
            deep: true
        }
    },

    mounted(){
        this.updateInputValue()
    },

    computed: {
        filterIsTrueFalse(){
            return this.filter.type === 2
        },
        inputType(){
            return this.filterIsTrueFalse ? 'string_value' : 'number_value'
        },
        inputEnterType(){
            return this.filterIsTrueFalse ? 'text' : 'number'
        },
        inputRawValue(){
            const value = this.value?.[this.inputType] || '';
            return value.toString()
        },
        isEqual(){
            return this.inputRawValue === this.inputValue
        },
        inputPlaceholder(){
          const defaultPlaceholder = "300 000";
          const maxValue = this?.filter?.max_value;
          const minValue = this?.filter?.min_value;

          if((maxValue !== null && minValue !== null) && (
            maxValue !== undefined && minValue !== undefined
          )){
            return `${numberWithSpaces(minValue)} - ${numberWithSpaces(maxValue)}`
          }

          return defaultPlaceholder;
        }
    },

    methods: {
        // acceptNumber() {
        //     const x = this.inputValue.replace(/\D/g, '');
        //     this.inputValue = x;
        // },
        // beautifyInput(){
        //     this.inputValue = this.inputValue.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        // },
        updateInputValue(){
            if(this.isEqual) return false;
            this.inputValue = this.inputRawValue
        },
        emitValue(){
            const field = {}

            if(!this.isTrueSelection){
                this.selectionDisable()
                return false;
            }

            if(this.value && this.value?.id){
                field.id = this.value.id;
            }else{
                field.filter_id = this.filter.id;
            }

            field[this.inputType] = this.inputValue
            field.filterId = this.filter.id;
            this.$emit('input', field);
        },
        selectionDisable(){
            this.inputValue = ''
            this.$emit('input', null);
        },
        // prepareMinMax(){
        //   const numValue = Number(this.inputValue);
        //   const maxValue = this?.filter?.max_value;
        //   const minValue = this?.filter?.min_value;
        //   if((maxValue === null || maxValue === undefined) &&
        //   (maxValue === null || maxValue === undefined)){
        //     return false;
        //   }
        //   if(maxValue && numValue > maxValue){
        //     this.inputValue = maxValue;
        //     this.emitValue()
        //   }
        //   if(minValue && numValue < minValue){
        //     this.inputValue = minValue;
        //     this.emitValue()
        //   }
        // },
        // changeHandler(){
        //   this.prepareMinMax();
        // }
    }
}
</script>

<style lang="scss">
.model-filter-toggle-with-value{
  &__list{
    margin-bottom: 37rem;
    @include large-mobile{
      margin-bottom: 15rem;
    }
  }
}

</style>

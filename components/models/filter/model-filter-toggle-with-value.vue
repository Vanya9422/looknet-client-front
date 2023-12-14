<template lang="pug">
.model-filter-toggle-with-value
    .model-filter-toggle-with-value__body
        fieldset.model-filter-toggle-with-value__list(
            v-if="filter.answers && filter.answers.length > 0"
            :id='filter.slug'
        )
            span.model-filter-toggle-with-value__item(
                v-for="answer in filter.answers" :key="answer.id"
            )
                div(
                    v-if='answer.string_value || answer.number_value'
                    style='margin-bottom: 10px'
                )
                    | Ошибочное значение ответа: 
                    b {{ answer.number_value || answer.string_value}}

                form-checkbox.model-filter-toggle-with-value__checkbox(
                    v-else
                    type='radio'
                    :value='answer.boolean_value'
                    :name='filter.slug'
                    @input='switcherChange'
                )
                    | {{ answer.name }}

        form-input.model-filter-toggle-with-value__field(
            v-if="toggleValue === 1"
            v-model="inputValue"
            placeholder='300 000'
        )
</template>

<script>
export default {
    props: {
        value: {
            type: [Object],
            default: null
        },
        disabled: {
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
            toggleValue: null,
            answerId: null,
            inputValue: ''
        }
    },

    watch: {
        toggleValue(){
            this.emitValue()
        },
        inputValue(){
            this.emitValue()
        }
    },

    computed: {
        result: {
            get(){
                return this.value
            },
            set(value){
                this.$emit('input', value)
            }
        }
    },

    methods: {
        emitValue(){
            const field = {};

            if(!this.toggleValue){
                this.$emit('input', null);
                return false;
            }

            if(this.filter.type === 2){
                field.string_value = this.inputValue
            }
            if(this.filter.type === 3){
                field.number_value = this.inputValue
            }

            field.filter_id = this.filter.id;
            field.filterId = this.filter.id;
            // field.id = this.answerId;

            console.log('emitValue', field)

            this.$emit('input', field)
        },
        switcherChange(value){
            const valueEdited = value === null || value === undefined ? 0 : Number(value)
            const answer = this.filter.answers.find(answer => answer.boolean_value === valueEdited)

            this.answerId = answer?.id
            this.toggleValue = valueEdited
        }
    }
}
</script>

<style lang="scss">
// .model-filter-toggle-with-value{
//     &__checkbox{
//         margin-right: 37rem;
//     }
//     &__field{
//         margin-top: 37rem;
//     }
// }

</style>
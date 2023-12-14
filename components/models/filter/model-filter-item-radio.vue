<template lang="pug">
.model-filter-toggle-with-value(:class='parentMods')
    .model-filter-toggle-with-value__body
        fieldset.model-filter-toggle-with-value__list(
            v-if="filter.answers && filter.answers.length > 0"
            :id='filter.slug'
        )
            span.model-filter-toggle-with-value__item(
                v-for="(answer, answerIndex) in filter.answers" :key="answer.id"
            )
                form-checkbox.model-filter-toggle-with-value__checkbox(
                    type='radio'
                    :checked='result && answer.id === result.id'
                    :value='answerIndex'
                    :name='filter.slug'
                    :error='error'
                    @input='switcherChange'
                )
                    | {{ answer.name }}
</template>

<script>
export default {
    props: {
        value: {
            type: [Object],
            default: null
        },
        filter: {
            type: Object,
            default: () => ({})
        },
        error: {
            type: Boolean,
            default: false
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
        },
        parentMods(){
            return {
				'is-error': this.error
            }
        }
    },
    methods: {
        switcherChange(index){
            const answer = this.filter?.answers?.[index];
            if(!answer) {
                this.result = null; return false;
            }
            this.result = {
                id: answer.id, 
                filterId: this.filter.id
            }
        }
    }
}
</script>

<style lang="scss">
.model-filter-toggle-with-value{

    &__checkbox{
        margin-right: 37rem;
    }

    &__item{
        @include large-mobile{
            display: block;
            width: 100%;
            margin-top: 15rem;
        }
    }
}

</style>
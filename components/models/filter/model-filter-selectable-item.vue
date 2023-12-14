<template lang="pug">
.model-filter-selectable-item(:class='parentMods')
    .model-filter-selectable-item__name
        | {{ getName }}


    ul.model-filter-selectable-item__answers(
        v-if='filterExist'
    )
        li.model-filter-selectable-item__answers-item(
            v-for="answer in limitAnswers.limited"
            :key="answer.id"
        )
            //- :checked='result && answer.id === result.id'
            //- @input='switcherChange'
            form-checkbox.model-filter-toggle-with-value__checkbox(
                type='checkbox'
                :checked='getChecked(answer.id)'
                :name='filter.slug'
                :value='answer.id'
                @change='(event) => switcherChange(event, answer.id)'
            )
                | {{ answer.name }}
    .model-filter-selectable-item__hidden(
        v-if='filterExist && limitAnswers.more.length > 0'
    )
        b-collapse(
            :id="`collapse-filter-${filter.id}`"
            v-model="stateHiddenAnswers"
        )
            ul.model-filter-selectable-item__answers.model-filter-selectable-item__answers_inner
                li.model-filter-selectable-item__answers-item(
                    v-for="answer in limitAnswers.more"
                    :key="answer.id"
                )
                    form-checkbox.model-filter-toggle-with-value__checkbox(
                        type='checkbox'
                        :checked='getChecked(answer.id)'
                        :name='filter.slug'
                        :value='answer.id'
                        @change='(event) => switcherChange(event, answer.id)'
                    )
                        | {{ answer.name }}
        span.model-filter-selectable-item__more(
            @click='toggleHiddenState'
        )
            | {{ showMoreText }}

    .model-filter-selectable-item__subfilters
        model-filter-selectable-subfilter.model-filter-selectable-item__subfilter(
            v-if='subfilterNames && subfilterNames[0]'
            :nested='subfilterNames'
            :answers='answersList'
            v-model='result'
        )

</template>

<script>
// import filterController from "~/core/controllers/filterController";
// import { required, requiredIf } from "vuelidate/lib/validators";
export default {
    props: {
        filter: {
            type: Object,
            default: () => ({})
        },
        value: {
            type: Object,
            default: () => ({})
        },
    },
    data(){
        return {
            // select: []
            limit: 6,
            stateHiddenAnswers: false,
            // selection: {},
        }
    },
    watch: {
        // selection: {
        //     handler(value){
        //         // console.log('selection', value)
        //     },
        //     deep: true
        // }
    },
    computed: {
        result: {
            get(){
                return this.value || {}
            },
            set(value){
                this.$emit('input', value)
            }
        },
        parentMods(){
            return {}
        },
        getName(){
            return this.filter?.name || 'unknown';
        },
        filterExist(){
            return this.filter !== undefined && this.filter !== null && Object.keys(this.filter).length !== 0
        },
        subfilterNames(){
            if(!this.filter?.sub_filter_names) return [];
            const json = JSON.parse(this.filter.sub_filter_names);
            const realNames = [];
            const maxRows = Math.max( ...Object.keys(json) )
            for (let index = 0; index <= maxRows; index++) {
                realNames[index] = json?.[index] || '';
            }
            return realNames
        },
        answersList(){
            const answersIds = Object.keys(this.result).map(answer => parseInt(answer))
            const answers = this.filter?.answers.filter(answer => answersIds.includes(answer.id))
            return answers || [];
        },
        limitAnswers(){
            const clone = JSON.parse(JSON.stringify(this.filter?.answers || []));
            const list = clone.splice(0, this.limit);
            return {
                limited: list,
                more: clone
            }
        },
        showMoreText(){
            const text = this.stateHiddenAnswers ? 'Hide' : 'Show more';
            return text;
        },
        isSingle(){
            return this.filter?.type === 3 || this.filter?.type === 2
        }
    },
    methods: {
        getChecked(id){
            if(this.isSingle){
                return this.result[id] === id
            }
            const findIt = this.answersList.findIndex(answer => answer.id === id)
            return findIt !== -1
        },
        toggleHiddenState(){
            this.stateHiddenAnswers = !this.stateHiddenAnswers
        },
        switcherChange(event, answerId){
            const action = event.target.checked;
            const raw = this.isSingle ? {} : {...this.result}
            if(action){
                raw[answerId] = answerId
            } else {
                delete raw[answerId]
            }
            this.result = raw
        }
    }
}
</script>

<style lang="scss">
.model-filter-selectable-item{


    &__subfilter{
        padding-top: 9rem;
    }
    &__name{
        font-weight: 600;
        margin-bottom: 20rem;
    }
    &__answers{
        margin-bottom: 0;
        &_inner{
            padding-bottom: 12rem;
        }
    }
    &__answers-item{
        display: block;
        &:not(:last-child){
            margin-bottom: 12rem;
        }
    }
    &__subfilters{

        &:not(:empty){
          margin-top: 11rem;
        }
    }

    &__hidden{
        margin-top: 12rem;
    }

    &__more{
        display: inline-block;
        cursor: pointer;
        // margin-top: 20rem;
    }
}
</style>

<template lang="pug">
.model-filter-selectable-subfilter(
    :class='parentMods'
)
    //- 
    .model-filter-selectable-subfilter__field(
        v-click-outside="closeList"
        tabindex="0"
    )
        .model-filter-selectable-subfilter__name(
            @click="openList"
        )
            .model-filter-selectable-subfilter__name-inner.model-filter-selectable-subfilter__name-inner_text(
                v-if='!isOpen'
            )
                span {{ getName }}
                .model-filter-selectable-subfilter__close(
                    v-if='answersList.length > 0'
                    @click="removeAll"
                )
                    svg-icon(name="close" viewBox='0 0 10 9')

            input.model-filter-selectable-subfilter__name-inner(
                v-else
                :placeholder='nested[0]'
                ref='searchInput'
                v-model='searchValue'
            )
        .model-filter-selectable-subfilter__list(
            v-if='answers'
            :class="listMods"
        )   
            .model-filter-selectable-subfilter__selections.flex 
                .model-filter-selectable-subfilter__selections-item(
                    v-for="answer in answersList" :key='answer.id'
                )
                    | {{ answer.name }}
                    .model-filter-selectable-subfilter__close(
                        @click='removeItem(answer.id)'
                    )
                        svg-icon(name="close" viewBox='0 0 10 9')
            .model-filter-selectable-subfilter__list-inner
                .model-filter-selectable-subfilter__answer(
                    v-if='answer.sub_filters && answer.sub_filters.length > 0 && printList.length > 0'
                    v-for="answer in printList" 
                    :key="`answer-${answer.id}`"
                )
                    .model-filter-selectable-subfilter__answer-name {{ answer.name }}
                    ul.model-filter-selectable-subfilter__answer-list
                        li.model-filter-selectable-subfilter__answer-item(
                            v-for="subanswer in answer.sub_filters[0].answers" 
                            :key="`subanswer-${subanswer.id}`"
                        )
                            form-checkbox.model-filter-toggle-with-value__checkbox(
                                type='checkbox'
                                :checked='getChecked(subanswer.id)'
                                :name='filter.slug'
                                :value='subanswer.id'
                                @change='(event) => switcherChange(event, answer.id, subanswer.id)'
                            )
                                | {{ subanswer.name }}

                .model-filter-selectable-subfilter__empty(
                    v-if='printList.length === 0'
                )
                    | sorry, nothing found...

    .model-filter-selectable-subfilter__inner
        model-filter-selectable-subfilter.model-filter-selectable-item__subfilter(
            v-if='cutFirstNestedLevel && cutFirstNestedLevel[0]'
            :nested='cutFirstNestedLevel'
            :answers='answersList'
            v-model='result'
        )
        //- :value='value'
        //- :answers='answersList'
        //-     v-model='selection'
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
	directives: {
		ClickOutside
	},
    props: {
        filter: {
            type: Object,
            default: () => ({})
        },
        nested: {
            type: Array,
            default: () => []
        },
        value: {
            type: Object,
            default: () => ({})
        },
        answers: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return {
            isOpen: false,
            searchValue: ''
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
        listMods(){
            return {
                'is-visible': this.isOpen
            }
        },
        parentMods(){
            return {
                'is-disabled': this.isDisabled
            }
        },
        filterExist(){
            return this.filter !== undefined && this.filter !== null && Object.keys(this.filter).length !== 0
        },
        getName(){
            return this.selectedStringList || this.nested?.[0] || 'unknown';
        },
        isDisabled(){
            return !this.answers || this.answers.length === 0
        },
        cutFirstNestedLevel(){
            const target = this.nested;
            const cloned = [...target ];
            const cuted = cloned.shift();
            return cloned;
        },
        printList(){
            return this.searchValue === '' ? this.answers : this.answersFiltered
        },
		answersFiltered() {
            if(!this.answers || this.searchValue === '') return [];
            const searchList = this.searchValue.toLowerCase().split(' ');
            const copy = JSON.parse(JSON.stringify(this.answers))
            
            const list = copy.map(answer => {
                const subanswers = answer?.sub_filters?.[0]?.answers || [];
                const filteredSubanswers = subanswers.filter(subanswer => {
                    const filtered = searchList.some(v => subanswer.name.toLowerCase().includes(v))
                    return filtered;
                })
                
                if(filteredSubanswers && filteredSubanswers.length > 0){
                    answer.sub_filters[0].answers = filteredSubanswers
                    return answer
                }

                return null
            }).filter(answer => answer)
            
            return list;
        },        
        answersList(){
            const answersIds = this.answers.map(answer => answer.id)
            const answesRow = answersIds.flatMap(answerId => {
                const currentLevel = this.findLevel(this.result, answerId);
                const currentAnswerFull = this.answers.find(item => item.id === answerId)
                const currentAnswerSubAnswers = currentAnswerFull?.sub_filters?.[0]?.answers;
                if(!currentAnswerSubAnswers) return [];
                const currentLevelValue = currentLevel[answerId];
                let localKeys;
                if( typeof currentLevelValue === 'object' ){
                    localKeys = Object.keys(currentLevel[answerId]).map(answer => parseInt(answer));
                } else {
                    localKeys = [currentLevelValue]
                } 
                const localAnswers = currentAnswerSubAnswers.filter(answer => localKeys.includes(answer.id))
                return localAnswers;
            })
            return answesRow
        },
        selectedStringList(){
            if(!this.answersList.length) return false;
            const list = this.answersList.map(answer => answer.name);
            const str = list.join(', ')
            return str
        }
    },
    methods: {
        closeList(evt){
            if(!this.isOpen || this.isDisabled) return false;
            if(evt.target.classList.contains("model-filter-selectable-subfilter__close")) return false; 
            this.isOpen = false
            this.searchValue = ''
        },
        openList(){
            if(this.isDisabled) return false
            this.isOpen = true
            setTimeout(this.focusSearchInput, 0)
        },
        focusSearchInput(){
            const input = this.$refs.searchInput;
            input.focus();
        },
        switcherChange(event, parentID, currentID){
            const raw = {...this.result}
            const key = `${parentID}`
            const currentLevel = this.findLevel(raw, parentID)
            const value = typeof currentLevel[key] === 'object' ? currentLevel[key] : {}
            const action = event.target.checked;

            if(action){
                value[currentID] = currentID
                currentLevel[key] = value
            }else {
                delete value[currentID]
                if(Object.keys(value).length === 0){
                    currentLevel[key] = parentID
                }
            }
            this.result = raw
            
        },
        findLevel(level, parentId){
            const currentLevelKeys = Object.keys(level).map(item => parseInt(item));
            let result = null;
            for (let index = 0; index < currentLevelKeys.length; index++) {
                const answerId = currentLevelKeys[index];
                const answerValue = level[answerId];
                if(answerId === parentId) {
                    result = level;
                    break;
                }
                if(typeof answerValue === "object"){
                    result = this.findLevel(answerValue, parentId)
                    if(result) break;
                }
            }
            return result
        },
        getChecked(id){
            const findIt = this.answersList.findIndex(answer => answer.id === id)
            return findIt !== -1
        },
        removeItem(id){
            if(!id) return false;
            const raw = {...this.result}
            const parentAnswer = this.answers.find(answer => {
                const childAnswers = answer?.sub_filters?.[0]?.answers;
                if(!childAnswers) return false;
                const childIds = childAnswers.map(answer => answer.id)
                const inside = childIds.includes(id);
                return inside
            })
            const key = parentAnswer.id
            const currentLevel = this.findLevel(raw, key);
            delete currentLevel[key][id];
            if(Object.keys(currentLevel[key]).length === 0){
                currentLevel[key] = parentAnswer.id; 
            }
            this.result = raw
        },
        removeAll(){
            let raw = {...this.result}
            this.answers.forEach(answer => {
                const parentID = answer.id
                const currentLevel = this.findLevel(raw, parentID);
                currentLevel[parentID] = parentID;
            });
            this.result = raw
        }
    }
}
</script>

<style lang="scss">
.model-filter-selectable-subfilter{
    position: relative;

    &.is-disabled{
        .model-filter-selectable-subfilter{
            &__name{
                background: #F4F3F4;
                border-color: #D2D2D7;
                color: #83929D;
            }
        }
    }

    &__name{
        height: 49rem;
        border: 1px solid #D2D2D7;
        border-radius: 5px;
        position: relative;
    }

    &__name-inner{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 0 18rem 0 18rem;
        display: flex;
        align-items: center;
        border: none;
        background: transparent;
        font-weight: 500;
        letter-spacing: normal;
        user-select: none;
        

        &_text{
            pointer-events: none;
            padding-right: 46rem;

            .model-filter-selectable-subfilter__close{
                right: 11rem;
            }
        }

        span{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;            
        }
    }

    &__list{
        visibility: hidden;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        // height: 100%;
        z-index: 4;
        background: #fff;
        margin-top: 7rem;
        padding: 10rem 7rem 10rem 16rem;


        border: 1px solid #D2D2D7;
        border-radius: 5px 5px 20rem 20rem;

        &.is-visible{
            opacity: 1;
            visibility: visible;
        }
    }

    &__list-inner{
        max-height: 267rem;
        // height: 100%;
        overflow-y: auto;
        padding: 5rem 15rem 5rem 0;
        /* width */
        &::-webkit-scrollbar {
            width: 2px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
            background: transparent;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: #D9D9D9;
        }
    }

    &__field{
        position: relative;
    }

    &__answer{
        &:not(:last-child){
            margin-bottom: 16rem;
        }

        &-name{
            display: block;
            margin-bottom: 15rem;
        }

        &-item{
            display: block;
            
            &:not(:last-child){
                margin-bottom: 12rem;
            }
        }
    }

    &__selections-item{
        margin-bottom: 6rem;
        margin-right: 6rem;
        padding-right: 31rem;
        padding-left: 11rem;
        padding-top: 7rem;
        padding-bottom: 6rem;
        background: #F5F5F7;
        border-radius: 5rem;
        color: #062439;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
        position: relative;
    }
    
    &__close {
        width: 24rem;
        height: 24rem;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        margin-top: -12rem;
        right: 4rem;
        stroke: #6E6E73;
        stroke-width: 1.5;
        padding-top: 1rem;
        z-index: 1;
        pointer-events: auto;

        svg{
            pointer-events: none;
            width: 12rem;
        }
    }

    &__selections{
        margin-bottom: 3rem;
    }
}
</style>
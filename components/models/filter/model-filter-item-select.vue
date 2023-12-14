<template>  
  <div class="model-filter-item-select" :class="parentMods">
    <div class="model-filter-item-select__row">
      <div class="model-filter-item-select__column model-filter-item-select__column_left">
        <div class="model-filter-item-select__label h4">{{ getName }}</div>
      </div>
      <div class="model-filter-item-select__column model-filter-item-select__column_right">
        <div class="model-filter-item-select__field" v-if="!isTrueFalseFilter && isDefaultFilter">
          <model-filter-select class="model-filter-item-select__select" v-model="localSelected" :filter="filter" :error="$v.$invalid && $v.localSelected.$dirty" default></model-filter-select>
        </div>
        <div class="model-filter-item-select__field model-filter-item-select__" v-if="isTrueFalseFilter">
          <model-filter-item-radio class="model-filter-item-select__radio" v-model="localSelected" :filter="filter" :error="$v.$invalid && $v.localSelected.$dirty" default></model-filter-item-radio>
          <model-filter-item-input :is-true-selection="TrueFalseSelectionStatus" :filter="filter" v-model="interactiveAnswer" @input="$v.interactiveAnswer.$touch" :error="$v.$invalid && $v.interactiveAnswer.$dirty"></model-filter-item-input>
        </div>
        <div class="model-filter-item-select__field model-filter-item-select__" v-if="isMinMaxFilter">
          <model-filter-item-input :is-true-selection="true" :filter="filter" v-model="interactiveAnswer" @input="$v.interactiveAnswer.$touch" :error="$v.$invalid && $v.interactiveAnswer.$dirty"></model-filter-item-input>
        </div>
      </div>
    </div>
    <model-filter-item-select class="model-filter-item-select__nested" v-if="getSubfilterNames.length > 0" :nested="getSubfilterNames" :filter="subfilter"></model-filter-item-select>
  </div>
</template>
<script>
import filterController from "~/core/controllers/filterController";
import { required, requiredIf, maxValue, minValue } from "vuelidate/lib/validators";
export default {
    props: {
        nested: {
            type: Array,
            default: () => ([])
        },
        // value: {
		// 	type: Object,
		// 	default: () =>({})
        // },
        filter: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        filter: {
            handler(current, old){
                this.filterDestroy(old)

                if(old?.id) {
                    this.repository.removeValidationState(old.id)
                };
                this.triggerValidationState()
            },
            deep: true
        },
        localSelected(current, old){
            if(!this.repository){ console.error('repository is undefined'); return false; }
            this.repository.addOrRemove(current, old)
            this.subfilter = this.repository.getFilterSelectedSubfilter(this.filter);
        },
        interactiveAnswer(current, old){
            if(!this.repository){ console.error('repository is undefined'); return false; }
            this.repository.addOrRemove(current, old, true)
        },
        'repository.selection': function()  {
            if(!this.filterExist) return false;
            this.updateDefaultFilter()
            this.updateInputFilter()
        },
        '$v.$invalid': function (state) {
            this.triggerValidationState()
        }
    },
    data(){
        return {
            localSelected: null,
            subfilter: null,
            interactiveAnswer: null
        }
    },

	validations(){
    return {
      localSelected: {
        required: requiredIf(function () {
            return this.isRequired;
        }),
      },
      interactiveAnswer: {
        string_value: {
          required: requiredIf(function () {
              const trueFalseFilter = this.filter?.type === 2 && this.isTrueSelected;
              return trueFalseFilter
          }),
        },
        number_value: {
          required: requiredIf(function () {
              const trueFalseFilter = this.filter?.type === 3 && this.isTrueSelected;
              const minMaxFilter = this.filter?.type === 4
              return trueFalseFilter || minMaxFilter
          }),
          maxValue: maxValue(this?.filter?.max_value),
          minValue: minValue(this?.filter?.min_value),
        },
      }
    }
  },

    beforeDestroy(){
        this.stopFilterValidationWatch()
    },

    mounted(){
        setTimeout(this.triggerValidationState, 0)
        this.watchFilterValidationTrigger()
    },

    computed: {
        validationMax(){
          const maxValue = this?.filter?.max_value;
          return maxValue || false;
        },

        repository(){
            return filterController.getRepository('selection')
        },
        getName(){
            if(!this.filterExist || this.filter?.answer_id) return this?.nested?.[0] || 'unknown';
            return this.filter?.name
        },
        getSubfilterNames(){
            if(!this.filterExist || this.filter?.answer_id) return this.cutFirstNestedLevel;
            return this.subfilterNames;
        },
        isDefaultFilter(){
            if(!this.filterExist) return true;
            const isDefault = this.filter?.type === 0 || this.filter?.type === 1
            return isDefault;
        },
        isTrueFalseFilter(){
            if(!this.filterExist) return false;
            const isTrueFalse = this.filter?.type === 2 || this.filter?.type === 3
            return isTrueFalse;
        },
        isMinMaxFilter(){
            if(!this.filterExist) return false;
            const isMinMax = this.filter?.type === 4;
            return isMinMax;
        },
        TrueFalseSelectionStatus(){
            if (!this.filterExist || this.isDefaultFilter || !this.localSelected) return false;
            const answers = this.filter?.answers || [];
            const selectionAnswer = answers.find(answer => answer.id === this.localSelected.id);
            const isTrue = selectionAnswer?.boolean_value === 1;
            return isTrue
        },
        // subfilter(){
        //     return this.repository.getFilterSelectedSubfilter(this.filter)
        //     // return this.repository.findFilterSubfilter(this.filter)
        // },
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
        cutFirstNestedLevel(){
            const target = this.subfilterNames && this.subfilterNames.length > 0 ? this.subfilterNames : this.nested;
            const cloned = [...target ];
            const cuted = cloned.shift();
            return cloned;
        },
        isDisabled(){
            return this.filter === null || this.filter === undefined
        },
        filterExist(){
            return this.filter !== undefined && this.filter !== null && Object.keys(this.filter).length !== 0
        },
        parentMods(){
            return {
                'is-disabled' : this.isDisabled
            }
        },
        selectedAnswer(){
            if(!this.filterExist || !this.localSelected || this.isDefaultFilter) return null;
            const answer = this.filter.answers.find(answer => answer.id === this.localSelected?.id)
            return answer;
        },
        isTrueSelected(){
            if(!this.selectedAnswer) return false;
            const isTrue = this.selectedAnswer?.boolean_value === 1
            return isTrue;
        },
        isRequired(){
            const isObject = typeof this.filter === 'object';
            const isEmpty = Object.keys(this?.filter || {}).length === 0;
            const isNoneAnswers = !this?.filter?.answers?.length;

            // Игнорируем ответы фильтра min-max (type 4)
            if(this.isMinMaxFilter) return false;

            // если выбрали вложенность и текущий фильтр отсутствует
            if(isObject && isEmpty) return false;

            // если выбрали вложенность, фильтр существует, но у него нет ответов
            if(isObject && isNoneAnswers) return false;

            return true;
        }
    },
    methods: {
        watchFilterValidationTrigger(){
            this.$nuxt.$on('trigger-filter-validaton', () => {
                this.$v.localSelected.$touch()
                this.$v.interactiveAnswer.$touch()
            })
        },
        stopFilterValidationWatch(){
            this.$nuxt.$off('trigger-filter-validaton')
        },
        filterDestroy(oldFilter){
            this.repository.removeAnswers(oldFilter?.answers)
            this.subfilter = null;
            this.localSelected = null;
        },
        updateDefaultFilter(){
            const repositoryIstance = this.repository.findInstance(this.filter.id);
            if(JSON.stringify(repositoryIstance) === JSON.stringify(this.localSelected)) return false;
            this.localSelected = repositoryIstance
        },
        updateInputFilter(){
            if(this.isDefaultFilter) return false;
            const repositoryIstance = this.repository.findInstanceInput(this.filter.id);
            if(JSON.stringify(repositoryIstance) === JSON.stringify(this.interactiveAnswer)) return false;
            this.interactiveAnswer = repositoryIstance
        },
        triggerValidationState(params = {}){
            if(!this.filterExist || !this.repository) return false;
            const defaults = {
                id: this.filter?.id,
                state: !this.$v.$invalid
            }
            const finalData = Object.assign(defaults, params)
            this.repository.setUpValidationState(finalData)

        }
    }
}
</script>

<style lang="scss">
.model-filter-item-select{
    --filter-item-vertical-offset: 40rem;
    margin-bottom: var(--filter-item-vertical-offset);

    @include large-mobile{
        --filter-item-vertical-offset: 20rem;
    }

    &.is-disabled{
        .model-filter-item-select__column_left{
            color: $gray;
        }
    }

    &__nested{
        margin-top: var(--filter-item-vertical-offset);
    }

    &__row {
        display: flex;
        flex-wrap: wrap;

        &:not(:first-child) {
        margin-top: 40rem;
        }

        @include large-mobile {
            display: block;
            &:not(:first-child) {
                margin-top: 20rem;
            }
            &_first {
                padding-bottom: 20rem;
                border-bottom: 1px solid $light-gray;
            }
        }
    }
    &__column {
        &_left {
            width: 33.75%;
            margin-top: 6rem;
        }

        &_right {
            width: 66.25%;
            align-self: center;
        }

        @include large-mobile {
            width: 100%;
        }
    }

    &__text {
        margin-top: 8rem;
        line-height: 1;

        @include large-mobile {
            margin-top: 5rem;
        }
    }

    &__label {
        font-family: 'Gilroy';
        font-weight: 600;
        @include large-mobile {
            font-size: 16rem;
            &_mobile {
                font-size: 20rem;
            }
        }
    }
}
</style>

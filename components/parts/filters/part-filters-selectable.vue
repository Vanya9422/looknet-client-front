<template lang="pug">
.part-filters-selectable
    .part-filters-selectable__list
        .part-filters-selectable__row(
            v-for="filter in controller.instances" :key="filter.id"
        )
            model-filter-selectable-item(
                v-if='filter.type !== 4'
                :filter='filter'
                v-model='selection.filters[filter.id]'
            )
            model-filter-selectable-enter-value(
                v-if='filter.type === 3 && isTrueFilters[filter.id]'
                v-model='selection.filters_values[filter.id]'
                @input="checkEmptyEnterValue(filter.id)"
            )
            model-filter-selectable-dropdown-value(
              v-if='filter.type === 4'
              :filter='filter'
              v-model='selection.filters_values[filter.id]'
              @input="checkEmptyEnterValue(filter.id)"
            )
</template>

<script>
import filterController from "~/core/controllers/filterController";

import {mapGetters, mapActions} from "vuex";
import makeAliasApi from "@/mixins/makeAliasApi";

const INCLUDE_METHODS = {
    GET_FILTERS: 'filters/GET_FILTERS',
}

export default {
    mixins: [makeAliasApi],
    props: {
        categoryId: {
            type: Number,
            default: 0
        },
        value: {
            type: Object,
            default: () => ({})
        }
    },
    data(){
        return {
            // главный контроллер
            controller: filterController,
        }
    },
    created(){
        this.filtersInit()
    },
    beforeDestroy() {
        this.filtersDestroy()
    },
    watch: {
        categoryId(id){
            this.filtersReload(id)
            this.resetSelection()
        }
    },
    computed: {
        selection:{
            get(){
                return this.value
            },
            set(value){
                this.$emit('input', value)
            }
        },
        isTrueFilters(){
            const filters = this.controller?.instances;
            if(!filters) return {};
            const filteredFilters = filters.filter(filter => filter.type === 3);
            const values = {};
            // if(!filteredFilters) return {}
            const list = filteredFilters || []
            list.forEach(filter => {
                const answers = filter?.answers;
                if(!answers) {
                    values[filter.id] = false;
                    return
                };
                const trueAnswer = answers.find(answer => answer.boolean_value === 1)
                if(!trueAnswer) {
                    values[filter.id] = false;
                    return
                };
                const trueId =  trueAnswer.id;
                const filterSelection = this.selection.filters[filter.id];
                if(!filterSelection) {
                    values[filter.id] = false;
                    return
                };
                const slectionKeys = Object.keys(filterSelection).map(item => Number(item))
                const isSelection = slectionKeys.includes(trueId);
                values[filter.id] = isSelection
            })
            return values;
        },
    },
    methods: {
        // инициализируем http запросы,
        // делая их доступными вне контекста VUE
        ...mapActions(INCLUDE_METHODS),

        filtersInit(){
            // if(!this.controllerExist) return false;
            // инициализируем SINGLETON контроллер
            this.controller.init({
                props: {
                    category: this.categoryId
                },
                api: this.toAliasApi(INCLUDE_METHODS),
            });

            // обновляем значения фильтров по умолчанию
            // this.updateRepository(this.value)
            // this.setRepositoryAnswers(this.originAnswers)
        },

        filtersDestroy(){
            // if(!this.controllerExist) return false;
            // уничтожаем инстанс контроллера
            this.controller = this.controller.destroy();
        },

        async filtersReload(categoryId){
            await this.controller.reload({
                props: {
                    category: categoryId
                },
            })
        },

        async filtersFetch(){
            // if(!this.controllerExist) return false;
            // фетч запрос фильтров с нужными параметрами
            await this.controller.fetch()
        },

        resetSelection(){
            const value = {
                filters: {},
                filters_values: {}
            }
            this.$emit('input', value)
        },

        checkEmptyEnterValue(filterId){
            if(!filterId) return false;
            const currentValue = this.selection.filters_values[filterId];
            if(Object.keys(currentValue?.[0]).length !== 0) return false;
            this.$delete(this.selection.filters_values, filterId)
        }
    },

    async fetch(){
        await this.filtersFetch()
    }
}
</script>

<style lang="scss">
.part-filters-selectable{
    padding-bottom: 20rem;
    &__row{
        &:not(:last-child){
            padding-bottom: 20rem;
            margin-bottom: 20rem;
            border-bottom: 1px solid #E6E6EA;
        }
    }
}
</style>

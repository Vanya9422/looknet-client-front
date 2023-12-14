<template>
  <div class="part-pin-filters">
    <div class="part-pin-filters__list" v-if="filterInstancesExist">
      <model-filter-item-select
        class="part-pin-filters__item"
        v-for="filter in controller.instances"
        :key="filter.id"
        :filter="filter"
        v-if="filter"
      />
    </div>
  </div>
</template>

<script>
import filterController from "~/core/controllers/filterController";
import filterSelectRepository from "~/core/repositories/filterSelectRepository";
import {mapGetters, mapActions} from "vuex";
import makeAliasApi from "@/mixins/makeAliasApi";

const INCLUDE_METHODS = {
    GET_FILTERS: 'filters/GET_FILTERS',
}
export default {
    mixins: [makeAliasApi],
    props: {
        // передаем в контроллер для опрределения категории
        categoryId: {
            type: Number,
            default: 0
        },
        // передаем/получаем значения выбранных фильтров
        value: {
            type: Array,
            defautl: () => []
        },
        originAnswers: {
            type: Array,
            default: () => []
        }
    },

    computed: {
        controllerExist(){
            return this.controller !== null;
        },
        filterInstancesExist(){
            return this.controllerExist && this.controller?.instances && this.controller?.instances.length > 0
        },
        // алиас для быстрого доступа к репозиторию выбранных фильтров
        repository(){
            if(!this.controllerExist) return null;
            const repository = this.controller.getRepository('selection')
            return repository
        },
        isValid(){
            if(!this.repository) return false;
            return this.repository.valid;
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

    methods: {
        // инициализируем http запросы,
        // делая их доступными вне контекста VUE
        ...mapActions(INCLUDE_METHODS),

        // алиас метода для обновления репозитория
        // value - raw массив с данными
        // instances - массив фильтров, в котором ищем id ответов (из value)
        updateRepository(value){
            this.repository.update(value, this.controller.instances)
        },

        filtersInit(){
            if(!this.controllerExist) return false;

            // инициализируем SINGLETON контроллер
            this.controller.init({
                props: {
                    category: this.categoryId
                },
                api: this.toAliasApi(INCLUDE_METHODS),
                repositories: [
                    {
                        name: 'selection',
                        type: filterSelectRepository
                    }
                ]
            });

            // обновляем значения фильтров по умолчанию
            this.updateRepository(this.value)
            this.setRepositoryAnswers(this.originAnswers)
        },

        filtersDestroy(){
            if(!this.controllerExist) return false;
            // уничтожаем инстанс контроллера
            this.controller = this.controller.destroy();
        },

        filtersReload(){
            this.filtersDestroy()
            this.controller = filterController
            this.filtersInit()
        },

        setRepositoryAnswers(value){
            this.repository.setAnswers(value)
        },

        async filtersFetch(){
            if(!this.controllerExist) return false;
            // фетч запрос фильтров с нужными параметрами
            await this.controller.fetch()
        }
    },

    watch: {
        async categoryId(id){
            this.filtersReload()
            await this.filtersFetch()
        },

        // если у родителя изменилось значение,
        // например при редактировании карточки,
        // обновляем значение в репозитории
        value: {
            handler(value){
                setTimeout(() => {
                    this.updateRepository(value)
                }, 0);

            },
            deep: true
        },

        isValid(state){
            this.$emit('validation', state)
        },

        // если обновилось значение репозитория,
        // передаем родителю информацию об этом
        'repository.beauty': function(selection) {
            this.$emit('input', selection)
        },
        // при изменении инстансцев фильтра,
        // заправшиваем апдейт выбранных значений
        'controller.instances': function(instances) {
            setTimeout(() => {
                this.repository.reset()
                this.updateRepository(this.value)
            }, 0);
        },

        originAnswers(value){
            this.setRepositoryAnswers(value)
        }
    },

    async fetch(){
        await this.filtersFetch()
    }
}
</script>

<style lang="scss">
.part-pin-filters{
    margin-top: 48rem;

    @include large-mobile{
        margin-top: 30rem;
    }
}
</style>

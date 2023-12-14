import filterController from "~/core/controllers/filterController";
export default class {
    selection = [];
    validations = [];
    #answers = [];
    // formatted = {}
    
    constructor(props){
        if(props) Object.assign(this, props);
    }

    get beauty(){
        const list = this.selection.map(instance => {
            const item = {...instance};
            delete item.filterId;
            return item
        })
        return list;
    }

    get valid(){
        const list = this.validations.filter(status => !status.state);
        const isValid = list.length === 0;
        return isValid
    }

    get formatted(){
        const list = [];
        const filters = filterController?.instances;
        const raw = this.selection;

        if (!raw || !filters) return null;

        const setFilterFormatter = (filter, parentFilter = null, level = 0) => {
            const filterAnswers = filter?.answers || [];
            
            let myLevel = level;
            const myParentFilter = parentFilter || filter;
            // const findAnswer = filterAnswers.find(answer => )
            // const answerIds = filterAnswers.map(answer => answer.id)
            // const answerFind = answerIds.includes(id);
            const myInstances = raw.filter(instance => instance.filterId === filter.id);

            if(!myInstances || !myInstances.length) return false;

            for (let instanceIndex = 0; instanceIndex < myInstances.length; instanceIndex++) {
                const formatFilter  = {}
                const myInstance = myInstances[instanceIndex];
                const answerId = myInstance?.id
                const filterAnswer = filterAnswers.find(answer => answer.id === answerId);
                const enterValue = myInstance?.number_value || myInstance?.string_value;

                if(enterValue !== null && enterValue !== undefined){
                    formatFilter.answerName = enterValue;
                }
                else
                {
                    formatFilter.answerName = filterAnswer?.name;
                }

                if(filterAnswer?.boolean_value !== null && filterAnswer?.boolean_value !== undefined){
                    formatFilter.boolean_value = filterAnswer?.boolean_value;
                }

                if(!parentFilter){
                    formatFilter.filterId = filter?.id;
                    formatFilter.filterName = filter?.name;
                }
                else
                {
                    const stringNames = parentFilter?.sub_filter_names || '{}';
                    const names = JSON.parse(stringNames);
                    
                    formatFilter.filterId = parentFilter?.id;
                    formatFilter.filterName = names?.[level -1 ];
                }

                list.push(formatFilter)

                const childFilter = filterAnswer?.sub_filters?.[0];
                if(childFilter){
                    myLevel++;
                    setFilterFormatter(childFilter, myParentFilter, myLevel);
                    
                }
            }
            
        }

        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            setFilterFormatter(filter)
        }

        return list;
    }

    // get formatted(){
    //     const list = [];
    //     const filters = filterController.instances;
    //     const raw = this.selection;
    //     if(!filters) return [];

    //     const findMyFilter = (filter, instance) => {
    //         let level = 0
    //         const findMyChildren = (filter, filterId) => {
    //             const answers = filter?.answers || [];
    //             const getAnswers = {}
    //         }
    //     }

    //     for (let i = 0; i < raw.length; i++) {
    //         const instance = raw[i];
    //         for (let f = 0; f < filters.length; f++) {
    //             const filter = filters[f];
    //             const search = findMyFilter(filter, instance);

    //             if(search){ list.push(search); break; }
    //         }
    //     }


    //     return list;
    // }

    reset(){
        this.selection = []
        this.validations = []
    }

    update(value = [], filters){
        const isEqual = this.isEqualBeauty(value);
        if(isEqual){ 
            return false; 
        }

        this.selection = this.setRawSelectionFilterIds(value, filters)
    }

    setAnswers(answers){
        this.#answers = answers;
    }   

    // немножко улучшить
    setRawSelectionFilterIds(value = [], filters){
        const selection = value.map(instance => {

            const inAnswers = this.#answers.find(answer => answer.id === instance?.id);
            if(inAnswers){
                instance.filterId = inAnswers.filter.id;
                return instance;
            }

            if(!instance?.id || instance?.filter_id){
                instance.filterId = instance.filter_id;
                return instance;
            }

            const searchFilter = this.getFilterByAnswerID(instance.id, filters)
            instance.filterId = searchFilter?.id || null;

            return instance
        })
        return selection;
    }

    // в сервис
    getFilterByAnswerID(id, filters){
        let filter;

        filters.forEach(item => {
            if(filter) return;

            const itemAnswers = item?.answers || [];
            const answerIds = itemAnswers.map(answer => answer.id)
            const answerFind = answerIds.includes(id);
            if(answerFind) {
                filter = item;
                return;
            }

            let subfilter;
            itemAnswers.forEach(itemAnswer => {
                if(subfilter) return;
                const subfilters = itemAnswer?.sub_filters || [];
                subfilter = this.getFilterByAnswerID(id, subfilters);
            })

            filter = subfilter || false;
        })
        
        return filter;
    }

    // рефактор
    isEqualBeauty(value){
        return JSON.stringify(value) === JSON.stringify(this.beauty)
    }

    compareInstances(instance, item){
        return JSON.stringify(instance) === JSON.stringify(item);
    }
    // ----------

    findIndexInstance(filterId){
        if(!filterId) return null;
        const index = this.selection.findIndex(instance => {
            const findFilter = instance?.filterId === filterId;
            const isInput = instance?.string_value || instance?.number_value
            return !isInput && findFilter
        })
        return index;
    }

    findIndexInstanceInput(filterId){
        if(!filterId) return null;
        const index = this.selection.findIndex(instance => {
            const findFilter = instance?.filterId === filterId;
            const isInput = instance?.string_value || instance?.number_value
            return findFilter && isInput
        })
        return index;
    }

    findInstance(filterId){
        if(!filterId) return null;
        const index = this.findIndexInstance(filterId);
        if(index === -1) return null;
        const instance = this.selection[index];
        return instance;
    }

    findInstanceInput(filterId){
        if(!filterId) return null;
        const index = this.findIndexInstanceInput(filterId);
        if(index === -1) return null;
        const instance = this.selection[index];
        return instance;
    }

    findIndexInstanceByAnswerId(answerId){
        if(!answerId) return -1;
        const index = this.selection.findIndex(instance => instance.id === answerId)
        return index;
    }

    removeInstance(index){
        if(index === -1) return false; 
        this.selection.splice(index, 1)
    }

    removeInstanceByFilterId(filterId){
        const instanceIndex = this.findIndexInstance(filterId);
        this.removeInstance(instanceIndex);
    }

    removeInstanceInputFilter(filterId){
        const instanceIndex = this.findIndexInstanceInput(filterId);
        this.removeInstance(instanceIndex);
    }

    removeAnswers(list){
        const answers = list || [];

        answers.forEach(answer => {
            const answerIndex = this.findIndexInstanceByAnswerId(answer?.id);
            if(answerIndex === -1) return;
            this.removeInstance(answerIndex);
        });
    }

    getFilterSelectedAnswer(filterId){
        const instance = this.findInstance(filterId);
        if(!instance) return null;
        const answerId = instance.id;
        return answerId;
    }

    getFilterSelectedSubfilter(filter){
        const selectedAnswerId = this.getFilterSelectedAnswer(filter?.id)
        if(!selectedAnswerId) return null;
        const selectedAnswer = filter.answers.find(answer => answer.id === selectedAnswerId);
        const subfilter = selectedAnswer?.sub_filters?.[0];
        return subfilter;
    }

    addOrRemove(current, old, isInput = false){
        if(!current && old){
            const oldFilterId = old?.filterId;
            if(!isInput) this.removeInstanceByFilterId(oldFilterId);
            else this.removeInstanceInputFilter(oldFilterId);
            return false;
        }

        const filterId = current.filterId;
        if(!filterId) return false;

        if(!isInput) this.removeInstanceByFilterId(filterId);
        else this.removeInstanceInputFilter(filterId);

        this.selection.push(current)
    }

    findValidationStateIndex(id){
        const validationIndex = this.validations.findIndex(item => item.id === id)
        return validationIndex;
    }

    setUpValidationState(item){
        this.removeValidationState(item.id)
        this.validations.push(item)
    }

    removeValidationState(id){
        const validationIndex = this.findValidationStateIndex(id)
        if(validationIndex !== -1) this.validations.splice(validationIndex, 1)        
    }
    
}

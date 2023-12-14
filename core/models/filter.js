import aliasApi from "~/core/helpers/aliasApi";
import model from "~/core/base/model";
import answer from "~/core/models/answer";

export default class extends model {

    answers = [];
    name = "";
    type = 0;
    sub_filter_names = '';

    constructor(data){
        super();
        super.initializeParameters(data);
        this.setUpMyAnswers()
    }

    get haveSubfilter(){
        const list = this.answers.filter(instance => instance.haveSubfilter === true)
        return list.length > 0
    }

    get isMainFilter(){
        return this.type === 0 && !this?.answer_id
    }

    get hierarchyLevel(){
        if(!this.isMainFilter) return 0;

        const hierarchyLevels = filterHelper.getFilterNestedLevels(this.answers);
        const maxLevel = Math.max( ...hierarchyLevels )
        return maxLevel;
    }

    async getAnswers(){
        if (!super.isRegistred) return false;
        
        await aliasApi.call('filters/GET_ANSWERS', {
            filter: this.id
        })
    }

    setUpMyAnswers(){
        if(!this?.answers || !this?.answers.length) return false;
        this.answers = this.answers.map(item => new answer(item))
    }
}
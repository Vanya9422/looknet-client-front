import model from "~/core/base/model";
import filter from "~/core/models/filter";
import aliasApi from "~/core/helpers/aliasApi";

export default class extends model {
    name = "";
    sub_filters = [];

    constructor(data = {}){
        super();
        super.initializeParameters(data);
        this.setUpMySubfilters()
    }

    get haveSubfilter(){
        return this.sub_filters.length > 0
    }

    setUpMySubfilters(){
        if(!this?.sub_filters || this?.sub_filters.length === 0) return false;
        this.sub_filters = this.sub_filters.map(item => new filter(item))
    }
}
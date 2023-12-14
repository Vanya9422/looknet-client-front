import aliasApi from "~/core/helpers/aliasApi";
import filter from "~/core/models/filter";
import controller from "~/core/base/controller";

class filterController extends controller {

    constructor(){
        super();
    }

    async reload(params){
        this.init(params)
        await this.fetch()
    }

    async fetch(params = {})
    {
        const mergeParams = {
            category: this.category,
            ...params
        }
        const request = await aliasApi.call('filters/GET_FILTERS', mergeParams)
        this.build(request)
    }

    build(request){        
        this.setUpInstances(request?.data)
        this.setUpInitial(request?.data)
        this.meta = request?.meta;
    }

    clearInstances(){
        this.instances.splice(0);
    }

    getInstanceById(id){
        const filter = this.instances.find(f => f.id === id)
        return filter
    }

    setUpInstances(list = [])
    {
        const result = (list || []);
        this.instances = result
            .map(item => {
                if (item.answer_id) return false;
                return new filter(item)
            })
            .filter(item => item)
    }
}

const singletonController = new filterController();
export default singletonController;
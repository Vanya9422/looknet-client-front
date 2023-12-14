import aliasApi from "~/core/helpers/aliasApi";
import {differenceWith, isEqual} from 'lodash'

export default class {
    instances = [];
    initialState = []

    repositories = []

    constructor(){}

    init(data){
        this.instances = data?.instances || [];
        this.meta = null;
        this.repositories = [];

        if(data?.props) Object.assign(this, data?.props);
        if(data?.api) aliasApi.add(data?.api)        
        if(data?.repositories) this.initRepositories(data.repositories)    

        return this;
    }

    getRaw(){
        return this.instances.map(item => {
            return JSON.parse(JSON.stringify(item))
        })
    }
    
    getDifference(){
        const rawData = this.getRaw();
        return differenceWith(
            rawData, this.initialState, isEqual
        )
    }

    setUpInitial(params){
        this.initialState = JSON.parse(JSON.stringify(params))
    }


    initRepositories(list){
        if(!list) return false;

        list.forEach(repository => {
            const current = this.findRepository(repository.name)
            if(current?.instance) return;

            this.repositories.push({
                name: repository.name,
                instance: new repository.type()
            })
        });
    }

    findRepository(name){
        const repository = this.repositories.find(item => item.name === name)
        return repository
    }

    getRepository(name){
        const repository = this.findRepository(name)
        if(!repository) return null;
        return repository?.instance
    }

    destroy(){
        console.log('destroy controller')
        this.instances = [];
        this.repositories = [];
        return null;
    }
}
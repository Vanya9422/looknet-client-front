import {uniqueId} from 'lodash'
export default class {
    #fakeID = null;

    constructor() {
        this.#fakeID = uniqueId()
    }

    initializeParameters(data){
        Object.assign(this, data)
        // const names = Object.keys(data);
        // names.forEach(name => {
        //     this[name] = data[name]
        // });
    }

    get fakeID(){
        return this.#fakeID
    }

    get isRegistred(){
        return this?.id !== null && this?.id !== undefined;
    }
}
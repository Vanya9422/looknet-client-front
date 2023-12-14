/*
    Выносит методы для работы с апи из стора во вне контекст VUE
*/
export default class {
    static #api = {};

    static add(data){
        this.#api = {...this.#api, ...data};
    }

    static clear(){
        this.#api = {}
    }

    static async call(name, params){
        const triggerMethod = this.#api?.[name];
        if(!triggerMethod) return false;

        const request = await triggerMethod(params);
        return request;
    }

    static get all(){
        return this.#api;
    }
}
export default class {
    static getIndexByID(list, id){
        return list.findIndex(item => item.id === id)
    }

    static initializeParameters(data){
        const names = Object.keys(data);

        names.forEach(name => {
            this[name] = data[name]
        });
    }

    // static isRegistred()
}
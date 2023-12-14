export default {
    methods: {
        toAliasApi(api){
            const keys = Object.keys(api);
            const result = {};

            keys.forEach(key => {
                const methodName = api[key]; 
                result[methodName] = this[key]
            });

            return result;
        }
    },
}
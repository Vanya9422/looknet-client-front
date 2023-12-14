export default {
    SET_EVENT({}, event){
        if(process.client) {
          window?.dataLayer.push({event})
        }
    },
}

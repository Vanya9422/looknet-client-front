export default class {
    static getFaked(product){
        const fullName = `${product?.fake_data?.first_name} ${product?.fake_data?.last_name}`
        const date = product?.fake_data?.created_at;
        const data = {
            isFake: product?.is_fake,
            fakeName: fullName,
            image: product?.fake_image,
            date: date
        };
        return data;
    }

    static getRegistred(props = {}){
        let registeredDate = props?.created_at;
        const label = props?.registered || 'Registered';
        if(props?.fake?.isFake && props?.fake?.date){
            registeredDate = props?.fake?.date;
        }
        const formatted = `${label} ${props.getDate(registeredDate)}`

        return formatted
    }
}
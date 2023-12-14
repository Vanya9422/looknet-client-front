// import { serialize } from 'object-to-formdata';

export default {
    async GET_FILTERS({}, {category}){
        // answersWithoutSubFilters
        const list = await this.$axios.$get(`/filters?page=1&search=category_id:${category}&with=answers&orderBy=order&sortedBy=asc`);
        
        return list;
    },
    async GET_ANSWERS({}, {filter}){
        const list = await this.$axios.$get(`/filters/answers?search=filter_id:${filter}`);
        return list;
    },

}
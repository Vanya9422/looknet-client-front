export default {
  data() {
    return {
      filter: [
        {
          text: 'Newest',
          value: 'orderBy=id&sortedBy=desc'
        },
        {
          text: 'Older',
          value: 'orderBy=id&sortedBy=asc'
        },
        {
          text: 'Expensive',
          value: 'orderBy=price&sortedBy=desc'
        },
        {
          text: 'Cheap',
          value: 'orderBy=price&sortedBy=asc'
        }
      ],
      sort: 'Newest',
    };
  },
  methods:{
    getActiveSort(){
      const sort = this.filter.find(i => i.text === this.sort)
      return sort.value
    }
  }
}

export default {
  data() {
    return {
      checkedList: [],
      checkedAll: false
    }
  },
  methods: {
    checkedItem(slug, i) {
      if (this.list[i].checked === true) {
        this.list[i].checked = false
        this.removeItem(this.list[i].id)
      } else {
        this.list[i].checked = true
        this.checkedList.push(this.list[i].id)
      }
      this.checkedAll = this.list.length === this.checkedList.length
    },
    removeItem(id) {
      const getIndex = this.checkedList.findIndex(item => item === id)
      this.checkedList.splice(getIndex, 1)
    },
    checkedAllItems(flag) {
     const checked = []
      this.list.forEach(i => {
        i.checked = flag
        if(flag) checked.push(i.id)
      })
      this.checkedList = checked
      this.checkedAll = this.list.length === this.checkedList.length
    },
    panelSelectedAll() {
      if (process.client && window.innerWidth > 580) {
        this.panelOpen = true;
      } else {
        this.$root.$emit('bv::show::modal', 'modal-panel');
      }
      this.checkedAllItems(!this.checkedAll)
    },
    getProductsSlug() {
      const array = []
      this.list.forEach(item => array.push(item.slug))
      return array
    },
  }
}

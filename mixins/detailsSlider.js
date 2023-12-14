import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      DETAIL_MODAL_EVENT: 'product/DETAIL_MODAL_EVENT'
    })
  },
  watch: {
    DETAIL_MODAL_EVENT(event) {
      if (event === 'close') this.closeItem()
      if (event === 'prev') this.prevItem()
      if (event === 'next') this.nextItem()
      if (event !== null && event !== 'prev' && event !== 'next' && event !== 'close') this.changeModal(event)
    }
  },
  methods: {
    ...mapActions({
      SET_DETAIL: 'product/SET_DETAIL',
    }),
    changeModal(i) {
      this.activeDetail = i
      this.openModal()
    },
    closeItem() {
      this.activeDetail = null
    },
    prevItem() {
      if (this.activeDetail > 1) {
        this.activeDetail--
        this.openModal()

      }
    },
    nextItem() {
      if (this.list.length - 1 > this.activeDetail) {
        this.activeDetail++
        this.openModal()

      }
    },
    openModal() {
      this.SET_DETAIL(this.list[this.activeDetail].slug)
      this.$root.$emit('bv::show::modal', 'modal-card')
      this.$axios.$post(`/statistics/${this.list[this.activeDetail].slug}/view-details`)
    }
  }
}

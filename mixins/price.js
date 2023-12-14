import {VMoney} from 'v-money'
export default {
  computed:{
    money(){
      return {
        decimal: ',',
        thousands: '.',
        prefix: '$ ',
        suffix: '',
        precision: this.precision >= 0 ? this.precision: 2,
      }
    }
  },
  directives: {money: VMoney}
}
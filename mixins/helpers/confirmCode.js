export default {
  layout: 'default_small',
  data() {
    return {
      amount: 6,
      code: [],
      currentIndex: 0
    }
  },
  computed:{
    codeNumbers(){
      let code = '';
      this.code.forEach(index => code += index)
      return code
    }
  },
  watch: {
    currentIndex(val) {
      if (this.amount !== val)  this.$refs.currentIndex[val > 0 ? val : 0].focus()
      this.$emit('input',this.codeNumbers)
    }
  },
  methods: {
    validateNumber(val) {
      return val.replace(/\D/g, '')
    },
    handlePaste(e) {
      e.preventDefault()
      const text = e.clipboardData.getData('text')
      let code = []
      this.currentIndex = 0
      for (const i in text) {
        let value = this.validateNumber(text[i])
        code[this.currentIndex] = value

        e.target.value = value
        if (this.currentIndex + 1 >= this.amount) {
          break
        }
        this.currentIndex++
      }
      this.code = code
      return true
    },
    handleInput(e, index) {
      e.target.value = this.validateNumber(e.target.value)
      if (e.target.value !== '') {
        this.currentIndex = index + 1
      }
    },
    onDelete(e, index) {
      if (e.target.value === '') {
        this.currentIndex = index - 1
      } else {
        this.code[index] = ''
        this.currentIndex = index - 1
        this.$refs.currentIndex[0].focus()
      }
    }
  }
}
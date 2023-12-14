export default {
  layout: 'default_small',
  data() {
    return {
      currentTime: null,
      timer: null,
    }
  },
  watch: {
    currentTime(time) {
      if (time === 0) this.stopTimer()
    }
  },
  mounted() {
    this.currentTime = this.repeatTime
    this.startTimer()
  },
  destroyed() {
    this.stopTimer()
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--
      }, 1000)
    },
    stopTimer() {
      clearInterval(this.timer)
    },
    repeatCounter() {
      this.stopTimer()
      this.currentTime = this.repeatTime
      this.startTimer()
    },
  }
}
export default {
  watch: {
    '$i18n.locale'() {
      this.getPageTranslate()
    }
  },
  // created() {
  //   this.getPageTranslate()
  // },
}

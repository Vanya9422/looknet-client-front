export default {
  data() {
    return {
      loading: false,
      content: null,
      background_images: null
    }
  },
  async fetch() {
    await this.getPage()
  },
  watch:{
    // Выполняем метод getPage, когда свойство $i18n.locale изменяется
    async '$i18n.locale'(){
      await this.getPage()
    }
  },
  methods: {
    // Функция для получения конкретной страницы с API
    async getPage() {
      try {
        // Получаем тип страницы и ключ страницы
        let type = this.type,
          page_key = this.page_key

        // Строим конечную точку API и необходимые параметры
        const url = this.$getQuery({page_key,  type})

        // Выполняем вызов API и сохраняем возвращенные данные
        const {data:{content,background_images}} = await this.$axios.$get(`${this.$api.page}?${url}`)
        if(content)  this.content =  JSON.parse(content)
        if(JSON.stringify(background_images) !== '') this.background_images = background_images
      } catch (e) {
        // Логируем любые ошибки, которые могут произойти во время вызова API
        console.log(e)
      } finally {
        // Устанавливаем состояние загрузки в true, независимо от того, успешен ли вызов API или нет
        this.loading = true
      }
    }

  }
}

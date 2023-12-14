import Vue from 'vue'

Vue.prototype.$status = {
  notVerified: 0, // Самый базовый статус, присваивается при создании карточки, присутствует в листинге.
  active: 1, // Обычное объявление, фигурирующее в листинге
  nonActive: 2,
  /*
    Объявление, которое перестает быть активным. Например, спустя 30 дней после публикации,
    ему автоматически присваивается этот статус
  */
  rejected: 3, // Модератор проверил объявление и отклонил его
  banned: 4,
  /*
    Объявление нарушающее правила сервиса, без возможности восстановления
    не обрабатывается фронтендом
  */
  draft: 5 // Черновик
}
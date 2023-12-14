import {cloneDeep, without, has} from 'lodash';
import CryptoJS from 'crypto-js'

const updateAnswerIds = function (answersFiltersIds, value, index) {
  let answersIds = cloneDeep(answersFiltersIds)
  if (has(answersIds, index)) { // если в объекте уже есть массив с этим индексом
    answersIds[index].push(value); // добавляем новое значение в существующий массив
  } else {
    answersIds[index] = [value]; // создаем новый массив с переданным значением
  }
  return answersIds
}

const removeAnswerIds = function (answersFiltersIds, value, index) {
  let answersIds = cloneDeep(answersFiltersIds)
  if (has(answersIds, index)) { // если в объекте уже есть массив с этим индексом
    answersIds[index] = without(answersIds[index], value); // удаляем переданное значение из массива
  }
  return answersIds
}

const addAnswersToGlobalArray = function addAnswersToGlobalArray(answersIds, globalArray) {
  Object.values(answersIds).forEach((answer) => {
    answer.forEach((value) => {
      globalArray.push(value);
    });
  });
  return globalArray;
}
const decodeQuery = function (queryString) {
  const params = new URLSearchParams(queryString);
  const result = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
}
const encodeQuery = function (query) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    params.append(key, value);
  }

  return params.toString();
}
export {
  updateAnswerIds,
  removeAnswerIds,
  addAnswersToGlobalArray,
  decodeQuery,
  encodeQuery
}

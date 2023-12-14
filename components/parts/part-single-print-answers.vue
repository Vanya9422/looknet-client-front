<template>
  <div class="part-single-print-answers">
    <ul class="single-content__list color-gray flex flex_vertical p" v-if="answersFiltered.length">
      <li class="single-content__list-item" v-for="(answer, index) in answersFiltered" :key="index">
        {{  answer?.filterName }}:
        <b>{{ getAnswerName(answer) }}</b></li>
    </ul>
  </div>
</template>
<script>
import { numberWithSpaces } from "~/assets/js/functions";

export default {
    props: {
      answers: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      answersFiltered() {
        return this.answers.filter((answer) => answer && typeof answer === 'object' && answer.boolean_value !== '1');
      },
    },
    methods: {
      getAnswerName(answer){
        const numberValue = Number(answer?.answerName);
        const isNan = isNaN(numberValue);
        return isNan ? answer?.answerName : numberWithSpaces(numberValue);
      }
    }
}
</script>

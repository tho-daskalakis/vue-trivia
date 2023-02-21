<template>
  <div class="answers-display">
    <AnswerComp
      v-bind:answer="answers[0]"
      @show-answers="onShowAnswers"></AnswerComp>
    <AnswerComp
      v-bind:answer="answers[1]"
      @show-answers="onShowAnswers"></AnswerComp>
    <AnswerComp
      v-bind:answer="answers[2]"
      @show-answers="onShowAnswers"></AnswerComp>
    <AnswerComp
      v-bind:answer="answers[3]"
      @show-answers="onShowAnswers"></AnswerComp>
  </div>
</template>

<script>
import AnswerComp from './AnswerComp.vue';

export default {
  name: 'AnswersDisplayComp',
  props: {
    answers: {
      type: Array,
      required: true,
    },
  },
  components: { AnswerComp },
  methods: {
    onShowAnswers: function (isCorrect) {
      console.log(isCorrect);
      if (isCorrect) alert('Congratulations! You are correct!');
      else alert("You didn't get this one right... Better luck next time!");
    },
  },
};
</script>

<style scoped>
.answers-display {
  justify-self: center;
  align-self: center;

  display: grid;
  grid-template-rows: repeat(2, 80px);
  grid-template-columns: repeat(2, 160px);
}
</style>

<template>
  <div class="answers-display">
    <AnswerComp
      v-bind:answer="answers[0]"
      v-bind:class="hasChosenAnswer && answer0"
      @show-answers="onShowAnswers"></AnswerComp>
    <AnswerComp
      v-bind:answer="answers[1]"
      v-bind:class="hasChosenAnswer && answer1"
      @show-answers="onShowAnswers"></AnswerComp>
    <AnswerComp
      v-bind:answer="answers[2]"
      v-bind:class="hasChosenAnswer && answer2"
      @show-answers="onShowAnswers"></AnswerComp>
    <AnswerComp
      v-bind:answer="answers[3]"
      v-bind:class="hasChosenAnswer && answer3"
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
    hasChosenAnswer: {
      type: Boolean,
      required: true,
    },
  },
  components: { AnswerComp },
  computed: {
    answer0: function () {
      return this.answers[0].correct + 'Answer';
    },
    answer1: function () {
      return this.answers[1].correct + 'Answer';
    },
    answer2: function () {
      return this.answers[2].correct + 'Answer';
    },
    answer3: function () {
      return this.answers[3].correct + 'Answer';
    },
  },
  methods: {
    onShowAnswers: function (isCorrect) {
      this.$emit('has-chosen-answer', isCorrect);
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

.trueAnswer {
  background-color: green;
}

.falseAnswer {
  background-color: red;
}
</style>

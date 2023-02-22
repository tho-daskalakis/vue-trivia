<template>
  <div class="game-view">
    <QuestionDisplayComp
      v-bind:question-text="questionText"></QuestionDisplayComp>
    <AnswersDisplayComp
      v-bind:answers="answers"
      v-bind:hasChosenAnswer="showAnswers"
      @has-chosen-answer="onHasChosenAnswer"></AnswersDisplayComp>
    <button
      v-if="questionCount < 10"
      class="get-question-btn"
      @click="handleOnClick">
      Next question
    </button>
    <p v-if="questionCount" class="score-display">
      Your current score: {{ score }} out of {{ questionCount }} questions
    </p>
  </div>
</template>

<script>
import AnswersDisplayComp from './Answer/AnswersDisplayComp.vue';
import QuestionDisplayComp from './Question/QuestionDisplayComp.vue';
import shuffleArray from './utils/shuffleArray';
import getRandomInt from './utils/getRandomInt';
import parseHTML from './utils/parseHTML';

export default {
  name: 'GameView',
  components: { QuestionDisplayComp, AnswersDisplayComp },
  data() {
    return {
      sessionToken: '',
      questionText: 'Waiting for question...',
      answers: [
        { text: '...', correct: null },
        { text: '...', correct: null },
        { text: '...', correct: null },
        { text: '...', correct: null },
      ],
      showAnswers: false,
      score: 0,
      questionCount: 0,
    };
  },
  created: function () {
    // Get a session token
    this.getSessionToken();
  },
  methods: {
    getSessionToken: async function () {
      const response = await fetch(
        'https://opentdb.com/api_token.php?command=request'
      );

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        this.sessionToken = data.token;
      } else {
        alert(response.statusText);
      }
    },
    onHasChosenAnswer: function (isCorrect) {
      this.showAnswers = true;
      if (isCorrect) this.score++;
      if (this.questionCount >= 10) this.$emit('show-final-screen', this.score);
    },
    handleOnClick: function () {
      this.questionCount++;
      this.showAnswers = false;
      this.callAPI();
    },

    callAPI: async function () {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple&token=${this.sessionToken}`
        );

        if (response.ok) {
          const data = await response.json();
          // console.log(data);

          // Handle question
          const question = data.results[0].question;
          this.handleQuestion(question);

          // Handle answers
          const correctAnswer = data.results[0].correct_answer;
          const incorrectAnswers = data.results[0].incorrect_answers;
          this.handleAnswers(correctAnswer, incorrectAnswers);
        } else {
          alert(response.statusText);
        }
      } catch (error) {
        alert(error);
      }
    },
    handleQuestion: function (question) {
      this.questionText = this.parseHTML(question);
    },
    handleAnswers: function (correct_answer, incorrect_answers) {
      const answers = [
        { text: this.parseHTML(correct_answer), correct: true },
        { text: this.parseHTML(incorrect_answers[0]), correct: false },
        { text: this.parseHTML(incorrect_answers[1]), correct: false },
        { text: this.parseHTML(incorrect_answers[2]), correct: false },
      ];

      this.shuffleArray(answers);
      this.answers = answers;
    },
    shuffleArray: shuffleArray,
    getRandomInt: getRandomInt,
    parseHTML: parseHTML,
  },
};
</script>

<style scoped>
.game-view {
  display: grid;
  grid-template-rows: repeat(2, 200px) repeat(2, 100px);
  grid-template-columns: 1fr;
}

.get-question-btn {
  width: 200px;
  height: 50px;
  justify-self: center;
  align-self: center;
}

.score-display {
  justify-self: center;
  align-self: center;
}
</style>

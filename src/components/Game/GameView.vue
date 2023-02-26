<template>
  <div class="game-view">
    <QuestionDisplayComp
      v-bind:question-text="questionText"></QuestionDisplayComp>
    <AnswersDisplayComp
      v-bind:answers="answers"
      v-bind:answersEnabled="answersEnabled"
      v-bind:hasChosenAnswer="showAnswers"
      @has-chosen-answer="onHasChosenAnswer"></AnswersDisplayComp>
    <button
      v-if="questionCount < 10"
      :disabled="btnDisabled"
      class="get-question-btn"
      @click="onGetQuestion">
      Next question
    </button>
    <div class="game-info-display">
      <p v-if="questionCount" class="score-display">
        Your current score: {{ score }} out of {{ questionCount }} questions
      </p>
    </div>
  </div>
</template>

<script>
import AnswersDisplayComp from './Answer/AnswersDisplayComp.vue';
import QuestionDisplayComp from './Question/QuestionDisplayComp.vue';
import shuffleArray from './utils/shuffleArray';
import getRandomInt from './utils/getRandomInt';
import parseHTML from './utils/parseHTML';
import handleGameSharedActions from './postAnswerActions/handleGameSharedActions';
import handleGameModeActions from './postAnswerActions/handleGameModeActions';

export default {
  name: 'GameView',
  components: { QuestionDisplayComp, AnswersDisplayComp },
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sessionToken: '',
      questionText: '',
      answers: [],
      btnDisabled: true,
      answersEnabled: false,
      showAnswers: false,
      score: 0,
      questionCount: 0,
      lives: 3,
    };
  },
  created: function () {
    this.displayDefaultValues();
    this.getSessionToken();
    this.handleGameModeActions.bind(this);
    this.onGetQuestion();
  },
  methods: {
    displayDefaultValues: function () {
      this.questionText = 'Waiting for question...';
      this.answers = [
        { text: '...', correct: null },
        { text: '...', correct: null },
        { text: '...', correct: null },
        { text: '...', correct: null },
      ];
    },
    getSessionToken: async function () {
      try {
        const response = await fetch(
          'https://opentdb.com/api_token.php?command=request'
        );

        if (response.ok) {
          const data = await response.json();
          this.sessionToken = data.token;
        } else {
          alert(response.statusText);
        }
      } catch (error) {
        alert(error);
      }
    },
    onHasChosenAnswer: function (isCorrect) {
      this.handleGameSharedActions(isCorrect);
      this.handleGameModeActions(this.mode);

      // Cleanup actions
      this.btnDisabled = false;
    },
    onGetQuestion: function () {
      this.showAnswers = false;
      this.btnDisabled = true;
      this.displayDefaultValues();
      this.callAPI();
      this.answersEnabled = true;
    },
    callAPI: async function () {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=1&type=multiple&token=${this.sessionToken}`
        );

        if (response.ok) {
          const data = await response.json();
          // TODO: Handle bad API response

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
    handleGameSharedActions: handleGameSharedActions,
    handleGameModeActions: handleGameModeActions,
    showFinalScreen: function () {
      this.questionText = 'Waiting for results...';
      const gameData = {
        score: this.score,
        questionCount: this.questionCount,
      };
      // Wait 1.5 second
      setTimeout(() => {
        this.$emit('show-final-screen', gameData);
      }, 1500);
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

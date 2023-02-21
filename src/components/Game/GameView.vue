<template>
  <div class="game-view">
    <QuestionDisplayComp
      v-bind:question-text="questionText"></QuestionDisplayComp>
    <AnswersDisplayComp v-bind:answers="answers"></AnswersDisplayComp>
    <button class="get-question-btn" @click="callAPI">New question</button>
  </div>
</template>

<script>
import AnswersDisplayComp from './Answer/AnswersDisplayComp.vue';
import QuestionDisplayComp from './Question/QuestionDisplayComp.vue';

export default {
  name: 'GameView',
  components: { QuestionDisplayComp, AnswersDisplayComp },
  data() {
    return {
      sessionToken: '',
      questionText: 'Waiting for question...',
      answers: [
        { text: '...' },
        { text: '...' },
        { text: '...' },
        { text: '...' },
      ],
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
    callAPI: async function () {
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
    shuffleArray: function (arr) {
      for (let i = 0; i < arr.length; i++) {
        const randomIndex = this.getRandomInt(arr.length);
        const temp = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = temp;
      }
    },
    getRandomInt: function (max) {
      return Math.floor(Math.random() * max);
    },
    parseHTML: function (input) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, 'text/html');

      return doc.documentElement.textContent;
    },
  },
};
</script>

<style scoped>
.game-view {
  display: grid;
  grid-template-rows: repeat(2, 200px);
  grid-template-columns: 1fr;
}

.get-question-btn {
  width: 200px;
  height: 50px;
  justify-self: center;
}
</style>

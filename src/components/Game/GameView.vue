<template>
  <div class="game-view">
    <QuestionDisplayComp
      v-bind:question-text="questionText"></QuestionDisplayComp>
    <AnswersDisplayComp></AnswersDisplayComp>
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
      questionText: 'Hungry for apples?',
    };
  },
  methods: {
    callAPI: async function () {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple',
        {
          mode: 'cors',
        }
      );
      // console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        this.questionText = data.results[0].question;
      } else {
        alert(response.statusText);
      }
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

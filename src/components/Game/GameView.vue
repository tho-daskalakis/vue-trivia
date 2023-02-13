<template>
  <div class="game-view">
    <QuestionDisplayComp></QuestionDisplayComp>
    <AnswersDisplayComp></AnswersDisplayComp>
    <p>{{ questionText }}</p>
    <button @click="callAPI">New question</button>
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
      questionText: 'Ho!',
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
        this.questionText = data.response_code;
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
</style>

<template>
  <div class="game-view">
    <QuestionDisplayComp></QuestionDisplayComp>
    <AnswersDisplayComp></AnswersDisplayComp>
  </div>
</template>

<script>
import AnswersDisplayComp from './Answer/AnswersDisplayComp.vue';
import QuestionDisplayComp from './Question/QuestionDisplayComp.vue';

export default {
  name: 'GameView',
  components: { QuestionDisplayComp, AnswersDisplayComp },
};
</script>

<style scoped>
.game-view {
  display: grid;
  grid-template-rows: repeat(2, 200px);
  grid-template-columns: 1fr;
}
</style>

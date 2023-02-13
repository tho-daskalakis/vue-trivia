<template>
  <div class="answers-display">
    <AnswerComp></AnswerComp>
    <AnswerComp></AnswerComp>
    <AnswerComp></AnswerComp>
    <AnswerComp></AnswerComp>
  </div>
</template>

<script>
import AnswerComp from './AnswerComp.vue';

export default {
  name: 'AnswersDisplayComp',
  components: { AnswerComp },
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

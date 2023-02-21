<template>
  <div class="answers-display">
    <AnswerComp v-bind:answer="answers[0]"></AnswerComp>
    <AnswerComp v-bind:answer="answers[1]"></AnswerComp>
    <AnswerComp v-bind:answer="answers[2]"></AnswerComp>
    <AnswerComp v-bind:answer="answers[3]"></AnswerComp>
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
    onPlayerClick: function () {},
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

<template>
  <button
    :disabled="!answersEnabled"
    class="answer-btn"
    v-on:click="$emit('show-answers', answer.correct)">
    <p class="answer">{{ answer.text }}</p>
  </button>
</template>

<script>
export default {
  name: 'AnswerComp',
  props: {
    answer: {
      type: Object,
      required: true,
    },
    answersEnabled: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.answer {
  justify-self: stretch;
  align-self: center;
}

.answer-btn {
  margin: 10px;
  border-radius: 5px;
  border: none;
}

.answer-btn:disabled {
  color: white;
}

.answer-btn:hover {
  border: solid 2px darkgray;
}
.answer {
  margin: auto;
}
</style>

<template>
  <p class="question-display">{{ questionText }}</p>
</template>

<script>
export default {
  name: 'QuestionDisplayComp',
  props: ['questionText'],
};
</script>

<style scoped>
.question-display {
  justify-self: center;
  align-self: center;
}
</style>

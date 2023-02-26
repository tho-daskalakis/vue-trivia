<template>
  <div class="final-score-view">
    <p>
      You answered {{ score }} questions correct out of {{ questionCount }}.
      Your final score is {{ finalScore }} %.
    </p>
    <button class="new-game-btn" @click="onClick">New game</button>
  </div>
</template>

<script>
export default {
  name: 'FinalScreenComp',
  props: {
    score: {
      type: Number,
      required: true,
    },
    questionCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    finalScore: function () {
      return Math.round((this.score * 100) / this.questionCount);
    },
  },
  methods: {
    onClick: function () {
      this.$emit('new-game');
    },
  },
};
</script>

<style>
.new-game-btn {
  width: 200px;
  height: 50px;
  justify-self: center;
  align-self: center;
}
</style>

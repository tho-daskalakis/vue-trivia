<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <GameView
      v-if="currentScreen === 'game'"
      :mode="mode"
      @show-final-screen="onShowFinalScreen"></GameView>
    <FinalScreenComp
      v-else-if="currentScreen === 'final'"
      :questionCount="questionCount"
      :score="finalScore"
      @new-game="onNewGame"></FinalScreenComp>
    <MenuComp
      v-else
      @standard-game="onStandardGame"
      @time-rush="onTimeRush"></MenuComp>
  </div>
</template>

<script>
import GameView from './components/Game/GameView.vue';
import FinalScreenComp from './components/FinalScreenComp.vue';
import MenuComp from './components/MenuComp.vue';

export default {
  name: 'App',
  components: { MenuComp, GameView, FinalScreenComp },
  data: function () {
    return {
      finalScore: 0,
      questionCount: -1,
      currentScreen: 'menu',
      mode: null,
    };
  },
  computed: {
    title: function () {
      if (this.currentScreen === 'game') {
        switch (this.mode) {
          case 'standard':
            return 'Answer 10 questions!';

          case 'rush':
            return 'Answer as many questions as you can before time runs out!';
          default:
            return 'Game mode';
        }
      }
      if (this.currentScreen === 'final') return 'Summary';
      return 'Trivia app made with Vue.js';
    },
  },
  methods: {
    onShowFinalScreen: function (gameData) {
      this.finalScore = gameData.score;
      this.questionCount = gameData.questionCount;
      this.currentScreen = 'final';
    },
    onNewGame: function () {
      this.mode = 'null';
      this.currentScreen = 'menu';
    },
    onStandardGame: function () {
      this.mode = 'standard';
      this.currentScreen = 'game';
    },
    onTimeRush: function () {
      this.mode = 'rush';
      this.currentScreen = 'game';
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>

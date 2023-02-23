<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <GameView
      v-if="currentScreen === 'game'"
      @show-final-screen="onShowFinalScreen"></GameView>
    <FinalScreenComp
      v-else-if="currentScreen === 'final'"
      :score="finalScore"
      @new-game="onNewGame"></FinalScreenComp>
    <MenuComp v-else @standard-game="onStandardGame"></MenuComp>
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
      currentScreen: 'menu',
    };
  },
  computed: {
    title: function () {
      if (this.currentScreen === 'game') return 'Answer 10 questions!';
      if (this.currentScreen === 'final') return 'Summary';
      return 'Trivia app made with Vue.js';
    },
  },
  methods: {
    onShowFinalScreen: function (score) {
      this.finalScore = score;
      this.currentScreen = 'final';
    },
    onNewGame: function () {
      this.currentScreen = 'menu';
    },
    onStandardGame: function () {
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
  margin-top: 60px;
}
</style>

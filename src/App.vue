<template>
  <div id="app">
    <h1>Trivia app made with Vue.js</h1>
    <GameView
      v-if="!showFinalScreen"
      @show-final-screen="onShowFinalScreen"></GameView>
    <FinalScreenComp
      v-if="showFinalScreen"
      :score="finalScore"
      @new-game="onNewGame"></FinalScreenComp>
  </div>
</template>

<script>
import GameView from './components/Game/GameView.vue';
import FinalScreenComp from './components/FinalScreenComp.vue';

export default {
  name: 'App',
  components: { GameView, FinalScreenComp },
  data: function () {
    return {
      showFinalScreen: false,
      finalScore: 0,
    };
  },
  methods: {
    onShowFinalScreen: function (score) {
      this.finalScore = score;
      this.showFinalScreen = true;
    },
    onNewGame: function () {
      this.showFinalScreen = false;
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

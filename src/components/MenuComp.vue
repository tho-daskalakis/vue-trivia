<template>
  <div class="menu-screen">
    <button class="menu-btn" @click="onStandardGame">Standard game</button>
    <button class="menu-btn" @click="onTimeRush">Time rush</button>
  </div>
</template>

<script>
export default {
  name: 'MenuComp',
  methods: {
    onStandardGame: function () {
      this.$emit('standard-game');
    },
    onTimeRush: function () {
      this.$emit('time-rush');
    },
  },
};
</script>

<style>
.menu-screen {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.menu-btn {
  width: 200px;
  height: 50px;
  justify-self: center;
  align-self: center;
}
</style>

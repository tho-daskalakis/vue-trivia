<template>
  <div class="menu-screen">
    <button class="menu-btn" @click="onStandardGame">Standard game</button>
  </div>
</template>

<script>
export default {
  name: 'MenuComp',
  methods: {
    onStandardGame: function () {
      this.$emit('standard-game');
    },
  },
};
</script>

<style>
.menu-btn {
  width: 200px;
  height: 50px;
  justify-self: center;
  align-self: center;
}
</style>

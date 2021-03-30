<template>
  <div id="app">
    <h1>Snake game</h1>

    <div class="container">
      <div class="input-div">
        Cell size (px): <input v-model="cellSize" type="number" />
      </div>
      <div class="input-div">
        Board size (cells): <input v-model="boardSize" type="number" />
      </div>
      <div class="input-div">
        Speed: <input v-model="speed" type="number" />
      </div>
    </div>

    <snake-canvas :cellSize="cellSize" :boardSize="boardSize" :speed="speed" :isPlaying="isPlaying" />
    <div class="margin-top">Score: {{ score }}</div>
    <div class="margin-top"><button @click="startGame">Play</button></div>

    <div></div>
  </div>
</template>

<script>
import SnakeCanvas from "./components/SnakeCanvas";

export default {
  name: "App",
  data: function () {
    return {
      score: 0,
      cellSize: 10,
      boardSize: 20,
      speed: 10,
      isPlaying: false,
    };
  },
  methods: {
startGame() {
this.isPlaying = !this.isPlaying
}
  },
  components: { SnakeCanvas },
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
input {
  width: 13%;
}
.container {
  width: 50em;
  margin: auto;
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  justify-items: center;
  grid-template-rows: 2em;
}
.margin-top {
  margin: 2em 0 0 0;
}
.input-div {
  background-color: rgb(177, 176, 176);
  line-height: 2em;
  text-align: center;
  width: 80%;
}
</style>

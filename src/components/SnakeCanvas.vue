<template>
  <canvas
    ref="board"
    :width="boardSizePx" :height="boardSizePx"
    class="canvas"
    @click="move"
  >
    Tutaj test: {{ directions[0].direction  }}
  </canvas>
</template>

<script>

import directions from "./constants";

export default {
  props: [
    "cellSize",
    "boardSize",
    "speed",
    "isPlaying",
  ],
  computed: {
    boardSizePx() {
      return (
      this.boardSize * this.cellSize
      );
    },
  },
  data: function() {
    return {
      boardContext: null,
    };
  },
  mounted() {
    this.boardContext = this.$refs.board.getContext(
      "2d"
    );
  },
  created() {
    this.resetSnake();
  },
  watch: {
    cellSize: function() {
      console.log(
        "Cell size changed !!!!"
      );
    },
  },
  methods: {
    drawCell({x, y}) {
      this.boardContext.rect(
      x * this.cellSize,
      y * this.cellSize,
      this.cellSize,
      this.cellSize
      );
      this.boardContext.fillStyle =
        "black";
      this.boardContext.fill();
    },
    move() {
      console.log("move");
      this.drawCell(this.snake[0]);
      console.log(directions[0])
    },
    getMiddleCell() {
      return Math.round(
        this.boardSize / 2
      );
    },
    resetSnake() {
      this.snake = [
        {
          x: this.getMiddleCell(),
          y: this.getMiddleCell(),
        },
      ];
      // const randomDirectionIndex = Math.floor(Math.random() * 4);
      // this.direction = constants[randomDirectionIndex];
      // this.targetCell = null;
    },
  },
};
</script>

<style scoped>
.canvas {
  border: red 1px solid;
  margin: auto;
  margin-top: 2em;
}
</style>

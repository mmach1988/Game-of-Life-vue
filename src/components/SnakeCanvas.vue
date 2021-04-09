<template>
  <canvas
    ref="board"
    :width="boardSizePx"
    :height="boardSizePx"
    class="canvas"
    @click="move"
  >
  </canvas>
</template>

<script>
import constants from "./Constants";

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
    drawCell({ x, y }) {
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
      this.clear(),
        console.log(
          "move, snake: " +
            this.snake.length
        );
      const newHeadCell = {
        x: this.snake[0].x + // odpowiedni x z tablicy constans (right)
        y: this.snake[0].y, // odpowiedni y z tablicy constans (right)
      };
      this.snake.unshift(newHeadCell);
      this.snake.pop();
      this.boardContext.beginPath();
      this.snake.forEach(this.drawCell);
      this.boardContext.closePath();

      setTimeout(this.move, 1000);
    },
    clear() {
      this.boardContext.clearRect(
        0,
        0,
        this.boardSizePx,
        this.boardSizePx
      );
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
      const randomDirectionIndex = Math.floor(
        Math.random() * 4
      );
      this.direction =
        constants[randomDirectionIndex];
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

<template>
  <canvas
    ref="board"
    :style="{
      width: boardWidthAndHeight + 'px',
      height: boardWidthAndHeight + 'px',
    }"
    class="canvas"
    @click="drawCell"
  >
    Tutaj test: {{ isPlaying }}
  </canvas>
</template>

<script>
export default {
  props: ["cellSize", "boardSize", "speed", "isPlaying"],
  computed: {
    boardWidthAndHeight() {
      return this.boardSize * this.cellSize;
    },
  },
  data: function () {
    return {
      boardContext: null,
    };
  },
  mounted() {
    this.boardContext = this.$refs.board.getContext("2d");
  },
  watch: {
    cellSize: function () {
      console.log("Cell size changed !!!!");
    },
  },
  methods: {
    drawCell() {
      this.boardContext.rect(
        10 * this.cellSize,
        10 * this.cellSize,
        this.cellSize,
        this.cellSize
      );
      this.boardContext.fillStyle = "black";
      this.boardContext.fill();
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
    getMiddleCell() {
      return Math.round(this.boardSize / 2);
    },
  },
  move() {},
};
</script>

<style scoped>
.canvas {
  height: 200px;
  border: red 1px solid;
  margin: auto;
  margin-top: 2em;
}
</style>




<template>
  <div
    :style="{
      width: boardWidthAndHeight + 'px',
      height: boardWidthAndHeight + 'px',
    }"
    class="canvas"
  >
    Canvas test <br />
    Test of cell size: {{ cellSize }} <br />
    Test of board size: {{ boardSize }} <br />
    Test of speed: {{ speed }} <br />
    Test of board width {{ boardWidth }}
  </div>
</template>

<script>
export default {
  props: ["cellSize", "boardSize", "speed"],

  computed: {
    boardWidthAndHeight() {
      return this.boardSize * this.cellSize;
    },
  },
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

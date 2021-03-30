<template>
  <div
    ref="board"
    :style="{
      width: boardWidthAndHeight + 'px',
      height: boardWidthAndHeight + 'px',
    }"
    class="canvas"
  >
  Tutaj test: {{isPlaying}} 
  </div>
</template>

<script>
export default {
  props: ["cellSize", "boardSize", "speed", "isPlaying",],
  computed: {
    boardWidthAndHeight() {
      return this.boardSize * this.cellSize;
    },
  },
    data: function () {
    return {
 boardContext: null
    };
  },

  methods: {
       draw () {
   console.log('drawing')
  }
  
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




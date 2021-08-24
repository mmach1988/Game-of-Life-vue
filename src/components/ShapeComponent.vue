<template>
    <div>
      <h2> {{ name }} </h2>
      <canvas
      ref="board"
      :width="boardSizePx"
      :height="boardSizePx"
      class="canvas"
    >
    </canvas>
    </div>
  </template>
  
  <script>
  
  import constants from "./Constants"
  import saveShape from "./SaveShape"
  import loadShapes from "./LoadShapes"
  
  export default {
    props: [
      "cellSize",
      "boardSize",
      "speed",
      "loadedPopulation",
      "name"
    ],
    computed: {
      boardSizePx() {
        return (
          this.boardSize * this.cellSize
        );
      },
      timeOut() {
        return (
         1000 / this.speed 
        );
      },
    },
    data: function() {
      return {
        boardContext: null,
        population: []
      };
    },
    mounted() {
      this.boardContext = this.$refs.board.getContext(
        "2d"
      );
      this.loadedPopulation.forEach(this.drawRect)
    },
    beforeDestroy() {
     window.removeEventListener("keydown", this.onKeyPress);
    },
    methods: {
    //   drawCell(event) {
    //     console.log(event)
    //     this.boardContext.beginPath();
    //     let x = Math.floor(event.clientX - this.$refs.board.getBoundingClientRect().left)
    //     x = x - x % this.cellSize
    //     let y = Math.floor(event.clientY - this.$refs.board.getBoundingClientRect().top)
    //     y = y - y % this.cellSize
    //     if(this.population.find(cell => cell.x == x && cell.y == y)) {
    //       console.log('Juz narysowany')
    //       this.population = this.population.filter(cell => cell.x != x && cell.y !=y )
    //       this.clear({x: x , y: y })
    //       this.boardContext.closePath(); 
    //     }
    //     else {
    //     this.drawRect( {x: x , y: y }, 'black')
    //     this.population.push({x: x - x % this.cellSize, y: y - y % this.cellSize})
    //     this.boardContext.closePath(); 
    //     }
    //   },
      drawRect({ x, y }, color) {
        this.boardContext.rect(
          x - x % this.cellSize,
          y - y % this.cellSize,
          this.cellSize,
          this.cellSize
        );
        this.boardContext.fillStyle = 'black';
        this.boardContext.fill();   
      },
      },
  };
  </script>
  
  <style scoped>
  .canvas {
    border: red 1px solid;
    margin: auto;
  
  }
  
  
  </style>
  
  
<template>
    <div>
      <h2> {{ name }}</h2>
      <div>
        <canvas 
        @click="loadSave" 
        ref="board"
        :width="boardSizePx"
        :height="boardSizePx"
        class="canvas"
      >
      </canvas>
    </div>
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
      smallerCell() {
        return this.cellSize / 2 
      },
      boardSizePx() {
        return (
          this.boardSize * this.smallerCell
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
        boardContext: null
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
      loadSave() {
        this.$emit('update', this.loadedPopulation)
        console.log("Loading save: " + this.name)
        console.log("Population: " + this.loadedPopulation)
      },
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
        x = x / 2
        y = y / 2
        this.boardContext.rect(
          x - x % this.smallerCell,
          y - y % this.smallerCell,
          this.smallerCell,
          this.smallerCell
        );
        this.boardContext.fillStyle = 'black';
        this.boardContext.fill();   
      },
      },
  };
  </script>
  
  <style scoped>
  .canvas {
    border: black 1px solid;
    margin: auto;
   
  }
  .canvas:hover {
    border: green 2px solid;
}
  
  
  </style>
  
  
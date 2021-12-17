<template>
  <div>
    <canvas
    ref="board"
    :width="boardSizePx"
    :height="boardSizePx"
    class="canvas"
    @click = "drawCell($event)"
    >
    </canvas>
  </div>
</template>

<script>

import constants from "./Constants"
import loadShapes from "./LoadShapes"

export default {
  props: [
    "cellSize",
    "boardSize",
    "speed",
    "isPlaying",
    "stopGame",
    "addScore",
    "isGameOver",
    "gameOver",
    "startGame",
    "gameMode",
    "loadedPopulation"
  ],
  computed: {
    vuexPopulation() {
     return this.$store.state.vuexPopulation
    },
    potentialPopulation() {
      let setOfXs = []
      let setOfYs = []
      for(let i = 0; i< this.boardSize * this.cellSize; i+=this.cellSize) {
        setOfXs.push(i)
        setOfYs.push(i)
      }
      let potentialPopulation = []
      for(let x = 0; x<setOfXs.length; x++) {
        for(let y = 0; y<setOfYs.length; y++) {
         potentialPopulation.push({x: setOfXs[x], y: setOfYs[y]})
        }
      }
      return potentialPopulation
    },
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
    };
  },

  mounted() {
    this.boardContext = this.$refs.board.getContext(
      "2d"
    );
    this.simulation()
  },
  beforeDestroy() {
   window.removeEventListener("keydown", this.onKeyPress);
  },
  methods: {
    drawCell(event) {
      this.boardContext.beginPath();
      let x = Math.floor(event.clientX - this.$refs.board.getBoundingClientRect().left)
      x = x - x % this.cellSize
      let y = Math.floor(event.clientY - this.$refs.board.getBoundingClientRect().top)
      y = y - y % this.cellSize
      if(this.vuexPopulation.find(cell => cell.x == x && cell.y == y)) {
        this.$store.commit('filterPopulation', {x:x,y:y})
        this.clear({x: x , y: y })
        this.boardContext.closePath(); 
      }
      else {
      this.drawRect( {x: x , y: y }, 'black')
      this.$store.commit('addToPopulation', {x: x - x % this.cellSize, y: y - y % this.cellSize})
      this.boardContext.closePath(); 
      }
    },
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
    clear({x,y}) {
      this.boardContext.clearRect(
        x,
        y,
        this.cellSize,
        this.cellSize
      );
    },
    simulation() {
      if (this.gameMode === 'Simulation') {
        let newPopulation = []
        this.vuexPopulation.forEach(this.clear)
      for(let i = 0; i < this.potentialPopulation.length; i++) {
        let neighbours = this.countNeighbours({x: this.potentialPopulation[i].x, y: this.potentialPopulation[i].y})
        if(this.vuexPopulation.find(cell => cell.x == this.potentialPopulation[i].x && cell.y == this.potentialPopulation[i].y)) {
          // KOMÓRKA ŻYWA
          if(neighbours == 2 || neighbours == 3){
            newPopulation.push(this.potentialPopulation[i])
          }
        }
        else {
          // KOMÓRKA MARTWA
          if(neighbours == 3){
            newPopulation.push(this.potentialPopulation[i])
          }
        }
      }
        // CZYSZCZENIE    
        this.$store.commit('resetPopulation')
        this.$store.commit('assignNewPopulation', newPopulation)
        // RYSOWANIE POPULACJI      
        this.boardContext.beginPath();
        this.vuexPopulation.forEach(this.drawRect)
        this.boardContext.closePath(); 
    }
     setTimeout(this.simulation, 1000) 
    },
  countNeighbours({x, y}) {
    let neighbours = 0
    let neighbour = {x: x-this.cellSize, y: y-this.cellSize}
    let population = this.vuexPopulation
    for(let cell of population)  {
      if(x != cell.x || y != cell.y)  {
        if((x - this.cellSize === cell.x && y-this.cellSize === cell.y) 
          || (x === cell.x && y-this.cellSize === cell.y)
          || (x + this.cellSize === cell.x && y - this.cellSize === cell.y)
          || (x + this.cellSize === cell.x && y === cell.y)
          || (x + this.cellSize === cell.x && y + this.cellSize === cell.y)
          || (x === cell.x && y + this.cellSize === cell.y)
          || (x - this.cellSize === cell.x && y + this.cellSize === cell.y)
          || (x - this.cellSize === cell.x && y === cell.y)  ) {
            neighbours++
        } 
      }
    }
      return neighbours
   }
    },
};
</script>

<style scoped>
  .canvas {
    border: red 1px solid;
    margin: auto;
  }
</style>


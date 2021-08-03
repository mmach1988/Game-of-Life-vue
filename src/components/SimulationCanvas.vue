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
  <save-shape  
  :population = "population"
  /> 
  Population test: {{ population }}
  </div>

</template>

<script>

import constants from "./Constants"
import saveShape from "./SaveShape"


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
    "gameMode"
  ],
  components: { saveShape },
  computed: {
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
        // + speed powinno zmniejszac timeOut
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
    this.simulation()
  },
  created() {
    // this.resetPopulation();
  },
  beforeDestroy() {
   window.removeEventListener("keydown", this.onKeyPress);
  },
  watch: {
    // cellSize: function() {
    //   this.resetPopulation()
    // },
    // boardSize: function() {
    //   this.resetPopulation()
    // },
  },

  methods: {
    drawCell(event) {
      console.log(event)
      this.boardContext.beginPath();
      let x = Math.floor(event.clientX - this.$refs.board.getBoundingClientRect().left)
      x = x - x % this.cellSize
      let y = Math.floor(event.clientY - this.$refs.board.getBoundingClientRect().top)
      y = y - y % this.cellSize
      if(this.population.find(cell => cell.x == x && cell.y == y)) {
        console.log('Juz narysowany')
        this.population = this.population.filter(cell => cell.x != x && cell.y !=y )
        this.clear({x: x , y: y })
        this.boardContext.closePath(); 
      }
      else {
      this.drawRect( {x: x , y: y }, 'black')
      this.population.push({x: x - x % this.cellSize, y: y - y % this.cellSize})
      this.boardContext.closePath(); 
      }
    },
  //   onKeyPress(event) {
  // const newDirection = constants.find(direction => direction.keyCode === event.keyCode)
  //  if(Math.abs(this.direction.move.x - newDirection.move.x) < 2 && Math.abs(this.direction.move.y - newDirection.move.y) < 2) {
  //    this.direction = newDirection
  //  }
  //   },
    drawRect({ x, y }, color) {
      // console.log('Rysujemy: ' + ' x: ' + (x - x % this.cellSize) + ' y:' + (y - y % this.cellSize))
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
      // console.log('Czyścimy: ' + ' x: ' + x + ' y:' + y)
      this.boardContext.clearRect(
        x,
        y,
        this.cellSize,
        this.cellSize
      );
      // this.boardContext.fillStyle = 'white';
      // this.boardContext.fill();
    },
    simulation() {
      // let potentialPopulation = this.potentialPopulation
      // let population = this.population
      if (this.gameMode === 'Simulation') {
        let newPopulation = []
        // console.log('Simulation')
        this.population.forEach(this.clear)
        let counter = 0
        let przeCounter = 0 
        let oCounter = 0
      for(let i = 0; i < this.potentialPopulation.length; i++) {
        
        let neighbours = this.countNeighbours({x: this.potentialPopulation[i].x, y: this.potentialPopulation[i].y})
        
        if(this.population.find(cell => cell.x == this.potentialPopulation[i].x && cell.y == this.potentialPopulation[i].y)) {
          counter ++
          // KOMÓRKA ZYWA
          if(neighbours == 2 || neighbours == 3){
            przeCounter++
            newPopulation.push(this.potentialPopulation[i])
            console.log('Start')
            console.log(newPopulation)
            console.log('End')
          }

        }
        else {
          counter ++
          // KOMÓRKA MARTWA
          if(neighbours == 3){
            oCounter++
            newPopulation.push(this.potentialPopulation[i])
          }
        }
      }
      console.log("Potencjalne: " + counter)
      console.log("Przeżyło: " + przeCounter)
      console.log("Ozyło: " + oCounter)
      // console.log('Nowa populacja:')
      // console.log(newPopulation)
              // CZYSZCZENIE
        this.population = null        
        this.population = newPopulation

        // RYSOWANIE POPULACJI      
        this.boardContext.beginPath();
        this.population.forEach(this.drawRect)
        this.boardContext.closePath(); 
       
        // for(let n = 0; n < this.population.length; n++) {  
        //   this.drawRect({x: this.population[n].x, y: this.population[n].y})
        // }
    }

     setTimeout(this.simulation, 300) 
    },
    countNeighbours( {x, y }) {
    let neighbours = 0
    let neighbour = {x: x-this.cellSize, y: y-this.cellSize}
    let population = this.population
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
// sprawdzany {x, y}
// populacja [{x,y}, {x1,y1}, ...]
// potencjalni sąsiedzi [{x,y}, {x1,y1}, ..., {x,y}]
// Czy w pupulation jest
// 1.lewy górny- {x: x-cellSize, y: y-cellSize }
// 2. góra- {x: x, y: y-cellSize}
// 3. prawy górny- {x: x+cellSize, y: y-cellSize }
// 4. prawy-  {x: x + cellSize , y: y }
// 5.prawy dolny- {x: x+ cellSize, y: y+ cellSize}
// 6. dolny- {x: x, y: y+ cellSize}
// 7. dolny lewy- {x: x-cellSize y: y+ cellSize }
// 8. lewy- {x: x- cellSize, y: y}
return neighbours
   }
    
    },
    // isNewHeadInPopulation(newHeadCell) {
    //    if(this.population.filter(cell => cell.x === newHeadCell.x && cell.y === newHeadCell.y).length>0) {
    //     this.stopGame()
    //     this.gameOver()
    //    }
    // },
    getMiddleCell() {
      return Math.round(
        this.boardSize / 2
      );
    },
    resetPopulation() {
      this.population = [
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
    // {x:10, y:20}
    isCellOutOfBoard({x, y}) {
    let isOut = false;
    if( x<0 || x >= this.boardSize || y<0 || y >= this.boardSize) {
      isOut = true;
    }
    return isOut;
    },
  amountCellsInPopulation(cell) {
      return this.population.filter((populationCell) => populationCell.x === cell.x && populationCell.y === cell.y)
        .length;
    },

  getRandomCell() {
    return {
      x: Math.floor(Math.random() * this.boardSize),
      y: Math.floor(Math.random() * this.boardSize)
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


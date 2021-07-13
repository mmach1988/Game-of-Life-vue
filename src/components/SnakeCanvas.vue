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
  <!-- Game mode test: {{gameMode}} -->
<!-- potencialPopulation: {{ potentialPopulation }} -->
  </div>

</template>

<script>

import constants from "./Constants";

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
    this.countNeighbours({ x: 100, y: 100 } )
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
          this.drawRect( {x: Math.floor(event.clientX - this.$refs.board.getBoundingClientRect().left), y: Math.floor(event.clientY - this.$refs.board.getBoundingClientRect().top)}, 'black')
    },
  //   onKeyPress(event) {
  // const newDirection = constants.find(direction => direction.keyCode === event.keyCode)
  //  if(Math.abs(this.direction.move.x - newDirection.move.x) < 2 && Math.abs(this.direction.move.y - newDirection.move.y) < 2) {
  //    this.direction = newDirection
  //  }
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
      this.population.push({x: x - x % this.cellSize, y: y - y % this.cellSize})
      // for(let item of this.population) {
      //   console.log('This population x: ' + item.x + ' y: ' + item.y) 
      // }           
    },
    simulation() {
      let potentialPopulation = this.potentialPopulation
      let population = this.population
      if (this.gameMode === 'Simulation') {
      // Trzy rodzaje populacji:
      // staraWersjaPOPULACJA (zbiór zywych)
      // potencjalna - to sprawdzamy
      // nowa
      for(let i = 0; i < potentialPopulation.length; i++) {
        // czy komórka jest zywa - czy element z iteracji jest w tablicy populacja
        if(population.find(cell => potentialPopulation[i].x == cell.x &&  potentialPopulation[i].y == cell.y)) {
          console.log('x: ' + potentialPopulation[i].x + ' y: ' + potentialPopulation[i].y + ' zyje!!!!')
        // SPRAWDZAMY LICZBĘ SĄSIADÓW - CONSOLE.LOG
        


        }

        // console.log(potentialPopulation[i].x + ' ' + potentialPopulation[i].y)
        // console.log(population)

      }

    }

      



      // 1. tworzymy potencjalna populacja (canvas) = wszystkie dostępne komórki  (moe computed)

      // sprawdzamy, czy jest w populacji 
      // sprawdzamy liczbę sąsiadów dla każdej komórki z canvas
      // 4 moliwości:
      // zywa - zywa -> 2 albo 3 sąsiadów
      // zywa - martwa -> mniej niż 2 albo więcej niż 3
      // martwa - martwa -> jeżeli nie ma 3 sąsiadów
      // martwa - zywa -> jeżeli ma równo 3 sąsiadów 
      // odświeżamy populacje (zabijamy/ ozywiamy)
      // rysowanie populacji





      
     setTimeout(this.simulation, 2000) 
    },
    countNeighbours( {x, y }) {
    let neighbours = 0
    let neighbour = {x: x-this.cellSize, y: y-this.cellSize}
    let population = this.population
    for(let cell of population)  {
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
    clear({x,y}) {
      this.boardContext.clearRect(
        x * this.cellSize,
        y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    },
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
  margin-top: 2em;
}


</style>

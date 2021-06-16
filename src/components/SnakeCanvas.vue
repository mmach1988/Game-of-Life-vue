<template>
  <div>
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
    "startGame"
  ],
  computed: {
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
      newFood: null,
    };
  },
  mounted() {
    this.boardContext = this.$refs.board.getContext(
      "2d"
    );
   window.addEventListener("keydown", this.onKeyPress);
    this.move();
  },
  created() {
    this.resetSnake();
  },
  beforeDestroy() {
   window.removeEventListener("keydown", this.onKeyPress);
  },
  watch: {
    cellSize: function() {
      this.resetSnake()
    },
    boardSize: function() {
      this.resetSnake()
    },
    isGameOver: function() {
      if(!this.isGameOver) {
      this.snake.forEach(this.clear)
      this.clear(this.newFood)
      this.newFood = false;
      this.resetSnake()
      this.move()
      }
    }
  },
  methods: {
    onKeyPress(event) {
  const newDirection = constants.find(direction => direction.keyCode === event.keyCode)
   if(Math.abs(this.direction.move.x - newDirection.move.x) < 2 && Math.abs(this.direction.move.y - newDirection.move.y) < 2) {
     this.direction = newDirection
   }
    },
    drawCell({ x, y }, color) {
      this.boardContext.rect(
        x * this.cellSize,
        y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
      this.boardContext.fillStyle =
        color;
      this.boardContext.fill();
    },
    move() {
    if(this.isPlaying) {
      let newHeadCell = {
      x: this.snake[0].x + this.direction.move.x,
      y: this.snake[0].y + this.direction.move.y, 
      }
    if(this.isCellOutOfBoard(newHeadCell)){
        this.stopGame()
        this.gameOver()
        return;
      }
      this.isNewHeadInSnake(newHeadCell)
      // this.snake.filter(cell  => )
       this.createFood()
      if(this.isFoodNewHead(newHeadCell)) {
        this.snake.unshift(this.newFood)
        this.addScore(10)
        this.move()
        this.newFood = false
        this.createFood()
        return
      } else {
        this.snake.unshift(newHeadCell);
        this.snake.forEach(this.clear);
        this.snake.pop();
        this.boardContext.beginPath();
        this.snake.forEach(cell => this.drawCell(cell, 'black'));
        this.boardContext.closePath(); 
      } 
    }
      setTimeout(this.move, this.timeOut);
    },
    isFoodNewHead(newHeadCell) {
      return newHeadCell.x === this.newFood.x && newHeadCell.y === this.newFood.y
    },
    isNewHeadInSnake(newHeadCell) {
       if(this.snake.filter(cell => cell.x === newHeadCell.x && cell.y === newHeadCell.y).length>0) {
        this.stopGame()
        this.gameOver()
    
       }
    },
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
    // {x:10, y:20}
    isCellOutOfBoard({x, y}) {
    let isOut = false;
    if( x<0 || x >= this.boardSize || y<0 || y >= this.boardSize) {
      isOut = true;
    }
    return isOut;
    },
  amountCellsInSnake(cell) {
      return this.snake.filter((snakeCell) => snakeCell.x === cell.x && snakeCell.y === cell.y)
        .length;
    },

  getRandomCell() {
    return {
      x: Math.floor(Math.random() * this.boardSize),
      y: Math.floor(Math.random() * this.boardSize)
    }
  },
  createFood() {
  // NA POTEM - SPRAWDZIMY, CZY TO NIE JEST W WĘŹU
  if(!this.newFood) {
  let tempFood = this.getRandomCell()
  if(this.snake.filter((cell) => cell.x === tempFood.x && cell.y === tempFood.y).length > 0) {
    // UWAGA MOZE ZAWIESIĆ GRĘ PO KONIEC
    this.createFood()
  }
  else {
    this.newFood = tempFood
    this.boardContext.beginPath();
    this.drawCell(this.newFood, 'red');
    this.boardContext.closePath(); 
  }
 
  }
  
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

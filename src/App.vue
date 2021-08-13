<template>
  <div id="app" style="position: relative;">
    <save-shape v-if="ifSaveShape && gameMode === 'Draw'" :population='population' />
    <load-shapes
      @closeLoadModal="closeLoadModal"
      v-if="ifLoadShapes && gameMode === 'Draw'" />
    <h1 ><span>Game of life</span></h1>
  <div class="container">
    <div> </div>
    <div>
    <simulation-canvas
    @update="updatePopulation"
    :cellSize= "cellSize"
    :boardSize= "boardSize" 
    :speed = "speed" 
    :isPlaying = "isPlaying" 
    :stopGame = "stopGame" 
    :addScore = "addScore" 
    :isGameOver = "isGameOver" 
    :gameOver = "gameOver"
    :startGame = "startGame" 
    :gameMode = "gameMode"
    /> 
    </div>
    <div>
      <div class="input-div">
        Cell size (px): <input v-model="cellSize" type="number" />
      </div>
      <div class="input-div">
        Board size (cells): <input v-model="boardSize" type="number" />
      </div>
      <div class="input-div">
        Speed: <input v-model="speed" type="number" />
      </div>
      <div class="input-div">
      Tryb gry: {{gameMode}}
      <br />
      </div>
      <div class="margin-top">
        <button @click="isGameOver ? startNewGame() : !isPlaying ? startGame() : stopGame()">
        {{isGameOver ? 'Start new game' : !isPlaying ? 'Play' : 'Pause'}}
        </button>
      <div class="right-save">
        <button @click="showSaveModal" v-if="gameMode === 'Draw'"> Save shape </button><br />
        <button @click="showLoadModal" v-if="gameMode === 'Draw'"> Load shapes </button>
    </div> 
    </div>
    </div>
    </div>

  </div>
</template>

<script>
import SaveShape from './components/SaveShape.vue';
import SimulationCanvas from "./components/SimulationCanvas";
import LoadShapes from './components/LoadShapes.vue';

export default {
  name: "App",
  data: function () {
    return {
      cellSize: 15,
      boardSize: 42,
      speed: 1,
      isPlaying: false,
      isGameOver: false,
      ifSaveShape: false,
      ifLoadShapes: false,
      population: [],
      
    };
  },
  computed: {
    gameMode() {
      if(!this.isPlaying && !this.isGameOver) {
        return 'Draw'
      }
      else if(this.isPlaying && !this.isGameOver) {
        return 'Simulation'
      }
        return 'Game Over'  
    },

  },
  watch: {
    speed: function() {
      if (this.speed <1) {
        this.speed++
      }
      if (this.speed == 3) {
        this.speed = this.speed*2
      }
      if (this.speed >5) {
        console.log(this.speed)
      }
      if (this.speed == 7) {
        console.log('siedem')
      }
      if (this.speed == 11) {
        console.log('cztery')
      }
    },
  },
  methods: {
    closeLoadModal() {
      this.ifLoadShapes = !this.ifLoadShapes
    },
    showSaveModal() {
      this.ifSaveShape = !this.ifSaveShape
    },
    showLoadModal() {
      this.ifLoadShapes = !this.ifLoadShapes
      },
    updatePopulation(value) {
      this.population = value
    },
    startGame() {
      this.isPlaying = true
    },
    stopGame() {
      this.isPlaying = false
    },
    addScore(points) {
      this.score = this.score + points
    },
    gameOver() {
      this.isGameOver = !this.isGameOver;
    },
    startNewGame() {
      this.isPlaying = false
      this.isGameOver = false
      this.startGame()
   

    
      // score = 0
  

}
  },
  components: { SimulationCanvas, SaveShape, LoadShapes },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  width: 18%;
}

.game-over {
  width: 100%;
  height: 50vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  color:red;
  font-size: 8em;
}
.container {
  margin: auto;
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33% ;
  justify-items: center;
  grid-template-rows: 2em;
}
.margin-top {
  margin: 2em 0 0 0;
}
.input-div {
  background-color: rgb(177, 176, 176);
  line-height: 2em;
  text-align: center;
  width: 90%;
}
.right-save {
  margin-top: 1em;
}
</style>

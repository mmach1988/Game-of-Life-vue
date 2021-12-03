<template>
  <div id="app" style="position: relative;">
    <div class="container">
      <div>
    <h1 ><span>Game of life</span></h1>
    <!-- <div style="width: 100%">Test wyświetl populacje: {{ loadedPopulation }}</div> -->
    <div> </div>
    <div>
    <simulation-canvas
    @update="updatePopulation"
    :loadedPopulation = "loadedPopulation"
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
  </div>
    <div class="stats">
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
      <b-button class="mb-5" @click="isPlaying ? stopGame() : startGame()"> {{ isPlaying ? "Pause" : "Play" }}</b-button>
        <div>
          <save-shape class="mb-5" v-if="gameMode === 'Draw'" :population='population' />
          <load-shapes
            @update="loadPopulation"
            :cellSize="cellSize"
            :boardSize="boardSize"
            :speed="speed"
            v-if="gameMode === 'Draw'" />
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
      population: [{ "x": 135, "y": 60 }, { "x": 180, "y": 165 }, { "x": 330, "y": 240 }, { "x": 480, "y": 435 }, { "x": 330, "y": 405 }, { "x": 180, "y": 330 }],
      loadedPopulation: [],
      msg: 'nic',
      
    };
  },
  components: { SimulationCanvas, SaveShape, LoadShapes },
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
    updatePopulation(value) {
      this.msg = value
      this.population = value
      this.loadedPopulation = null
    },
    loadPopulation(value) {
      this.msg = value
      this.loadedPopulation = value
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
  grid-template-columns: 60% 40% ;
  justify-items: center;
  grid-template-rows: 2em;
}
.margin-top {
  margin: 2em 0 0 0;
}
.stats {
  width: 22vw;
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

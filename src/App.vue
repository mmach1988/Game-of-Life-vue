<template>
  <div id="app" style="position: relative;">
    <h1 ><span>Game of life</span></h1>
    <div class="container">
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
      <!-- 1. Rysowanie (możliwość zapisania, mozliwosc wczytywania zapisanych konfiguracji)
      2. Symulacja (możliwość play/ pause)
      3. Czyszczenie -->
      </div>
    </div>

    <simulation-canvas
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
    <!-- <div v-if="isGameOver" class="game-over" >
    Game Over 
    </div> -->
    <div class="margin-top">Score: {{ score }}</div>
    <div class="margin-top">
      <button @click="isGameOver ? startNewGame() : !isPlaying ? startGame() : stopGame()">
      {{isGameOver ? 'Start new game' : !isPlaying ? 'Play' : 'Pause'}}
  
      </button>
  </div>

  </div>
</template>

<script>
import SimulationCanvas from "./components/SimulationCanvas";

export default {
  name: "App",
  data: function () {
    return {
      score: 0,
      cellSize: 15,
      boardSize: 20,
      speed: 1,
      isPlaying: false,
      isGameOver: false,
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
  components: { SimulationCanvas },
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
  width: 50em;
  margin: auto;
  display: grid;
  grid-template-columns: 25% 25% 25% 25% ;
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
</style>

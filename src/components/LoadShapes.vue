<template>
 <div>
    <b-button v-b-modal.modal-1>Load shapes  </b-button>
    <b-modal id="modal-1" size="lg" title="Saves to load">
        {{ msg }}
     <b-container class="d-flex flex-wrap">
        <div v-for="(save, index) in saves" :key="index" class="shapes-container"> 
            <shape-component
            @update="loadPopulation"
            :cellSize="cellSize"
            :boardSize="boardSize"
            :speed="speed"
            :loadedPopulation="save.population" 
            :name="save.name"
            v-if="saves"
            /> 
        </div >
    </b-container>
    </b-modal>
 </div>
</template>

<script>

import shapeComponent from "./ShapeComponent"

export default {

data: function() {
    return {
        saves: [],
        msg: 'nic',
    };
},
props: ["cellSize", "boardSize", "speed"],
components: {
    shapeComponent,
},
mounted() {
   this.loadSaves();
},
methods: {
    loadPopulation(population) {
        // zamiast przypisywania value do  msg, emitujemy wydarzenie do app.vue, załączamy value
       this.msg = population
       this.$emit('update', population)
    },
    loadSaves() {
          this.axios.get('https://game-of-life-c6e2a-default-rtdb.firebaseio.com/saves.json')
          .then((response) => {
           return response.data
          }).then((data) => {
            const results = []
            for (const id in data) {
                results.push( {
                    id: id,
                    name: data[id].name,
                    population: data[id].population,
                })
            }  
            this.saves = results
          })
    },
}
}

</script>

<style scoped>
    .cancel {
        position: absolute;
        right: 10%;
        top: 5%;
    }
    .load-saves {
        margin-top: 10em;
        margin-bottom: 5em;
    }
    .shapes-container {
        width: 50%; 
    }
    #modal-1 {
        max-width: auto !important;

  }

</style>


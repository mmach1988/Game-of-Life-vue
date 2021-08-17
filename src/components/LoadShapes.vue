<template>
 <div class="modal">
    <button @click="loadSaves" class="load-saves" > Pobierz kształty </button>
    Test load: {{ saves }}
    <button @click="closeModal" class="cancel"> Anuluj </button>
    <div v-for="n in 5" :key="n" class="shapes-container"> 
        MIEJSCE NA WCZYTANE KSZTAŁTY: {{ n }}
        <!-- <shape-component
        :cellSize="cellSize"
        :boardSize="boardSize"
        :speed="speed"
        v-if="saves"
        /> -->
      
    </div>
 </div>
</template>

<script>

import shapeComponent from "./ShapeComponent"

export default {

data: function() {
    return {
        saves: []
    };
},
props: ["cellSize", "boardSize", "speed"],
components: {
    shapeComponent,
},
methods: {
    closeModal() {
        this.$emit('closeLoadModal')
    },
    loadSaves() {
          this.axios.get('https://game-of-life-c6e2a-default-rtdb.firebaseio.com/saves.json')
          .then((response) => {
            console.log(Object.keys(response.data))
            this.saves = Object.keys(response.data);
          });    
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
        width: 100%;
        border: 1px blue solid;
    }

</style>


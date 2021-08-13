
<template>
  <div class="modal">
    <button class="cancel"> Anuluj </button>
    <form class="save-form">
      <input style="width: 9em" type="text" placeholder="Wpisz nazwę" v-model="saveName" /><br />
      <button @click.prevent = "saveInFirebase(saveName, population)"> Zapisz populację</button>
    </form>  
    <button @click = "loadSaves"> Pobierz</button>
   <!-- Test load: {{ saves }} -->

</div>   
</template>

<script>

import constants from "./Constants";

export default {

data: function() {
        return {
        saveName: '',
        saves: [],
        };
    },
props: [
    "population"
  ],
methods: {
    saveInFirebase(nameToSave, populationToSave) {
      if(nameToSave){
        if(populationToSave) {
          this.axios.post('https://game-of-life-c6e2a-default-rtdb.firebaseio.com/saves.json',
            {
              name: nameToSave,
              population: populationToSave
            }).then((response) => {console.log(response);}, (error) => {
              console.log(error);
              });    
        }
        else {
          console.log("Brak populacji")
        }
      }
      else {
        console.log('Brak nazwy')
      }
    }, 
    loadSaves() {
          this.axios.get('https://game-of-life-c6e2a-default-rtdb.firebaseio.com/saves.json')
          .then((response) => {
            this.saves = response.data
            console.log(response.data);
          });    
    }, 
   addShape() {
      console.log('addShape') 
   }
}
}
</script>

<style>
  .cancel {
        position: absolute;
        right: 10%;
        top: 5%;
  }
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    border: 1px solid red;
   
    background: rgb(204, 204, 204); /* Fallback for older browsers without RGBA-support */
    background: rgba(204, 204, 204, 0.8);

  }
  .save-form {
    margin-top: 20em;
  }
</style>


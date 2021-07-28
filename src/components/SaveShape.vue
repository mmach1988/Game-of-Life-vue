<template>
    <div>
        <button @click = "saveInFirebase('save 1', population)"> Zapisz populację</button>
    </div> 
</template>

<script>

import constants from "./Constants";

export default {

data: function() {
        return {
        
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
   addShape() {
      console.log('addShape') 
   }
}
}
</script>

<style scoped>
</style>


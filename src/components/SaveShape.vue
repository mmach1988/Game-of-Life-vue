
<template>
<div>
  <b-button v-b-modal.modal-save>Save Shape</b-button>
  <b-modal id="modal-save" size="lg" title="BootstrapVue">
    <h2> Save shape</h2>
    <form>
      <input class="mb-2" style="width: 9em" type="text" placeholder="Wpisz nazwę" v-model="saveName" /><br />
      <b-button class="btn btn-success" @click.prevent = "saveInFirebase(saveName, population)"> Zapisz populację</b-button>
    </form> 
  </b-modal>

  <div >

</div>   
</div>
</template>

<script>

import constants from "./Constants";

export default {

data: function() {
        return {
        saveName: '',
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
   },
   closeModal() {
     this.$emit('closeSaveModal')
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

</style>


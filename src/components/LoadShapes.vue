<template>
 <div class="modal">
    <button @click="closeModal" class="cancel"> Anuluj </button>
 </div>
</template>

<script>

export default {

data: function() {
    return {
    };
},
methods: {
    closeModal() {
        this.$emit('closeLoadModal')
    }
}
}

</script>

<style scoped>
    .cancel {
        position: absolute;
        right: 10%;
        top: 5%;
    }

</style>


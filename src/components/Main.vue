<script setup>
import { ref } from "vue";

import AddRecipeStepModal from "./AddRecipeStepModal.vue";

let showRecipeStepModal = ref(false);

function onClickAddRecipeStepModal(event) {
  showRecipeStepModal.value = !showRecipeStepModal.value;
}
</script>

<template>
  <h1>Recipe Title</h1>

  <button @click="(event) => onClickAddRecipeStepModal(event)">Add</button>

  <AddRecipeStepModal
    :show-add-recipe-step-modal="showRecipeStepModal"
    :on-click-add-recipe-step-modal="onClickAddRecipeStepModal"
  />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

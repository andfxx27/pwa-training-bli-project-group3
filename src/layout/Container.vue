<script setup>
import { ref } from 'vue';
import StepBox from '../components/StepBox.vue';
import AddRecipeStepModal from './../components/AddRecipeStepModal.vue';

let showAddRecipeStepModal = ref(false);
let showAddRecipeStepUploadImageModal = ref(false);

function onClickAddRecipeStepModal(event) {
  console.log('Toggling add recipe step modal');
  showAddRecipeStepModal.value = !showAddRecipeStepModal.value;
}

function onClickAddRecipeStepUploadImageModal(event) {
  console.log('Toggling add recipe step image modal');
  showAddRecipeStepUploadImageModal.value =
    !showAddRecipeStepUploadImageModal.value;
}
</script>

<template>
  <div class="container">
    <h1 class="title">Untitled Recipe</h1>

    <!-- Display recipe step box retrieved from mockapi -->
    <StepBox title="Step 1" description="Description 1" />
    <StepBox title="Step 2" description="Description 2" />
    <v-btn
      class="btn-add-step"
      @click="(event) => onClickAddRecipeStepModal(event)"
      >Add another step</v-btn
    >
  </div>
  <AddRecipeStepModal
    :show-add-recipe-step-modal="showAddRecipeStepModal"
    :on-click-add-recipe-step-modal="onClickAddRecipeStepModal"
    :show-add-recipe-step-upload-image-modal="showAddRecipeStepUploadImageModal"
    :on-click-add-recipe-step-upload-image-modal="
      onClickAddRecipeStepUploadImageModal
    "
  />
</template>

<style scoped>
.btn-add-step {
  margin: 16px 0;
}
.container {
  background-color: #dadada;
  width: 100%;
  padding-left: 10rem;
  padding-right: 10rem;
  padding-top: 2rem;
  margin: 30px 30px 30px 10px;
}

.title {
  margin-bottom: 20px;
}
</style>

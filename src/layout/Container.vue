<script setup>
import { openDB } from 'idb';
import axios from 'axios';
import { onBeforeUpdate, onMounted, ref } from 'vue';
import AddRecipeStepModal from '../components/AddRecipeStepModal.vue';
import StepBox from '../components/StepBox.vue';
import CaptureImage from '../components/CaptureImage.vue';

let recipeSteps = ref([]);

let showAddRecipeStepModal = ref(false);
let showAddRecipeStepImageByCaptureModal = ref(false);

const onAddRecipeSteps = (step) => {
  recipeSteps.value.push(step);

  console.log(recipeSteps.value);
};

const onClickShowAddRecipeStepModal = (event) => {
  showAddRecipeStepModal.value = !showAddRecipeStepModal.value;
};

const onClickShowAddRecipeStepImageByCaptureModal = (event) => {
  showAddRecipeStepImageByCaptureModal.value =
    !showAddRecipeStepImageByCaptureModal.value;
};

async function getRecipeStepData() {
  console.log('Fetching recipe step from MockAPI & Indexed DB...');

  try {
    const response = await axios.get(
      'https://65631355ee04015769a6c52a.mockapi.io/recipeh'
    );

    recipeSteps.value = response.data;

    // Open IndexedDB database
    const db = await openDB('recipeDB', 1, {
      upgrade(db) {
        // Create an object store (table) named 'entries'
        // db.createObjectStore("entries", { keyPath: "id", autoIncrement: true });
        db.createObjectStore('entries');
      },
    });

    const indexedDbData = await db.getAll('entries');
  } catch (error) {
    console.log(error);
  }

  console.log(recipeSteps.value);
}

onMounted(getRecipeStepData);
onBeforeUpdate(() => console.log('onBeforeUpdate...'));
</script>

<template>
  <div class="container">
    <h1 class="title">Untitled Recipeh</h1>
    <StepBox
      v-for="(step, index) in recipeSteps"
      :title="step.title"
      :description="step.description"
      :image="step.imageBase64"
    />
    <v-btn class="ma-4" @click="onClickShowAddRecipeStepModal"
      >Add another step</v-btn
    >
  </div>

  <AddRecipeStepModal
    :recipe-steps="recipeSteps"
    :on-add-recipe-steps="onAddRecipeSteps"
    :show-add-recipe-step-modal="showAddRecipeStepModal"
    :on-click-show-add-recipe-step-modal="onClickShowAddRecipeStepModal"
    :show-add-recipe-step-image-by-capture-modal="
      showAddRecipeStepImageByCaptureModal
    "
    :on-click-show-add-recipe-step-image-by-capture-modal="
      onClickShowAddRecipeStepImageByCaptureModal
    "
  />
</template>

<style scoped>

.container {
  background-color: rgb(209, 209, 209);
  width: 100%;
  padding-left: 10rem;
  padding-right: 10rem;
  padding-top: 2rem;
}

@media screen and (max-width: 768px) {
  .container {
    padding-left: 0px;
    padding-right: 42px;
  }
}

.title {
  margin-bottom: 20px;
  padding-left: 20px;
}
</style>

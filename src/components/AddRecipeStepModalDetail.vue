<script setup>
import { openDB } from 'idb';
import axios from 'axios';
import { ref } from 'vue';

const props = defineProps([
  'recipeSteps',
  'onAddRecipeSteps',
  'showAddRecipeStepModal',
  'onClickShowAddRecipeStepModal',
]);

let title = ref('');
let description = ref('');
let image = ref(null);
let rawImage = ref(null);

let alertMessage = ref('');

function resetFormReactiveValues() {
  title.value = '';
  description.value = '';
  image.value = null;
  rawImage.value = null;

  alertMessage.value = '';

  props.onClickShowAddRecipeStepModal();
}

function logFormReactiveModelBefore() {
  console.log('Before capturing values (still a vue reactive object):');
  console.log('Title:', title);
  console.log('Description:', description);
}

function logFormReactiveModelAfter(title, description) {
  console.log('After capturing values (access using .value notation):');
  console.log('Title:', title);
  console.log('Description:', description);
}

async function saveData() {
  // Save to MockAPI & IndexedDB

  // Log reactive value before accessing it
  logFormReactiveModelBefore();

  // Capture values explicitly to check data binding
  const capturedTitle = title.value;
  const capturedDescription = description.value;

  // Log the values again to verify if they have been captured correctly
  logFormReactiveModelAfter(capturedTitle, capturedDescription);

  // Validate input, at least title must be inputted
  if (title.value === '') {
    alertMessage.value = "Title value can't be empty!";

    setTimeout(() => {
      resetFormReactiveValues();
    }, 2000);

    return;
  }

  // Send data to mock API using Axios
  // Implement getImageName function to get the image name
  const imagename = getImageName();

  const requestBody = {
    title: capturedTitle,
    description: capturedDescription,
    imagename: imagename,
  };

  try {
    const response = await axios.post(
      'https://65631355ee04015769a6c52a.mockapi.io/recipeh',
      requestBody
    );

    const savedRecipeStep = response.data;

    console.log('Data sent to mock API:', response.data);

    await saveToIndexedDB(savedRecipeStep);
  } catch (error) {
    console.error('Error sending data to mock API:', error);
  }
}

async function saveToIndexedDB(savedRecipeStep) {
  // Open IndexedDB database
  const db = await openDB('recipeDB', 1, {
    upgrade(db) {
      // Create an object store (table) named 'entries'
      // db.createObjectStore("entries", { keyPath: "id", autoIncrement: true });
      db.createObjectStore('entries');
    },
  });

  // Create a new entry object
  const entry = {
    title: title.value,
    description: description.value,
    image: image.value,
  };

  // Save the entry to the 'entries' object store using id from MockAPI
  const indexedDbSaveResult = await db.add(
    'entries',
    entry,
    savedRecipeStep.id
  );

  console.log(savedRecipeStep);
  console.log(indexedDbSaveResult);

  // Update recipeSteps reactive value from Container component
  const recipeStepFinal = {
    id: savedRecipeStep.id,
    description: savedRecipeStep.description,
    title: savedRecipeStep.title,
    imageBase64: (await db.get('entries', savedRecipeStep.id)).image,
    rawImage: rawImage,
  };

  props.onAddRecipeSteps(recipeStepFinal);

  // Reset form fields after saving to IndexedDB
  resetFormReactiveValues();
}

function handleImageChange(event) {
  // Handle the change event when a file is selected
  const file = event.target.files[0];

  rawImage.value = file;

  // Read the file as a data URL
  const reader = new FileReader();
  reader.onload = () => {
    image.value = reader.result; // Set the image data URL to the component data
  };
  reader.readAsDataURL(file);
}

function getImageName() {
  // Get the file input element
  const fileInput = document.getElementById('image');

  // Check if a file is selected
  if (fileInput && fileInput.files.length > 0) {
    // Extract the name of the selected file
    const fileName = fileInput.files[0].name;
    return fileName;
  }

  // Return a default name or handle the case where no file is selected
  return 'default_image.jpg';
}
</script>

<template>
  <div id="app" class="pa-4 w-100">
    <v-alert
      v-if="alertMessage"
      type="error"
      :text="alertMessage"
      class="my-2"
    ></v-alert>

    <form @submit.prevent="saveData">
      <v-text-field label="Recipe step title" v-model="title"></v-text-field>

      <v-textarea
        label="Recipe step description"
        v-model="description"
      ></v-textarea>

      <v-file-input
        label="Recipe step image"
        prepend-icon=""
        @change="handleImageChange"
        accept="image/*"
        id="image"
      ></v-file-input>

      <v-btn width="auto" type="submit"> Submit </v-btn>
    </form>
  </div>
</template>

<style scoped></style>

<script setup>
import { openDB } from 'idb';
import axios from 'axios';
import { ref } from 'vue';

let title = ref('string');
let description = ref('string');

// External props
const props = defineProps(['chosenImage']);

console.log(props.chosenImage);

async function saveData() {
  // Save to IndexedDB
  console.log('Before capturing values:');
  console.log('Title:', title);
  console.log('Description:', description);

  // Capture values explicitly to check data binding
  const captureTitle = title;
  const captureDesc = description;

  // Log the values again to verify if they have been captured correctly
  console.log('After capturing values:');
  console.log('Title:', captureTitle);
  console.log('Description:', captureDesc);

  await saveToIndexedDB();
  console.log('Title:', captureTitle);
  console.log('Description:', captureDesc);
  // Send data to mock API using Axios
  const imagename = getImageName(); // Implement getImageName function to get the image name
  const dataToSend = {
    title: captureTitle,
    description: captureDesc,
    imagename: imagename,
  };

  try {
    const response = await axios.post(
      'https://65631355ee04015769a6c52a.mockapi.io/recipeh',
      dataToSend
    );
    console.log('Data sent to mock API:', response.data);
  } catch (error) {
    console.error('Error sending data to mock API:', error);
  }
}

async function saveToIndexedDB() {
  // Open IndexedDB database
  const db = await openDB('recipeDB', 1, {
    upgrade(db) {
      // Create an object store (table) named 'entries'
      db.createObjectStore('entries', {
        keyPath: 'id',
        autoIncrement: true,
      });
    },
  });

  // Create a new entry object
  const entry = {
    title: title,
    description: description,
    image: props.chosenImage,
  };

  // Save the entry to the 'entries' object store
  await db.add('entries', entry);

  // Reset form fields after saving to IndexedDB
  title = '';
  description = '';
  props.chosenImage = null;
}

function getImageName() {
  // Get the file input element
  const fileInput = document.getElementById('image');

  // Check if a file is selected
  if (fileInput && fileInput.files.length > 0) {
    // Extract the name of the selected file
    const fileName = fileInput.files[0].name;
    console.log(fileName);
    return fileName;
  }

  // Return a default name or handle the case where no file is selected
  return 'default_image.jpg';
}
</script>

<template>
  <div id="app" style="width: 480px; padding: 16px">
    <form @submit.prevent="saveData">
      <v-text-field
        label="Recipe todo"
        :rules="[required]"
        variant="outlined"
        v-model="title"
      ></v-text-field>

      <v-textarea
        label="Recipe todo description"
        variant="outlined"
        v-model="description"
      ></v-textarea>

      <div v-if="props.chosenImage != null">
        <v-text-field
          label="Recipe todo"
          variant="outlined"
          v-model="props.chosenImage.value.name"
          disabled
        ></v-text-field>
      </div>
      <div v-else>
        <v-text-field
          label="Recipe todo"
          variant="outlined"
          disabled
        ></v-text-field>
      </div>

      <v-btn type="submit">Submit</v-btn>
    </form>
  </div>
</template>

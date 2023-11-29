<template>
  <div id="app">
    <h1 class="heading">Add Recipe</h1>
    <form @submit.prevent="saveData" ref="recipeForm">
      <div class="form-group">
        <label for="title" class="label">Title:</label>
        <input type="text" id="title" v-model="title" class="input" required />
      </div>

      <div class="form-group">
        <label for="description" class="label">Description:</label>
        <textarea id="description" v-model="description" class="textarea" required></textarea>
      </div>

      <div class="form-group">
        <label for="image" class="label">Add Image:</label>
        <!-- Input for choosing file or opening camera -->
        <input
          type="file"
          id="image"
          @change="handleImageChange"
          accept="image/*"
          class="file-input"
          capture="environment"
        />
        <button @click.prevent="openCamera" class="choose-button">Open Camera</button>
      </div>

      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<script>
import { openDB } from 'idb';
import axios from 'axios';


export default {
  data() {
    return {
      title: '',
      description: '',
      image: null,
      openCameraClicked: false,
    };
  },
  
  methods: {

    openCamera() {
      // Set the flag to true before triggering the file input
      this.openCameraClicked = true;

      // Trigger the file input to open the camera (front or back, depending on 'capture' attribute)
      const fileInput = this.$refs.recipeForm.querySelector('#image');
      fileInput.setAttribute('capture', 'environment');
      fileInput.click();

      // Reset 'capture' attribute after the click to avoid affecting subsequent file selections
      fileInput.removeAttribute('capture');
    },
    async saveData() {
      // Save to IndexedDB
      console.log('Before capturing values:');
      console.log('Title:', this.title);
      console.log('Description:', this.description);

      // Capture values explicitly to check data binding
      const captureTitle = this.title
      const captureDesc =this.description

      // Log the values again to verify if they have been captured correctly
      console.log('After capturing values:');
      console.log('Title:', captureTitle);
      console.log('Description:', captureDesc);

      await this.saveToIndexedDB();
      console.log('Title:', captureTitle);
      console.log('Description:', captureDesc);
      // Send data to mock API using Axios
      const imagename = this.getImageName(); // Implement getImageName function to get the image name
      const dataToSend = {
        title: captureTitle,
        description: captureDesc,
        imagename: imagename,
      };

      try {
        const response = await axios.post('https://65631355ee04015769a6c52a.mockapi.io/recipeh', dataToSend);
        console.log('Data sent to mock API:', response.data);
      } catch (error) {
        console.error('Error sending data to mock API:', error);
      }
    },
    async saveToIndexedDB() {
      // Open IndexedDB database
      const db = await openDB('recipeDB', 1, {
        upgrade(db) {
          // Create an object store (table) named 'entries'
          db.createObjectStore('entries', { keyPath: 'id', autoIncrement: true });
        },
      });

      // Create a new entry object
      const entry = {
        title: this.title,
        description: this.description,
        image: this.image,
      };

      // Save the entry to the 'entries' object store
      await db.add('entries', entry);

      // Reset form fields after saving to IndexedDB
      this.title = '';
      this.description = '';
      this.image = null;
    },
    handleImageChange() {
      // If the file input change event is triggered and the "Open Camera" button was clicked,
      // prevent further actions (e.g., submitting the form)
      if (this.openCameraClicked) {
        this.openCameraClicked = false; // Reset the flag
        return;
      }

      // Handle the change event for choosing a file
      const fileInput = document.getElementById('image');
      const file = fileInput.files[0];

      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result; // Set the image data URL to the component data
      };
      reader.readAsDataURL(file);
    },
    getImageName() {
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
  },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.heading {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: left;
}

.form-group {
  margin-bottom: 30px;
}

.label {
  display: block;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}

.input,
.textarea,
.file-input {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-size: 24px;
}

.textarea {
  height: 200px;
}

.submit-button {
  background-color: #3498db;
  color: white;
  cursor: pointer;
  border: none;
  padding: 20px 40px;
  font-size: 32px;
}
.choose-button {
  margin-top: 10px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
}
</style>

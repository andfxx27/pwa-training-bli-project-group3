<template>
  <div id="app">
    <h1 class="heading">Add Recipe</h1>
    <form @submit.prevent="saveData">
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
        <input type="file" id="image" @change="handleImageChange" accept="image/*" class="file-input" />
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
    };
  },
  methods: {
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
    handleImageChange(event) {
      // Handle the change event when a file is selected
      const file = event.target.files[0];

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
</style>

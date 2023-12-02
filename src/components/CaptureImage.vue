<template>
  <div>
    <video ref="video" width="640" height="480" autoplay v-if="startVideo"></video>
    <img v-else-if="file" :src="file" alt="Captured Image" height="480">
    <canvas ref="canvas" style="display: none;"></canvas>
    <input type="file" @change="handleFileChange" ref="fileInput" style="display: none;">
    <button @click="startCapture" :disabled="startVideo || isCapturing">Start Capture</button>
    <button @click="stopCapture" :disabled="!startVideo || isCapturing">Stop Capture</button>
    <button @click="captureImage" :disabled="!file">Take a Picture</button>
  </div>
</template>
  
  <script>
  import { openDB } from 'idb';
  import { ref } from 'vue';

  let startVideo = ref()
  export default {
    data() {
      return {
        videoStream: null,
        startVideo: true,
        file: null,
        isCapturing: false,
      };
    },
    methods: {
      async startCapture() {
      try {
        const useCamera = await this.confirmDialog('Do you want to capture from the camera? If not, you can choose a file.');

        if (useCamera) {
          this.initCamera();
        } else {
          // Trigger the file input to choose a file
          this.$refs.fileInput.click();
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    },
    initCamera() {
      if (!this.$refs.video) {
        console.error('Video element is not available.');
        return;
      }

      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          // Assign the stream to the video element
          this.$refs.video.srcObject = stream;

          // Store the stream to stop it later
          this.videoStream = stream;

          // Set startVideo to true after the stream has started
          this.startVideo = true;
        })
        .catch((error) => {
          console.error('Error initializing camera:', error);
        });
    },
    stopCapture() {
      if (this.videoStream) {
        const tracks = this.videoStream.getTracks();
        tracks.forEach(track => track.stop());
      }
      this.startVideo = false;
    },
    async captureImage() {
      if (this.startVideo) {
        // If the video is currently running, take a picture
        await this.saveToIndexedDB();
      } else if (this.file) {
        // If a file is selected, capture the image
        this.isCapturing = true;
        await this.saveToIndexedDBFile();
        this.isCapturing = false;
      }
    },
      async saveToIndexedDB() {
        const video = this.$refs.video;
        const canvas = this.$refs.canvas;
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  
        // Convert the image to a Blob
        canvas.toBlob(async (blob) => {
          // Save the Blob to IndexedDB
          await this.saveBlobToIndexedDB(blob);
        }, 'image/png');
      },
      async saveBlobToIndexedDB(blob) {
        const db = await openDB('capturedImages', 1, {
          upgrade(db) {
            const store = db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
            store.createIndex('timestamp', 'timestamp');
          },
        });
  
        const timestamp = new Date().getTime();
        const transaction = db.transaction('images', 'readwrite');
        const store = transaction.objectStore('images');
        await store.add({ blob, timestamp });
        startVideo.value = false;
        console.log('Image saved to IndexedDB');
      },
      async handleFileChange(event) {
      // Reset video stream and startVideo status when a file is selected
      this.stopCapture();
      if (this.$refs.video) {
        this.$refs.video.srcObject = null;
      }
      this.startVideo = false;

      // Display the selected image
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.file = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    confirmDialog(message) {
      return new Promise((resolve) => {
        if (window.confirm(message)) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    },
    },
  };
  </script>
  
  <style scoped>
 
  </style>
<template>
    <div>
      <video ref="video" width="640" height="480" autoplay v-show="true"></video>
      <canvas ref="canvas" ></canvas>
      <button @click="startCapture">Start Capture</button>
      <button @click="stopCapture">Stop Capture</button>
      <button @click="saveToIndexedDB">Take a Picture</button>
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
      };
    },
    methods: {
      async startCapture() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
          // Assign the stream to the video element
          this.$refs.video.srcObject = stream;
  
          // Store the stream to stop it later
          this.videoStream = stream;
          
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
        startVideo.value= true;
        console.log("Testing " +startVideo.value);
      },
      stopCapture() {
        if (this.videoStream) {
          const tracks = this.videoStream.getTracks();
          tracks.forEach(track => track.stop());
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
    },
  };
  </script>
  
  <style scoped>
 
  </style>
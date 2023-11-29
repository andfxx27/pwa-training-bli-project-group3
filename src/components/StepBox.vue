<script setup>
import { ref } from "vue";

const show = ref(false);

defineProps({
  title: String,
  description: String,
});
</script>

<template>
  <button class="button-title ma-4" @click="show = !show">
    <v-card>
      <v-card-title class="title">
        {{ title }}
      </v-card-title>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text class="description">
            {{ description }}
          </v-card-text>
          <div class="image-container">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="400px"
              width="400px"
              cover
            ></v-img>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </button>
</template>

<style scoped>
.button-title {
  width: 100%;
}
.image-container {
  padding: 20px 80px 20px 80px;
  display: flex;
  align-items: center;
}

.title {
  text-align: start;
}
.description {
  text-align: start;
}
</style>

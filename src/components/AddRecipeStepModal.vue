<script setup>
import { ref } from 'vue';
import AddRecipeStepDetail from './AddRecipeStepDetail.vue';

// External props
const props = defineProps([
  'showAddRecipeStepModal',
  'onClickAddRecipeStepModal',
  'showAddRecipeStepUploadImageModal',
  'onClickAddRecipeStepUploadImageModal',
]);

let image = ref(null);

const addImageDropdownMenuItems = [
  {
    title: 'Upload Image',
    onClick: props.onClickAddRecipeStepUploadImageModal,
  },
  {
    title: 'Capture Image',
    onClick: () => console.log('Capture Image feature in progress...'),
  },
];

function handleImageChange(event) {
  // Handle the change event when a file is selected
  const file = event.target.files[0];

  image.value = file;
}
</script>

<template>
  <div>
    <v-row justify="center">
      <!-- Main modal to add recipe step -->
      <v-dialog v-model="props.showAddRecipeStepModal" width="auto">
        <v-card>
          <v-card-title>Add List</v-card-title>

          <!-- Main form component for adding recipe step -->
          <AddRecipeStepDetail :chosen-image="image" />

          <!-- Main dropdown menu for choosing image selection method -->
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props" class="ma-2">
                Choose Image
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in addImageDropdownMenuItems"
                :key="index"
              >
                <v-list-item-title>
                  <div v-if="item.title === 'Upload Image'">
                    <v-file-input
                      label="Upload Image"
                      variant="outlined"
                      accept="image/*"
                      @change="handleImageChange"
                      prepend-icon=""
                      id="image"
                    ></v-file-input>
                  </div>
                  <div v-else-if="item.title === 'Capture Image'">
                    <v-btn class="ma-2" width="100%" @click="item.onClick">
                      {{ item.title }}
                    </v-btn>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="props.onClickAddRecipeStepModal"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Second modal to capture image -->
      <v-dialog v-model="props.showAddRecipeStepUploadImageModal" width="480px">
        <v-card class="pa-4">
          <v-card-title> Upload Image </v-card-title>

          <v-file-input
            label="File input"
            variant="outlined"
            accept="image/*"
            @change="handleImageChange"
            prepend-icon=""
            id="image"
          ></v-file-input>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="props.onClickAddRecipeStepUploadImageModal"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

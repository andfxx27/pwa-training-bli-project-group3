<script setup>
import AddRecipeStepModalDetail from "./AddRecipeStepModalDetail.vue";

const props = defineProps([
  "recipeSteps",
  "onAddRecipeSteps",
  "showAddRecipeStepModal",
  "onClickShowAddRecipeStepModal",
  "showAddRecipeStepImageByCaptureModal",
  "onClickShowAddRecipeStepImageByCaptureModal",
]);
</script>

<template>
  <div>
    <v-row justify="center">
      <!-- Main modal for adding recipe step -->
      <v-dialog v-model="props.showAddRecipeStepModal" width="auto">
        <v-card>
          <v-card-title> Add List </v-card-title>

          <!-- Main component for add recipe step detail -->
          <AddRecipeStepModalDetail
            :recipe-steps="props.recipeSteps"
            :on-add-recipe-steps="props.onAddRecipeSteps"
            :show-add-recipe-step-modal="props.showAddRecipeStepModal"
            :on-click-show-add-recipe-step-modal="onClickShowAddRecipeStepModal"
          />

          <v-card-text>
            <!-- Button to open add recipe step image by capture modal -->
            <v-btn
              color="primary"
              width="auto"
              @click="props.onClickShowAddRecipeStepImageByCaptureModal"
            >
              Add Recipe Step Image by Capture
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <!-- Button to close add recipe step modal -->
            <v-btn
              color="primary"
              variant="text"
              @click="props.onClickShowAddRecipeStepModal"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Modal for adding recipe step image by capture -->
      <v-dialog
        v-model="props.showAddRecipeStepImageByCaptureModal"
        width="auto"
      >
        <v-card>
          <v-card-title> Add Recipe Step Image by Capture </v-card-title>
          <v-card-actions>
            <!-- Button to close add recipe step image by capture modal -->
            <v-btn
              color="primary"
              variant="text"
              @click="props.onClickShowAddRecipeStepImageByCaptureModal"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<style scoped></style>

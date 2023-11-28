<script setup>
import AddRecipeStepDetail from "./AddRecipeStepDetail.vue";

const props = defineProps([
  "showAddRecipeStepModal",
  "onClickAddRecipeStepModal",
]);
</script>

<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="props.showAddRecipeStepModal" width="auto">
        <v-card>
          <v-card-title> Add List </v-card-title>

          <AddRecipeStepDetail />

          <v-card-text>
            <v-btn color="primary" class="ma-2" @click="dialog2 = true">
              Open Dialog 2
            </v-btn>
          </v-card-text>
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

      <v-dialog v-model="dialog2" width="auto">
        <v-card>
          <v-card-title> Dialog 2 </v-card-title>
          <v-card-text>
            <v-btn color="primary" @click="dialog3 = !dialog3">
              Open Dialog 3
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="text" @click="dialog2 = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog3" width="auto">
        <v-card>
          <v-card-title>
            <span>Dialog 3</span>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" variant="text" @click="dialog3 = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

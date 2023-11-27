<script setup>
import { ref } from 'vue';

defineProps({
  msg: String,
});

</script>
<template>
  <div class="container">
    <div>
        <h1 class = "title">Untitled Recipe</h1>
    </div>
  </div>
</template>


<style scoped>
.container {
  background-color: #888;
  width: 100%;
  padding-left: 10rem;
  padding-top: 2rem;
  margin: 30px 10px 30px 10px;
}


</style>

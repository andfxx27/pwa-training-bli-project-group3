<script setup>
import { ref } from 'vue';
import StepBox from '../components/StepBox.vue';



</script>

<template>
  <div class="container">
    <h1 class = "title">Untitled Recipe</h1>
    <StepBox title="title" description="desriptionasdfasdfasdfasdfasdfasdfasdfffffffffffffffffffffffffffffffffff"/>
  </div>
</template>


<style scoped>
.container {
  background-color: #888;
  width: 100%;
  padding-left: 10rem;
  padding-right: 10rem;
  padding-top: 2rem;
  margin: 30px 30px 30px 10px;
}

.title {
 margin-bottom: 20px;
}

</style>

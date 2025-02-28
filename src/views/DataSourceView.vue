<template>
  <div class="about">
    <h1>DataSource</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const increment = () => {
  count.value++
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    color: red;
  }
}
</style>

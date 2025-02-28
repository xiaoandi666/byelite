<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavigator from './components/AppNavigator.vue'
</script>

<template>
  <AppNavigator msg="hello" />
  <RouterView />
</template>

<style scoped>
/* 类名切换的方式一定比动态样式好 */
.active {
  background-color: pink;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}
</style>

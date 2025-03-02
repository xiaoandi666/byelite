<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavigator from './components/AppNavigator.vue'
</script>

<template>
  <AppNavigator msg="hello" />
  <RouterView />
</template>

<style scoped></style>

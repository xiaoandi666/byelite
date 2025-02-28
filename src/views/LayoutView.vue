<template>
  <div class="about" :class="{ debug: editorStore.debug }" @click="editorStore.toggleDebug">
    <h1>Layout</h1>
  </div>
</template>
<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
const editorStore = useEditorStore()
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .debug {
    border: 2px dashed #afafaf;
  }
}
</style>

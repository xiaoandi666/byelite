<template>
  <div class="title">按钮</div>
  <!-- <input :value="prop.block.props" /> -->
</template>

<script setup lang="ts">
import type { ButtonBlock } from '@/types/block'
const prop = defineProps<{
  block: ButtonBlock
}>()
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  padding: 0.5rem;
}
</style>

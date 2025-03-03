<template>
  <div class="title">图表</div>
  <!-- <input :value="prop.block.props" /> -->
</template>

<script setup lang="ts">
import type { TextBlock, ChartBlock } from '@/types/block'
const prop = defineProps<{
  block: ChartBlock
}>()
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  padding: 0.5rem;
}
</style>

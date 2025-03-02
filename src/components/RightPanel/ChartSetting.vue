<template>
  <input :value="prop.block.props" />
</template>

<script setup lang="ts">
import type { TextBlock, ChartBlock } from '@/types/block'
const prop = defineProps<{
  block: ChartBlock
}>()
</script>

<style scoped></style>

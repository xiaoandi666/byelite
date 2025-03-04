<!-- 共同去处理、规范约定他们 -->
<!-- Text/Image/Chart -->

<template>
  <div class="text">{{ props.block.props.content }}</div>
</template>

<script setup lang="ts">
import type { TextBlock } from '@/types/block'

const props = defineProps<{
  block: TextBlock
}>()
</script>

<style>
.text {
  font-size: 1.5rem;
}
</style>

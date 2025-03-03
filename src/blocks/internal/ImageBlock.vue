<!-- 共同去处理、规范约定他们 -->
<!-- Text/Image/Chart -->

<template>
  <div class="image"><img :src="block.block.props.src" :alt="block.block.props.alt" /></div>
</template>

<script setup lang="ts">
import type { ImageBlock } from '@/types/block'

const block = defineProps<{
  block: ImageBlock
}>()
</script>

<style>
.image {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

img {
  width: 100%;
}
</style>

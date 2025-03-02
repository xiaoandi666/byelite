<!-- 共同去处理、规范约定他们 -->
<!-- Text/Image/Chart -->

<template>
  <div><img :src="block.block.props.src" :alt="block.block.props.alt" /></div>
</template>

<script setup lang="ts">
import type { ImageBlock } from '@/types/block'

const block = defineProps<{
  block: ImageBlock
}>()
</script>

<style></style>

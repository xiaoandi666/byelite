<script setup lang="ts">
import type { HeroTitleBlock } from '@/types/block'

const props = defineProps<{
  block: HeroTitleBlock
}>()
</script>

<template>
  <h1 class="hero-title">{{ props.block.props.content }}</h1>
</template>

<style scoped>
.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem); /* 根据屏幕大小动态调整 */
  font-weight: 800;

  background: linear-gradient(135deg, #6f91b4, #4b6584);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);

  border-radius: 8px;
}
</style>

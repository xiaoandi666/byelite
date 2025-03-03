<script setup lang="ts">
import type { HeroTitleBlock, TextBlock } from '@/types/block'

const props = defineProps<{
  block: HeroTitleBlock
}>()
</script>

<template>
  <h1 class="hero-title">{{ props.block.props.content }}</h1>
</template>

<style scoped>
.hero-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.hero-title:hover {
  flex: 1;
}
</style>

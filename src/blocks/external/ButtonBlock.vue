<template>
  <div class="button">{{ props.block.props.content || 'Button' }}</div>
</template>

<script setup lang="ts">
import type { ButtonBlock } from '@/types/block'

const props = defineProps<{
  block: ButtonBlock
}>()
</script>

<style scoped>
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #6f91b4, #4b6584);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  user-select: none;
}

.button:hover {
  background: linear-gradient(135deg, #5a7c9b, #3a526a);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.button:active {
  background: linear-gradient(135deg, #4b6584, #2d3f50);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: scale(0.98);
}

.button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(111, 145, 180, 0.4);
}
</style>

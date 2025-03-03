<template>
  <div class="button">Button</div>
</template>

<script setup lang="ts">
import type { ButtonBlock } from '@/types/block'

const props = defineProps<{
  block: ButtonBlock
}>()
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  font-weight: 700;
  color: white;
  background-color: rgb(111, 145, 180);
}
</style>

<template>
  <input
    class="content"
    :value="props.block.props.content"
    @change="(ev) => handleChange((ev.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
import type { TextBlock } from '@/types/block'
const props = defineProps<{
  block: TextBlock
}>()
const emit = defineEmits<{ (event: 'change', block: TextBlock): void }>()
const handleChange = (content: string) => {
  const block = { ...props.block, props: { ...props.block.props, content } }
  emit('change', block)
}
</script>

<style scoped>
.content {
  width: 100%;
}
</style>

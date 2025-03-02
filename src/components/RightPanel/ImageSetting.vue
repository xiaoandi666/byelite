<template>
  <input
    class="content"
    :value="props.block.props.src"
    @change="(ev) => handleChange((ev.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
import type { ImageBlock, TextBlock } from '@/types/block'
const props = defineProps<{
  block: ImageBlock
}>()
const emit = defineEmits<{ (event: 'change', block: ImageBlock): void }>()
const handleChange = (src: string) => {
  const block = { ...props.block, props: { ...props.block.props, src } }
  emit('change', block)
}
</script>

<style scoped>
.content {
  width: 100%;
}
</style>

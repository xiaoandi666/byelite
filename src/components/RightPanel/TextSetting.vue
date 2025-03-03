<template>
  <div class="title">文本</div>
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
.title {
  font-size: 1.5rem;
  padding: 0.5rem;
}
.content {
  width: 96%;
  border-radius: 5px;
  height: 2rem;
  margin-top: 5px;
  margin-left: 2%;
}
</style>

<!-- 共同去处理、规范约定他们 -->
<!-- Text/Image/Chart -->

<template>
  <component :is="blockMaterial" :block="block" />
</template>

<script setup lang="ts">
import { computed, toRaw } from 'vue'

import type { Block } from '@/types/block'

import ChartBlock from './internal/ChartBlock.vue'
import FallbackBlock from './internal/FallbackBlock.vue'
import ImageBlock from './internal/ImageBlock.vue'
import TextBlock from './internal/TextBlock.vue'
import HeroTitleBlock from './internal/HeroTitleBlock.vue'
import ButtonBlock from './external/ButtonBlock.vue'
import FormBlock from '@/blocks/external/FormBlock.vue'
import { useEditorStore } from '@/stores/editor'

const props = defineProps<{
  block: Block
}>()
const editorStore = useEditorStore()

const blockMaterial = computed(() => {
  switch (props.block.type) {
    case 'chart':
      return ChartBlock
    case 'image':
      return ImageBlock
    case 'text':
      return TextBlock
    case 'quote':
      return TextBlock
    case 'heroTitle':
      return HeroTitleBlock
    case 'view':
      return TextBlock
    case 'button':
      return ButtonBlock
    case 'form':
      return FormBlock
    default:
      return FallbackBlock
  }
})
</script>

<style></style>

<template>
  <div class="right-panel-wrapper">
    <div class="right-panel-left">
      <component
        :is="blockRightPanel"
        :block="editorStore.selectedBlock"
        @change="handleUpdateBlock"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lightning, Share } from '@icon-park/vue-next'
import { ref } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia'
import TextSetting from './TextSetting.vue'
import { blocks } from '@/mock/blocks'
import ImageSetting from './ImageSetting.vue'
import ChartSetting from './ChartSetting.vue'
import { computed } from 'vue'
import type { Block } from '@/types/block'
const editorStore = useEditorStore()
const { selectedBlock } = storeToRefs(editorStore)

const blockRightPanel = computed(() => {
  if (!selectedBlock.value) return null
  switch (selectedBlock.value.type) {
    case 'text':
      return TextSetting
    case 'image':
      return ImageSetting
    case 'chart':
      return ChartSetting
    case 'heroTitle':
      return TextSetting
    default:
      break
  }
})

const handleUpdateBlock = (block: Block) => {
  editorStore.updateBlock(block)
}
</script>

<style scoped>
.right-panel-wrapper {
  display: flex;
  width: 280px;
  height: 100%;
  background-color: #f5f5f5;
  border-right: 1px solid #e8e8e8;
}
.right-panel-left {
  width: 100%;
  height: 100%;
  background-color: #e8e8e8;
}
</style>

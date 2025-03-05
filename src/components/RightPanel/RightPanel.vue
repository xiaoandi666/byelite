<template>
  <div class="right-panel-wrapper">
    <div class="right-panel-left">
      <component
        :is="blockRightPanel"
        :block="editorStore.selectedBlock"
        @change="handleUpdateBlock"
      />
      <SchemaExporter
        v-if="editorStore.activeBlockId"
        :currentBlockInfo="editorStore.selectedBlock"
        @updateBlock="handleUpdateBlock"
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
import TitleSetting from './TitleSetting.vue'
import FormSetting from './FormSetting.vue'
import ButtonSetting from './ButtonSetting.vue'
import { computed } from 'vue'
import type { Block } from '@/types/block'
import SchemaExporter from './SchemaExporter.vue'
import QuoteSetting from './QuoteSetting.vue'
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
      return TitleSetting
    case 'form':
      return FormSetting
    case 'button':
      return ButtonSetting
    case 'quote':
      return QuoteSetting
    default:
      break
  }
})

const handleUpdateBlock = (block: Block) => {
  editorStore.updateBlock(block)
}
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  padding: 0.5rem;
}
.right-panel-wrapper {
  display: flex;
  width: 300px;
  height: 100%;
  background-color: #f5f5f5;
  border-right: 1px solid #e8e8e8;
  overflow: auto;
}
/* 滚动条样式 */
.right-panel-wrapper::-webkit-scrollbar {
  width: 10px; /* 滚动条的宽度 */
}

.right-panel-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1; /* 滚动条轨道的浅灰色背景 */
  border-radius: 10px; /* 轨道圆角 */
}

.right-panel-wrapper::-webkit-scrollbar-thumb {
  background: #888; /* 滚动条滑块的深灰色 */
  border-radius: 10px; /* 滑块圆角 */
}

.right-panel-wrapper::-webkit-scrollbar-thumb:hover {
  background: #555; /* 滑块悬停时的深灰色 */
}
.right-panel-left {
  width: 100%;
  height: 100%;
  background-color: #e8e8e8;
}
</style>

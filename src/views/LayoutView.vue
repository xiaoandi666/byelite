<template>
  <div class="layout-wrapper" :class="{ debug }" @click="debugStore.toggleDebug">
    <LeftPanel />
    <div>
      <SmoothDndContainer
        class="block-group"
        group-name="blocks"
        orientation="vertical"
        tag="div"
        @drop="
          (payload) => {
            const newBlocks = applyDrag(blocks, payload)
            editorStore.updateBlocks(newBlocks)
          }
        "
      >
        <SmoothDndDraggable v-for="block in blocks" :key="block">
          <div class="block-item">{{ block }}</div>
        </SmoothDndDraggable>
      </SmoothDndContainer>
    </div>
    <div>右</div>
  </div>
</template>
<script setup lang="ts">
import LeftPanel from '@/components/LeftPanel.vue'
import { useDebugStore } from '@/stores/debug'
import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer'
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/stores/editor'
import type { DropResult } from 'smooth-dnd'
import { arrayMove } from '@/utils/array'
const debugStore = useDebugStore()
const editorStore = useEditorStore()

const { debug } = storeToRefs(debugStore)
const { blocks } = storeToRefs(editorStore)

const applyDrag = <T extends any[]>(arr: T, dragResult: DropResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  const result = [...arr]
  if (addedIndex === null) return result
  //添加
  if (addedIndex !== null && removedIndex === null) {
    result.splice(addedIndex, 0, payload)
  }

  //移动
  if (addedIndex !== null && removedIndex !== null) {
    return arrayMove(result, removedIndex, addedIndex)
  }

  return result
}
</script>
<style>
.layout-wrapper {
  display: flex;
  height: 100%;
}
</style>

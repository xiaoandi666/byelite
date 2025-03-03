<template>
  <div class="layout-wrapper" :class="{ debug }">
    <LeftPanel />
    <div class="layout-painter">
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
        <SmoothDndDraggable v-for="block in blocks" :key="block.id">
          <div
            :class="{ 'block-wrapper': true, debug: debug || activeBlockId === block.id }"
            :data-block-type="block.type"
            :data-block-id="block.id"
            @click="() => editorStore.selectBlock(block)"
          >
            <BlockRenderer :block="block" />
          </div>
        </SmoothDndDraggable>
      </SmoothDndContainer>
    </div>
    <div>
      <RightPanel />
    </div>
  </div>
</template>
<script setup lang="ts">
import LeftPanel from '@/components/LeftPanel/LeftPanel.vue'
import RightPanel from '@/components/RightPanel/RightPanel.vue'
import { useDebugStore } from '@/stores/debug'
import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer'
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/stores/editor'
import type { DropResult } from 'smooth-dnd'
import { arrayMove } from '@/utils/array'
import BlockRenderer from '@/blocks/BlockRenderer.vue'

const debugStore = useDebugStore()
const editorStore = useEditorStore()

const { debug } = storeToRefs(debugStore)
const { blocks, activeBlockId } = storeToRefs(editorStore)

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
.layout-painter {
  width: 100%;

  overflow-y: auto;

  padding: 20px;
}
.block-wrapper {
  padding: 20px;
  border-radius: 4px;
  border: 2px dashed transparent;
  margin: 20px 0;
}
.block-wrapper.debug {
  border: 2px dashed #e8e8e8;
}
</style>

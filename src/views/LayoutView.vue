<template>
  <div class="layout-wrapper" :class="{ debug }" @click="handleGlobalClick($event)">
    <LeftPanel />
    <div class="layout-painter">
      <div class="layout-painter-head">
        <div class="paiter-head-title">Xady</div>
      </div>
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
            class="block-toolbar-item"
            v-if="activeBlockId === block.id"
            @click="editorStore.deleteBlock(block)"
          >
            <delete />
          </div>
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
    <div class="layout-right">
      <RightPanel />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Block, Delete } from '@icon-park/vue-next'
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
const handleGlobalClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  console.log('at', target)
  const isBlock = target.closest('.layout-painter')
  const isToolbar = target.closest('.layout-right')
  const isRemove = target.closest('.remove-field')

  if (!isBlock && !isToolbar && !isRemove) {
    editorStore.activeBlockId = null
  }
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
  margin: 10px 20px;
  border: 2px solid #ccc; /* 灰色边框 */
  border-radius: 15px; /* 更圆润的边框 */
  background-color: #f9f9f9; /* 浅灰色背景 */
  box-shadow:
    10px 0 20px rgba(0, 0, 0, 0.15),
    /* 右侧阴影 */ -10px 0 20px rgba(0, 0, 0, 0.15); /* 左侧阴影 */
}

/* 滚动条样式 */
.layout-painter::-webkit-scrollbar {
  width: 10px; /* 滚动条的宽度 */
}

.layout-painter::-webkit-scrollbar-track {
  background: #f1f1f1; /* 滚动条轨道的浅灰色背景 */
  border-radius: 10px; /* 轨道圆角 */
}

.layout-painter::-webkit-scrollbar-thumb {
  background: #888; /* 滚动条滑块的深灰色 */
  border-radius: 10px; /* 滑块圆角 */
}

.layout-painter::-webkit-scrollbar-thumb:hover {
  background: #555; /* 滑块悬停时的深灰色 */
}
.layout-painter-head {
  background: rgb(111, 145, 180);
  height: 20%;
  position: sticky;
  top: 0; /* 指定固定位置 */
  z-index: 100;
}
.paiter-head-title {
  color: white;
  font-weight: 700;
  font-size: 3vw;
  position: absolute;
  bottom: 40px;
  left: 10%;
}
.block-wrapper {
  padding: 5px;
  border-radius: 4px;
  border: 2px dashed transparent;
  margin-bottom: 10px;
}
.block-wrapper.debug {
  border: 2px dashed #e8e8e8;
}

.block-toolbar-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  color: white;
  background: rgb(56, 55, 55);
  cursor: pointer;
  margin-left: 5px;
}
</style>

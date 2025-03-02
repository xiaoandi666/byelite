import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Block } from '@/types/block'
import { blocks as mockBlocks } from '@/mock/blocks'

export const useEditorStore = defineStore('editor', () => {
  const blocks = ref<Block[]>(mockBlocks)
  const activeBlockId = ref<string | null>(null)
  const addBlock = (block: Block) => {
    blocks.value.push(block)
  }
  const updateBlock = (block: Block) => {
    const index = blocks.value.findIndex((b) => b.id === block.id)
    if (index !== -1) {
      blocks.value.splice(index, 1, block)
    }
  }
  const updateBlocks = (newBlocks: Block[]) => {
    blocks.value = newBlocks
  }

  const selectBlock = (block: Block) => {
    activeBlockId.value = block.id
  }
  //我们需要从active id 派生
  const selectedBlock = computed(() => {
    return blocks.value.find((block) => block.id === activeBlockId.value) || null
  })
  return {
    blocks,
    selectedBlock,
    activeBlockId,
    addBlock,
    updateBlocks,
    selectBlock,
    updateBlock,
  }
})

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
  const blocks = ref(['block1'])
  const addBlock = (block: any) => {
    blocks.value.push(block)
  }
  const updateBlocks = (newBlocks: any) => {
    blocks.value = newBlocks
  }
  return {
    blocks,
    addBlock,
    updateBlocks,
  }
})

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
  //开发模式
  const debug = ref(false)
  const toggleDebug = () => {
    debug.value = !debug.value
  }
  return {
    debug,
    toggleDebug,
  }
})

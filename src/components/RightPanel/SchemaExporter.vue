<template>
  <div class="schema-exporter-wrapper">
    <div class="schema-exporter-header">
      <span>导出 JSON</span>
      <copy class="icon" @click="handleCopyText" />
    </div>
    <vue-json-pretty
      class="json-pretty"
      showIcon
      showLineNumber
      editable
      :data="currentBlockInfo"
    />
  </div>
</template>

<script setup lang="ts">
import { Copy } from '@icon-park/vue-next'
import copyText from 'copy-text-to-clipboard'
import VueJsonPretty from 'vue-json-pretty'

const props = defineProps<{
  currentBlockInfo: any
}>()

const handleCopyText = () => {
  try {
    const blockJsonString = JSON.stringify(props.currentBlockInfo)
    copyText(blockJsonString)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.schema-exporter-wrapper {
  background-color: rgb(248, 248, 248);
  padding: 12px;
  border-radius: 6px;
  color: rgb(102, 102, 102);
  margin: 10px;
}
.schema-exporter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  margin-bottom: 12px;
  border-bottom: 1px solid #e6e6e6;
  color: #666;
  font-size: 12px;
}
.icon {
  cursor: pointer;
}
.icon:hover {
  color: #6592b7;
}
.json-pretty {
  color: #666;
  overflow-wrap: break-wrap;
}
</style>

<style>
.vjs-tree-node {
  border-radius: 6px;
}
.vjs-tree-node:hover {
  background-color: #e6e6e6;
  font-weight: 700;
}
</style>

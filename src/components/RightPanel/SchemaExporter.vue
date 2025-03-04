<template>
  <div class="schema-exporter-wrapper">
    <div class="schema-exporter-header">
      <span>导出 JSON</span>
      <Copy class="icon" @click="handleCopyText" />
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
    const blockJsonString = JSON.stringify(props.currentBlockInfo, null, 2)
    copyText(blockJsonString)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
/* 外层容器 */
.schema-exporter-wrapper {
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  color: #333;
  margin: 12px;
  transition: all 0.3s ease-in-out;
}

/* 头部样式 */
.schema-exporter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
  font-size: 14px;
  font-weight: 600;
  color: #444;
}

/* 复制按钮 */
.icon {
  cursor: pointer;
  font-size: 18px;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.icon:hover {
  color: #4078c0;
  transform: scale(1.1);
}

/* JSON 代码块 */
.json-pretty {
  font-size: 14px;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
  overflow-wrap: anywhere;
  line-height: 1.6;
  color: #333;
}

/* JSON 节点优化 */
.vjs-tree-node {
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out;
}

.vjs-tree-node:hover {
  background-color: #e6e6e6;
  font-weight: 600;
}
</style>

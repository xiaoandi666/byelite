<script setup lang="ts">
import { h } from 'vue'

type Field = {
  label: string
  id: string
  type: 'input' | 'select'
}

defineProps({
  title: {
    type: String,
    required: true,
  },
  onClick: {
    type: Function,
    required: true,
  },
})

const fieldMap = {
  input: h('input'),
  select: h('select'),
}

const fields: Field[] = [
  {
    label: '标题',
    id: '1',
    type: 'input',
  },
  {
    label: '副标题',
    id: '2',
    type: 'select',
  },
]
</script>

<template>
  <div class="form">
    <div class="form-item" v-for="field in fields" :key="field.id">
      <label :for="field.id" class="form-label">{{ field.label }}</label>
      <component :is="fieldMap[field.type]" :id="field.id" class="form-control" />
    </div>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9; /* 浅灰色背景 */
  border: 1px solid #ddd; /* 边框颜色 */
  border-radius: 8px; /* 圆角 */
  padding: 16px; /* 内边距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px; /* 间距 */
}

.form-label {
  font-weight: bold; /* 字体加粗 */
  margin-bottom: 4px; /* 标签与输入框的间距 */
  color: #333; /* 标签颜色 */
}

.form-control {
  padding: 8px; /* 输入框内边距 */
  border: 1px solid #ccc; /* 输入框边框颜色 */
  border-radius: 4px; /* 输入框圆角 */
  font-size: 14px; /* 字体大小 */
  color: #555; /* 输入框文字颜色 */
  background-color: #fff; /* 输入框背景颜色 */
}

.form-control:focus {
  outline: none; /* 移除默认焦点样式 */
  border-color: #007bff; /* 焦点时的边框颜色 */
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25); /* 焦点时的阴影效果 */
}
</style>

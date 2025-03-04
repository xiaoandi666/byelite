<script setup lang="ts">
import type { FormBlock } from '@/types/block'
import { h } from 'vue'

type Field = {
  label: string
  id: string
  type: 'input' | 'select'
}

const props = defineProps<{
  block: FormBlock
}>()

const fieldMap = {
  input: h('input'),
  select: h('select'),
}
</script>

<template>
  <div class="form">
    <div class="form-title">Form</div>
    <div class="form-item" v-for="field in props.block.props.fields" :key="field.id">
      <label :for="field.id" class="form-label">{{ field.label }}</label>
      <component :is="fieldMap[field.type]" :id="field.id" class="form-control" />
    </div>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  background-color: #ffffff; /* 白色背景 */
  border: 1px solid #e0e0e0; /* 浅灰色边框 */
  border-radius: 12px; /* 更大的圆角 */
  padding: 24px; /* 更大的内边距 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 更柔和的阴影 */

  margin: 0 auto; /* 居中显示 */
  width: 100%;
}

.form-title {
  font-size: 1.5rem; /* 更大的字体 */
  font-weight: bold; /* 加粗 */
  color: #2c3e50; /* 深蓝色 */
  margin-bottom: 16px; /* 标题与表单项的间距 */
  text-align: center; /* 标题居中 */
}

.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px; /* 更大的间距 */
}

.form-label {
  font-weight: 600; /* 更粗的字体 */
  margin-bottom: 8px; /* 标签与输入框的间距 */
  color: #333333; /* 深灰色 */
  font-size: 0.9rem; /* 稍小的字体 */
}

.form-control {
  padding: 10px 12px; /* 更大的内边距 */
  border: 1px solid #cccccc; /* 浅灰色边框 */
  border-radius: 8px; /* 更大的圆角 */
  font-size: 14px; /* 字体大小 */
  color: #333333; /* 输入框文字颜色 */
  background-color: #f9f9f9; /* 浅灰色背景 */
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease; /* 平滑过渡 */
}

.form-control:hover {
  border-color: #007bff; /* 悬停时的边框颜色 */
}

.form-control:focus {
  outline: none; /* 移除默认焦点样式 */
  border-color: #007bff; /* 焦点时的边框颜色 */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2); /* 焦点时的阴影效果 */
  background-color: #ffffff; /* 焦点时背景变为白色 */
}

/* 下拉菜单样式 */
select.form-control {
  appearance: none; /* 移除默认样式 */
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 12px center; /* 图标位置 */
  background-size: 12px; /* 图标大小 */
  padding-right: 32px; /* 为图标留出空间 */
}
</style>

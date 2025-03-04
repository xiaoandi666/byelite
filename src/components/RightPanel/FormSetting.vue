<template>
  <div class="form-container">
    <div class="title">表单</div>
    <div class="form">
      <div class="form-item" v-for="field in props.block.props.fields" :key="field.id">
        <label :for="field.id" class="form-label">{{ field.label }}</label>
        <!-- <component :is="fieldMap[field.type]" :id="field.id" class="form-control" /> -->
        <button class="remove-field" @click="removeField(field.id)">删除</button>
      </div>
    </div>
    <div class="add-field-container">
      <input
        v-model="newFieldLabel"
        type="text"
        placeholder="请输入字段名称"
        class="new-field-input"
      />
      <button class="add-field" @click="addField">添加</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormBlock } from '@/types/block'

const props = defineProps<{
  block: FormBlock
}>()

const emit = defineEmits<{
  (event: 'change', updatedBlock: FormBlock): void
}>()

const newFieldLabel = ref('') // 用于输入新字段的 label

const fieldMap = {
  input: 'input',
  select: 'select',
}

// 添加字段
const addField = () => {
  if (!newFieldLabel.value.trim()) {
    alert('请输入字段名称')
    return
  }

  const newField = {
    id: `field-${Date.now()}`,
    type: 'input', // 默认类型为 input
    label: newFieldLabel.value.trim(),
    placeholder: '请输入内容',
    required: false,
    value: '',
  }

  props.block.props.fields.push(newField)
  newFieldLabel.value = '' // 清空输入框
  emit('change', { ...props.block }) // 通知父组件字段变化
}

// 删除字段
const removeField = (id: string) => {
  props.block.props.fields = props.block.props.fields.filter((field) => field.id !== id)
  emit('change', { ...props.block }) // 通知父组件字段变化
}
</script>

<style scoped>
.form-container {
  width: 300px; /* 控制宽度为 300px */
  margin: 0 auto;
  padding: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center; /* 标题居中 */
}
/* 表单字段列表 */
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
/* 表单项 */
.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

/* 标签文本 */
.form-label {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.form-control {
  width: 100%; /* 输入框宽度占满容器 */
  padding: 0.5rem;
  border: 1px solid #cccccc;
  border-radius: 6px;
  background: #ffffff;
  font-size: 1rem;
  color: #333333;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}
/* 删除按钮 */
.remove-field {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.remove-field:hover {
  background: #cc0000;
}

.add-field-container {
  display: flex;

  gap: 0.5rem;
  margin-top: 1rem;
  border: 1px solid #cccccc;
  background: #ffffff;
  padding: 0.5rem;
  border-radius: 6px;
}

.new-field-input {
  width: 100%; /* 输入框宽度占满容器 */
  padding: 0.3rem;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 1rem;
  color: #333333;
  transition: border-color 0.3s ease;
}

.new-field-input:focus {
  border-color: #007bff;
  outline: none;
}

.add-field {
  background-color: rgb(66, 115, 178);

  color: #ffffff;
  border: none;
  padding: 0.3rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 28%; /* 按钮宽度占满容器 */
}

.add-field:hover {
  background-color: rgb(106, 143, 188);
}
</style>

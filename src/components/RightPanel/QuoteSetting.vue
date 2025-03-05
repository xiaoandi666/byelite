<script setup lang="ts">
import { useFieldArray, useForm } from 'vee-validate'
import { watch } from 'vue'

import type { QuoteBlock } from '@/types/block'

// 怎么传入 props，在这里如何定义？
const props = defineProps<{
  block: QuoteBlock
}>()

const emit = defineEmits<{ (event: 'change', block: QuoteBlock): void }>()

const { values, validate, defineInputBinds } = useForm({
  initialValues: {
    content: props.block.props.content,
  },
})
const { fields, push } = useFieldArray('blocks')

const content = defineInputBinds('content')
// 因为 useForm 和 useFieldArray 共享同一个表单上下文，
// 它们的数据结构是绑定在同一个 useForm 管理的 values 之上的
// ，所以 watch(values, ...) 监听 values 变化时，fields 发生变化（如 push 添加新字段）也会触发 watch 监听。
// useForm 维护 整个表单的状态，values 是一个响应式对象，包含所有表单字段的数据。
// useFieldArray('blocks') 只是 useForm 内部的一个 字段（数组），fields 实际上指向 values.blocks。
watch([values], ([newValues]) => {
  console.log('new', newValues)
  emit('change', { ...props.block, props: { ...props.block.props, ...newValues } })
})

// const c = useField('content')
</script>

<template>
  <div class="quote-setting">
    <div class="title">引用</div>
    <!-- 你在使用 v-model，一定要注意，你的实际需求到底是不是需要 input 受控 -->
    <!-- 如果用 v-model，是受控组件 1，不是受控组件 2 -->
    <!-- <input class="content-input" :defaultValue="props.block.props.content" /> -->
    <input class="content-input" v-bind="content" />

    <input v-for="field in fields" :key="field.key" class="content-input" v-model="field.value" />

    <button class="add-button" @click="push(new Date().toLocaleTimeString())">添加</button>

    <!-- 非受控 -->
    <!-- <input class="content-input" :defaultValue="value" @input="value = $event.target.value" /> -->
    <!-- 受控 -->
    <!-- <input class="content-input" :value="value" @input="value = $event.target.value" /> -->
    <!-- {{ value }} -->
    <!-- <button @click="value = '哈哈'">更改为 哈哈</button> -->

    <!--  -->
  </div>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  padding: 0.5rem;
}
.quote-setting {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  font-size: var(--font-size-large);
  border-radius: 8px;

  /* background-color: ; */
}
.content-input {
  width: 100%;

  /* 在做组件库的时候，input 是有一个 size 属性，sm、md、lg */
  height: 32px;
  margin-top: 8px;
  padding: 0 8px;
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  outline-style: none;
  color: var(--color-gray-800);
}

.add-button {
  margin-top: 6px;
  padding: 4px 12px;
  border-radius: 8px;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-300);
  cursor: pointer;
}
</style>

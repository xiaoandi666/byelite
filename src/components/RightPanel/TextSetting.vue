<template>
  <div class="title">文本</div>
  <input class="content" v-bind="contentAttr" v-model="content" />
  <div style="color: red; margin-left: 5px" v-if="errors.content" class="error">
    {{ errors.content }}
  </div>
</template>

<script setup lang="ts">
import type { TextBlock } from '@/types/block'
import { useForm, defineRule } from 'vee-validate'
import { watch } from 'vue'
defineRule('required', (value: string) => {
  if (!value || !value.length) {
    return 'This field is required'
  }
  return true
})

const props = defineProps<{
  block: TextBlock
}>()

const { errors, defineField } = useForm({
  validationSchema: {
    content: 'required',
  },
  initialValues: {
    content: props.block.props.content,
  },
})

const [content, contentAttr] = defineField('content')

watch(content, (newVal) => {
  const block = { ...props.block, props: { ...props.block.props, content: newVal } }
  emit('change', block)
})

const emit = defineEmits<{ (event: 'change', block: TextBlock): void }>()
const handleChange = (content: string) => {
  const block = { ...props.block, props: { ...props.block.props, content } }
  emit('change', block)
}
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  padding: 0.5rem;
}
.content {
  width: 96%;
  border-radius: 5px;
  height: 2rem;
  margin-top: 5px;
  margin-left: 2%;
}
</style>

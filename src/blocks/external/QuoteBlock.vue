<script setup lang="ts">
import { Error, Success, Wallet } from '@icon-park/vue-next'

import type { QuoteBlock } from '@/types/block'

const STATUS_MAP = {
  success: {
    color: '#059669',
    bgColor: '#E4F2E9',
    borderColor: '#79DBA2',
    icon: Success,
  },
  warning: {
    color: '#E18F05',
    bgColor: '#F8ECEC',
    borderColor: '#79DBA2',
    icon: Error,
  },
  error: {
    color: '#DC2C26',
    bgColor: '#F8ECEC',
    borderColor: '#F3A9A5',
    icon: Wallet,
  },
}

const props = defineProps<{
  block: QuoteBlock
}>()

const { color, bgColor, /* borderColor, */ icon } = STATUS_MAP[props.block.props.status]
</script>

<template>
  <div
    class="quote"
    :style="{ backgroundColor: bgColor, color /* , border: `1px solid ${borderColor}` */ }"
  >
    <component :is="icon" />
    <span class="quote-text">{{ props.block.props.content }}</span>
    <div
      style="margin-left: 6px; margin-top: 4px"
      v-for="block in props.block.props.blocks"
      :key="block"
    >
      {{ block }}
    </div>
  </div>
</template>

<style scoped>
.quote {
  display: flex;
  flex-direction: column;

  flex: 1;
  font-size: var(--font-size-large);
  padding: 8px 18px;
  border-radius: 8px;

  /* background-color: ; */
}

.quote-text {
  margin-left: 6px;
}
</style>

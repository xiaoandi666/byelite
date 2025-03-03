<template>
  <div ref="chartRef" class="echarts-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { ECharts } from 'echarts/core'
import { init } from 'echarts'

// 模拟数据
const mockData = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Line 1',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130],
      markLine: {
        data: [{ type: 'average', name: '平均值' }],
      },
    },
    {
      name: 'Line 2',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310],
      markLine: {
        data: [{ type: 'average', name: '平均值' }],
      },
    },
  ],
}

// 定义图表实例
const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = init(chartRef.value)
    setOption(mockData) // 设置模拟数据
  }
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

// 设置图表配置的方法
function setOption(option: any) {
  if (chartInstance) {
    chartInstance.setOption(option)
  } else {
    console.warn('ECharts 实例尚未初始化')
  }
}
</script>

<style scoped>
.echarts-container {
  width: 100%;
  height: 400px; /* 可根据需要调整高度 */
}
</style>

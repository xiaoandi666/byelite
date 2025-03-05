<template>
  <div>
    <canvas id="canvas" width="1200" height="900" ref="canvas"> 111 </canvas>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'

//拿到屏幕的缩放比例
const pixelRatio = window.devicePixelRatio

//获取canvas dom 引用
//一定不要用dom操作
const canvas = ref(null)
const data = reactive({
  columns: ['ID', 'Name', 'Age'],
  rows: Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    age: 20 + (i % 50),
  })),
})
onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  const { columns, dataSource } = data
  //画笔的概念
  //假设你在用毛笔练习书法
  const cellWidth = 100 * pixelRatio
  const cellHeight = 50 * pixelRatio
  const padding = 10
  // 按下去
  ctx.beginPath()

  //画表格
  //画表头
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i]
    ctx.font = `${18 * pixelRatio}px bold`
    ctx.fillText(column, i * cellWidth + padding, cellHeight / 2)
  }

  ctx.closePath()
})
</script>
<style scoped>
canvas {
  background-color: rgb(177, 171, 171);
}
</style>

<template>
  <div class="container">
    <canvas ref="canvas" @mousedown="handleMouseDown"></canvas>
    <div ref="scrollContainer" class="scroll-container" @scroll="handleScroll">
      <div ref="spacer" :style="{ height: spacerHeight + 'px' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const scrollContainer = ref<HTMLDivElement | null>(null)

interface Row {
  id: number
  name: string
  age: number
}

const data = reactive({
  columns: [
    { title: 'ID', key: 'id', width: 200 },
    { title: 'Name', key: 'name', width: 400 },
    { title: 'Age', key: 'age', width: 200 },
  ],
  rows: Array.from({ length: 1000000 }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    age: 20 + (i % 50),
  })),
})

const rowHeight = 30 // 将行高设为30，减少每行占用的高度
const headerHeight = 30 // 将表头高度设为30
const visibleRows = 29 // 增加可见行数
const containerHeight = 883 // 容器高度保持不变
const devicePixelRatio = window.devicePixelRatio || 1

const totalContentHeight = data.rows.length * rowHeight + headerHeight
const spacerHeight = totalContentHeight > containerHeight ? totalContentHeight : 0

const selectedCell = reactive({ row: -1, column: -1 })

onMounted(() => {
  if (canvas.value) {
    adjustCanvasResolution()
    drawTable()
    canvas.value.addEventListener('click', handleClick)
  }
})

onUnmounted(() => {
  canvas.value?.removeEventListener('click', handleClick)
})

watch(
  () => scrollContainer.value?.scrollTop,
  () => drawTable(),
)

function adjustCanvasResolution() {
  if (!canvas.value) return
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  const canvasWidth = 1400 // 宽度不变
  canvas.value.width = canvasWidth * devicePixelRatio
  canvas.value.height = containerHeight * devicePixelRatio
  canvas.value.style.width = `${canvasWidth}px`
  canvas.value.style.height = `${containerHeight}px`

  context.value = ctx
  context.value.scale(devicePixelRatio, devicePixelRatio)
}

function handleScroll() {
  drawTable()
}

function handleMouseDown(event: MouseEvent) {
  console.log('MouseDown event detected:', event)
}

function handleClick(event: MouseEvent) {
  if (!canvas.value) return

  const { left, top } = canvas.value.getBoundingClientRect()
  const x = event.clientX - left
  const y = event.clientY - top

  const rowIndex = Math.floor(y / rowHeight) - 1
  const colIndex = Math.floor(x / 100)

  if (rowIndex >= 0 && rowIndex < data.rows.length) {
    selectedCell.row = rowIndex
    selectedCell.column = colIndex
    drawTable()
  }
}

function drawTable() {
  if (!context.value || !canvas.value || !scrollContainer.value) return

  const ctx = context.value
  const scrollTop = scrollContainer.value.scrollTop
  const startRow = Math.floor(scrollTop / rowHeight)
  const endRow = startRow + visibleRows

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.fillStyle = '#000'
  ctx.font = '14px Arial'
  ctx.textBaseline = 'middle'

  ctx.fillStyle = '#ddd'
  ctx.fillRect(0, 0, canvas.value.width, headerHeight)
  ctx.fillStyle = '#000'
  data.columns.forEach((col, index) => {
    ctx.fillText(col.title, index * 466 + 230, headerHeight / 2)
  })

  for (let i = startRow; i < endRow; i++) {
    if (i >= data.rows.length) break
    const y = (i - startRow) * rowHeight + headerHeight
    data.columns.forEach((col, j) => {
      const text = String(data.rows[i][col.key as keyof Row])
      ctx.fillText(text, j * 466 + 230, y + rowHeight / 2)
      if (selectedCell.row === i && selectedCell.column === j) {
        ctx.fillStyle = 'yellow'
        ctx.fillRect(j * 100, y, 100, rowHeight)
        ctx.fillStyle = '#000'
        ctx.fillText(text, j * 100 + 10, y + rowHeight / 2)
      }
      if (canvas.value) {
        ctx.strokeStyle = '#ccc'
        ctx.beginPath()
        ctx.moveTo(0, y + rowHeight)
        ctx.lineTo(canvas.value.width, y + rowHeight)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(j * 466, 0)
        ctx.lineTo(j * 466, canvas.value.height)
        ctx.stroke()
      }
    })
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.scroll-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  background-color: #fff;
}
</style>

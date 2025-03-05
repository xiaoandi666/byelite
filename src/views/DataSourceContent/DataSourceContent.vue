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
    { title: 'ID', key: 'id', width: 100 },
    { title: 'Name', key: 'name', width: 200 },
    { title: 'Age', key: 'age', width: 100 },
  ],
  rows: Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    age: 20 + (i % 50),
  })),
})

const rowHeight = 30
const headerHeight = 30
const visibleRows = 11
const containerHeight = 330
const devicePixelRatio = window.devicePixelRatio || 1

const totalContentHeight = data.rows.length * rowHeight + headerHeight
const spacerHeight = totalContentHeight > containerHeight ? totalContentHeight - containerHeight : 0

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

  const canvasWidth = 400
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
    ctx.fillText(col.title, index * 100 + 10, headerHeight / 2)
  })

  for (let i = startRow; i < endRow; i++) {
    if (i >= data.rows.length) break
    const y = (i - startRow) * rowHeight + headerHeight - (scrollTop % rowHeight)
    data.columns.forEach((col, j) => {
      const text = String(data.rows[i][col.key as keyof Row])
      ctx.fillText(text, j * 100 + 10, y + rowHeight / 2)
      if (selectedCell.row === i && selectedCell.column === j) {
        ctx.fillStyle = 'yellow'
        ctx.fillRect(j * 100, y, 100, rowHeight)
        ctx.fillStyle = '#000'
        ctx.fillText(text, j * 100 + 10, y + rowHeight / 2)
      }
      ctx.strokeStyle = '#ccc'
      ctx.beginPath()
      ctx.moveTo(0, y + rowHeight)
      ctx.lineTo(canvas.value.width, y + rowHeight)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(j * 100, 0)
      ctx.lineTo(j * 100, canvas.value.height)
      ctx.stroke()
    })
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 420px;
}

.scroll-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 330px;
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

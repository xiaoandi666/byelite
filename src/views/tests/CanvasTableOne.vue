<template>
  <div>
    <canvas id="canvas" width="1200" height="900" ref="canvas"> 111 </canvas>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
//获取canvas dom 引用
//一定不要用dom操作
const canvas = ref(null)
onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  //画笔的概念
  //假设你在用毛笔练习书法
  // 按下去
  ctx.beginPath()
  // 开始写字
  ctx.moveTo(0, 0)
  ctx.lineTo(100, 100)
  //设置画笔
  //fill填充
  //stroke描边
  ctx.strokeStyle = 'red'
  //画文字
  ctx.font = '48px serif'
  ctx.fillText('hello world', 100, 200) //content x y
  ctx.stroke()
  //问题：像素过低
  //原因：
  //canvas是位图，需要处理缩放的问题，很多图画*2 *3
  //怎么获取浏览器的设备像素比
  console.log(window.devicePixelRatio)
  //svg是矢图

  // 回峰收笔
  ctx.closePath()
})
</script>
<style scoped>
canvas {
  background-color: rgb(177, 171, 171);
}
</style>

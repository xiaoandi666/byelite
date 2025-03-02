<!-- 共同去处理、规范约定他们 -->
<!-- Text/Image/Chart -->

<template>
  <div>{{ chart.type }}</div>
</template>

<script setup lang="ts">
const chart = {
  type: 'chart',
  props: {
    xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    yAxis: [820, 932, 901, 934, 1290, 1330, 1320],
  },
}
</script>

<style></style>

<script setup>
import { onMounted, ref } from 'vue'
const container = ref(null)
 defineProps({
  text: {
    type: String,
    required: true
  },
  padding: {
    type: Number,
    required: true
  }
})
onMounted(() => {
  adjustFontSize(container)
})
function adjustFontSize(container) {
  const maxWidth = container.value.parentNode.offsetWidth // 容器的最大宽度
  const scrollWidth = container.value.scrollWidth // 内容的实际宽度
  const fontSize = parseInt(window.getComputedStyle(container.value).getPropertyValue('font-size')) // 当前字号

  if (scrollWidth > maxWidth) {
    // 如果内容溢出
    container.value.style.fontSize = fontSize - 1 + 'px' // 缩小字号
    // 递归调用以确保字号缩小到合适大小
    adjustFontSize(container)
  }
}
</script>

<template>
  <div class="container" ref="container">&nbsp;{{ text }}&nbsp;</div>
</template>
<style scoped lang="less">
.container {
  display: inline-block;
  position: relative;
}
</style>

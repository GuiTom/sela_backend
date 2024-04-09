<script setup>
import { onMounted, ref } from 'vue'
import defalutPlaceHoder from "@/assets/avatar_placeholder.png"
const imgLoaded = ref(false)
const props = defineProps({
  src: {
    type: String,
    required: false,
  },

},

)

onMounted(() => {
  console.log('placeHolder',props.placeHolder)
})
</script>
<template>
  <div class="container">
    <img v-if="!imgLoaded" :src="defalutPlaceHoder" />
    <img v-if="src" :src="src" @load="imgLoaded = true" />
    <slot name="content"></slot>
  </div>
</template>
<style scoped lang="less">
.container {
  position: relative;
  border-radius: 50%;

}
img {
  position: absolute;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>

<script setup>
import levelImg1 from '@/assets/anchor_level_1.png'
import levelImg2 from '@/assets/anchor_level_2.png'
import levelImg3 from '@/assets/anchor_level_3.png'
import levelImg4 from '@/assets/anchor_level_4.png'
import levelImg5 from '@/assets/anchor_level_5.png'
const levelImgs = [levelImg1,levelImg2,levelImg3,levelImg3,levelImg4,levelImg5]
defineProps({
  level: {
    type: Number,
    required: true
  },

})

</script>
<template>
    <span class="level" :style="'background-image: url('+levelImgs[level-1]+')'"></span>
</template>
<style scoped lang="less">
.level {
    margin-left: 5px;
    display: inline-block;
    width: 42px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    color:#ffffff;
    background-size: cover;
    text-align: right;
    padding-right: 10px;
    font-size: 12px;
    font-weight: 400;
}
</style>

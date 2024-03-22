<script setup>
import banner_1 from "@/assets/activity/banner_1.webp"
import banner_2 from "@/assets/activity/banner_2.webp"
import banner_3 from "@/assets/activity/banner_3.webp"
const props = defineProps({
  images: {
    type: String,
    required: true
  },
})

// const imgs = images;
const imgs = [banner_1, banner_2, banner_3];
</script>
<template>
        <!-- 主播管理 -->

          <van-swipe class="swiper" :autoplay="2000" style="height: 16vw;width:93.6vw;margin:3.2vw;" vertical>
            <van-swipe-item v-for="(item,index) in imgs" :key="index">
                <img :src="item"/>
            </van-swipe-item>
          </van-swipe>
</template>
<style scoped lang="less">
.swiper{

  border-radius: 12px;
 
    div img{
        width: 100%;
        height: 100%;
    }
}
</style>
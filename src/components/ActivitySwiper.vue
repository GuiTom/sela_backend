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
          <div class="root_container">

          <van-swipe class="swiper" :autoplay="2000" style="height: 16vw;width:93.6vw;margin:3.2vw;" vertical>
            <van-swipe-item v-for="(item,index) in imgs" :key="index">
                <img :src="item"/>
            </van-swipe-item>
            <template #indicator="{ active, total }">
              
            </template>
          </van-swipe>
          <!-- <div class="flag">
            conduct
          </div> -->
        </div>
</template>
<style scoped lang="less">
.root_container{
  position: relative;
.swiper{

  border-radius: 12px;
 
    div img{
        width: 100%;
        height: 100%;
    }
}
.flag{
  position: absolute;
  top: 3.18vw;left:3vw;
  width: 70px;
  height: 18px;
  background-color:white;
  border-radius: 12px 0 12px 0;
  text-align: center;
  color: #FA62F2;
  line-height: 18px;
}
}
</style>
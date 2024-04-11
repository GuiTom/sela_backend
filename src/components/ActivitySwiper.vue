<script setup>
import banner_1 from "@/assets/activity/banner_1.webp"
import banner_2 from "@/assets/activity/banner_2.webp"
import banner_3 from "@/assets/activity/banner_3.webp"
import { multiLan } from "@/utils/lan";
const props = defineProps({

  data: {
    type: Array,
    required: true
  },
})

// const imgs = images;
// const imgs = [banner_1, banner_2, banner_3];
console.log(props.images)
</script>
<template>
  <!-- 主播管理 -->
  <div class="root_container">

    <van-swipe class="swiper" :autoplay="2000" style="height: 98px;width:93.6vw;margin:12px;" vertical>
      <van-swipe-item v-for="(item, index) in data" :key="index">
        <div class="item">
          <div class="first_column">
            <div class="first_row">
              <img src="@/assets/activity_icon.png" />
              <div>{{ multiLan('Activity square') }}</div>
            </div>
            <div class="second_row">{{ item.activityName }}</div>
            <div class="third_row">
              
              <div v-if="item.status == 3" class="will">{{multiLan('WillStart')}}</div>
              <div v-else-if="item.status == 1" class="running">{{ multiLan('Is Running') }}</div>
              <div v-else-if="item.status == 2" class="ended">{{ multiLan('Ended') }}</div>
            </div>
          </div>
          <div class="view_button">{{multiLan('View')}}</div>

        </div>
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
.root_container {

  position: relative;
  
  .swiper {
    background: linear-gradient(to bottom, #F4F6EE 0%, #FDEED9 100%);
    border: 1px solid #FFDFA8;
    border-radius: 12px;
    .item {
      padding: 0 12px;
      height: 100%;
      width: calc(100vw - 24px);
      background-color: #FFF3D7;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .first_column {
        width: calc(100vw - 24px - 80px);
        display: flex;
        flex-direction: column;
        flex: auto;
        .first_row {
          
          display: flex;
          flex-direction: row;
          align-items: center;
          font-weight: 600;
          font-size: 14px;
          color: #000000;

          >img {
            margin-right: 5px;
            width: 18px;
            height: 18px;
          }
        }

        .second_row {
          margin-top: 4px;
          font-weight: 500;
          font-size: 14px;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #333333;
          white-space: nowrap;
          
        }

        .third_row {
          max-width: calc(100% - 34px);
          margin-top: 7px;
          display: flex;
          text-overflow: ellipsis;
          overflow: hidden;
          flex-direction: row;
          align-items: center;
          
          .running,
          .will,
          .ended {
            background-color: #10D582;
            border-radius: 16px;
            padding: 3px 15px;
            color: #F8F8F8;
            line-height: 18px;
            text-wrap: nowrap;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
         
          }

          .ended {
            background-color: #A7A2A7;
          }

          .title {
            margin-left: 4px;
            color: #737373;
            font-size: 13px;
            line-height: 18px;
          }
        }
      }

      .view_button {

        background-color: #FF8F16;
        color: #F8F8F8;
        padding: 5px 15px;
        font-size: 12px;
        border-radius: 18.5px;
        text-align: center;
        width: 60px;
        max-height: 30px;
        text-overflow: ellipsis;
        overflow: hidden;
        
      }
    }
  }

}
</style>
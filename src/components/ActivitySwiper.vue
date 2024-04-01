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

    <van-swipe class="swiper" :autoplay="2000" style="height: 16vw;width:93.6vw;margin:3.2vw;" vertical>
      <van-swipe-item v-for="(item, index) in data" :key="index">
        <div class="item">
          <div class="first_column">
            <div class="first_row">
              <img src="@/assets/activity_icon.png" />
              <div>{{multiLan('Activity square')}}</div>
            </div>
            <div class="second_row">
              <div v-if="item.status==1&&item.recordStatus!=3" class="running">{{multiLan('Is Running')}}</div>
              <div v-if="item.recordStatus==4" class="received">{{multiLan('Received')}}</div>
              <div v-if="item.recordStatus==5" class="ended">{{multiLan('Ended')}}</div>
              <div class="title">{{item.activityName}}</div>
            </div>

          </div>
          <div class="view_button">查看</div>

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

    border-radius: 12px;



    .item {
      padding: 9px 12px;
      height: 100%;
      background-color: #FFF3D7;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .first_column {
        display: flex;
        flex-direction: column;

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
          margin-top: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
          .running{
            background-color: #10D582;
            border-radius: 16px;
            padding: 1px 4px;
            color:#F8F8F8;
            line-height: 18px;
            text-align: center;
          }
          .title{
            margin-left: 4px;
            color: #737373;
            font-size: 13px;
            line-height: 18px;
          }
        }
      }
      .view_button{
        background-color: #FF8F16;
        color: #F8F8F8;
        padding: 5px 15px;
        font-size: 12px;
        border-radius: 18.5px;
      }
    }
  }

}
</style>
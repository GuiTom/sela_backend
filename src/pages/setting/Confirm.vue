<script setup>
import { multiLan } from '@/utils/lan';

const emit = defineEmits(['cancel','confirm'])
function cancel(){
  emit('cancel');
}
function confirm(){
  emit('confirm');
}
</script>
<template>
  <div class="bg">
    <div class="container">
      <div class="title">{{multiLan('Confirm to logout')}}?</div>
      <div class="horizontal_divider"></div>
      <div class="buttons"><span @click="cancel">{{multiLan('Cancel')}}</span><span class="divider"></span><span @click="confirm">{{multiLan('Confirm')}}</span></div>
    </div>
  </div>
</template>
<style scoped lang="css">
.bg {
  background-color: #000000b3;
  width: 100%;
  height: 100%;
  top: 0;
  position: fixed;
  text-align: center;
  .container {
    height: 200px;
    border-radius: 30px;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: white;
    margin: calc(50vh - 100px) 36px;
    .title {
      padding: 45px 0;
      font-size: 20px;
      font-weight: 600;
      color: #000000;
      line-height: 28px;
    }
    .horizontal_divider {
      width: 100%;
      height: 1px;
      background-color: #eeeeee;
    }
    .divider {
      display: inline-block;
      height: 30px;
      width: 1px;
      background-color: #eeeeee;
    }
    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      padding: 30px 0;
      font-size: 16px;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 600;

      line-height: 22px;
      > span:nth-child(1) {
        color: #999999;
      }
      > span:nth-child(3) {
        color: #8d5dff;
      }
    }
  }
}
</style>

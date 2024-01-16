<script setup>
import { multiLan } from '@/utils/lan';
import {ref } from 'vue';

 const props= defineProps({
  initialIndex: {
    type: Number,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
})

const currentIndex  = ref(props.initialIndex)

</script>
<template>
<div class="menu_container">
  
  <div class="menu">
    <div class="title">{{multiLan('Language')}}</div>
    <div v-if="options != null">
      <div class="item_container" v-for="(item, index) in options">

        <div @click="$event.stopPropagation();currentIndex = index; $emit('item_selected',index);" :class="index == initialIndex ? 'selected' : 'item'">{{ item }}</div>
        <img
        v-if="index == currentIndex"
        src="@/assets/selected.webp"
        style="width: 10px; height: 10px;margin-right:2px;"
      />
      </div>
    </div>
  </div>
  <div style="width: 20px;"></div>
</div>
</template>
<style scoped lang="less">
.menu_container{
  position: absolute;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  background-color: rgba(0,0,0,0);
}
.menu {
    padding: 10px 15px;
 
    right: 20px;
    margin-top:95px;
    background: #FFFFFF;
    box-shadow: 0px 3px 16px 0px rgba(0,0,0,0.5);
    border-radius: 8px;
    text-wrap:nowrap;

  .title {
    font-size: 16px;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 22px;
  }
  .item_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #333333;
    line-height: 17px;
    padding: 10px 2px;
    >img{
      display: inline-block;
    }
    >div{
    word-break: keep-all;
    white-space: nowrap;
      display: inline-block;
    }
    .selected {
      color: #ff55ac;
    }
  }
}
</style>

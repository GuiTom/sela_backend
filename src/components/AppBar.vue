<script setup>
import { onMounted,ref } from 'vue';
import router from '@/router/index';
const arror = ref(null)
const emit = defineEmits(['back'])
defineProps({
  title: {
    type: String,
    required: true
  },
  onBack: {
    type: Function,
    required:false
  }
})
onMounted(()=>{
  if(document.documentElement.getAttribute('dir')=='rtl'){
    arror.value.style.right = '15px'
    arror.value.style.transform = 'scaleX(-1)';
  }else {
    arror.value.style.left = '15px'
  }
})
function onClickBack(){
  if(router.currentRoute.value.path == '/home'){
    Android.back()
  }else {
    router.go(-1)
  }
}
</script>
<template>
    <div class="app_bar">
        <img class="left_arror" ref="arror" @click="onClickBack" src="@/assets/left_arror.webp" />
        <span class="title">{{title}}</span>
        <span class="actions"><slot name="right_icon"></slot></span>
      </div>
</template>
<style scoped lang="less">
.app_bar {
    padding-top: 12px;
    position: relative;
    display: flex;
    height: 45px;
    padding-left: 15px;
    padding-right: 15px;
    justify-content: space-between;
  .left_arror {
    
    width: 23px;
    height: 22px;
  }
  
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;

  }
  .actions{

    
    display: inline-block;
  }
}
</style>
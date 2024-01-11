<script setup>
import {ref} from 'vue'
import AppBarVue from '@/components/AppBar.vue'
import BottomSheet from './BottomSheet.vue';
import router from '../../router/index'
const showBottomSheet = ref(false)
function onClickChangePassword(){
  showBottomSheet.value = true;

}
function onClickLogout(){
  let ok = confirm('确认退出吗');
  if(ok){
    localStorage.clear();
    router.push('/')
  }
}
</script>
<template>
  <div class="container">
    <AppBarVue title="设置"></AppBarVue>
    <div class="item" @click="onClickChangePassword">
      <span>修改密码</span>
      <span><img class="right_arror" src="@/assets/right_arror.webp" /></span>
    </div>
    <div class="item" @click="onClickLogout">
      <span>退出账号</span>
      <span><img class="right_arror" src="@/assets/right_arror.webp" /></span>
    </div>
  </div>
  <BottomSheet v-if="showBottomSheet" @close="showBottomSheet = false"></BottomSheet>
</template>
<style scoped lang="less">
.item {
  margin: 10px 12px;
  padding: 5px 12px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
  img {
    width: 6px;
    height: 14px;
  }
}
</style>

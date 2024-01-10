<script setup>
import AppBarVue from '@/components/AppBar.vue'
function onClickChangePassword(){

}
function onClickLogout(){

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

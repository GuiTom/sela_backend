<script setup>
import { ref } from 'vue'
import AppBarVue from '@/components/AppBar.vue'
import BottomSheet from './BottomSheet.vue'
import Confirm from './Confirm.vue'
import router from '../../router/index'
import { multiLan } from '@/utils/lan'
const showBottomSheet = ref(false)
const showConfirm = ref(false)
function onClickChangePassword() {
  showBottomSheet.value = true
}
function onClickLogout() {
  showConfirm.value = true
}
function onCancel() {
  showConfirm.value = false
}
function onConfirm() {
  localStorage.clear()
  showConfirm.value = false
  router.push('/')
}
</script>
<template>
  <div class="container">
    <AppBarVue :title="multiLan('System settings')"></AppBarVue>
    <div class="item" @click="onClickChangePassword">
      <span>{{multiLan('Change password')}}</span>
      <span><img class="right_arror" src="@/assets/right_arror.webp" /></span>
    </div>
    <div class="item" @click="onClickLogout">
      <span>{{multiLan('Log out')}}</span>
      <span><img class="right_arror" src="@/assets/right_arror.webp" /></span>
    </div>
  </div>
  <BottomSheet v-if="showBottomSheet" @close="showBottomSheet = false"></BottomSheet>
  <Confirm v-if="showConfirm" @cancel="onCancel" @confirm="onConfirm"></Confirm>
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

<script setup>
import { ref } from 'vue'
import AppBarVue from '@/components/AppBar.vue'

import Confirm from './Confirm.vue'
import router from '../../router/index'
import { multiLan } from '@/utils/lan'
import AutoRTLImg from '@/components/AutoRTLImg.vue'
import rightArrorImg from '@/assets/right_arror.webp'

const showConfirm = ref(false)
function onClickChangePassword() {
  router.push('/changePassword')
}
function onClickLogout() {
  showConfirm.value = true
}
function onCancel() {
  showConfirm.value = false
}
function onConfirm() {
  localStorage.clear()
  let lan = navigator.language.split('-')[0]

  localStorage.setItem('currentLanguage', lan)
  if (lan != 'ar') {
    document.documentElement.setAttribute('dir', 'ltl')
  } else {
    document.documentElement.setAttribute('dir', 'rtl')
  }
  showConfirm.value = false
  router.push('/')
}
</script>
<template>
  <div class="container">
    <AppBarVue :title="multiLan('System settings')"></AppBarVue>
    <div class="item" @click="onClickChangePassword">
      <span>{{ multiLan('Change password') }}</span>
      <span><AutoRTLImg class="right_arror" :src="rightArrorImg"></AutoRTLImg></span>
    </div>
    <div class="item" @click="onClickLogout">
      <span>{{ multiLan('Log out') }}</span>
      <span><AutoRTLImg class="right_arror" :src="rightArrorImg"></AutoRTLImg></span>
    </div>
  </div>

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

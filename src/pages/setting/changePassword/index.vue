<script setup>
import { ref } from 'vue'
import toast from '@/utils/toast'
import api from '@/controller/request'
import router from '@/router/index'
import { multiLan } from '@/utils/lan'
import CoustomInput from '../CoustomInput.vue'
import AppBarVue from '@/components/Appbar.vue'

const primaryPassword = ref(null)
const newPassword = ref(null)
const confirmNewPassword = ref(null)
function onConfirm() {
  // console.log(primaryPassword.value.value,newPassword.value.value,confirmNewPassword.value.value)
  if (newPassword.value.value != confirmNewPassword.value.value) {
    toast(multiLan('Twice password diff'))
    return
  }
  const path = '/manager/guildh5/change/password'
  api
    .post(path, {
      oldPassword: primaryPassword.value.value,
      newPassword: newPassword.value.value
    })
    .then(function (response) {
      if (response.data.code == 0) {

        localStorage.clear()
        router.go(-1)
      }
    })
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
}
</script>
<template>
  <AppBarVue :title="multiLan('Change password')"></AppBarVue>
  <div class="container" @click="$event.stopPropagation()">
    <CoustomInput
      type="password"
      ref="primaryPassword"
      :placeholder="multiLan('Please enter the original password')"
    ></CoustomInput>
    <CoustomInput
      type="password"
      ref="newPassword"
      :placeholder="multiLan('Please enter the new password')"
    ></CoustomInput>
    <CoustomInput
      type="password"
      ref="confirmNewPassword"
      :placeholder="multiLan('Please confirm the new password')"
    ></CoustomInput>
    <button type="submit" @click="onConfirm">{{ multiLan('Confirm') }}</button>
  </div>
</template>
<style scoped lang="less">
.container {
  width: 100%;
  margin-top: 30px;
  display: flex;
  padding: 0 20px 30px 20px;
  background-color: white;
  border-radius: 30px 30px 0 0;
  flex-direction: column;
  justify-content: flex-start;
  button {
    margin: 12px 0 0 0;
    height: 54px;
    background: #8d5dff;
    border-radius: 27px;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    line-height: 22px;
    border: 0;
    display: block;
  }
  .password {
    margin: 15px 0;
    height: 54px;
    display: block;
    background: #f5f5f5;
    border-radius: 12px;
    color: #999999;
    border: 0;
  }
}
</style>

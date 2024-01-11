<script setup>
import {ref} from 'vue'
import toast from '@/utils/toast'
import api from '@/controller/request'
const emit = defineEmits(['close'])
const primaryPassword = ref(null)
const newPassword = ref(null)
const confirmNewPassword = ref(null)
function onConfirm() {
    console.log(primaryPassword.value.value,newPassword.value.value,confirmNewPassword.value.value)
    if(newPassword.value.value!=confirmNewPassword.value.value){
        toast('两次输入的新密码不一致');
        return;
    }
    const path = '/manager/guildh5/change/password';
  api
    .post(path, {
        oldPassword:primaryPassword.value.value,  
        newPassword: newPassword.value.value
    })
    .then(function (response) {
        if(response.code==0){
            emit('close')
        }
    })
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })

}

</script>
<template>
 <div class="bg" @click="emit('close')"></div>
  <div class="container">
    <div class="title">修改密码</div>
    <input type="password" ref="primaryPassword" placeholder="请输入原密码" />
    <input type="password" ref="newPassword" placeholder="请输入新密码" />
    <input type="password" ref="confirmNewPassword" placeholder="请确认新密码" />
    <button type="submit" @click="onConfirm">确定</button>
  </div>
</template>
<style scoped lang="less">
.bg{
    position: fixed;
    width:100%;
    height: 100%;
    top:0;
    background-color: #000000B3;
}
.container {
  position: fixed;
  width: 100%;
  bottom:0;
  height: 600px;
  display: flex;
  padding: 0 20px;
  background-color: white;
  border-radius: 12px;
  flex-direction: column;
  .title{
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 25px
  }
  input {
    margin: 15px 0;
    height: 54px;
    display: block;
    background: #f5f5f5;
    border-radius: 12px;
    padding: 0 12px;
    color: #999999;
    border: 0;
  }
  button {
    margin: 12px 0;
    height: 54px;
    background: #8d5dff;
    border-radius: 27px;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    line-height: 22px;
    border: 0;
  }
}
</style>

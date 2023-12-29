<script setup>
import LoginForm from '../../components/LoginForm.vue'
import axios from 'axios'

function onSubmit(username,password){
  console.log(username,password);
  axios
    .get('login.json')
    .then((response) => (data.value = response.data))
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
}


</script>

<template>
<div class="container">
  <img id="logo" src="@/assets/logo.png">
  <div>
    <LoginForm @submit="onSubmit"></LoginForm>
  </div>
</div>
</template>
<style scoped>
.container{
  width:100%;
  text-align:center;
  background-image: url('@/assets/login/login_bg.jpg');  
  margin:0,
}
.container div{
  text-align:left;
}
.container img{
  margin-top:120px;
}
</style>

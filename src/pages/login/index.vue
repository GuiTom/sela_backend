<script setup>
import LoginForm from '../../components/LoginForm.vue'
import api from '../../controller/request'
import { ref } from 'vue'
import router from '../../router/index'
const authorization = ref(null)
function onSubmit(username, password) {
 
  
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  api
    .post('/manager/login/guild', {
      username: username,
      password: password
    })
    .then(function (response) {
      if (response.data.code == 0) {
        authorization.value = response.data.data
        // console.log('data:',response.data.data)
        localStorage.setItem('authorization',authorization.value);
        router.push('/home');
      } else {
        console.log('auth failed')
      }
    })
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
}
</script>

<template>
  <div class="container">
    <img id="logo" src="@/assets/logo.png" />
    <div>
      <LoginForm @submit="onSubmit"></LoginForm>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  text-align: center;
  background-image: url('@/assets/login/login_bg.jpg');
  margin: 0;
}
.container div {
  text-align: left;
}
.container img {
  margin-top: 120px;
}
</style>

<script setup>
import LoginForm from '../../components/LoginForm.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const authorization = ref(null)
function onSubmit(username, password) {
  console.log(username, password)
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  axios
    .post('https://testapi.selalive.com/manager/login/guild', {
      username: username,
      password: password
    })
    .then(function (response) {
      if (response.data.code == 0) {
        authorization.value = response.data.data
        document.cookie = 'authorization=' + response.data + ';Max-Age=999999999; path=/'
        const router = useRouter()
        router.push({
          path: '/home',
          query: {
            msg: 'hello'
          }
        })
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

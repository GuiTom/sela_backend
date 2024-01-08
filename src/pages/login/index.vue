<script setup>
import LoginForm from '../../components/LoginForm.vue'
import api from '../../controller/request'
import { onMounted, ref } from 'vue'
import router from '../../router/index'
import { currentLanguage } from '@/utils/lan'
import LanguageSwitchMenu from './LanguageSwitchMenu.vue'
// import {currentLanguage} from '@/utils/lan'
const authorization = ref(null)

const showSwitchLanguageMenu = ref(false)
const currentLanguageIndex = ref(0)
onMounted(() => {
  let keys = lanKeys
  let curLan = currentLanguage()
  if (curLan == 'ar') {
    document.documentElement.setAttribute('dir', 'rtl')
  } else {
    document.documentElement.setAttribute('dir', 'ltl')
  }
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == curLan) {
      currentLanguageIndex.value = i

      break
    }
  }
})
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
        localStorage.setItem('authorization', authorization.value)
        router.push('/home')
      } else {
        console.log('auth failed')
      }
    })
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
}

const lanKeys = ['zh', 'en', 'tr', 'vi', 'id', 'hi', 'es', 'pt', 'th', 'ar']
const lanValues = [
  '中文',
  'english',
  'Türkçe',
  'Tiếng Việt',
  'IndonesiaName',
  'हिंदीName',
  'Español',
  'Português',
  'ภาษาไทย',
  'بالعربية'
]

function onLanguageSelected(index) {
  showSwitchLanguageMenu.value = false
  localStorage.setItem('currentLanguage', lanKeys[index])
  if (lanKeys[index] == 'ar') {
    document.documentElement.setAttribute('dir', 'rtl')
  } else {
    document.documentElement.setAttribute('dir', 'ltl')
  }
  currentLanguageIndex.value = index
}
</script>

<template>
  <div :key="currentLanguageIndex">
    <div class="lan_button" @click="showSwitchLanguageMenu = true">
      <span>{{ lanValues[currentLanguageIndex] }}</span
      ><img src="@/assets/login/arror_down.webp" />
    </div>
    <LanguageSwitchMenu
      :initialIndex="currentLanguageIndex"
      :options="lanValues"
      v-if="showSwitchLanguageMenu"
      @item_selected="onLanguageSelected"
    ></LanguageSwitchMenu>
    <div class="container">
      <img id="logo" src="@/assets/logo.png" />
      <div>
        <LoginForm @submit="onSubmit"></LoginForm>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
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
.lan_button {
  padding: 4px 8px;
  background-color: white;
  border-radius: 15px;
  position: fixed;
  height: 28px;
  right: 12px;
  top: 34px;
  line-height: 20px;
  img {
    display: inline-block;
    width: 16px;
    height: 16px;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>

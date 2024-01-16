<script setup>
import LoginForm from '../../components/LoginForm.vue'
import api from '../../controller/request'
import { onMounted, ref } from 'vue'
import router from '../../router/index'
import { currentLanguage } from '@/utils/lan'
import LanguageSwitchMenu from '@/components/LanguageSwitchMenu.vue'
import {lanKeys,lanValues} from '@/utils/lan'
// import {currentLanguage} from '@/utils/lan'
const lanButton = ref(null)
const authorization = ref(null)

const showSwitchLanguageMenu = ref(false)
const currentLanguageIndex = ref(0)
onMounted(() => {
  document.documentElement.scrollTop = 0
  let keys = lanKeys
  let curLan = currentLanguage()

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
  <div :key="currentLanguageIndex" @click="showSwitchLanguageMenu = false">
    <div class="lan_button_container">
      <div style="width: 12px;"></div>
      <div class="lan_button" ref="lanButton" @click="showSwitchLanguageMenu = true;$event.stopPropagation()">
        <span>{{ lanValues[currentLanguageIndex] }}</span
        ><img src="@/assets/login/arror_down.webp" />
      </div>
      <div style="width: 12px;"></div>
    </div>
    <LanguageSwitchMenu
      :initialIndex="currentLanguageIndex"
      :options="lanValues"
      v-if="showSwitchLanguageMenu"
      class="switch_menu"
      @item_selected="onLanguageSelected"
    ></LanguageSwitchMenu>
    <div class="container">
      <img id="logo" src="@/assets/logo.png" />
      <div>
        <LoginForm @submit="onSubmit"></LoginForm>
      </div>
    </div>
    <div style="height: 100px;"></div>
  </div>
</template>
<style scoped lang="less">
.container {
  width: 100%;
  text-align: center;
  background-image: url('@/assets/login/login_bg.jpg');
  margin: 0;
}
.switch_menu{
  z-index: 100;
}
.container div {
  text-align: left;
}
.container img {
  margin-top: 120px;
}
.lan_button_container{
  top: 56px;
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

.lan_button {
  padding: 4px 8px;
  background-color: white;
  border-radius: 15px;
  height: 28px;
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
}


</style>

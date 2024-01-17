<script setup>
import { ref } from 'vue'
import { multiLan } from '@/utils/lan';
import { currentLanguage } from '@/utils/lan'
const username = ref(null)
const password = ref(null)
const showEyeIcon = ref(false)
let passwordInputTypeIsText = ref(false);
const emit = defineEmits(['submit'])

function onClickSubmit(event) {
  event.preventDefault()
  emit('submit', username.value.value, password.value.value)
}
function changeHideValue(){
  if(password.value.type != 'text'){
    password.value.type = 'text';
    passwordInputTypeIsText.value = true;
  }else {
    password.value.type = 'password';
    passwordInputTypeIsText.value = false;
  }
}

</script>

<template>
  <div class="login-container">
    <form action="/login" method="post">
      <label for="username"
        ><b>{{ multiLan('Invitation code') }}</b></label
      >
      <input
        ref="username"
        type="text"
        :placeholder="multiLan('Enter account')"
        name="username"
        required
      />
      <label for="password"
        ><b>{{ multiLan('Password') }}</b></label
      >
      <div class="password">
        <input
          ref="password"
          type="password"
          :placeholder="multiLan('Enter password')"
          name="password"
          required
        
          @input="showEyeIcon=password.value.length>0"
        />
        <img  v-if="showEyeIcon&&passwordInputTypeIsText"  :class="currentLanguage()!='ar'?'imgLtr':'imgRtl'" src="@/assets/login/eye_open.png" @click="changeHideValue"/>
        <img v-if="showEyeIcon&&!passwordInputTypeIsText" :class="currentLanguage()!='ar'?'imgLtr':'imgRtl'"  src="@/assets/login/eye_closed.png" @click="changeHideValue"/>
      </div>
      <button type="submit" @click="onClickSubmit($event)">{{ multiLan('Login') }}</button>
    </form>
  </div>
</template>
<style>
.login-container {
  width: 300px;
  padding: 16px;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 4px;
}

.login-container input[type='text'],
.login-container input[type='password'] {
  width: 100%;
  height: 52px;
  padding: 10px;
  margin: 15px 0 10px 0;
  display: inline-block;
  border-radius: 14px;
  border: 1px solid #d5d1dc;
  background: white;
  color: #47454b;
  font-size: 16px;
}
.login-container input[type='text']::placeholder,
.login-container input[type='password']::placeholder {
  color: #a5a2ac;
}
.label {
  font-size: 12px;
}

.login-container button {
  background-color: #825af9;
  color: white;
  padding: 10px 20px;
  margin: 50px 0px;
  width: 100%;
  border-radius: 30px;
  border: none;
}
.password {
  position: relative;
}
.password img {
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  width: 22px;
  height: 22px;
  position: absolute;
}
.imgRtl{
  left:10px;
}
.imgLtr{
  right: 10px;
}
::-ms-reveal {
  width: 0;
  height: 0;
}
</style>

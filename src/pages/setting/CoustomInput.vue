<script setup>
import { ref,computed } from 'vue'
import { currentLanguage } from '@/utils/lan'
defineProps({
  placeholder: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})
const showEyeIcon = ref(false)
const password = ref(null)
var inputValue = ''
let passwordInputTypeIsText = ref(false)
function changeHideValue() {
  if (password.value.type != 'text') {
    password.value.type = 'text'
    passwordInputTypeIsText.value = true
  } else {
    password.value.type = 'password'
    passwordInputTypeIsText.value = false
  }
}
function onInput(){
    showEyeIcon.value = password.value.value.length > 0;
    inputValue = password.value.value
}

const value = computed(() => inputValue); 
defineExpose({value})
</script>
<template>
  <div class="password">
    <input
      ref="password"
      type="password"
      :placeholder="placeholder"
      name="password"
      required
      @input="
        onInput
      "
    />
    <img
      v-if="showEyeIcon && passwordInputTypeIsText"
      :class="currentLanguage()!='ar'?'imgLtr':'imgRtl'"
      src="@/assets/login/eye_open.png"
      @click="changeHideValue"
    />
    <img
      v-if="showEyeIcon && !passwordInputTypeIsText"
      :class="currentLanguage()!='ar'?'imgLtr':'imgRtl'"
      src="@/assets/login/eye_closed.png"
      @click="changeHideValue"
    />
  </div>
</template>
<style scoped lang="less">
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
input {
  width: 100%;height: 100%;
  display: block;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 0 12px;
  color: #999999;
  border: 0;
}
::-ms-reveal {
  width: 0;
  height: 0;
}
.imgRtl{
  left:10px;
}
.imgLtr{
  right: 10px;
}
</style>

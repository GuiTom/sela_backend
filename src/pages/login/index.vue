<script setup>
import LoginForm from '../../components/LoginForm.vue'


function onSubmit(){

}


</script>

<template>
<div class="container">
  <img id="logo" src="@/assets/logo.png">
  <div>
    <LoginForm @click-login="onSubmit"></LoginForm>
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

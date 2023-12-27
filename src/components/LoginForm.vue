<script setup>

</script>

<template>
  <div class="login-container">  
    <form action="/login" method="post">  
      <label for="username"><b>用户名</b></label>  
      <input type="text" placeholder="请输入用户名" name="username" required>  
      <label for="password"><b>密码</b></label>  
      <input type="password" placeholder="请输入密码" name="password" required>  
      <button type="submit" @click="this.$emit('click-login')" >登录</button>  
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

.login-container input[type=text],  
.login-container input[type=password] {  
  width: 100%; 
  height: 52px; 
  padding: 10px;  
  margin: 15px 0 10px 0;  
  display: inline-block;  
  border-radius: 14px;  
  border: 0.5px solid #D5D1DC;
  background: white;  
  color:#47454B;
  font-size: 16px;
}  
.login-container input[type=text]::placeholder,  
.login-container input[type=password]::placeholder {  
  color:#A5A2AC;
}
.label{
  font-size: 12px;
}
.login-container button {  
  background-color: #825af9;  
  color: white;  
  padding: 10px 20px;  
  margin: 60px 0px;  
  width: 100%;  
  border-radius: 30px;
  border: none;
}  
</style>  
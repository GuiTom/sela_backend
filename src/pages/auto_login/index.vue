<script setup>
import loadingImg from '@/assets/loading.webp'
import { onMounted } from 'vue';
import router from '@/router/index'
onMounted(() => {
   let token = Android.getToken();
    localStorage.setItem('isInNativeApp','1')
   localStorage.setItem('authorization',token)
   router.replace('/home')

})

</script>
<template>
<div>
    <AutoRTLImg
      :src="loadingImg"
      style="width:81px;height:50px;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)"
    ></AutoRTLImg>
</div>
</template>

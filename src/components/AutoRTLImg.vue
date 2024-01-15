<script setup>
import { onMounted,ref} from 'vue';
const img = ref(null)
defineProps({
  src: {
    type: String,
    required: true,
    default:''
  },
})
onMounted(()=>{
    if(document.documentElement.getAttribute('dir')=='rtl'){
        img.value.style.transform = 'scaleX(-1)';
    }
})
</script>
<template>
    <img :src="src" ref="img" class="rtl"/>
</template>
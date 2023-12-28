<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import AppBarVue from '@/components/AppBar.vue'
import LevelIcon from '@/components/LevelIcon.vue';
import AnchorAvatarVue from '@/components/AnchorAvatar.vue'
import axios from 'axios'

var data = ref(null)

onMounted(() => {
  console.log(`the component is now mounted.`)
  axios
    .get('anchor_list.json')
    .then((response) => (data.value = response.data))
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
})
</script>
<template>
  <div class="container">
    <AppBarVue title="主播管理"></AppBarVue>
  </div>
  <div class="list" v-if="data != null" @click="$router.push('/profile')">
    <div v-for="(item, index) in data.anchor_list">
      <span class="avatar_container"
        ><AnchorAvatarVue
          :onlineStatus="1"
          :isForbidden=false
          img="avatar.jpg"
        ></AnchorAvatarVue
      ></span>
    
     <span class="right_info_container">
              <div>Babila Ebwélé<LevelIcon :level="1.4"></LevelIcon></div>
              <div><span>ID：66689</span><span class="last_call">最近通话:2021-9-30</span></div>

     </span>
     <span class="spacer"></span>
     <img class="right_arror" src="@/assets/right_arror.webp"/>
    </div>
  </div>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

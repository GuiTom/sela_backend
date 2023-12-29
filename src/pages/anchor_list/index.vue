<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import AppBarVue from '@/components/AppBar.vue'
import LevelIcon from '@/components/LevelIcon.vue'
import AnchorAvatarVue from '@/components/AnchorAvatar.vue'
import axios from 'axios'

import ContextMenu from '@/components/ContextMenu.vue'

// import Dialog from '@/components/Dialog.vue'
var data = ref(null)
var showMenu = ref(false)
var selectedMenuIndex = 0;
onMounted(() => {
  axios
    .get('anchor_list.json')
    .then((response) => (data.value = response.data))
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
})

function onClickShowMenu() {
  showMenu.value = !showMenu.value;

}
function onmenuSelected(index) {
  showMenu.value = false
  selectedMenuIndex = index;
}
</script>
<template>
  <div class="container">
    <AppBarVue title="主播管理">
      <template #right_icon>
        <div style="position: relative" @click="onClickShowMenu">
          <img src="@/assets/more_icon.webp" style="width: 22px; height: 22px" />
          
            <ContextMenu v-if="showMenu"
            @item_selected="onmenuSelected"
              :initialIndex="selectedMenuIndex"
              :options="['在线状态', '通话时间', '当日收入']"
            ></ContextMenu>
          
        </div>
      </template>
    </AppBarVue>
  </div>
  <div class="list" v-if="data != null" @click="$router.push('/profile')">
    <div v-for="(item, index) in data.anchor_list">
      <span class="avatar_container"
        ><AnchorAvatarVue :onlineStatus="1" :isForbidden="false" img="avatar.jpg"></AnchorAvatarVue
      ></span>

      <span class="right_info_container">
        <div>Babila Ebwélé<LevelIcon :level="1.4"></LevelIcon></div>
        <div><span>ID：66689</span><span class="last_call">最近通话:2021-9-30</span></div>
      </span>
      <span class="spacer"></span>
      <img class="right_arror" src="@/assets/right_arror.webp" />
    </div>
  </div>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

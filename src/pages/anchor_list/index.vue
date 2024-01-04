<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import AppBarVue from '@/components/AppBar.vue'
import LevelIcon from '@/components/LevelIcon.vue'
import AnchorAvatarVue from '@/components/AnchorAvatar.vue'
import api from '../../controller/request'

import ContextMenu from '@/components/ContextMenu.vue'
import InfiniteList from '@/components/InfiniteList.vue'
// import Dialog from '@/components/Dialog.vue'
var data = ref(null)
var showMenu = ref(false)
const loadingMore = ref(false)
const refreshing = ref(false)
const noMoreData = ref(false)
var currentPage = 0;
var selectedMenuIndex = 0
onMounted(() => {
  requestData()
})

function onClickShowMenu() {
  showMenu.value = !showMenu.value
}
function onmenuSelected(index) {
  showMenu.value = false
  selectedMenuIndex = index
  requestData()
}
function refresh(){
  currentPage = 0;
  requestData();
}
function requestData() {
  if(noMoreData.value){
    console.log('没有更多数据了');
    return;
  }
  if(refreshing.value||loadingMore.value) return;
  if(currentPage==0){
    refreshing.value = true;
  }else {
    loadingMore.value = true;
  }
  let path = '/manager/guildh5/page/anchor'
  path = 'http://localhost:5173/anchor_list.json'
  api
    .post(path, {
      pageNum: currentPage+1,
      pageSize: 10,
      order: selectedMenuIndex + 1
    })
    .then(function (response) {
        if(currentPage==0){
        data.value = response.data
        refreshing.value = false;
       
      }else {
        data.value.data = [...data.value.data,...response.data.data]
        loadingMore.value = false;
      }
      currentPage ++;

    })
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
}
</script>
<template>
  <div class="container">
    <AppBarVue title="主播管理">
      <template #right_icon>
        <div style="position: relative" @click="onClickShowMenu">
          <img src="@/assets/more_icon.webp" style="width: 22px; height: 22px" />

          <ContextMenu
            v-if="showMenu"
            @item_selected="onmenuSelected"
            :initialIndex="selectedMenuIndex"
            :options="['在线状态', '通话时间', '当日收入']"
          ></ContextMenu>
        </div>
      </template>
    </AppBarVue>
  </div>
  <InfiniteList
    class="list"
    style="100%;overflow:auto"
    @loadMore="requestData"
    @refresh="refresh"
    :loadingMore="loadingMore"
    :refreshing="refreshing"
    :noMoreData="noMoreData"
    v-if="data != null"
  >
  <template #content>
    <div v-for="item in data.data" @click="$router.push({ path: '/profile', query: { anchorId: item.anchorId } })">
      <span class="avatar_container"
        ><AnchorAvatarVue :onlineStatus="item.isOnline" :isForbidden="false" :img="item.portrait"></AnchorAvatarVue
      ></span>
      <span class="right_info_container">
        <div>{{ item.nickname }}<LevelIcon :level="1.4"></LevelIcon></div>
        <div>
          <span>ID：{{ item.anchorId }}</span
          ><span class="last_call">最近通话:{{ $timeToFormatedDate(item.lastCallAt) }}</span>
        </div>
      </span>
      <span class="spacer"></span>
      <img class="right_arror" src="@/assets/right_arror.webp" />
    </div>
  </template>
  </InfiniteList>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

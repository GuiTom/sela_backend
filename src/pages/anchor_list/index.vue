<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import AppBarVue from '@/components/AppBar.vue'
// import LevelIcon from '@/components/LevelIcon.vue'
import AnchorAvatarVue from '@/components/AnchorAvatar.vue'
import api from '../../controller/request'

import ContextMenu from '@/components/ContextMenu.vue'
import InfiniteList from '@/components/InfiniteList.vue'
import router from '../../router/index'
import LevelIcon from '@/components/LevelIcon.vue'
import {multiLan}from '@/utils/lan'
import AutoRTLImg from '@/components/AutoRTLImg.vue'
import loadingImg from '@/assets/loading.webp'
import rightArrorImg from '@/assets/right_arror.webp'
const loadingMore = ref(false)
const refreshing = ref(false)
const noMoreData = ref(false)
var currentPage = 0
var selectedMenuIndex = 0
const pageSize = 20
var data = ref(null)

var showMenu = ref(false)
onMounted(() => {
  document.documentElement.scrollTop = 0
  requestData()
})

function onClickShowMenu() {
  showMenu.value = !showMenu.value
}
function onmenuSelected(index) {
  showMenu.value = false
  noMoreData.value = false
  currentPage = 0
  selectedMenuIndex = index
  requestData()
}
function onClickItem(item) {

  localStorage.setItem('param',item);
  router.push({ path: '/profile', query: { anchorId: item.anchorId,data:JSON.stringify(item) } })
}
function refresh() {
  currentPage = 0
  requestData()
}
function requestData() {
  if (noMoreData.value) {
    // console.log('没有更多数据了')
    return
  }
  if (refreshing.value || loadingMore.value) return
  if (currentPage == 0) {
    refreshing.value = true
  } else {
    loadingMore.value = true
  }
  let path = '/manager/guildh5/page/anchor'
  // path = 'http://localhost:5173/anchor_list.json'
  api
    .post(path, {
      pageNum: currentPage + 1,
      pageSize: pageSize,
      order: selectedMenuIndex + 1
    })
    .then(function (response) {
      if (currentPage == 0) {
        data.value = response.data
       
        refreshing.value = false
      } else {
        data.value.data = [...data.value.data, ...response.data.data]
        loadingMore.value = false
      }
      currentPage++
      if (data.value.data == null || data.value.data.length < pageSize) {
        noMoreData.value = true
      }
    })
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
}
</script>
<template>
  <div class="container">
    <AppBarVue :title="multiLan('Host management')">
      <template #right_icon>
        <div style="position: relative" @click="onClickShowMenu">
          <img src="@/assets/more_icon.webp" style="width: 22px; height: 22px" />

          <ContextMenu
            v-if="showMenu"
            style="z-index: 100;"
            @item_selected="onmenuSelected"
            :initialIndex="selectedMenuIndex"
            :options="[
              multiLan('Online status'),
              multiLan('Time of the last call'),
              multiLan('Daily earnings')
            ]"
          ></ContextMenu>
        </div>
      </template>
    </AppBarVue>
  </div>
  <InfiniteList
    class="list"
    @loadMore="requestData"
    @refresh="refresh"
    :loadingMore="loadingMore"
    :refreshing="refreshing"
    :noMoreData="noMoreData"
    v-if="data != null"
  >
    <template #content>
      <div v-for="item in data.data" @click="onClickItem(item)">
        <span class="avatar_container"
          ><AnchorAvatarVue
            :onlineStatus="item.isOnline"
            :isForbidden="item.userStatus == 2" :violated="item.userAuth==4" :authed="item.userAuth==2"
            :img="item.portrait"
          ></AnchorAvatarVue>
        </span>
        <span class="spacer_10px"></span>
        <span class="right_info_container">
          <div style="color:#333333">
            {{ item.nickname }}
            <LevelIcon v-if="item.level" :level="item.level"></LevelIcon>
          </div>
          <div>
            <span style="color:#999999">ID：{{ item.anchorId }}</span
            ><span v-if="parseInt(item.lastCallAt)>0" class="last_call"
              >{{ multiLan('Recent call') }}:{{ $timeToFormatedDate(parseInt(item.lastCallAt)) }}</span
            >
          </div>
        </span>
        <span class="spacer"></span>
        <AutoRTLImg class="right_arror" :src="rightArrorImg" ></AutoRTLImg>
      </div>
    </template>
  </InfiniteList>
  <div v-else style="width:100%;height:100%;position:fixed;">
    <AutoRTLImg
      :src="loadingImg"
      style="width:81px;height:50px;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)"
    ></AutoRTLImg>
  </div>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

<script setup>
import { ref } from 'vue'

import { onMounted } from 'vue'
import api from '../../controller/request'
import AppBarVue from '@/components/AppBar.vue'

import { useRoute } from 'vue-router'
import InfiniteList from '@/components/InfiniteList.vue'
import AnchorAvatarVue from '@/components/AnchorAvatar.vue'
import LevelIcon from '@/components/LevelIcon.vue'
const loadingMore = ref(false)
const refreshing = ref(false)
const noMoreData = ref(false)
var currentPage = 0
var data = ref(null)
var userData = ref(null)
const pageSize = 20
onMounted(() => {
  userData.value = window.param
  console.log(userData.value.authTime)
  requestData()
  // window.param = null
})
function refresh() {
  currentPage = 0
  requestData()
}
function requestData() {
  if (noMoreData.value) {
    console.log('没有更多数据了')
    return
  }
  if (refreshing.value || loadingMore.value) return
  if (currentPage == 0) {
    refreshing.value = true
  } else {
    loadingMore.value = true
  }
  let path = '/manager/guildh5/page/anchor/day/incomes'
  // path = 'http://localhost:5173/anchor_list.json'
  const route = useRoute()
  let anchorId = route.query.anchorId
  let nowTs = new Date().getTime()
  api
    .post(path, {
      condition: {
        // guildId: guildId, // 工会id
        anchorId: anchorId, // 主播id ps.主播id和工会id互斥
        date: nowTs // 日期，当天0点时间
      },
      pageNum: currentPage + 1,
      pageSize: pageSize
    })
    .then(function (response) {
      if (currentPage == 0) {
        data.value = response.data
        refreshing.value = false
      } else {
        data.value.data.list = [...data.value.data.list, ...response.data.data.list]
        loadingMore.value = false
      }
      currentPage++
      if (data.value.data.list == null || data.value.data.list.length < pageSize) {
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
    <!-- appBar -->
    <AppBarVue title="个人中心"></AppBarVue>
    <!-- 个人头像这一行 -->
    <div class="base_info" v-if="userData != null">
      <span class="avatar"
        ><AnchorAvatarVue
          :onlineStatus="userData.isOnline"
          :isForbidden="userData.userStatus == 2"
          :img="userData.portrait"
        ></AnchorAvatarVue>
      </span>
      <span>
        <div class="name_and_level">
          <span>
            {{ userData.nickname }}
          </span>
          <LevelIcon :level="userData.level"></LevelIcon>
        </div>
        <div class="id_and_lateast_call">
          <span>ID:{{ userData.anchorId }}</span>
          <span>最近通话:{{ $timeToFormatedDate(userData.lastCallAt) }}</span>
        </div>
      </span>
    </div>
    <div class="divider"></div>
    <!-- 注册时间这几行 -->
    <div class="register_and_more_info" v-if="userData != null">
      <div>
        注册时间：<span>{{ $timeToFormatedDate(parseInt(userData.authTime)) }}</span>
      </div>
      <div>
        累计违规次数：<span>{{ userData.banCount }}</span>
      </div>
      <div>
        解封时间：<span>{{ $timeToFormatedDate(userData.banTime) }}</span>
      </div>
      <div>
        封禁原因：<span>{{ userData.banReason }}</span>
      </div>
    </div>
    <div class="divider"></div>
    <!-- 周数据 -->
    <div class="week_data" v-if="userData != null">
      <div>周数据<span style="font-size: 12px;font-weight:400;color:#999999">-每周{{ 24-(8-$timeZoneOfffsetHours())}}点更新</span></div>
      <span class="week_data_container">
        <span>
          <div>
            {{
              $timeToFormatedDateHour(parseInt(userData.weekStatBeginAt)) +
              '-' +
              $timeToFormatedDateHour(parseInt(userData.weekStatEndAt))
            }}
          </div>
          <div>{{ userData.weekCoins }}<img class="coin" src="@/assets/gold_coin.webp" /></div>
          <div>本周主播流水</div>
        </span>
        <span>
          <div>
            {{
              $timeToFormatedDateHour(parseInt(userData.lastWeekStatBeginAt)) +
              '-' +
              $timeToFormatedDateHour(parseInt(userData.lastWeekStatEndAt))
            }}
          </div>
          <div>{{ userData.lastWeekCoins }}<img class="coin" src="@/assets/gold_coin.webp" /></div>
          <div>上周主播流水</div>
        </span>
      </span>
    </div>
    <div class="divider"></div>
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
        <div class="daily_data">
          <div v-if="data != null" v-for="(item, index) in data.data.list">
            <div>
              日期：<span>{{ $timeToFormatedDate(parseInt(item.date)) }}</span>
            </div>
            <div>
              在线时长：<span>{{ item.onlineDuration }}</span>
            </div>
            <div>
              平均通话时长：<span>{{ item.avCallDuration }}</span>
            </div>
            <div>
              通话数：<span>{{ item.callNum }}</span>
            </div>
            <div>
              收到礼物数：<span>{{ item.giftNum }}</span>
            </div>
            <div class="last_item">
              流水：<span>{{ item.coins }}</span>
            </div>
            <div class="divider" v-if="data != null && index < data.data.list.length - 1"></div>
          </div>
        </div>
      </template>
    </InfiniteList>
  </div>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

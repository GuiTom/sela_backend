<script setup>
import { ref } from 'vue'

import { onMounted } from 'vue'
import api from '../../controller/request'
import AppBarVue from '@/components/AppBar.vue'

import { useRoute } from 'vue-router'
import InfiniteList from '@/components/InfiniteList.vue'
import AnchorAvatarVue from '@/components/AnchorAvatar.vue'
import LevelIcon from '@/components/LevelIcon.vue'
import {multiLan}from '@/utils/lan'
import money_amount from '@/utils/mony_amount'
const loadingMore = ref(false)
const refreshing = ref(false)
const noMoreData = ref(false)
var currentPage = 0
var data = ref(null)
var userData = ref(null)
const pageSize = 20
onMounted(() => {
  const route = useRoute()
  userData.value = JSON.parse(route.query.data)
  // console.log(userData.value.authTime)
  requestData()
  // window.param = null
  document.documentElement.scrollTop = 0
})
function refresh() {
  currentPage = 0
  requestData()
}
function getBeijingMidnightTimestamp() {  
    // 创建一个Date对象表示当前UTC时刻的午夜  
    let now = new Date();  
    let utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());  
  
    // 北京时区是UTC+8，所以要加上8小时的时间偏移  
    let beijingMidnightTimestamp = utcMidnight - 8 * 60 * 60 * 1000;  
  
    return beijingMidnightTimestamp;  
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
  let ts = getBeijingMidnightTimestamp()
  api
    .post(path, {
      condition: {
        // guildId: guildId, // 工会id
        anchorId: anchorId, // 主播id ps.主播id和工会id互斥
        date: ts // 日期，当天0点时间
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
    <AppBarVue :title="multiLan('Personal statistics')"></AppBarVue>
    
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
          <span style="margin-left: 10px;" v-if="parseInt(userData.lastCallAt)>0">{{multiLan('Recent call')}}:{{ $timeToFormatedDateTime(parseInt(userData.lastCallAt)) }}</span>
        </div>
      </span>
    </div>
    <div class="divider"></div>
    <!-- 注册时间这几行 -->
    <div class="register_and_more_info" v-if="userData != null">
      <div>
        {{multiLan('Registration date')}}：<span>{{ $timeToFormatedDateTime(parseInt(userData.authTime)) }}</span>
      </div>
      <div v-if="userData.banCount">
        {{multiLan('Overall violation times')}}：<span>{{ userData.banCount }}</span>
      </div>
      <div v-if="userData.banTime">
       {{multiLan('Unbanned on')}}：<span>{{ $timeToFormatedDateTime(parseInt(userData.banTime)) }}</span>
      </div>
      <div v-if="userData.banReason">
        {{multiLan('Ban reason')}}：<span>{{ userData.banReason }}</span>
      </div>
    </div>
    <div class="divider"></div>
    <!-- 周数据 -->
    <div class="week_data" v-if="userData != null">
      <div>
        {{multiLan('Weekly statistics')}}<span style="font-size: 12px; font-weight: 400; color: #999999"
          >-{{multiLan('Statistics update at xx:00 every day',24 - (8 - $timeZoneOfffsetHours()))}}</span
        >
      </div>
      <span class="week_data_container">
        <span>
          <div>
            {{
              $timeToFormatedDateHour(parseInt(userData.weekStatBeginAt)) +
              '-' +
              $timeToFormatedDateHour(parseInt(userData.weekStatEndAt))
            }}
          </div>
          <div>
            {{ money_amount(userData.weekCoins) }}<img class="coin" src="@/assets/gold_coin.webp" />
          </div>
          <div>{{ multiLan('Host earnings this week') }}</div>
        </span>
        <span>
          <div>
            {{
              $timeToFormatedDateHour(parseInt(userData.lastWeekStatBeginAt)) +
              '-' +
              $timeToFormatedDateHour(parseInt(userData.lastWeekStatEndAt)+1)
            }}
          </div>
          <div>
            {{ money_amount(userData.lastWeekCoins)
            }}<img class="coin" src="@/assets/gold_coin.webp" />
          </div>
          <div>{{ multiLan('Host earnings last week') }}</div>
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
              {{ multiLan('Date') }}：<span>{{ $timeToFormatedDate(parseInt(item.date)) }}</span>
            </div>
            <div>
              {{ multiLan('Online duration') }}：<span>{{ item.onlineDuration }}</span>
            </div>
            <div>
              {{ multiLan('Average call duration') }}：<span>{{ item.avCallDuration }}</span>
            </div>
            <div>
              {{ multiLan('Number of calls') }}：<span>{{ item.callNum }}</span>
            </div>
            <div>
              {{ multiLan('Number of received gifts') }}：<span>{{ item.giftNum }}</span>
            </div>
            <div class="last_item">
              {{ multiLan('Earnings') }}：<span>{{ money_amount(item.coins) }}</span>
            </div>
            <div class="divider" v-if="data != null && index < data.data.list.length - 1"></div>
          </div>
        </div>
      </template>
    </InfiniteList>
    <div v-else style="width:100%;height:100%;position:fixed;">
      <img
        src="@/assets/loading.webp"
        style="width:81px;height:50px;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)"
      />
    </div>
  </div>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

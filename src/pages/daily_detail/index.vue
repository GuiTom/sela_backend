<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import AppBarVue from '@/components/AppBar.vue'
import api from '../../controller/request'
import { useRoute } from "vue-router"
import InfiniteList from '@/components/InfiniteList.vue'
import {multiLan}from '@/utils/lan'
import money_amount from '@/utils/mony_amount'


const loadingMore = ref(false)
const refreshing = ref(false)
const noMoreData = ref(false)
var currentPage = 0;
const pageSize = 20;
var data = ref(null)

onMounted(() => {
  document.documentElement.scrollTop = 0
  requestData();
})
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
  let path = '/manager/guildh5/page/anchor/day/incomes'
  // path = 'http://localhost:5173/anchor_list.json'
  const route = useRoute()
  const guildId = route.query.guildId
  let date = route.query.date;
  // date = 1703606400000;
  api
    .post(path, {
      condition: {
        guildId: guildId, // 工会id
        // anchorId: 10000389, // 主播id ps.主播id和工会id互斥
        date: date // 日期，当天0点时间
      },
      pageNum: currentPage+1,
      pageSize: pageSize
    })
    .then(function (response) {
        if(currentPage==0){
        data.value = response.data
        refreshing.value = false;
       
      }else {
        data.value.list = [...data.value.list,...response.data.list]
        loadingMore.value = false;
      }
      currentPage ++;
      if(data.value.list==null||data.value.list.length<pageSize){
        noMoreData.value = true;
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
    <AppBarVue :title="multiLan('Daily statistics')"></AppBarVue>
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
  <table>
    <thead border="0">
      <tr>
        <th>{{multiLan('Host nickname')}}</th>
        <th>{{multiLan('Online duration')}}</th>
        <th>{{multiLan('Number of calls')}}</th>
        <th>{{multiLan('Number of received gifts')}}</th>
        <th>{{multiLan('Earnings')}}</th>
      </tr>
    </thead>
    <tbody v-if="data != null">
      <tr class="item" v-for="item in data.data.list">
        <td>{{item.nickname}}</td>
        <td>{{ $timeToFormatedTime(item.onlineDuration) }}</td>
        <td>{{item.callNum}}</td>
        <td>{{item.giftNum}}</td>
        <td>{{money_amount(item.coins)}}<img class="coin" src="@/assets/gold_coin.webp" /></td>
      </tr>
    </tbody>
  </table>
</template>
</InfiniteList>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import AppBarVue from '@/components/AppBar.vue'
// import router from '../../router/index'
import { useRoute } from 'vue-router'
import InfiniteList from '@/components/InfiniteList.vue'
import api from '../../controller/request'
import {multiLan}from '@/utils/lan'
import money_amount from '@/utils/mony_amount'
const loadingMore = ref(false)
const refreshing = ref(false)
const noMoreData = ref(false)
const pageSize = 20
var currentPage = 0
var data = ref(null)
var endTime = null
var settleId = null
onMounted(() => {
  document.documentElement.scrollTop = 0
  let route = useRoute()
  endTime = route.query.endTime
  settleId = route.query.settleId
  //   console.log('data.value', data.value)
  requestData()
})

function refresh() {
  currentPage = 0
  requestData()
}
function requestData() {
  if(endTime==null||endTime==''){
    console.log('结束时间为空')
    return;
  }
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
  let path = '/manager/guildh5/page/guild/settle/info'
  // path = 'http://localhost:5173/anchor_list.json'
  // const route = useRoute()
  // let anchorId = route.query.anchorId
  //   let nowTs = new Date().getTime()
  api
    .post(path, {
      condition: {
        // guildId: guildId, // 工会id
        settleId: settleId, // 主播id ps.主播id和工会id互斥
        settleTime: endTime // 日期，当天0点时间
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
    <AppBarVue :title="multiLan('Withdrawal details')"></AppBarVue>
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
            <th>{{ multiLan('Host nickname') }}</th>
            <th>{{ multiLan('Earnings') }}</th>
            <th>{{ multiLan('Your earnings') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="item" v-if="data != null" v-for="item in data.data.list">
            <td>{{ item.nickname }}</td>
            <td>{{ money_amount(item.paidCoins) }}<img class="coin" src="@/assets/gold_coin.webp" /></td>
            <td class="profit">+{{ money_amount(item.guildUsdFee) }}$</td>
          </tr>
        </tbody>
      </table>
    </template>
  </InfiniteList>
  <div v-else style="width:100%;height:100%;position:fixed;">
    <img
      src="@/assets/loading.webp"
      style="width:81px;height:50px;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)"
    />
  </div>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

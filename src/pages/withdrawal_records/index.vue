<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import AppBarVue from '@/components/AppBar.vue'

import api from '../../controller/request'
import InfiniteList from '@/components/InfiniteList.vue'
import {multiLan}from '@/utils/lan'
import money_amount from '@/utils/mony_amount'

const loadingMore = ref(false)
const refreshing = ref(false)
const noMoreData = ref(false)
const pageSize = 20
var currentPage = 0
var data = ref(null)

onMounted(() => {
  document.documentElement.scrollTop = 0
  requestData()
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
  let path = '/manager/guildh5/page/guild/settle'

  let nowTs = new Date().getTime()
  api
    .post(path, {
      condition: {
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
    <AppBarVue :title="multiLan('Withdrawal history')"></AppBarVue>
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
      <div
        v-for="item in data.data.list"
        @click="$router.push({ name: 'withdrawal details', query: { endTime: item.endTime,settleId:item.settleId } })"
      >
        <div class="row_left_part">
          <div>
            {{ $timeToFormatedDate(parseInt(item.endTime))
            }}<span
              :style="
                'background-color:' +
                (item.settleStatus == 0
                  ? '#FF8F16'
                  : item.settleStatus == 1
                    ? '#07E076'
                    : '#C7CAC9') +
                ';'
              "
              >{{
                item.settleStatus == 0 ? multiLan('Withdrawal in progress') : item.settleStatus == 1 ? multiLan('Withdrawn') : multiLan('Abolished')
              }}</span
            >
          </div>
          <div>
            {{
              item.settleStatus == 0
                ? multiLan('Processing, please wait patiently')
                : item.settleStatus == 1
                  ? multiLan('Already withdrawn into your bank account')
                  : multiLan('Withdrawal request has expired')
            }}
          </div>
        </div>
        <span class="spacer"></span>
        <span class="value">{{ money_amount(item.usdFee) }}$</span>
        <img class="right_arror" src="@/assets/right_arror.webp" />
      </div>
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

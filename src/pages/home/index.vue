<script setup>
import { ref } from 'vue'
import showDialog from '../../utils/dialog.js'
import { onMounted } from 'vue'
import router from '../../router/index'
import api from '../../controller/request'

import InfiniteList from '@/components/InfiniteList.vue'

import { multiLan } from '@/utils/lan'
import money_amount from '@/utils/mony_amount'
const loadingMore = ref(false)
const refreshing = ref(false)
const noMoreData = ref(false)

const data = ref(null)
const weekData = ref(null)
var currentPage = 0
const pageSize = 20
const dialogContent =
  '1.' + multiLan('explain 1') + '\n 2.' + multiLan('explain 2') + '\n 3.' + multiLan('explain 2')
onMounted(() => {
  api
    .get('/manager/guildh5/dashboard')
    .then((response) => (data.value = response.data.data))
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
  document.documentElement.scrollTop = 0
  requestData()
})
function onShowInstrustion() {
  showDialog(dialogContent, { title: multiLan('Instructions') })
}
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
  let path = '/manager/guildh5/page/guild/day/income'
  // path = 'http://localhost:5173/anchor_list.json'
  api
    .post(path, {
      pageNum: currentPage + 1,
      pageSize: pageSize
    })
    .then(function (response) {
      if (currentPage == 0) {
        weekData.value = response.data
        // console.log('weekData1',weekData.value.data)
        refreshing.value = false
      } else {
        weekData.value.data = [...weekData.value.data, ...response.data.data]
        loadingMore.value = false
      }
      // console.log('weekData2',weekData.value)
      currentPage++
      if (weekData.value.data == null || weekData.value.data.length < pageSize) {
        noMoreData.value = true
      }
    })
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
}
function onClickSetting(){
  router.push('/setting')
}
</script>
<template>
  <div class="bg"></div>
  <div class="setting"> <img src="@/assets/setting.webp" @click="onClickSetting"/> </div>
  <div v-if="data != null" class="container">
    <div class="header">
      <img src="@/assets/logo.png" />
      <div class="meta_info_container">
        <div>
          <span>{{ data.guildName }}</span>
        </div>
        <div>
          <span
            >{{ multiLan('Date of creation') }}:{{
              $timeToFormatedDate(parseInt(data.createdAt))
            }}</span
          ><span>{{ multiLan('Days since creation: xx days', data.createdDay) }}</span>
        </div>
        <div>
          <span>{{ multiLan('Number of hosts') }}：{{ data.anchorNum }}</span
          ><span
            >{{ multiLan('Newly registered hosts yesterday') }}:{{
              data.yesterdayNewAnchorNum
            }}</span
          >
        </div>
      </div>
    </div>

    <div class="tips">
      <div>{{ multiLan('Withdrawal requirements') }}：</div>
      <div
        v-html="
          multiLan(
            'Withdrawal requirements 1',
            '<span style=\'font-size: 14px;font-weight:500;color: #ff38a2;line-height: 20px;\'>' +
              money_amount(data.settleCoinsLimit) +
              '</span>',
            '<span style=\'font-size: 14px;font-weight:500;color: #ff38a2;line-height: 20px;\'>' +
              (data.settleCompliantCount || 0) +
              '/' +
              data.settleCountLimit || 0 + '</span>'
          )
        "
      ></div>
      <div
        v-html="
          multiLan(
            'Withdrawal requirements 2',
            '<span style=\'font-size: 14px;font-weight:500;color: #ff38a2;line-height: 20px;\'>' +
              money_amount(data.settleCoinsLimit) +
              '</span>'
          )
        "
      ></div>
      <div>{{ multiLan('Withdrawal requirements tip') }}</div>
    </div>
    <!-- 提现记录和主播管理按钮 -->
    <div class="buttons">
      <span @click="$router.push('/withdraw_records')">{{ multiLan('Withdrawal history') }}</span>
      <span @click="$router.push('/anchor_list')">{{ multiLan('Host management') }}</span>
    </div>
    <!-- 余额和结算收益 -->
    <div class="more-info">
      <span>
        <div>≈{{ money_amount(data.usdFee) }}$</div>
        <div>
          {{ multiLan('Balance') }}<img @click="onShowInstrustion" src="@/assets/ask_symbol.webp" />
        </div>
      </span>
      <span></span>
      <span>
        <div>
          ≈{{ money_amount(data.genSettleUsdFee) }}$<span class="status">{{
            multiLan('In settlement')
          }}</span>
        </div>
        <div>
          {{ multiLan('Withdrawable income')
          }}<img @click="onShowInstrustion" src="@/assets/ask_symbol.webp" />
        </div>
      </span>
    </div>
    <div class="divider"></div>
    <!-- 周收益 -->
    <div class="week_profit">
      <div>
        <span>{{ multiLan('Weekly earnings(coins)') }}</span
        ><span>{{ data.usd2Coins }}{{ multiLan('Gold coin') }}≈1$</span>
      </div>
      <div>
        <span>
          <div style="font-size: 10px" v-if="data.weekStatBeginAt != null && data.weekStatEndAt">
            {{
              $timeToFormatedDateHour(parseInt(data.weekStatBeginAt)) +
              '-' +
              $timeToFormatedDateHour(parseInt(data.weekStatEndAt))
            }}
          </div>
          <div class="coin">
            {{ money_amount(data.weekIncome) }}<img src="@/assets/gold_coin.webp" />
          </div>
          <div style="text-align: center">{{ multiLan('Overall host earnings this week') }}</div>
        </span>

        <span class="vertical-divider"></span>

        <span>
          <div
            style="font-size: 10px"
            v-if="data.lastWeekStatBeginAt != null && data.lastWeekStatEndAt != null"
          >
            {{
              $timeToFormatedDateHour(parseInt(data.lastWeekStatBeginAt)) +
              '-' +
              $timeToFormatedDateHour(parseInt(data.lastWeekStatEndAt) + 1)
            }}
          </div>
          <div class="coin">
            {{ money_amount(data.lastWeekIncome) }}<img src="@/assets/gold_coin.webp" />
          </div>
          <div style="text-align: center">{{ multiLan('Overall host earnings last week') }}</div>
        </span>
      </div>
    </div>
    <div class="divider"></div>
    <InfiniteList
      class="turnover-list-container"
      style="100%;overflow:auto"
      @loadMore="requestData"
      @refresh="refresh"
      :loadingMore="loadingMore"
      :refreshing="refreshing"
      :noMoreData="noMoreData"
      v-if="weekData != null"
    >
      <template #content>
        <div v-for="(item, index) in weekData.data">
          <div
            class="item_content"
            @click="
              $router.push({ path: '/daily_detail', query: { guildId: data.id, date: item.date } })
            "
          >
            <span>
              <div>
                {{ multiLan('Date') }}:<span>{{ $timeToFormatedDate(parseInt(item.date)) }}</span>
              </div>
              <div class="coin">
                {{ multiLan('Overall host earnings') }}：{{ money_amount(item.coins) }}
                <img src="@/assets/gold_coin.webp" />
              </div>
            </span>
            <img class="right_arror" src="@/assets/right_arror.webp" />
          </div>
          <div v-if="weekData != null && index < weekData.data.length - 1" class="divider"></div>
        </div>
      </template>
    </InfiniteList>
  </div>
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

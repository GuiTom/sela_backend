<script setup>
import { ref } from 'vue'
import showDialog from '../../utils/dialog.js'
import { onMounted } from 'vue'
import router from '../../router/index'
import api from '../../controller/request'
import loadingImg from '@/assets/loading.webp'
import InfiniteList from '@/components/InfiniteList.vue'
import LanguageSwitchMenu from '@/components/LanguageSwitchMenu.vue'
import { multiLan } from '@/utils/lan'
import money_amount from '@/utils/mony_amount'
import { currentLanguage } from '@/utils/lan'
import AutoRTLImg from '@/components/AutoRTLImg.vue'
import rightArrorImg from '@/assets/right_arror.webp'
import {lanKeys,lanValues} from '@/utils/lan'
import ActivitySwiper from '@/components/ActivitySwiper.vue'
import { guildData } from '@/global.js'

const showSwitchLanguageMenu = ref(false)
const currentLanguageIndex = ref(0)
const loadingMore = ref(false)
const refreshing = ref(false)
const noMoreData = ref(false)


const weekData = ref(null)
const activityList =ref(null)

var currentPage = 0
const pageSize = 20

onMounted(() => {

  let keys = lanKeys
  let curLan = currentLanguage()

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == curLan) {
      currentLanguageIndex.value = i
      break
    }
  }
  api
    .get('/manager/guildh5/dashboard')
    .then((response) => {
   
      guildData.value = response.data.data;
      // guildData.value.id  = '1749404375389888513'
      // guildData.value.countryCode = 76
      localStorage.setItem('guildData',JSON.stringify(guildData.value))
      requestActivityList(guildData.value.id)
    })
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
  document.documentElement.scrollTop = 0

  requestData()
})
function onShowInstrustion() {
  const dialogContent =
  '1.' + multiLan('explain 1') + '\n 2.' + multiLan('explain 2') + '\n 3.' + multiLan('explain 3')
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
function requestActivityList(id) {
 
  let path = '/manager/guild/activity/page'
  // path = 'http://localhost:5173/anchor_list.json'
  api
    .post(path, {
      "condition": {
        "guildId": id,
        "status": 0//0 全部 1 我参与的
      },
      pageNum: 1,
      pageSize: 3
    })
    .then(function (response) {
      if(response.data.code==0){
        activityList.value = response.data.data.list;
      // console.log('activityData:', response.data.data.list)

    }
      // console.log('activityImgs:',activityImgs.value)

    })
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
}
function onLanguageSelected(index) {
  showSwitchLanguageMenu.value = false
  localStorage.setItem('currentLanguage', lanKeys[index])
  if (lanKeys[index] == 'ar') {
    document.documentElement.setAttribute('dir', 'rtl')
  } else {
    document.documentElement.setAttribute('dir', 'ltl')
  }
  currentLanguageIndex.value = index
}
</script>
<template>
  <div @click="showSwitchLanguageMenu = false">
  <div class="bg"></div>
 
  <div class="lan_button_container">
    <div style="width: 12px;"></div>
    <div class="setting"> <img src="@/assets/setting.webp" @click="onClickSetting"/> </div>
    <div style="flex: auto;"></div>
    <div class="lan_button" @click="showSwitchLanguageMenu = true;$event.stopPropagation()">
      <span>{{ lanValues[currentLanguageIndex] }}</span
      ><img src="@/assets/login/arror_down.webp" />
    </div>
    <div style="width: 12px;"></div>
  </div>
    <LanguageSwitchMenu
    :initialIndex="currentLanguageIndex"
    :options="lanValues"
    v-if="showSwitchLanguageMenu"
    @item_selected="onLanguageSelected"
  ></LanguageSwitchMenu>
 
  <div :key="currentLanguageIndex" v-if="guildData != null" class="container">
    <div class="header">
      <img src="@/assets/logo.png" />
      <div style="width: 12px;"></div>
      <div class="meta_info_container">
        <div>
          <span>{{ guildData.guildName }}</span>
        </div>
        <div>
          <span
            >{{ multiLan('Date of creation') }}:{{
              $timeToFormatedDate(parseInt(guildData.createdAt))
            }}</span
          >
        </div>
        <div>
          <span>{{ multiLan('Number of hosts') }}：{{ guildData.anchorNum }}</span
          ><span
            >{{ multiLan('Newly registered hosts yesterday') }}:{{
              guildData.yesterdayNewAnchorNum
            }}</span
          >
        </div>
      </div>
    </div>

    <div class="tips">
      <div>{{ multiLan('Withdrawal requirements') }}</div>
      <div
        v-html="
          multiLan(
            'Withdrawal requirements 1',
            '<span style=\'font-size: 14px;font-weight:500;color: #ff38a2;line-height: 20px;\'>' +
              guildData.settleCoinsLimit +
              '</span>',
            '<span style=\'font-size: 14px;font-weight:500;color: #ff38a2;line-height: 20px;\'>' +
              (guildData.settleCompliantCount || 0) +
              '/' +
              guildData.settleCountLimit || 0 + '</span>'
          )
        "
      ></div>
      <div
        v-html="
          multiLan(
            'Withdrawal requirements 2',
            '<span style=\'font-size: 14px;font-weight:500;color: #ff38a2;line-height: 20px;\'>' +
              guildData.guildGenUsdLimit +
              '</span>'
          )
        "
      ></div>
      <div>{{ multiLan('Withdrawal requirements tip') }}</div>
    </div>

    <ActivitySwiper v-if="activityList&&activityList.length>0" :data="activityList" @click="$router.push('/activity_list')"></ActivitySwiper>
    <AnchorManage></AnchorManage>
    <div class="divider"></div>
    <!-- 余额和结算收益 -->
    <div class="more-info">
      <span>
        <div>≈{{ money_amount(guildData.usdFee) }}$</div>
        <div>
          {{ multiLan('Balance') }}<img @click="onShowInstrustion" src="@/assets/ask_symbol.webp" />
        </div>
      </span>
      <span></span>
      <span>
        <div>
          ≈{{ money_amount(guildData.genSettleUsdFee) }}$<span class="status">{{
            multiLan('In settlement')
          }}</span>
        </div>
        <div>
          {{ multiLan('Withdrawable income')
          }}<img @click="onShowInstrustion" src="@/assets/ask_symbol.webp" />
        </div>
      </span>
    </div>
   
        <!-- 提现记录按钮 -->
    <div class="buttons">
      
      <span class="button" @click="$router.push('/withdraw_records')">{{ multiLan('Withdrawal history') }}</span>

    </div>
    <div class="divider"></div>
    <!-- 周收益 -->
    <div class="week_profit">
      <div>
        <span>{{ multiLan('Weekly earnings(coins)') }}</span
        ><span>{{ guildData.usd2Coins }}{{ multiLan('Gold coin') }}≈1$</span>
      </div>
      <div>
        <span>
          <div style="font-size: 10px" v-if="guildData.weekStatBeginAt != null && guildData.weekStatEndAt">
            {{
              $timeToFormatedDateHour(parseInt(guildData.weekStatBeginAt)) +
              '-' +
              $timeToFormatedDateHour(parseInt(guildData.weekStatEndAt))
            }}
          </div>
          <div class="coin">
            {{ money_amount(guildData.weekIncome) }}<img src="@/assets/gold_coin.webp" />
          </div>
          <div style="text-align: center">{{ multiLan('Overall host earnings this week') }}</div>
        </span>

        <span class="vertical-divider"></span>

        <span>
          <div
            style="font-size: 10px"
            v-if="guildData.lastWeekStatBeginAt != null && guildData.lastWeekStatEndAt != null"
          >
            {{
              $timeToFormatedDateHour(parseInt(guildData.lastWeekStatBeginAt)) +
              '-' +
              $timeToFormatedDateHour(parseInt(guildData.lastWeekStatEndAt) + 1)
            }}
          </div>
          <div class="coin">
            {{ money_amount(guildData.lastWeekIncome) }}<img src="@/assets/gold_coin.webp" />
          </div>
          <div style="text-align: center">{{ multiLan('Overall host earnings last week') }}</div>
        </span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="weekly_data_title">
      <span>{{multiLan('Weekly statistics')}}</span><span style="font-size: 12px; font-weight: 400; color: #999999"
        >-{{multiLan('Statistics update at xx:00 every day',24 - (8 - $timeZoneOfffsetHours()))}}</span
      >
      <div style="flex:auto;"></div>
      <span class="right_tip">{{multiLan('Statistics over the past 30 days')}}</span>
    </div>
    <InfiniteList
      class="turnover-list-container"
      style="overflow:auto"
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
              $router.push({ path: '/daily_detail', query: { guildId: guildData.id, date: item.date } })
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
            <AutoRTLImg class="right_arror" :src="rightArrorImg"></AutoRTLImg>
          </div>
          <div v-if="weekData != null && index < weekData.data.length - 1" class="divider"></div>
        </div>
      </template>
    </InfiniteList>
  </div>
  <!-- 这里用v-else 会报错，原因未明 -->
  <div v-if="guildData == null" style="width:100%;height:100%;position:fixed;">
    <AutoRTLImg
      :src="loadingImg"
      style="width:81px;height:50px;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)"
    ></AutoRTLImg>
  </div>
</div>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

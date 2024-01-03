<script setup>
import { ref } from 'vue'
import showDialog from '@/utils/Dialog.js'
import { onMounted } from 'vue'
// import router from '../../router/index'
import api from '../../controller/request'
const data = ref(null)
const weekData = ref(null)
const dialogContent =
  '1.收益余额= 可结算收益+不可结算收益（未达到结算标准的主播的提成收益）。注意：当你提现成功之后，我们将扣除可结算收益。\n 2.可结算收益：达到提现条件后在下周可提现的收益。\n 3.提款数额因汇率而异。'
onMounted(() => {
  if (localStorage.getItem('home_tip_dialog_shown') == null) {
    localStorage.setItem('home_tip_dialog_shown', true)
    showDialog(dialogContent, { title: '说明' })
  }

  api
    .get('/manager/guildh5/dashboard')
    .then((response) => (data.value = response.data.data))
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
  api
    .post('/manager/guildh5/page/guild/day/income', {
      pageSize: 100,
      pageNum: 1
    })
    .then(function (response) {
      weekData.value = response.data
      console.log('weekData', response.data)
    })
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
})
</script>
<template>
  <div class="bg"></div>
  <div v-if="data != null" class="container">
    <div class="header">
      <img src="@/assets/logo.png" />
      <div class="meta_info_container">
        <div>
          <span>{{ data.guildName }}</span
          ><span><div>lv.4</div></span>
        </div>
        <div><span>创建时间:2020-12-11</span><span>创建天数99天</span></div>
        <div><span>主播数量：99</span><span>昨日新增主播:9</span></div>
      </div>
    </div>

    <div class="tips">
      <div>提现要求：</div>
      <div>
        1：流水达到<span>{{ data.settleCoinsLimit }}</span
        >的主播不少于<span>{{ data.yesterdayNewAnchorNum + '/' + data.settleCountLimit }}</span
        >名
      </div>
      <div>2：代理佣金可结算收益达到<span>$15</span>才可触发自动提现功能。</div>
      <div>注：完成以上条件后将在下周的三个工作日内自动提现可结算收益</div>
    </div>
    <!-- 提现记录和主播管理按钮 -->
    <div class="buttons">
      <span @click="$router.push('/withdraw_records')">提现记录</span>
      <span @click="$router.push('/anchor_list')">主播管理</span>
    </div>
    <!-- 余额和结算收益 -->
    <div class="more-info">
      <span>
        <div>≈{{ data.usdFee / 100 }}$</div>
        <div>收益余额<img src="@/assets/ask_symbol.webp" /></div>
      </span>
      <span></span>
      <span>
        <div>≈{{ data.genSettleUsdFee / 100 }}$<span class="status">结算中</span></div>
        <div>可结算收益<img src="@/assets/ask_symbol.webp" /></div>
      </span>
    </div>
    <div class="divider"></div>
    <!-- 周收益 -->
    <div class="week_profit">
      <div><span>周收益(金币)</span><span>100金币≈1$</span></div>
      <div>
        <span>
          <div>2021.9.30-2021.10.7</div>
          <div class="coin">{{ data.weekIncome }}<img src="@/assets/gold_coin.webp" /></div>
          <div>本周主播总流水</div>
        </span>
        <span class="vertical-divider"></span>
        <span>
          <div>2021.9.30-2021.10.7</div>
          <div class="coin">{{ data.lastWeekIncome }}<img src="@/assets/gold_coin.webp" /></div>
          <div>上周主播总流水</div>
        </span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="turnover-list-containe">
      <div v-if="weekData != null" v-for="(item, index) in weekData.data">
        <div
          class="item_content"
          @click="
            $router.push({ path: '/daily_detail', query: { guildId: data.id, date: item.date } })
          "
        >
          <span>
            <div>
              日期:<span>{{ item.date }}</span>
            </div>
            <div class="coin">
              全部主播流水：{{ item.coins }}
              <img src="@/assets/gold_coin.webp" />
            </div>
          </span>
          <img class="right_arror" src="@/assets/right_arror.webp" />
        </div>
        <div v-if="weekData != nul && index < weekData.data.length - 1" class="divider"></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

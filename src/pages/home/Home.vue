<script setup>
import { ref } from 'vue'

import { onMounted } from 'vue'
import axios from 'axios'
var data = ref(null)

onMounted(() => {
  console.log(`the component is now mounted.`)
  axios
    .get('family_detail.json')
    .then((response) => (data.value = response.data))
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
})
</script>
<template>
  <div class="bg"></div>
  <div class="container">
    <div class="header">
      <img src="@/assets/logo.png" />
      <div class="meta_info_container">
        <div>
          <span>家族名称</span><span><div>lv.4</div></span>
        </div>
        <div><span>创建时间:2020-12-11</span><span>创建天数99天</span></div>
        <div><span>主播数量：99</span><span>昨日新增主播:9</span></div>
      </div>
    </div>

    <div class="tips">
      <div>提现要求：</div>
      <div>1：流水达到<span>200,000</span>的主播不少于<span>(2/3)</span>名</div>
      <div>2：代理佣金可结算收益达到<span>$15</span>才可触发自动提现功能。</div>
      <div>注：完成以上条件后将在下周的三个工作日内自动提现可结算收益</div>
    </div>
    <!-- 提现记录和主播管理按钮 -->
    <div class="buttons">
      <span>提现记录</span>
      <span>主播管理</span>
    </div>
    <!-- 余额和结算收益 -->
    <div class="more-info">
      <span>
        <div>≈2130$</div>
        <div>收益余额<img src="@/assets/ask_symbol.webp" /></div>
      </span>
      <span></span>
      <span>
        <div>≈452$<span class="status">结算中</span></div>
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
          <div>9999999<img class="coin" src="@/assets/gold_coin.webp" /></div>
          <div>本周主播总流水</div>
        </span>
        <span class="vertical-divider"></span>
        <span>
          <div>2021.9.30-2021.10.7</div>
          <div>9999999<img class="coin" src="@/assets/gold_coin.webp" /></div>
          <div>本周主播总流水</div>
        </span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="turnover-list-containe">
      <div v-if="data != null" v-for="(item, index) in data.daily_turnover">
        <div class="item_content">
          <span>
            <div>
              日期:<span>{{ item.time }}</span>
            </div>
            <div>
              全部主播流水：<span>{{ item.value }}</span
              ><img class="coin" src="@/assets/gold_coin.webp" />
            </div>
          </span>
          <img class="right_arror" src="@/assets/right_arror.webp" />
        </div>
        <div v-if="data!=nul&&index < data.daily_turnover.length - 1" class="divider"></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@import 'home_header.less';
</style>

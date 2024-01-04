<script setup>
import { ref } from 'vue'

import { onMounted } from 'vue'
import api from '../../controller/request'
import AppBarVue from '@/components/AppBar.vue'
import LevelIcon from '@/components/LevelIcon.vue'
import { useRoute } from 'vue-router'
import InfiniteList from '@/components/InfiniteList.vue'

const loadingMore = ref(false)
const refreshing = ref(false)
const noMoreData = ref(false)
var currentPage = 0
var data = ref(null)
const pageSize = 20
onMounted(() => {

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
  let path = '/manager/guildh5/page/anchor/day/incomes'
  // path = 'http://localhost:5173/anchor_list.json'
  const route = useRoute()
  let anchorId = route.query.anchorId
  let date = route.query.date
  api
    .post(path, {
        condition: {
        // guildId: guildId, // 工会id
        anchorId: anchorId, // 主播id ps.主播id和工会id互斥
        date: date // 日期，当天0点时间
      },
      pageNum: currentPage + 1,
      pageSize: pageSize
    })
    .then(function (response) {
      if (currentPage == 0) {
        data.value = response.data
        refreshing.value = false
      } else {
        data.value.daily_datas = [...data.value.daily_datas, ...response.data.daily_datas]
        loadingMore.value = false
      }
      currentPage++
      if (data.value.daily_datas == null || data.value.daily_datas.length < pageSize) {
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
    <div class="base_info">
      <span class="avatar"><span>封禁中</span></span>
      <span>
        <div class="name_and_level">
          <span>
            Babila Ebwélé
            <LevelIcon :level="1.4"></LevelIcon>
          </span>
        </div>
        <div class="id_and_lateast_call">
          <span>ID:66689</span>
          <span>最近通话:2021-9-30</span>
        </div>
      </span>
    </div>
    <div class="divider"></div>
    <!-- 注册时间这几行 -->
    <div class="register_and_more_info">
      <div>注册时间：<span>2020-12-11</span></div>
      <div>累计违规次数：<span>23</span></div>
      <div>解封时间：<span>2020-12-11</span></div>
      <div>封禁原因：<span>辱骂用户</span></div>
    </div>
    <div class="divider"></div>
    <!-- 周数据 -->
    <div class="week_data">
      <div>周数据</div>
      <span class="week_data_container">
        <span>
          <div>2021.9.30-2021.10.7</div>
          <div>9999999<img class="coin" src="@/assets/gold_coin.webp" /></div>
          <div>本周主播流水</div>
        </span>
        <span>
          <div>2021.9.30-2021.10.7</div>
          <div>9999999<img class="coin" src="@/assets/gold_coin.webp" /></div>
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
          <div v-if="data != null" v-for="(item, index) in data.daily_datas">
            <div>
              日期：<span>{{ item.time }}</span>
            </div>
            <div>在线时长：<span>23</span></div>
            <div>平均通话时长：<span>2020-12-11</span></div>
            <div>通话数：<span>00:32:22</span></div>
            <div>收到礼物数：<span>33</span></div>
            <div class="last_item">流水：<span>9999999999</span></div>
            <div class="divider" v-if="data != null && index < data.daily_datas.length - 1"></div>
          </div>
        </div>
      </template>
    </InfiniteList>
  </div>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

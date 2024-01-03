<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import AppBarVue from '@/components/AppBar.vue'
import api from '../../controller/request'
import { useRoute } from "vue-router"
var data = ref(null)

onMounted(() => {
    const route = useRoute()
  const guildId = route.query.guildId
  let date = route.query.date;
  date = 1703606400000;
  api
    .post('/manager/guildh5/page/anchor/day/incomes', {
      condition: {
        guildId: guildId, // 工会id
        // anchorId: 10000389, // 主播id ps.主播id和工会id互斥
        date: date // 日期，当天0点时间
      },
      pageNum: 1,
      pageSize: 10
    })
    .then(function (response){
        data.value = response.data
    })
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
})
</script>
<template>
  <div class="container">
    <AppBarVue title="每日数据详情"></AppBarVue>
  </div>
  <table>
    <thead border="0">
      <tr>
        <th>主播昵称</th>
        <th>在线时长</th>
        <th>主播通话数</th>
        <th>收到礼物数</th>
        <th>流水</th>
      </tr>
    </thead>
    <tbody v-if="data != null">
      <tr class="item" v-for="item in data.data.list">
        <td>{{item.nickname}}</td>
        <td>{{ $timeToFormatedTime(item.onlineDuration) }}</td>
        <td>{{item.callNum}}</td>
        <td>{{item.giftNum}}</td>
        <td>{{item.coins}}<img class="coin" src="@/assets/gold_coin.webp" /></td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

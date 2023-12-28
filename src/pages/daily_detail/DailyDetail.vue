<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import AppBarVue from '@/components/AppBar.vue';
import axios from 'axios'

var data = ref(null)

onMounted(() => {
  console.log(`the component is now mounted.`)
  axios
    .get('daily_detail.json')
    .then((response) => (data.value = response.data))
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
    <table >
            <thead border="0">
                <tr>
                    <th>主播昵称</th>
                    <th>在线时长</th>
                    <th>主播通话数</th>
                    <th>收到礼物数</th>
                    <th>流水</th>
                </tr>

            </thead>
        <tbody>
        <tr  class="item" v-if="data!=null" v-for="item in data.items">
            <td>美女依依</td>
            <td>{{$timeToFormatedTime(item.time)}}</td>
            <td>653</td>
            <td>333</td>
            <td>999<img class="coin" src="@/assets/gold_coin.webp"/></td>
        </tr>
        </tbody>
    </table>
</template>
<style scoped lang="less">
@import 'daily_detail.less';
</style>
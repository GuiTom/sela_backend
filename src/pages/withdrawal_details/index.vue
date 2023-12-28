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
        <AppBarVue title="提现明细"></AppBarVue>
    </div>
    <table >
            <thead border="0">
                <tr>
                    <th>主播昵称</th>
                    <th>流水</th>
                    <th>你的收益</th>
                </tr>

            </thead>
        <tbody>
        <tr  class="item" v-if="data!=null" v-for="item in data.items">
            <td>美女依依</td>
            <td>999<img class="coin" src="@/assets/gold_coin.webp"/></td>
            <td class="profit">+{{item.value}}</td>
        </tr>
        </tbody>
    </table>
</template>
<style scoped lang="less">
@import 'index.less';
</style>
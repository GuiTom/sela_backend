<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import AppBarVue from '@/components/AppBar.vue'

import api from '../../controller/request'

var data = ref(null)

onMounted(() => {
  console.log(`the component is now mounted.`)
  api
    .post('/manager/guildh5/page/anchor/settle', {
      pageNum: 1,
      pageSize: 10
    })
    .then((response) => (data.value = response.data))
    .catch(function (error) {
      // 请求失败处理
      console.log(error)
    })
})
</script>
<template>
  <div class="container">
    <AppBarVue title="提现记录"></AppBarVue>
  </div>
  <div class="list" v-if="data != null">
    <div
      v-for="item in data.data.list"
      @click="$router.push({ name: 'withdrawal details', query:{'data':JSON.stringify(item)}
    })"
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
            >提现中</span
          >
        </div>
        <div>
          {{
            item.settleStatus == 0
              ? '正在处理中，请耐心等待'
              : item.settleStatus == 1
                ? '已提现至你的银行账户'
                : '提前请求已失效'
          }}
        </div>
      </div>
      <span class="spacer"></span>
      <span class="value">{{ item.usdFee }}$</span>
      <img class="right_arror" src="@/assets/right_arror.webp" />
    </div>
  </div>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

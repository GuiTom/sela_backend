<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import AppBarVue from '@/components/AppBar.vue'

import axios from 'axios'

var data = ref(null)

onMounted(() => {
  console.log(`the component is now mounted.`)
  axios
    .get('anchor_list.json')
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
    <div v-for="(item, index) in data.anchor_list" @click="$router.push('/withdrawal_details')">
    <div class="row_left_part">
        <div>2021-9-30<span>提现中</span></div>
        <div>正在处理中，请耐心等待</div>
    </div>
     <span class="spacer"></span>
     <span class="value">34$</span>
     <img class="right_arror" src="@/assets/right_arror.webp"/>
    </div>
  </div>
</template>
<style scoped lang="less">
@import 'index.less';
</style>

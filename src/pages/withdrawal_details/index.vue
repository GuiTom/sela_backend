<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import AppBarVue from '@/components/AppBar.vue';
// import router from '../../router/index'
import { useRoute } from "vue-router"
var data = ref(null)

onMounted(() => {
    let route = useRoute();
    data.value = JSON.parse(route.query.data);
    console.log('data.value',data.value);
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
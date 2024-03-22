<script setup>
import AnchorAvatar from '@/components/AnchorAvatar.vue';
import AppBarVue from '@/components/AppBar.vue'
import PlaceHolderImage from '@/components/PlaceHolderImage.vue';
import { multiLan } from '@/utils/lan';
import { onMounted, ref } from 'vue';
import api from '../../controller/request'
import { guildData, activityNeeds, joinLimits } from '@/global'
const data = ref(JSON.parse(localStorage.getItem('param')))
const progressData = ref(null)
const leftSeconds = ref(Math.floor((parseInt(data.value.endAt)- Date.now())/1000))
console.log('leftSeconds',leftSeconds)
onMounted(()=>{
    setInterval(()=>(
        leftSeconds.value = Math.floor((parseInt(data.value.endAt)- Date.now())/1000)
    
    ),1000);
    requestProgress()
})

function requestProgress() {
    console.log('join')
    let path = '/manager/guild/activity/info'
    api
        .post(path, {
            guildId: guildData.value.id,
            activityId: data.value.id,
        })
        .then(function (response) {
            console.log('response',response)
            if(response.data.code==0){
                progressData.value = response.data.data;
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
        <AppBarVue :title="multiLan('Activity center')" />
        <div class="header">
            {{ leftSeconds }}
            <div class="title">剩余时间<span>{{Math.floor(leftSeconds/(3600*24))}}</span>天</div>
            <div class="time_count">
                <div class="number">{{Math.floor((leftSeconds%(3600*24))/36000)}}</div>
                <div class="number">{{Math.floor(leftSeconds%(3600*24)/3600)%10}}</div>
                <div class="comma">:</div>
                <div class="number">{{Math.floor(leftSeconds%60/10)}}</div>
                <div class="number">{{Math.floor(leftSeconds%10)}}</div>
            </div>
            <div class="param_list">

                <div class="param_item" v-for="(item,index) in progressData.conditions">
                    <img src="@/assets/activity_icon2.webp" />
                    <div class="content">
                        <div class="ratio"><span>{{item.completeNum}}</span>/<span>{{item.val}}</span></div>
                        <div class="field_name">{{activityNeeds[item.conditionType-1]}}</div>
                    </div>
                    <div style="flex: auto;"></div>
                    <div class="status" v-if="data.status==1">已完成</div>
                    <div class="status" v-else>未完成</div>
                </div>
            </div>
        </div>
        <div class="member_list">
            <div v-for="index in 5">
                <PlaceHolderImage :src="'abc'"></PlaceHolderImage>
                <div class="nickname">聪明</div>
                <div><span>999999</span><span><img class="coin" src="@/assets/gold_coin.webp"/></span></div>
                <div>未达标</div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
@import './index.css';
</style>
<script setup>
import AppBarVue from '@/components/AppBar.vue'
import { multiLan } from '@/utils/lan';
import { onMounted, ref } from 'vue';
import { timeToFormatedDate } from '@/utils/time_utils'
import { guildData } from '@/global'
import api from '../../controller/request'
import toast from '@/utils/toast';
import { useRoute } from 'vue-router'
import router from '@/router/index'
import loadingImg from '@/assets/loading.webp'
import AutoRTLImg from '@/components/AutoRTLImg.vue'
const data = ref(null)


onMounted(()=>{
    
    requestData()
})
function requestData() {
let activityId = useRoute().query.activity_id;
let path = '/manager/guild/activity/info'
api
    .post(path, {
        guildId: guildData.value.id,
        activityId: activityId,
    })
    .then(function (response) {
        if (response.data.code == 0) {
            data.value = response.data.data
       
        }

    })
    .catch(function (error) {
        // 请求失败处理
        console.log(error)
    })
}
let allowJoin = true;
function onJoin() {
    if(!allowJoin) return
    allowJoin = false
    let path = '/manager/guild/activity/join'
    api
        .post(path, {
            guildId: guildData.value.id,
            activityId: data.value.id,
        })
        .then(function (response) {
            if (response.data.code == 0) {
                if(response.data.data==true){
                    data.value.recordStatus = 2
                    toast(multiLan('Joined'))
                }
              
            }else {
                allowJoin = true
            }

        })
        .catch(function (error) {
            // 请求失败处理
            console.log(error)
            allowJoin = false
        })
}
function onViewDetail() {

    localStorage.setItem('param',JSON.stringify(data.value));
    router.push('/activity_progress')
}
</script>
<template>
    <div class="container">
        <AppBarVue class="appBar" :title="multiLan('Activity center')" />
        <div class="logo">ANCHORS <br /> ADVANCE QUICKLY</div>
        <div v-if="data" class="info_list">
            <div class="header">
                Event Details
            </div>
            <div class="title">{{data.activityName}}</div>
            <div class="list_item">
                <img src="@/assets/reward_icon.webp" />
                <div class="content">
                    <div class="requirement">{{multiLan('Activity needs')}}</div>
                    <div  class="content" >
                        <span>{{multiLan('Duration activity')}},</span>
                        <span v-if="data.conditionRecords" v-for="(item, index) in data.conditionRecords" :key="index">
                            <span v-if="index>0">&nbsp;{{data.conditionOpt=='&&'?multiLan('And'):multiLan('Or')}}&nbsp;</span>
                            <span v-if="item!=null&&item.conditionType==1">{{ multiLan('Activity need New anchor count',item.val) }}</span>
                            <span v-if="item!=null&&item.conditionType==2">{{multiLan('Activity need New anchor count meet settlement',item.val)}}</span>
                            <span v-if="item!=null&&item.conditionType==3&&item.val>60">{{ multiLan('Activity need New anchor online time in hour and minute',Math.floor(item.val/60),item.val%60) }}</span>
                            <span v-if="item!=null&&item.conditionType==3&&item.val<=60">{{ multiLan('Activity need New anchor online time in minute',item.val)}}</span>
                            <span v-if="item!=null&&item.conditionType==4">{{multiLan('Activity need guild total income',item.val) }}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div style="height:2px;background-color:#ededed;"></div>
            <div class="list_item">
                <img src="@/assets/reward_icon.webp" />
                <div class="content">
                    <div class="requirement">{{multiLan("Reward")}}</div>
                    <div class="content">{{ data.reward }}{{ data.rewardType == 1 ? '$' : multiLan('Coin') }}</div>
                </div>
            </div>
            <div style="height:2px;background-color:#ededed;"></div>
            <div class="list_item">
                <img src="@/assets/reward_icon.webp" />
                <div class="content">
                    <div class="requirement">{{multiLan('Threshold to join')}}</div>
                    <div v-if="data.joinType!=0"  class="content" v-for="(item, index) in data.joinLimits">
                        <span v-if="item.limitType==1">{{multiLan('Joint limit Guild level',item.val)}}</span>
                        <span v-if="item.limitType==2">{{multiLan('Joint limit Guild population',item.val)}}</span>
                        <span v-if="item.limitType==3">{{multiLan('Joint limit xx level Anchor portion',item.val,item.val2)}}</span>
                        <span v-if="item.limitType==4">{{multiLan('Joint limit Activie anchor portion',item.val)}}({{ multiLan('New anchor online time tips') }})</span>
                        <span v-if="item.limitType==5">{{multiLan('Joint limit Last xx day score',item.val,item.val2)}}</span>
                    </div>
                    <div v-else  class="content">
                        <span>{{multiLan('All guild can join')}}</span>
                    </div>
                </div>
            </div>
            <div style="height:2px;background-color:#ededed;"></div>
            <div class="list_item">
                <img src="@/assets/reward_icon.webp" />
                <div class="content">
                    <div class="requirement">{{multiLan('Event time')}}</div>
                    <div class="content">{{ timeToFormatedDate(parseInt(data.startAt)) }} -
                        {{ timeToFormatedDate(parseInt(data.endAt)) }}</div>
                </div>
            </div>
            <div class="join_button join_status_0" v-if="data.recordStatus==0"  @click="onJoin">{{multiLan('Apply to join')}}</div>
            <div class="join_button join_status_2" v-if="data.recordStatus==1">{{multiLan('Under join limit')}}</div>
            <div class="join_button join_status_1" v-if="data.recordStatus==2">{{multiLan('Joined')}}</div>
            <div class="join_button join_status_1" v-if="data.recordStatus==3">{{multiLan('Completed')}}</div>
            <div class="join_button join_status_1" v-if="data.recordStatus==4">{{multiLan('Received')}}</div>
            <div class="join_button join_status_2" v-if="data.recordStatus==5">{{multiLan('Ended')}}</div>
            <div class="join_button join_status_2" v-if="data.recordStatus==6">{{multiLan('Closed')}}</div>
            <div class="join_button join_status_2" v-if="data.recordStatus==7">{{multiLan('WillStart')}}</div>
            <div class="view_button" v-if="data.recordStatus!=0&&data.recordStatus!=1&&data.recordStatus!=5&&data.recordStatus!=6&&data.recordStatus!=7" @click="onViewDetail">{{multiLan('View progress')}}</div>
        </div>
        <div v-else style="width:100%;height:100%;position:fixed;">
            <AutoRTLImg
              :src="loadingImg"
              style="width:81px;height:50px;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)"
            ></AutoRTLImg>
          </div>
    </div>
</template>
<style scoped lang="less">
@import './index.css';
</style>
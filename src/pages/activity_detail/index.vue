<script setup>
import AppBarVue from '@/components/AppBar.vue'
import { multiLan } from '@/utils/lan';
import { onMounted, ref } from 'vue';
import { timeToFormatedDate } from '@/utils/time_utils'
import { guildData, activityNeeds, joinLimits } from '@/global'
import api from '../../controller/request'
import toast from '@/utils/toast';
import { useRoute } from 'vue-router'
import router from '@/router/index'
import loadingImg from '@/assets/loading.webp'
import AutoRTLImg from '@/components/AutoRTLImg.vue'
const data = ref(null)
const importedNeeds = activityNeeds;
const importedJoinLimits = joinLimits;
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

function onJoin() {

    let path = '/manager/guild/activity/join'
    api
        .post(path, {
            guildId: guildData.value.id,
            activityId: data.value.id,
        })
        .then(function (response) {
            if (response.data.code == 0) {
                toast('Joined')
            }

        })
        .catch(function (error) {
            // 请求失败处理
            console.log(error)
        })
}
function onViewDetail() {

    localStorage.setItem('param',JSON.stringify(data.value));
    router.push('/activity_progress')
}
</script>
<template>
    <div class="container">
        <AppBarVue :title="multiLan('Activity center')" />
        <div class="logo">Anchors <br /> advance quickly</div>
        <div v-if="data" class="info_list">
            <div class="header">
                Event Details
            </div>
            <div class="list_item">
                <img src="@/assets/reward_icon.webp" />
                <div class="content">
                    <div class="requirement">{{multiLan('Activity needs')}}</div>
                    <div v-if="data.conditionRecords" class="content" v-for="(item, index) in data.conditionRecords" :key="index">
                       
                        <span v-if="item!=null&&item.conditionType==1"> {{ multiLan('Activity need New anchor count',item.val) }}</span>
                        <span v-if="item!=null&&item.conditionType==2"> {{multiLan('Activity need New anchor count meet settlement',item.val)}}</span>
                        <span v-if="item!=null&&item.conditionType==3"> {{ multiLan('Activity need New anchor online time',item.val) }}</span>
                        <span v-if="item!=null&&item.conditionType==4"> {{multiLan('Activity need guild total income',item.val) }}</span>
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
                    <div class="content" v-for="(item, index) in data.joinLimits">
                    
                        <span v-if="item.limitType==1">{{multiLan('Joint limit Guild level',item.val)}}</span>
                        <span v-if="item.limitType==2">{{multiLan('Joint limit Guild population',item.val)}}</span>
                        <span v-if="item.limitType==3">{{multiLan('Joint limit Activie anchor portion',item.val)}}</span>
                        <span v-if="item.limitType==4">{{multiLan('Joint limit xx level Anchor portion',item.val)}}</span>
                        <span v-if="item.limitType==5">{{multiLan('Joint limit Last xx day score',item.val)}}</span>
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
            <div class="join_button" v-if="data.recordStatus==0"  @click="onJoin">{{multiLan('Apply to join')}}</div>
            <div class="join_button_gray" v-if="data.recordStatus==1"   @click="onJoin">{{multiLan('Under join limit')}}</div>
            <div class="join_button_gray" v-if="data.recordStatus==2"  @click="onJoin">{{multiLan('Joined')}}</div>
            <div class="join_button_gray" v-if="data.recordStatus==3"   @click="onJoin">{{multiLan('Completed')}}</div>
            <div class="join_button_gray" v-if="data.recordStatus==4"   @click="onJoin">{{multiLan('Received')}}</div>
            <div class="join_button_gray" v-if="data.recordStatus==5"   @click="onJoin">{{multiLan('Received')}}</div>
            <div class="join_button_gray" v-if="data.recordStatus==6"   @click="onJoin">{{multiLan('Apply to join')}}</div>
            <div class="view_button" @click="onViewDetail">{{multiLan('View progress')}}</div>
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
.container {
    height: 100vh;
    background-image: url('@/assets/activity_detail_bg.webp');
    background-size: 100% 100%;

    .logo {
        margin-top: 44px;
        margin-bottom: 34px;
        margin-left: 20px;
        width: 178px;
        height: 53px;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 20px;
        text-shadow: 0px 2px 0px rgba(250, 100, 238, 0.44);
        text-align: center;

    }

    .info_list {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 12px 0 12px;
        border-radius: 20px;
        border: 2px solid #FFFFD7;
        background-color: white;
        padding: 14px;

        .header {
            width: 254px;
            height: 46px;
            background-image: url("@/assets/activity_list_header.webp");
            background-size: 100% 100%;
            font-weight: 600;
            font-size: 15px;
            color: #FFFFFF;
            text-align: center;
            line-height: 40px;
        }

        .list_item {
            width: 100%;
            padding: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            >img {
                width: 40px;
                height: 40px;
            }

            .content {
                .requirement {
                    font-weight: 600;
                    font-size: 16px;
                    color: #170423;
                }

                .content {
                    font-size: 13px;
                    color: #4A444D;
                }
            }


        }

        .join_button {
            margin-top: 36px;
            height: 62px;
            width: 100%;
            border-radius: 31px;
            background-image: url('@/assets/join_button_bg.webp');
            background-size: 100% 100%;
            text-align: center;
            line-height: 62px;
            font-weight: 600;
            font-size: 17px;
            color: #FFFFFF;
        }
        .join_button_gray{
            margin-top: 36px;
            height: 62px;
            width: 100%;
            border-radius: 31px;
            background-color: grey;
            text-align: center;
            line-height: 62px;
            font-weight: 600;
            font-size: 17px;
            color: #FFFFFF; 
        }

        .view_button {
            height: 62px;
            border-radius: 31px;
            font-weight: 600;
            font-size: 17px;
            color: #F051E9;
            line-height: 62px;
        }
    }
}
</style>
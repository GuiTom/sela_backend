<script setup>
import AppBarVue from '@/components/AppBar.vue'
import { multiLan } from '@/utils/lan';
import { ref } from 'vue';
import { timeToFormatedDate } from '@/utils/time_utils'
import { guildData, activityNeeds, joinLimits } from '@/global'
import api from '../../controller/request'
import toast from '@/utils/toast';
const data = ref(JSON.parse(localStorage.getItem('param')))
const importedNeeds = activityNeeds;
const importedJoinLimits = joinLimits;
console.log(data.value)

function onJoin() {
    console.log('join')
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
</script>
<template>
    <div class="container">
        <AppBarVue :title="multiLan('Activity center')" />
        <div class="logo">Anchors <br /> advance quickly</div>
        <div class="info_list">
            <div class="header">
                Event Details
            </div>
            <div class="list_item">
                <img src="@/assets/reward_icon.webp" />
                <div class="content">
                    <div class="requirement">活动要求</div>
                    <div class="content" v-for="(item, index) in data.conditions" :key="index">
                        活动期间，公会{{ importedNeeds[item.conditionType - 1] }}超过{{ item.val }}个</div>
                </div>
            </div>
            <div style="height:2px;background-color:#ededed;"></div>
            <div class="list_item">
                <img src="@/assets/reward_icon.webp" />
                <div class="content">
                    <div class="requirement">奖励</div>
                    <div class="content">{{ data.reward }}{{ data.rewardType == 1 ? '美金' : '金币' }}</div>
                </div>
            </div>
            <div style="height:2px;background-color:#ededed;"></div>
            <div class="list_item">
                <img src="@/assets/reward_icon.webp" />
                <div class="content">
                    <div class="requirement">参与要求</div>
                    <div class="content" v-for="(item, index) in data.joinLimits">
                        活动期间，公会{{ importedJoinLimits[item.limitType - 1] }}超过（{{ item.val }}）个</div>
                </div>
            </div>
            <div style="height:2px;background-color:#ededed;"></div>
            <div class="list_item">
                <img src="@/assets/reward_icon.webp" />
                <div class="content">
                    <div class="requirement">活动时间</div>
                    <div class="content">{{ timeToFormatedDate(parseInt(data.startAt)) }} -
                        {{ timeToFormatedDate(parseInt(data.endAt)) }}</div>
                </div>
            </div>
            <div class="join_button" @click="onJoin">报名参与</div>
            <div class="view_button" @click="$router.push('/activity_progress')">查看进度</div>
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
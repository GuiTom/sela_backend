<script setup>
import AppBarVue from '@/components/AppBar.vue'
import { multiLan } from '@/utils/lan';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { guildData } from '@/global'
import money_amount from '@/utils/mony_amount'
import toast from '@/utils/toast'
import api from '../../controller/request'
import { currentLanguage } from '@/utils/lan'
onMounted(() => {
    requestData()
}
)
const data = ref(null)
const shareLinkStart = `${location.protocol}//${location.host}/#/`
const shareLinkEnd = `download/?code=${guildData.value.guildCode}`
function requestData() {
    let activityId = useRoute().query.activity_id;
    let path = '/manager/guildh5/page/taskList?lang=' + currentLanguage()
    api
        .get(path)
        .then(function (response) {
            if (response.data.code == 0) {
                data.value = response.data.data
                // console.log(data.value)
            }
        })
        .catch(function (error) {
            // 请求失败处理
            console.log(error)
        })
}
async function onClickShare() {
    try {
        await navigator.clipboard.writeText(shareLinkStart + shareLinkEnd);

    } catch (err) {

    }
    toast(multiLan('Link has been copied'))
}
</script>
<template>
    <div class="bg">
        <AppBarVue class="appBar" :title="multiLan('Invite anchor')" />
        <div class="container">
            <div class="header appHeader">
                <div>{{ multiLan('My specical invite link') }}</div>
                <div class="link">{{ shareLinkStart }}<br />{{ shareLinkEnd }}</div>
                <div class="share_button" @click="onClickShare">{{ multiLan('Share') }}</div>
            </div>
            <div style="height:12px;"></div>
            <div class="reward_card">
                <div>{{ multiLan('Invite rewarded') }}</div>
                <div class="list" v-if="data">
                    <div v-for="(item, index) in data">
                        <div class="list_item">
                            <img class="icon" src="@/assets/reward_icon.webp">
                            <div style="width:10px;"></div>
                            <div class="middle">
                                <div class="desc">{{ item.title }}</div>
                            </div>
                            <div style="flex:auto;"></div>
                            <div class="status_complete" v-if="item.taskStatus != -1">{{ multiLan('Completed') }}</div>
                            <div class="reward" v-if="item.taskStatus == -1">+{{ money_amount(item.rewardVo.dollarNum)
                                }}$</div>
                        </div>
                        <div style="height: 1px;background-color:#EAEAEA;"></div>
                    </div>
                </div>
                <div style="flex: auto;"></div>
                <div class="tips">{{ multiLan('Withdraw tips') }}</div>
                <div style="height: 60px;"></div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.bg {
    background-image: url('@/assets/anchor_bg.webp');
    background-size: 100% 100%;
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
}

.appBar {
    position: fixed;
}

.container {
    height: 100vh;
    margin-top: 45px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    >.header {

        height: 46.4vw;
        margin: 20px 12px;
        padding-left: 20px;
        padding-right: 20px;
        background-image: url('@/assets/invite_anchor_header_bg.webp');
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        >div:nth-child(1) {
            margin-top: 20px;
            color: #FFFFFF;
            line-height: 20px;
        }

        .link {

            margin-top: 11px;
            font-weight: 600;
            font-size: 16px;
            color: #FFFFFF;
            background: #FFFFFF2F;
            text-align: center;
            border-radius: 22px;
            width: calc(100% - 40px);
            padding: 0 20px;
        }

        >div:nth-child(3) {
            font-weight: 600;
            font-size: 16px;
            padding: 11px 40px;
            margin-top: 10px;
            color: #360E62;
            border-radius: 50px;
            background-color: white;
            margin-bottom: 20px;
        }

    }

    .reward_card {
        display: flex;
        flex-direction: column;
        margin: 0 12px;
        border-radius: 12px;
        background-color: white;


        padding: 12px;

        .header {
            font-weight: 600;
            font-size: 16px;
            color: #000000;
            line-height: 22px;
        }

        .list {
            .list_item {
                padding: 12px 6px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .icon {
                    width: 38px;
                    height: 38px;
                }

                .middle {
                    .desc {
                        font-weight: 500;
                        font-size: 14px;
                        color: #3B3B3B;
                        line-height: 20px;
                    }


                }

                .status_complete {
                    color: #D367FE;
                    font-weight: 500;
                    font-size: 13px;
                }

                .reward {
                    font-weight: 500;
                    font-size: 13px;
                    color: #999999;
                }

            }

        }

        .tips {
            width: 100%;
            text-align: center;
            font-size: 13px;
            color: #737373;
        }
    }
}
</style>
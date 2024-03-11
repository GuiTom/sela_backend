<script setup>
import AppBarVue from '@/components/AppBar.vue'
import { multiLan } from '@/utils/lan';
</script>
<template>
    <div class="container">
        <AppBarVue :title="multiLan('Invite anchor')" />
        <div style="height: 27px;"></div>
        <div class="header">
            <div>我的专属邀请链接</div>
            <div class="">https://djdwhdjshdsh</div>
            <div class="share_button">分享</div>
        </div>
        <div style="height:12px;"></div>
        <div class="reward_card">
            <div class="header">邀请奖励</div>
            <div class="list">
                <div v-for="index in 3">
                    <div class="list_item">
                        <img class="icon" src="@/assets/reward_icon.webp">
                        <div class="middle">
                            <div class="desc">累计邀请5个主播</div>
                            <div class="progress">1/5</div>
                        </div>
                        <div style="flex:auto;"></div>
                        <div class="status_complete">已完成</div>
                    </div>
                    <div style="height: 1px;background-color:#EAEAEA;"></div>
                </div>
            </div>
            <div style="flex: auto;"></div>
            <div class="tips">Tips:现金任务完成后，请耐心等候平台打款</div>
            <div style="height: 60px;"></div>
        </div>
    </div>
</template>
<style scoped lang="less">
.container {
    height: 100vh;
    background-image: url('@/assets/anchor_bg.webp');
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;

    >.header {
        height: 46.4vw;
        margin: 0 12px;
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

        >div:nth-child(2) {
            margin-top: 11px;
            font-weight: 600;
            font-size: 16px;
            color: #FFFFFF;
            background: #FFFFFF2F;

            border-radius: 22px;
            padding: 11px 62px;
        }

        >div:nth-child(3) {
            font-weight: 600;
            font-size: 16px;
            padding: 11px 40px;
            margin-top: 10px;
            color: #360E62;
            background-image: url('@/assets/share_button_bg.webp');
            background-size: 100% 100%;
            margin-bottom: 20px;
        }

    }

    .reward_card {
        display: flex;
        flex-direction: column;
        margin: 0 12px;
        border-radius: 12px;
        background-color: white;
        height: calc(100vh - 46.4vw - 20px - 12px);
        padding: 12px;
        
        .header {
            font-weight: 600;
            font-size: 16px;
            color: #000000;
            line-height: 22px;
        }

    .list{


        .list_item {
            padding: 12px 6px;
            display: flex;

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

                .progress {
                    font-weight: 400;
                    font-size: 12px;
                    color: #737373;
                    line-height: 17px;
                }
            }

        }

    }
    .tips{
        width: 100%;
        text-align: center;
        font-size: 13px;
        color: #737373;
    }
    }
}
</style>
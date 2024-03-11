<script setup>
import AppBarVue from '@/components/AppBar.vue'
import { multiLan } from '@/utils/lan';

</script>
<template>
    <div class="container">
        <AppBarVue :title="multiLan('Activity center')" />
        <div class="logo"></div>
        <div class="info_list">
            <div class="header">
                <img src="@/assets/activity_list_header.webp" />
            </div>
            <div v-for="index in 4">
                <div class="list_item">
                    <img src="@/assets/reward_icon.webp" />
                    <div class="content">
                        <div class="requirement">活动要求</div>
                        <div class="content">活动期间内，公会达到最低结算标准的新主播数量超过（{{ index }}）个</div>
                    </div>
                    
                </div>
                <div v-if="index<=3" style="height:2px;background-color:#ededed;"></div>
            </div>
            <div class="join_button">报名参与</div>
            <div class="view_button">查看详情</div>
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
        background-color: blue;
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

            img {
                width: 100%;
                height: 100%;
            }
        }

        .list_item {
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
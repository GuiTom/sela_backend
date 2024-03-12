<script setup>
import AppBarVue from '@/components/AppBar.vue'
import { multiLan } from '@/utils/lan';
import headImg1 from '@/assets/head_img1.png';
import headImg2 from '@/assets/head_img2.png';
const imgs = [headImg1, headImg2, headImg2]
</script>
<template>
    <div class="container">
        <AppBarVue :title="multiLan('Activity center')" />
        <div style="height: 20px;"></div>
        <div class="activity_list">
            <div class="list_item" v-for="item in imgs" @click="$router.push('/activity_center')">
                <img class="headimg" :src="item" />
                <div class="footer">
                    <div>
                        <div>新主播快速进阶</div>
                        <div>活动时间：2024-01-01 - 2024-01-03</div>
                    </div>
                    <div style="flex:auto;"></div>
                    <div class="button">进行中</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.container {
    height: 100vh;
    background-image: url('@/assets/anchor_bg.webp');
    background-size: 100% 100%;

    .activity_list {
        display: flex;
        flex-direction: column;

        .list_item {
            border-radius: 12px;
            background-color: white;
            margin: 12px 12px 0 12px;

            >.headimg {
                width: 100%;
                height: 31.5vw;
            }

            >.footer {
                align-items: center;
                padding: 12px;
                display: flex;

                .button {
                    border-radius: 14.5px;
                    border: 1px solid #BCBCBC;
                    padding: 6px 12px;
                    font-weight: 500;
                    font-size: 13px;
                    color: #B2AFAF;
                }
            }
        }
    }

}
</style>
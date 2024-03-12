<script setup>
import AnchorAvatar from '@/components/AnchorAvatar.vue';
import AppBarVue from '@/components/AppBar.vue'
import PlaceHolderImage from '@/components/PlaceHolderImage.vue';
import { multiLan } from '@/utils/lan';

</script>
<template>
    <div class="container">
        <AppBarVue :title="multiLan('Activity center')" />
        <div class="header">
            <div class="title">剩余时间<span>28</span>天</div>
            <div class="time_count">
                <div class="number">1</div>
                <div class="number">8</div>
                <div class="comma">:</div>
                <div class="number">0</div>
                <div class="number">3</div>
            </div>
            <div class="param_list">
                <div class="param_item">
                    <img src="@/assets/activity_icon2.webp" />
                    <div class="content">
                        <div class="ratio"><span>123</span>/<span>100</span></div>
                        <div class="field_name">新主播数量</div>
                    </div>
                    <div style="flex: auto;"></div>
                    <div class="status">已完成</div>
                </div>
                <div class="param_item">
                    <img src="@/assets/activity_icon2.webp" />
                    <div class="content">
                        <div class="ratio"><span>123</span>/<span>100</span></div>
                        <div class="field_name">新主播数量</div>
                    </div>
                    <div style="flex: auto;"></div>
                    <div class="status">已完成</div>
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
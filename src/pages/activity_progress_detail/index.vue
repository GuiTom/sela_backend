<script setup>
import { onMounted } from 'vue';
import { multiLan } from '@/utils/lan';
import PlaceHolderImage from '@/components/PlaceHolderImage.vue';
import AppBarVue from '@/components/AppBar.vue'
import {formatDuration2} from '@/utils/time_utils'
const data = JSON.parse(localStorage.getItem('currentCondition'))
</script>
<template>
    <div class="container">
        <AppBarVue :title="multiLan('Activity progress detail')" />
        <div class="list">
            <div class="param_item">
                <img src="@/assets/activity_icon2.webp" />
                <div class="content" v-if="data!=null">
                    <div class="ratio"><span>{{data.completeNum}}</span>/<span>{{data.val}}</span></div>
                    <div class="field_name">
                        <span v-if="data.conditionType==1">{{ multiLan('Activity need New anchor count',data.val) }}</span>
                        <span v-if="data.conditionType==2">{{multiLan('Activity need New anchor count meet settlement',data.val)}}</span>
                        <span v-if="data.conditionType==3">{{ multiLan('Activity need New anchor online time',data.val) }}</span>
                        <span v-if="data.conditionType==4">{{multiLan('Activity need guild total income',data.val) }}</span>
                    </div>
                </div>
                <div style="flex: auto;"></div>
                <div class="status" v-if="data!=null&&data.completeNum>=data.val" style="color:#D367FE">{{multiLan('Completed')}}</div>
                <div class="status" v-else style="color:#FF5CC4">{{multiLan('Fininished')}}</div>
            </div>
            <div style="margin:0 12px;height: 1px;background-color:#eaeaea;"></div>
            <div class="record" v-for="item in data.records">
                <PlaceHolderImage class="avatar" :src="item.portrait">
                  </PlaceHolderImage>
                  <div style="width: 12px;"></div>
                  <div class="nickname">{{item.nickname}}</div>
                  <div style="flex: auto;"></div>
                  <div class="count" v-if="data.conditionType==1">{{multiLan('People count',item.val)}}</div>
                  <div class="count" v-if="data.conditionType==2">{{multiLan('People count',item.val)}}</div>
                  <div class="count" v-if="data.conditionType==3">{{formatDuration2(item.val)}}</div>
                  <div class="money" v-if="data.conditionType==4">{{item.val}}<img class="coin" src="@/assets/gold_coin.webp" /></div>
                  <div style="flex: auto;"></div>
                  <div v-if="item.status==1" class="completed">{{multiLan('Completed')}}</div>
                  <div v-else class="uncompleted">{{multiLan('Not completed')}}</div>
            </div>
        </div>
        
    </div>
</template>
<style scoped lang="less">
@import './index.css';
</style>
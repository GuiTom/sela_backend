<script setup>
import { onMounted } from 'vue';
import { multiLan } from '@/utils/lan';
import Avatar from '@/components/Avatar.vue';
import AppBarVue from '@/components/AppBar.vue'
import {formatDuration2} from '@/utils/time_utils'
import money_amount from '@/utils/mony_amount'
const data = JSON.parse(localStorage.getItem('currentCondition'))
</script>
<template>
    <div class="container">
        <AppBarVue :title="multiLan('Activity progress detail')" />
        <div class="list">
            <div class="param_item">
                <img src="@/assets/activity_icon2.webp" />
                <div class="content" v-if="data!=null">
                    <div class="ratio" v-if="data.conditionType==4"><span>{{money_amount(data.completeNum??0)}}</span><span>/{{data.val}}</span></div>
                    <div class="ratio" v-else-if="data.conditionType!=3"><span>{{data.completeNum??0}}</span>/<span>{{data.val}}</span></div>
                    <div class="ratio" v-else><span>{{multiLan('People fulfilled count',data.completeNum??0)}}</span></div>
                    <div class="field_name">
                        <span v-if="data.conditionType==1">{{ multiLan('Activity need New anchor count',data.val) }}</span>
                        <span v-if="data.conditionType==2">{{multiLan('Activity need New anchor count meet settlement',data.val)}}</span>
                        <span v-if="item!=null&&item.conditionType==3&&item.val>60">{{ multiLan('Activity need New anchor online time in hour and minute',Math.floor(item.val/60),item.val%60) }}</span>
                        <span v-if="item!=null&&item.conditionType==3&&item.val<=60">{{ multiLan('Activity need New anchor online time in minute',item.val)}}</span>
                        <span v-if="data.conditionType==4">{{multiLan('Activity need guild total income',data.val) }}</span>
                    </div>
                </div>
                <div style="flex: auto;"></div>
                <div class="status" v-if="data.status==1" style="color:#D367FE">{{multiLan('Completed')}}</div>
                <div class="status" v-else style="color:#FF5CC4">{{multiLan('Not completed')}}</div>
            </div>
            <div style="margin:0 12px;height: 1px;background-color:#eaeaea;"></div>
            <div class="record" v-for="item in data.records">
                <Avatar class="left_avatar" :src="item.portrait">
                  </Avatar>
                  <div style="width: 12px;"></div>
                  <div class="nickname">{{item.nickname}}</div>
                  <div style="flex: auto;"></div>
                  <div class="count" v-if="data.conditionType==1">{{multiLan('People count',item.val)}}</div>
                  <div class="money" v-if="data.conditionType==2">{{money_amount(item.val)}}<img class="coin" src="@/assets/gold_coin.webp" /></div>
                  <div class="count" v-if="data.conditionType==3">{{formatDuration2(item.val)}}</div>
                  <div class="money" v-if="data.conditionType==4">{{money_amount(item.val)}}<img class="coin" src="@/assets/gold_coin.webp" /></div>
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
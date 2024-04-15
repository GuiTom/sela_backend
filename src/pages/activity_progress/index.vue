<script setup>
import AnchorAvatar from '@/components/AnchorAvatar.vue';
import AppBarVue from '@/components/AppBar.vue'

import { multiLan } from '@/utils/lan';
import money_amount from '@/utils/mony_amount'
import { onMounted, ref } from 'vue';
// import api from '../../controller/request'
import router from '@/router/index'
const data = ref(JSON.parse(localStorage.getItem('param')))
const progressData = ref(JSON.parse(localStorage.getItem('param')))
const leftSeconds = ref(Math.floor((parseInt(data.value.endAt)- Date.now())/1000))
const activityDurationInseconds = ref(Math.floor((parseInt(data.value.endAt)- parseInt(data.value.startAt))/1000))
onMounted(()=>{
 
    setInterval(()=>(
        leftSeconds.value = Math.floor((parseInt(data.value.endAt)- Date.now())/1000)
    
    ),1000);
    
})

function onClickConditionRecord(item){
    
    localStorage.setItem('currentCondition',JSON.stringify(item))
    router.push('/activity_progress_detail');
}
</script>
<template>
    <div class="container">
        <AppBarVue :title="multiLan('Activity progress')" />
        <div class="header" v-if="leftSeconds>activityDurationInseconds">
         
            <div class="title" v-html="multiLan('Will start in xx days',`<span style='color:#763DF0;font-size: 20px'>${Math.floor((leftSeconds-activityDurationInseconds)/(3600*24))}</span>`)"></div>
            <div class="time_count">
                <div class="number">{{Math.floor(((leftSeconds-activityDurationInseconds)%(3600*24))/36000)}}</div>
                <div class="number">{{Math.floor((leftSeconds-activityDurationInseconds)%(3600*24)/3600)%10}}</div>
                <div class="comma">:</div>
                <div class="number">{{Math.floor(Math.floor((leftSeconds-activityDurationInseconds)/60)%60/10)}}</div>
                <div class="number">{{Math.floor((leftSeconds-activityDurationInseconds)/60)%10}}</div>
            </div>
        </div>
        <div class="header" v-else-if="leftSeconds>0">
         
            <div class="title" v-html="multiLan('Time left', `<span style='color:#763DF0;font-size: 20px'>${Math.floor(leftSeconds/(3600*24))}</span>`)"></div>
            <div class="time_count">
                <div class="number">{{Math.floor((leftSeconds%(3600*24))/36000)}}</div>
                <div class="number">{{Math.floor(leftSeconds%(3600*24)/3600)%10}}</div>
                <div class="comma">:</div>
                <div class="number">{{Math.floor(Math.floor(leftSeconds/60)%60/10)}}</div>
                <div class="number">{{Math.floor(leftSeconds/60)%10}}</div>
            </div>
        </div>
        <div class="param_list">
            <div v-for="(item,index) in progressData.conditionRecords" @click="onClickConditionRecord(item)">
                <div class="param_item">
                    <img src="@/assets/reward_icon.webp" />
                    <div class="content" v-if="item!=null">
                        <div class="ratio" v-if="item.conditionType==4"><span>{{money_amount(item.completeNum??0)}}</span><span>/{{item.val}}</span></div>
                        <div class="ratio" v-else-if="item.conditionType!=3"><span>{{item.completeNum??0}}</span><span>/{{item.val}}</span></div>
                        <div class="ratio" v-else><span>{{multiLan('People fulfilled count',item.completeNum??0)}}</span></div>
                        
                        <div class="field_name">
                            <span v-if="item.conditionType==1">{{ multiLan('Activity need New anchor count',item.val) }}</span>
                            <span v-if="item.conditionType==2">{{multiLan('Activity need New anchor count meet settlement',item.val)}}</span>
                            <span v-if="item!=null&&item.conditionType==3&&item.val>60">{{ multiLan('Activity need New anchor online time in hour and minute',Math.floor(item.val/60),item.val%60) }}</span>
                            <span v-if="item!=null&&item.conditionType==3&&item.val<=60">{{ multiLan('Activity need New anchor online time in minute',item.val)}}</span>
                            <span v-if="item.conditionType==4">{{multiLan('Activity need guild total income',item.val) }}</span>
                        </div>
                    </div>
                    <div style="flex: auto;"></div>
                    <div class="status" v-if="item.status==1" style="color:#D367FE">{{multiLan('Completed')}}&nbsp;></div>
                    <div class="status" v-else style="color:#FF5CC4">{{multiLan('Not completed')}}&nbsp;></div>
                </div>
                <div v-if="index<progressData.conditionRecords.length-1" style="height: 1px;background-color:#eaeaea"></div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
@import './index.css';
</style>
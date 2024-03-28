<script setup>
import AnchorAvatar from '@/components/AnchorAvatar.vue';
import AppBarVue from '@/components/AppBar.vue'
import PlaceHolderImage from '@/components/PlaceHolderImage.vue';
import { multiLan } from '@/utils/lan';
import { onMounted, ref } from 'vue';
// import api from '../../controller/request'
import router from '@/router/index'
const data = ref(JSON.parse(localStorage.getItem('param')))
const progressData = ref(JSON.parse(localStorage.getItem('param')))
const leftSeconds = ref(Math.floor((parseInt(data.value.endAt)- Date.now())/1000))

onMounted(()=>{
    setInterval(()=>(
        leftSeconds.value = Math.floor((parseInt(data.value.endAt)- Date.now())/1000)
    
    ),1000);
    // progressData.value.conditionRecords = [...progressData.value.conditionRecords,...progressData.value.conditionRecords]
    // leftSeconds.value = 7500
    // console.log(leftSeconds.value)
})

function onClickConditionRecord(item){
    console.log(item)
    localStorage.setItem('currentCondition',JSON.stringify(item))
    router.push('/activity_progress_detail');
}
</script>
<template>
    <div class="container">
        <AppBarVue :title="multiLan('Activity progress')" />
        <div class="header" v-if="leftSeconds>0">
         
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
                        <div class="ratio"><span>{{item.completeNum}}</span><span v-if="item.conditionType!=3">/{{item.val}}</span></div>
                        <div class="field_name">
                            <span v-if="item.conditionType==1">{{ multiLan('Activity need New anchor count',item.val) }}</span>
                            <span v-if="item.conditionType==2">{{multiLan('Activity need New anchor count meet settlement',item.val)}}</span>
                            <span v-if="item.conditionType==3">{{ multiLan('Activity need New anchor online time',item.val) }}</span>
                            <span v-if="item.conditionType==4">{{multiLan('Activity need guild total income',item.val) }}</span>
                        </div>
                    </div>
                    <div style="flex: auto;"></div>
                    <div class="status" v-if="item!=null&&item.completeNum>=item.val" style="color:#D367FE">{{multiLan('Completed')}}&nbsp;></div>
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
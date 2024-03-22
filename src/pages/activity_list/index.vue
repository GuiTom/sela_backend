<script setup>
import AppBarVue from '@/components/AppBar.vue'
import api from '../../controller/request'
import { multiLan } from '@/utils/lan';

import { onMounted,ref } from 'vue';
import { guildData } from '@/global';
import {timeToFormatedDate} from '@/utils/time_utils'
import { useRouter } from 'vue-router';
onMounted(()=>{
    requestActivityList(guildData.value.id)
    
})
const router = useRouter()
const listData = ref(null)
function requestActivityList(id) {
 
 let path = '/manager/guild/activity/page'
console.log('requestActivityList')
 api
   .post(path, {
     condition: {
        guildId:guildData.value.id,
        status:0
     },
     pageNum: 1,
     pageSize: 10
   })
   .then(function (response) {
    listData.value = response.data.data.list;
     console.log('activityData:', listData.value,guildData.value.countryCode);
     const imgs = [];
     for (let i = 0; i < response.data.data.list.length; i++) {
       let item = response.data.data.list[i];
       let scope = JSON.parse(item.scope)
       for (let j = 0; j < scope.length; j++) {
         if (guildData.value.countryCode+'' == scope[j].country) {
            item.icon = scope[j].icon;
            console.log(i,scope[j].icon)
         }
       }
     }

   })
   .catch(function (error) {
     // 请求失败处理
     console.log(error)
   })
}
function onClickItem(item) {
    localStorage.setItem('param',JSON.stringify(item)) ; router.push({ name: 'activity detail'})
}
</script>
<template>
    <div class="container">
        <AppBarVue :title="multiLan('Activity list')" />
        <div style="height: 20px;"></div>
        <div class="activity_list">
       
            <div class="list_item" v-for="item in listData" @click="onClickItem(item)">
                <img class="headimg" :src="item.icon" />
                <div class="footer">
                    <div>
                        <div>新主播快速进阶</div>
                        <div>活动时间：{{ timeToFormatedDate(parseInt(item.startAt)) }} - {{timeToFormatedDate(parseInt(item.endAt))}}</div>
                    </div>
                    <div style="flex:auto;"></div>
                    <div v-if="item.status==1" class="button">进行中</div>
                    <div v-else class="button">已结束</div>
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
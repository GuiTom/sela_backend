<script setup>
import AppBarVue from '@/components/AppBar.vue'
import api from '../../controller/request'
import { multiLan } from '@/utils/lan';
import InfiniteList from '@/components/InfiniteList.vue'
import { onMounted, ref } from 'vue';
import { guildData } from '@/global';
import { timeToFormatedDate } from '@/utils/time_utils'
import { useRouter } from 'vue-router';
onMounted(() => {
    requestData(guildData.value.id)

})
const router = useRouter()
const loadingMore = ref(false)
const refreshing = ref(false)
const noMoreData = ref(false)
const pageSize = 20
var currentPage = 0
const listData = ref([])
function refresh() {
    currentPage = 0
    requestData()
}
function requestData(id) {
    if(noMoreData.value){
        return;
    }
    let path = '/manager/guild/activity/page'

    if (currentPage > 0) loadingMore.value = true
    if (currentPage == 0) refreshing.value = true
    api
        .post(path, {
            condition: {
                guildId: guildData.value.id,
                status: 0
            },
            pageNum: currentPage + 1,
            pageSize: pageSize
        })
        .then(function (response) {
            // 请求成功的处理
            if (response.data.code == 0) {
                if (currentPage == 0) {
                    refreshing.value = false

                } else {

                    loadingMore.value = false
                    console.log(`load more ${loadingMore.value}`)
                }
                noMoreData.value = !response.data.data.hasNextPage
                

                currentPage++
                if (response.data.data.list) {
                   
                    for (let i = 0; i < response.data.data.list.length; i++) {
                        let item = response.data.data.list[i];
                        let scope = JSON.parse(item.scope)
                        for (let j = 0; j < scope.length; j++) {
                            if (guildData.value.countryCode + '' == scope[j].country) {
                                item.icon = scope[j].icon;
                                console.log(i, scope[j].icon)
                            }
                        }
                    }
                    if (currentPage == 1) {
                        listData.value = response.data.data.list;
                    } else {
                        listData.value = listData.value.concat(response.data.data.list);
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
    router.push({ name: 'activity detail', query: { 'activity_id': item.id } })
}
</script>
<template>
    <div class="bg"></div>
    <div class="container">
        <AppBarVue :title="multiLan('Activity list')" />
        <div style="height: 20px;"></div>
        <InfiniteList class="activity_list" @loadMore="requestData" @refresh="refresh" :loadingMore="loadingMore"
            :refreshing="refreshing" :noMoreData="noMoreData" v-if="listData != null">
            <template #content>
                <div class="list_item" v-for="item in listData" @click="onClickItem(item)">
                    <img class="headimg" :src="item.icon" />
                    <div class="footer">
                        <div>
                            <div>{{ item.activityName }}</div>
                            <div>{{ multiLan('Event time') }}:{{ timeToFormatedDate(parseInt(item.startAt)) }} -
                                {{ timeToFormatedDate(parseInt(item.endAt)) }}</div>
                        </div>
                        <div style="flex:auto;"></div>
                        <div v-if="item.status == 1" class="button running">{{ multiLan('Is Running') }}</div>
                        <div v-if="item.status == 0" class="button">{{ multiLan('Closed') }}</div>
                        <div v-if="item.status == 2" class="button">{{ multiLan('Ended') }}</div>
                        <div v-if="item.status == 3" class="button">{{ multiLan('WillStart') }}</div>
                    </div>
                </div>
            </template>
        </InfiniteList>
    </div>

</template>
<style scoped lang="less">
.bg {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background-image: url('@/assets/anchor_bg.webp');
    background-size: 100% 100%;

}

.container {
    height: 100vh;
    width: 100%;
    position: absolute;
    overflow: hidden;
    .activity_list {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 45px - 20px);
        .list_item {
            border-radius: 12px;
            background-color: white;
            margin: 12px 12px 0 12px;

            >.headimg {
                width: 100%;
                height: 31.5vw;
                border-radius: 12px;
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

                .running {
                    color: #B839F8;
                    border: 1px solid #DC5DFF;

                }
            }
        }
    }

}
</style>
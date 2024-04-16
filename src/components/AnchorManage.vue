<script setup>
import AnchorAvatarVue from '@/components/AnchorAvatar.vue'
import { onMounted, ref } from 'vue'
import api from '../controller/request'
import rightArrorImg from '@/assets/right_arror.webp'
import { multiLan } from '@/utils/lan';
import router from '@/router/index'
const responseData = ref(null)
let onlineCount = 0;
onMounted(() => {
    requestData()
})

function requestData() {


    let path = '/manager/guildh5/page/anchor'
    // path = 'http://localhost:5173/anchor_list.json'

    api
        .post(path, {
            pageNum: 1,
            pageSize: 5,
            order: 1
        })
        .then(function (response) {



            response.data.data.forEach(item => {
                if (item.isOnline == 1) {
                    onlineCount++
                }
            })
            responseData.value = response.data
        })
        .catch(function (error) {
            // 请求失败处理
            console.log(error)
        })
}
function onClickItem(item) {

    localStorage.setItem('param', item);
    router.push({ path: '/profile', query: { anchorId: item.anchorId, data: JSON.stringify(item) } })
}
</script>
<template>
    <div class="root_container" v-if="responseData">
        <div class="header">
            <span>{{ multiLan('Anchor manage') }}</span>
            <!-- <span class="count">{{onlineCount}}/{{responseData.data.length}}</span> -->
            <span style="flex: auto;"></span>
            <span class="more_box" @click="$router.push('/anchor_list')">
                <span class="more">{{ multiLan('More') }}</span>
                <AutoRTLImg class="right_arror" :src="rightArrorImg"></AutoRTLImg>
            </span>
        </div>
        <div class="anchor_list_container">
            <div class="avatar_container" @click="onClickItem(item)" v-if="responseData != null"
                v-for="(item, index) in responseData.data">
                <AnchorAvatarVue class="avatar" :size="43" :key="index" :onlineStatus="item.isOnline"
                    :isForbidden="item.userStatus == 2" :violated="item.userAuth == 4" :authed="item.userAuth==2" :img="item.portrait">
                </AnchorAvatarVue>
                <div class="nickname">{{ item.nickname }}</div>
            </div>
        </div>
    </div>
    <div v-else style="height: 115px;width:93.6vw;margin:12px;border-radius:12px;background-color:#efefef;"></div>
</template>
<style scoped lang="less">
.root_container {
    .header {
        font-weight: 600;
        font-size: 16px;
        color: #000000;
        line-height: 22px;
        text-align: left;
        padding: 12px 12px;
        display: flex;
        width: 100%;
        overflow: hidden;
        align-items: center;

        .count {
            font-weight: 400;
            font-size: 13px;
            color: #999999;
            line-height: 18px;
            padding: 0 6px;
        }

        .right_arror {
            width: 6px;
            height: 14px;
            margin-left: 6px;
        }
        .more_box{
            display: flex;
            align-items: center;
            .more {
                color: #999999;
                font-size: 12px;
            }
        }
   

    }

    .anchor_list_container {
        display: flex;
        margin: 0 12px;
        align-items: flex-start;
    
        overflow: hidden;

        .avatar_container {

            margin: 0 6px 12px 6px;

            .nickname {
                margin-top: 10px;
                overflow: hidden;
                width: 43px;
                text-overflow: ellipsis;
                color: #999999;
                font-size: 16px;
            }
        }

        .invite_button {
          

            >img {
                width: 43px;
                height: 43px;
            }

            .title {
                font-weight: 500;
                font-size: 11px;
                color: #D15DFF;
                line-height: 16px;
            }

        }

    }
}
</style>
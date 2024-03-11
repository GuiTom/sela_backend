<script setup>
import AnchorAvatarVue from '@/components/AnchorAvatar.vue'
import { onMounted, ref } from 'vue'
import api from '../controller/request'
import rightArrorImg from '@/assets/right_arror.webp'
const responseData = ref(null)
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
            responseData.value = response.data
            console.log(responseData.value)

        })
        .catch(function (error) {
            // 请求失败处理
            console.log(error)
        })
}
</script>
<template>
    <div class="root_container">
        <div class="header">
            <span>主播管理</span>
            <span class="count">111/200</span>
            <span style="flex: auto;"></span>
            <span @click="$router.push('/anchor_list')">
                <span >更多</span>
                <AutoRTLImg class="right_arror" :src="rightArrorImg" ></AutoRTLImg>
            </span>
        </div>
        <div class="anchor_list_container">
            <div class="avatar_container" v-if="responseData != null" v-for="(item, index) in responseData.data">
                <AnchorAvatarVue class="avatar" :size="43" :key="index" :onlineStatus="item.isOnline"
                    :isForbidden="item.userStatus == 2" :violated="item.userAuth == 4" :img="item.portrait">
                </AnchorAvatarVue>
                <div class="nickname">{{ item.nickname }}</div>
            </div>
            <div class="invite_button">
                <img src="@/assets/invite_button.webp"/>
                <div class="title">邀请主播</div>
            </div>
        </div>
    </div>



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
            margin-left:6px;
          }
    }
    .anchor_list_container {
        display: flex;
        margin:0 12px;

        justify-content: flex-start;
        overflow: scroll;
        .avatar_container {
          
            padding: 6px;


            .nickname {
                top: 5px;
                overflow: hidden;
                width: 43px;
                text-overflow: ellipsis;
            }

        }
        .invite_button{
            margin-top: 8px;
          >img{
            width: 43px;height: 43px;
          }
          .title{
            font-weight: 500;
            font-size: 11px;
            color: #D15DFF;
            line-height: 16px;
          }

        }

    }
}
</style>
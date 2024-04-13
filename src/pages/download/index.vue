<script setup>
import { onMounted } from 'vue';
import { multiLan } from '@/utils/lan'
import api from '../../controller/request'
import { useRoute } from 'vue-router';

let downloadUrl = '';
onMounted(() => {
    const route = useRoute();

    // 获取 query 参数
    const queryParams = route.query;

    // 获取特定参数的值
    const invitationCode = queryParams.code;



    // console.log(invitationCode)
    document.querySelector('#invicode').textContent = invitationCode;

    var url2 = `https://testapi.selalive.com/manager/guildh5/anchor/downloadUrl`
    api.get(url2).then(response => {

        let data = response.data
        if (data['code'] == 0) {
            downloadUrl = data.data;
        }
    }).catch(err => {
        console.log(err)
    })
})
function onDownload() {
    location.href = downloadUrl;
}
</script>
<template>
    <div class="download_contaienr">

        <div class="download_bt" @click="onDownload">
            <div id="download_text">{{ multiLan('Download') }}</div>
        </div>

        <div id="emma_center-box">

            <div id="emma_content_bg">
                <div id="emety_h"></div>

                <div style="position: relative;">
                    <!-- 这里是你的图片 -->
                    <img id="center_logo_img" src="@/assets/emma_logo.png">

                    <!-- 下面是原有的 white_box 结构 -->
                    <div id="white_box">
                        <div style="display: flex; flex-direction: column;justify-content:center; ">
                            <div id="invicode_text">{{ multiLan('My invitation code') }}</div>
                            <div id="invicode"></div>
                        </div>

                        <div id="text_copy">{{ multiLan('Copy') }}</div>

                    </div>
                </div>

                <div id="emety_h_2"></div>
                <!-- 底部文字 -->
                <div id="bottom_text">{{ multiLan('Download announce') }}</div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="css">
body {
    margin: 0;
}

.download_container {
    position: fixed;
}

.title-bar {
    position: relative;
    background-color: #fff;
    color: #000;
    padding: 10px 10px;
}

.title-bar img {
    position: absolute;
    left: 10px;
    /* 调整图片到屏幕最左侧的位置 */
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    /* 根据需要调整图片宽度 */
    height: auto;
    /* 根据需要调整图片高度 */
}

.title-bar h1 {
    margin: 0;
    font-size: 20px;
    /* 根据需要调整文字大小 */
    text-align: center;
    /* 文字水平居中 */
}

#close_bt {
    position: absolute;
    left: 10px;
    /* 调整图片到屏幕最左侧的位置 */
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    /* 根据需要调整图片宽度 */
    height: auto;
    /* 根据需要调整图片高度 */

}


#emma_content_bg {
    background-image: url('@/assets/emma_big_bg_new.jpg');
    margin: 0;
    padding: 0;
    height: 100vh;
    /* 让 body 占满整个视口高度 */
    background-size: cover;
    /* 背景图片尺寸为 cover，铺满整个容器 */
    background-position: center;
    /* 背景图片居中显示 */
    background-repeat: no-repeat;
    /* 背景图片不重复 */
}


#emma_center-box {
    width: 100%;
    /* 容器的固定宽度 */
    height: 100%;
    /* 容器的固定高度 */
    overflow: hidden;
    /* 隐藏超出容器的内容 */
    background-color: #ff3f36;
}

#emety_h {
    width: 100%;
    /* 容器的固定宽度 */
    height: 25%;
    /* 容器的固定高度 */
}

#center_logo_img {
    width: 68px;
    height: 68px;
    position: absolute;
    top: -34px;
    left: 50%;
    transform: translateX(-50%);
}


/* 白色布局 */
#white_box {
    width: 305px;
    /* 因为加上了左右各20px的margin和padding，所以减去40px */
  
    border-radius: 20px;
    background-color: #FFF;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 56px 20px 10px 20px;

}

#emety_h_2 {
    width: 100%;
    /* 容器的固定宽度 */
    height: 5%;
    /* 容器的固定高度 */
}

/*邀请码文字 */
#invicode_text {
    overflow-wrap: break-word;
    color: rgba(121, 117, 129, 1);
    font-size: 14px;
    font-family: NotoSans-Regular;
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
    line-height: 19px;
}

/*邀请码 */
#invicode {
    overflow-wrap: break-word;
    color: rgba(0, 0, 0, 1);
    font-size: 20px;
    font-family: NotoSans-BoldItalic;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
    line-height: 27px;
    margin: 6px 56px 0 0;
}


/*copy  */
#text_copy {
    background-color: #FFE6F2;
    border-radius: 18px;
    overflow-wrap: break-word;
    color: rgba(255, 56, 162, 1);
    font-size: 13px;
    font-family: NotoSans-SemiBold;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    height: 37px;
    vertical-align: center;
    padding: 9px 20px;
}


/*底部文字  */
#bottom_text {
    width: 311px;
    height: 180px;
    overflow-wrap: break-word;
    color: rgba(255, 255, 255, 1);
    font-size: 20px;
    font-family: Skia-Regular_Black-Extended;
    font-weight: normal;
    text-align: center;
    line-height: 36px;
    margin-left: auto;
    /* 左边距设置为自动，将会使该元素水平居中 */
    margin-right: auto;
    /* 右边距设置为自动，将会使该元素水平居中 */
}


/*底部按钮 图片  */
.download_bt {
    background-image: url('@/assets/emma_download_bg.png');
    background-size: 100% 100%;
    width: 298px;
    height: 79px;
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
}

/*底部按钮 文字  */
#download_text {
    line-height: 79px;
    /* 与父元素高度相同 */
    margin: 0;
    /* 去除默认的外边距 */
    padding: 0;
    /* 去除默认的内边距 */
    color: rgba(51, 51, 51, 1);
    font-size: 20px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    /* 文字水平居中 */
    overflow-wrap: break-word;
    white-space: nowrap;
    font-family: Arial-Black;
}
</style>
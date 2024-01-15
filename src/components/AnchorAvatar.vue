<script setup>
import { multiLan } from '@/utils/lan';


const props = defineProps({
  img: {
    type: String,
    required: true
  },
  onlineStatus: {
    type: Number,
    required: true,
    default: 1 //1在线 0 不在线 2 忙线
  },
  isForbidden: {
    type: Boolean,
    required: true,
    default: false 
  },
  violated: {
    type: Boolean,
    required: true,
    default: false 
  }
})

function statusImg() {
  if (props.onlineStatus == 1) {
    return '/images/status_online.webp'
  } else if (props.onlineStatus == 0) {
    return '/images/status_offline.webp'
  } else return '/images/status_busy.webp'
}
</script>
<template>
  <div class="avatar" :style=" 'background-image:'+'url(' + img + ');' ">
    <div class="bg" v-if="isForbidden||violated"></div>
    <span class="userStatus" v-if="violated">{{multiLan('Violation')}}</span>
    <span class="status" v-if="isForbidden">{{multiLan('In ban')}}</span>
    <img class="online_status" :src="statusImg()" />
  </div>
</template>
<style scoped lang="less">
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  position: relative;
  .bg{
    border-radius: 50%;
    width: 100%;height: 100%;background-color:#A1A1A1AA;
  }
  .status,.userStatus{
    position: absolute;
    top: 50%;
    left: 50%;
    text-wrap: nowrap;
    transform: translate(-50%, -50%);
    font-size: 12px;
    color: #ffffff;
    display: block;
  }
  .online_status {
    width: 28px;
    height: 20px;
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>

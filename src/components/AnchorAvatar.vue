<script setup>

import { multiLan } from '@/utils/lan';
import Avatar from './Avatar.vue';
import AutoSizedText from './AutoSizedText.vue';
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
  },
  size: {
    type: Number,
    required: false,
    default: 54
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
  <Avatar class="avatar" :src="img" :style="'width:'+size+'px;height:'+size+'px;'">
    <template #content>
      <div class="bg" v-if="isForbidden || violated"></div>
      <AutoSizedText class="userStatus" v-if="violated" :text="multiLan('Violation')"></AutoSizedText>
      <AutoSizedText class="status" v-if="isForbidden" :text="multiLan('In ban')"></AutoSizedText>
      <img class="online_status" :src="statusImg()" />
    </template>
  </Avatar>
</template>
<style scoped lang="less">
.avatar {
  .bg {
    border-radius: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .status,
  .userStatus {
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

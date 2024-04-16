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
  <Avatar class="avatar" :src="img" :style="'width:' + size + 'px;height:' + size + 'px;'">
    <template #content>
      <!-- <div class="bg" v-if="isForbidden || violated || authed"></div>
      <AutoSizedText class="status" v-if="isForbidden" :text="multiLan('In ban')"></AutoSizedText>
      <AutoSizedText class="userStatus" v-else-if="violated" :text="multiLan('Violation')"></AutoSizedText>
      <AutoSizedText class="userStatus" v-else-if="authed" :text="multiLan('Authed')"></AutoSizedText> -->

      <img class="online_status" :src="statusImg()" />
    </template>
  </Avatar>
</template>
<style scoped lang="less">
.avatar {


  .status,
  .userStatus {
    position: absolute;
    top: 50%;
    left: 50%;
    text-wrap: nowrap;
    max-lines: 2;
    text-overflow: ellipsis;
    overflow: hidden;
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

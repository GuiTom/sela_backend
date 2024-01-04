<script setup>
import { ref } from 'vue'
defineProps({
  loadingMore: {
    type: Boolean,
    default: false
  },
  refreshing: {
    type: Boolean,
    default: false
  },
  noMoreData: {
    type: Boolean,
    default: false
  },
})
const listContainer = ref(null)
const emit = defineEmits(['loadMore','refresh'])
var lastScrollY = 0;
const vListenScroll = {
  mounted:function(){

    window.addEventListener('scroll',function(){
       
        if (lastScrollY<window.scrollY&&(window.innerHeight + window.scrollY) >= (document.body.scrollHeight)) {  
            emit('loadMore');  
            // console.log('触底')
    }  else if(lastScrollY>window.scrollY&&window.scrollY==0){
            emit('refresh');
            // console.log('刷新')
        }
        lastScrollY = window.scrollY;
    });
  }
}

</script>
<template>
    <div class="list_container" ref="listContainer" v-ListenScroll>
        <div v-if="refreshing" class="refreshIndicator">正在刷新...</div>
        <slot name="content"></slot>
        <div  v-if="loadingMore" class="loadMoreIndicator">正在拉取更多数据...</div>
        <div v-if="noMoreData" class="noreMoreIndicator">没有更多数据了...</div>
    </div>
</template>
<style scoped lang="less">
.loadMoreIndicator,.noreMoreIndicator,.refreshIndicator{
    font-size: 12px;
    color:#919191;
    text-align:center;
    width: 100%;
    padding: 5px 0;
}
</style>
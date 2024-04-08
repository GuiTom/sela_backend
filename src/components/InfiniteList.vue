<script setup>
import { multiLan } from '@/utils/lan';
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
var lock = false
function onScroll(event){
        
        // console.log(lastScrollY,listContainer.value.scrollTop,listContainer.value.scrollHeight,listContainer.value.clientHeight)
        if (lastScrollY<listContainer.value.scrollTop&&(listContainer.value.clientHeight + listContainer.value.scrollTop) >= (listContainer.value.scrollHeight)) {  
           
              emit('loadMore');  
            
         
            console.log('触底')
    }  else if(lastScrollY>listContainer.value.scrollTop&&listContainer.value.scrollTop==0){
          
            emit('refresh');
        
            console.log('刷新')
        }
        lastScrollY = listContainer.value.scrollTop;
  

}

</script>
<template>
    <div class="list_container" ref="listContainer" @scroll="onScroll">
        <div  v-if="refreshing" class="refreshIndicator">{{ multiLan('Refreshing') }}...</div>
        <slot name="content" style="flex: auto;"></slot>
        
        <div  v-if="loadingMore" class="loadMoreIndicator">{{ multiLan('Loading') }}...</div>
        <div v-if="!loadingMore&&noMoreData" class="noreMoreIndicator">{{ multiLan('No more data') }}...</div>
        
    </div>
</template>
<style scoped lang="less">
.list_container{
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
}
.loadMoreIndicator,.noreMoreIndicator,.refreshIndicator{
    font-size: 12px;
    color:#919191;
    text-align:center;
    width: 100%;
    padding: 5px 0;
   
}
</style>
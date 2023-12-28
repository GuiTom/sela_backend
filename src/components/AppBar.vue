<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
<template>
    <div class="app_bar">
        <img class="left_arror" src="@/assets/left_arror.webp" />
        <span>{{title}}</span>
      </div>
</template>
<style scoped lang="less">
.app_bar {
    margin-top: 20px;
  .left_arror {
    position: absolute;
    left: 15px;
    width: 23px;
    height: 22px;
  }
  text-align: center;
  > span {
    font-size: 18px;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
  }
}
</style>
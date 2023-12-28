<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
})
</script>
<template>
    <div class="app_bar">
        <img class="left_arror" @click="$router.go(-1)" src="@/assets/left_arror.webp" />
        <span class="title">{{title}}</span>
        <span class="actions"><slot name="right_icon"></slot></span>
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
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
  }
  .actions{
    position: absolute;
    right:15px;
    display: inline-block;
  }
}
</style>
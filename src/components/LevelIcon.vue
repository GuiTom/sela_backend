<script setup>
defineProps({
  level: {
    type: Number,
    required: true
  },

})

</script>
<template>
    <span class="level" style="color:#ffffff;">{{level}}</span>
</template>
<style scoped lang="less">
.level {
    margin-left: 5px;
    display: inline-block;
    width: 42px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background-image: url('@/assets/crown_bg.webp');
    background-size: cover;
    text-align: right;
    padding-right: 10px;
    font-size: 12px;
    font-weight: 400;
}
</style>

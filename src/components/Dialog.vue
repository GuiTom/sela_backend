<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  close: {
    type: Function,
    default: (fun) => fun()
  }
})
const emit = defineEmits(['update:show'])

const handleClose = () => {
  emit('update:show', false)
}
</script>

<template>
  <div v-if="show" class="dialog-mask flex-center">
    <div class="dialog-box">
      <div class="dialog-header">{{ title }}</div>
      <slot
        ><p class="dialog-content">{{ message }}</p></slot
      >
      <div class="dialog-footer">
        <button class="button dialog-confirm" @click="close(handleClose)">我知道了</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.dialog-box {
  background: #fff;
  width: 300px;
  border-radius: 10px;
  overflow: hidden;
}

.dialog-header {
  padding-top: 20px;
  font-weight: bold;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  line-height: 25px;
}

.dialog-content {
    margin-top: 15px;
  padding: 5px 20px 20px 20px;
  text-align: start;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 14px;
color: #333333;
line-height: 24px;
}

.dialog-footer {
  display: flex;
  overflow: hidden;
  user-select: none;
  border-top: 1px solid #ebedf0;
}

.button {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  line-height: 40px;
  background-color: #fff;
  border: none;
}
.button:active {
  background-color: #f2f3f5;
}
.dialog-confirm {
  font-size: 16px;
  font-family:
    PingFangSC,
    PingFang SC;
  font-weight: 600;
  color: #ff55ac;
  line-height: 22px;
  padding: 15px 0;
}
</style>

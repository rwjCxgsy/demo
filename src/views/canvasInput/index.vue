<!--
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-15 18:54:02
 * @Description:
 * @FilePath: /demo/src/views/canvasInput/index.vue
-->
<template>
  <div class="canvas">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
const devicePixelRatio = window.devicePixelRatio;
export default {
  name: "canvasInput",
  head: {
    title: "canvas输入"
  },
  async mounted() {
    await this.$nextTick();
    const canvas = this.$refs.canvas;
    const parentNode = canvas.parentNode;
    const { width, height } = parentNode.getBoundingClientRect();
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.cssText = `width: ${width}px; height:${height}px`;
  }
};
</script>

<style lang="less" scoped>
.canvas {
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
</style>

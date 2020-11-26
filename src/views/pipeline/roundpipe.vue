<!--
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-07-22 11:12:59
 * @Description:
 * @FilePath: /demo/src/views/pipeline/roundpipe.vue
-->

<template>
  <div class="r-pipe" ref="pipe">
    <span></span>
    <span></span>
  </div>
</template>

<script>
const degs = {
  3: 0,
  4: 90,
  5: 180,
  6: 270
};
export default {
  name: "rPipe",
  props: {
    classify: {
      type: Number
    }
  },
  watch: {
    classify(value) {
      const deg = degs[value];
      this.$refs.pipe.style.transform = `rotate(${deg}deg)`;
    }
  },
  data() {
    return {};
  },
  mounted() {
    const deg = degs[this.classify];
    this.$refs.pipe.style.transform = `rotate(${deg}deg)`;
  }
};
</script>

<style lang="less" scoped>
.r-pipe {
  width: 30px;
  height: 30px;
  position: relative;
  span {
    background-color: #ddd;
    position: absolute;
    left: 0;
  }
  span:nth-of-type(1) {
    width: 20px;
    height: 10px;
    top: 10px;
  }
  span:nth-of-type(2) {
    width: 20px;
    height: 10px;
    transform: rotate(90deg);
    top: 15px;
    left: 5px;
  }
}
</style>

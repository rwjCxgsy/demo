<!--
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-07-22 11:14:15
 * @Description:
 * @FilePath: /demo/src/views/pipeline/straightpipe.vue
-->
<template>
  <div class="s-pipe" ref="pipe">
    <span></span>
  </div>
</template>

<script>
const degs = {
  1: 0,
  2: 90
};
export default {
  name: "sPipe",
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
.s-pipe {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    height: 10px;
    width: 100%;
    background-color: #ddd;
  }
}
</style>

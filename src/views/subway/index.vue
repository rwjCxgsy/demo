<template>
  <div class="cd-sub" id="cdSub" ref="cdSub">
  </div>
</template>

<script>
import { start } from "./subway/index.js";
export default {
  name: "cd-subWay",
  mounted() {
    this.$nextTick(() => {
      const wrap = this.$refs.cdSub;
      start(wrap, 1200, 900)
    });
  }
};
</script>

<style lang="less">
canvas {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0)
}
.station-des {
  position: fixed;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  strong {
    font-size: 12px;
  }
  span {
    font-size: 12px;
  }
}
.cd-sub {
  margin: 0 auto;
  position: relative;
  height: 100vh;
  background-color: rgb(248, 248, 248);
  display: flex;
  align-items: center;
  .right {
    flex: 1;
  }
}
.map-show {
  display: flex;
  & > div {
    width: 50%;
  }
}
.step-map {
  height: 450px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  & > div {
    height: 45px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    position: relative;
    i {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      font-style: normal;
      border-radius: 50%;
      font-size: 14px;
    }
    div {
      display: inline-block;
      margin-left: 20px;
      width: 20px;
      height: 0;
      border-radius: 50%;
      position: relative;
      strong {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 14px;
      }
    }
    span {
      display: inline-block;
      min-width: 100px;
      margin-left: 10px;
    }
    p {
      color: red;
      font-size: 12px;
    }
  }
}
</style>

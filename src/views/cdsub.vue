<template>
  <div class="cd-sub">
    <canvas id="canvas1" ref="map1"></canvas>
    <canvas id="canvas2" ref="map2"></canvas>
  </div>
</template>

<script>
import subWay from "./line";
import logoURL from "./logo";
import { start } from "./subway";
// import {Select, Option, Form, FormItem, Button, Message, Image} from 'element-ui'
import { cloneDeep, intersection } from "lodash";
const logo = new Image();
logo.src = logoURL;
console.log(logo);
// let ctx = null
// let prev = {x: null, y: null}
export default {
  name: "cd-subWay",
  // components: {Select, Option, Form, FormItem, Button},
  data() {
    return {
      sub: Object.freeze(subWay),
      startLine: "",
      startStation: "",
      startList: [],
      endLine: "",
      endStation: "",
      endList: [],
      minStation: {},
      mastMinChange: [],
      mastMinStation: []
    };
  },
  computed: {
    isplan() {
      const { startStation, endStation } = this;
      if (!(startStation && endStation)) {
        return true;
      }
      if (startStation === endStation) {
        return true;
      }
      return false;
    }
  },
  methods: {
    lineStyle(line) {
      const { length } = line;
      const findColor = line => {
        return subWay["line" + line].color;
      };
      const style = {
        borderTop: "10px solid " + findColor(line[0]),
        borderBottom: "10px solid " + findColor(line[length >= 2 ? 1 : 0])
      };
      return style;
    },
    planning() {
      console.time("最短站数");
      const { startStation, endStation, startList, endList } = this;
      let start = startList[startStation];
      let end = endList[endStation];
      let min = 99999;
      const stepList = new Set();
      let k = 1;
      const allStepsList = {};
      const find = station => {
        let result = null;
        for (const key in subWay) {
          if (subWay.hasOwnProperty(key)) {
            const element = subWay[key].list;
            const _result = element[station];
            if (_result) {
              result = _result;
              break;
            }
          }
        }
        if (!result) {
          console.log(station);
        }
        return result;
      };
      function jisuan(station, step) {
        let next = null;
        if (station.name === end.name) {
          if (stepList.size < min) {
            min = stepList.size;
          }
          allStepsList[++k] = [...stepList];
          return false;
        }
        let { length } = station.next;
        for (let i = 0; i < length; i++) {
          let n = station.next[i];
          next = find(n);
          if (!stepList.has(next)) {
            stepList.add(next);
            jisuan(next, step + 1);
            stepList.delete(next);
          }
        }
      }
      stepList.add(start);
      jisuan(start, 0);
      k = 1;
      let temp = {};
      for (const key in allStepsList) {
        if (allStepsList.hasOwnProperty(key)) {
          const element = allStepsList[key];
          if (element.length <= min + 2) {
            temp[k++] = element;
          }
        }
      }
      console.log(temp);
      this.minStation = temp;
      // this.num = min
    },
    disposeData(value) {
      const copyValue = {};
      for (const key in value) {
        let newMinStation = (copyValue[key] = cloneDeep(value[key]));
        let startStation = newMinStation[0].line;
        let nextStation = newMinStation[1].line;
        let currentLine = intersection(startStation, nextStation)[0];
        newMinStation[0].start = currentLine;
        for (let index = 0; index < newMinStation.length; index++) {
          const element = newMinStation[index];
          let nextElement = newMinStation[index + 1];
          if (!nextElement) {
            nextElement = element;
          }
          const some = intersection(element.line, nextElement.line)[0];
          if (some !== currentLine) {
            element.des = `${currentLine}号线换成${some}号线`;
            element.changeLine = [currentLine, some];
            element.isChange = true;
            currentLine = some;
          } else {
            element.changeLine = [currentLine];
            element.isChange = false;
          }
        }
      }
      return copyValue;
    }
  },
  watch: {
    minStation(value) {
      console.log(value);
      const copyValue = this.disposeData(value);
      const { length } = Object.keys(copyValue);
      if (length === 1) {
        this.mastMinChange = this.mastMinStation = Object.freeze(copyValue[1]);
        return false;
      }
      let min = 9999;
      let minTemp = [];
      for (const key in copyValue) {
        if (copyValue.hasOwnProperty(key)) {
          const element = copyValue[key];
          if (element.length < min) {
            minTemp = element;
            min = element.length;
          }
        }
      }
      this.mastMinStation = minTemp;
      let minC = 9999;
      let temp = [];
      for (const key in copyValue) {
        const scheme = copyValue[key];
        let c = 0;
        const { length } = scheme;
        for (let i = 0; i < length; i++) {
          if (scheme[i].isChange) {
            c++;
          }
        }
        if (c < minC) {
          temp = scheme;
        }
      }
      this.mastMinChange = Object.freeze(temp);
      console.timeEnd("最短站数");
    },
    startLine(e) {
      this.startStation = "";
      this.startList = Object.freeze(subWay[e].list);
    },
    endLine(e) {
      this.endStation = "";
      this.endList = Object.freeze(subWay[e].list);
    }
  },
  mounted() {
    this.$nextTick(() => {
      const canvas1 = this.$refs.map1;
      const canvas2 = this.$refs.map2;
      start(canvas1, canvas2);
    });
  }
};
</script>

<style lang="less">
canvas {
    position: absolute;
    left: 0;
    top: 0;
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

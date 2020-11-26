<!--
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-07-30 15:25:53
 * @Description:
 * @FilePath: /demo/src/views/pipeline/index.vue
-->
<template>
  <div class="pipe">
    <input type="file" @change="change" />
    <table border="0" cellspacing="0" cellpadding="0">
      <tr v-for="(vv, ii) in map" :key="ii">
        <td v-for="(v, i) in vv" :key="i" @click="rotate(ii, i)">
          <s-pipe v-if="v <= 2" :classify="v" />
          <r-pipe v-else :classify="v" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const map = [
  [5, 3, 5, 3],
  [1, 5, 3, 0],
  [2, 3, 5, 1],
  [6, 1, 1, 5],
  [1, 5, 5, 4]
];
import sPipe from "./straightpipe";
import rPipe from "./roundpipe";
export default {
  name: "pipe",
  components: {
    sPipe,
    rPipe
  },
  data() {
    return {
      map
    };
  },
  methods: {
    change(e) {
      console.log(e);
    },
    rotate(ii, i) {
      let d = this.map[ii][i];

      if (d <= 2) {
        d++;
        if (d === 3) {
          d = 1;
        }
      } else {
        d++;
        if (d === 7) {
          d = 3;
        }
      }
      this.$set(this.map[ii], i, d);
    }
  }
};
</script>

<style lang="less" scoped>
.pipe {
  table {
    margin: 100px auto;
    border: 1px solid #aaa;
    td {
      border: 1px solid #eee;
      cursor: pointer;
    }
  }
}
</style>

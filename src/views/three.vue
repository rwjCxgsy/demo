<template>
  <div class="three" id="3d">
    <canvas id="canvas" ref="canvas" width="350" height="700" />
  </div>
</template>

<script>

import {start} from './3d'

export default {
    name: 'three',
    async mounted () {
      await this.$nextTick()
      const canvas = document.getElementById('canvas')
      start(canvas)
    }
}
</script>

<style lang="less">
  #canvas {
    display: table;
    margin: 0 auto;
    background-color: #eee;
  }
  canvas:hover {
    cursor: pointer;
  }
</style>
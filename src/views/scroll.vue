<template>
  <div class="scroll" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend='onTouchEnd'>
      <div class="wrap" ref="scroll">
          <div class="item" v-for="i in 100" :key="i">{{i}}</div>
      </div>
  </div>
</template>

<script>
let scrollTop = 0
const time = 1500
let speed = 0
let prevPlace = 0
let handY = 0
let startSpeed = 0
let startTime = null
let endTime = null
export default {
    name: 'scroll',
    data () {
        return {
            isTouch: false
        }
    },
    mounted () {
        this.$nextTick(() => {
            setTimeout(() => {
                speed = 1
            }, 100);
        })
    },
    methods: {
        onTouchStart (e) {
            console.log('onTouchStart')
            this.isTouch = true
            const {clientX, clientY} = e.touches[0]
            prevPlace = clientY
            startTime = Date.now()
        },
        onTouchMove (e) {
            if (!this.isTouch) {
                return
            }
            const {scroll} = this.$refs
            const {clientX, clientY} = e.touches[0]
            handY = clientY
            // startSpeed += clientY - prevPlace + scrollTop
            scroll.style.transform = `translate(0, ${clientY - prevPlace + scrollTop}px)`
        },
        onTouchEnd (e) {
            // const {clientX, clientY} = e.touches[0]
            scrollTop = handY - prevPlace + scrollTop
            this.isTouch = false
            startSpeed = 0
        }
    }
}
</script>

<style lang="less">
    .scroll {
        position: relative;
        overflow: hidden;
        width: 100vw;
        height: 100vh;
        .wrap {
            position: absolute;
            left: 0;
            width: 100vw;
            top: 0;
            // height: 100vh;
            .item {
                line-height: 40px;
                text-align: center;
            }
        }        
    }
</style>
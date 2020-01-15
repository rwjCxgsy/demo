<template>
  <div class="edit">
      <div class="tool">
          <a href="javascript:void(0);" class="file" />
          <a href="javascript:void(0);" class="text" ref="text" />
          <input type="file" ref="file"/>
      </div>
      <div class="main" ref="wrap">
          <canvas id="edit" ref="canvas" />
          <a title="导出" alt="导出" class="iconfont export" v-html="'&#xe611;'" @click="exportImage"/>
      </div>
      <div class="zoom">
          <div>
              <ul>
                  <li v-for="(v, i) in zoom" :key="v.id" :index.prop="i">
                          <div class="left">
                          <input type="checkbox" name="shou" :id='`show${v.id}`' v-model="v.show" @change="switchZoom(i)" />
                          <label v-if="v.show" class="iconfont" v-html="'&#xe61c;'" :for='`show${v.id}`'/>
                          <label v-if="!v.show"  class="iconfont" v-html="'&#xe61d;'" :for='`show${v.id}`'/>
                      </div>
                      <div class="right">
                          <span class="name">{{v.name}}</span>
                          <div>
                              <!--上移-->
                              <i v-if="i !== 0" class="iconfont up" v-html="'&#xe613;'"  @click="moveUp(i)"/>
                              <!--下移-->
                              <i v-if="i !== zoom.length - 1" class="iconfont down" @click="moveDown(i)" v-html="'&#xe61b;'" />
                              <i class="iconfont delete" v-html="'&#xe612;'" />
                          </div>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import start from './index'
import Observer from "./Observe";
import {cloneDeep} from 'lodash'
export default {
    name: 'efit',
    data () {
        return {
            zoom: []
        }
    },
    async mounted () {
        await this.$nextTick()
        start(this.$refs)
        Observer.on('zoom', data => {
            console.log(data, Array.isArray(data))
            this.zoom = cloneDeep(data)
        })
    },
    methods: {
        switchZoom (index) {
            const {zoom} = this
            console.log('开关', index)
            Observer.emit('change', Object.assign({}, zoom[index]))
        },
        exportImage () {
            const {canvas} = this.$refs
            canvas.toBlob(res => {
                console.log(res)
                const url = URL.createObjectURL(res);
                const aNode = document.createElement('a');
                aNode.setAttribute("href", url);
                aNode.setAttribute("download", "我的作品");
                aNode.click();
            })
        },
        moveUp (index) {
            Observer.emit('move', {
                type: 'up',
                index
            })
        },
        moveDown (index) {
            Observer.emit('move', {
                type: 'down',
                index
            })
        }
    }
}
</script>

<style lang="less">
    .edit {
        height: 100vh;
        width: 100vw;
        display: flex;
    }
    .tool {
        width: 50px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        input {
            opacity: 0;
            display: block;
            width: 30px;
            height: 30px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -15px;
            cursor: pointer;
            margin-top: -45px;
            z-index: 10;
        }
        a {
            display: block;
            width: 30px;
            height: 30px;
            background-size: 100% 100%;
            cursor: pointer;
        }
        a.file {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFSUlEQVR4Xu2bbYgVVRjHf+fOmb0VFgmmriVtL74GUZmsFVEUJpsViF8qLHqjjMq2pbAPQvahgi2S2tAyMjNqyV7YKEOjl3WxQqgI6c2wfKG0EmWDKN2Z2RPnzt1l7tm5e+fembF7794DFy4zZ57z///nzDPzPOc5gjHexBjnT0OAxgworkCLBa0CZtW4SH0ufA30h/EY8QjYcIeCduCcGiduwv9cwYserA+eKBDAgpcF3FJnxE06H7kwf+jgsAASDgIT6px8jp6CPR6cof/nBLDgJQG3jQXyAY7LXegUEq4CtoSQ7xTQ7cA3tSxME5zrwf1FbvACLcCDwJNBkgrWe3BrLRM3sVvQJeBe4/gKYUO3gusDJz50YUE9kc9zmSphJ3B8gNu7WoB9CqYOHVTQ5cGyOhQACd8ar/f9+hFQBtlHXVhZpwJ8Clxe8B3QEKAxAxqPQMMHxHGCElYqOF3ARGCngk88eL8anaiEZJ2ghN+AKSFkq/JNkqgAEp4GHih2pwXMdeDLYzETJMxXcErGn4X/OLA2bNwkBZgs4cBo5BQ858F9aQlgwxwFNwM3AeNDPn2nHYVdweOJCWDDPAVflCC32YW2pAVoglketAu4czTbApY50JWKAFmY5sFPJWZAGgHVeOlHrnNLCatgkQc9qQgAZCX8UsQBDo2ZuCOU8BawuBR5oNeFRWYeMLFHQAOwYamCNUXA7Hfh1AhAI3ex4R7tV0Iu6BewRcEu/cvADw5sT9sJ5uxLuBJYDUwPDLjKhY7IzCJ0zMJ0D7YCk43uPRI6jsDuCGY03mS/A/KDHtcELQpOdmAP8HsUMOX0sWGD8r39cBPwmgNLyrGTlgDlYCi7r4SLgc8M8nsdaCnXWK0K8ATwcJCsgsUevDNWBCjI4gjY58BZgFv3AljQJuAD4+6v8+D2csnnnXYqTrASLJGusWCNgKWGADd60B3JgNGp1nzAOAk/Uvg9ccD1F2v/qkYBbAsWCpgtYKaCZgGHBuGwgMOAXpPrjQrcghsEvG7c/Rc8Y0ZEtZfmI6AjQx2V6V+pFeWDCjZlYFsGtprRWpCMhG3AJYYACz3DJ/yvAki4CFgHzCwHSKDvdzqDlJ8hQRPXAHMMm++5cF2F4+QuS9QH5Kf7q2GxeByQxa5VcG3cVFtiAthwoYKPgZOKAP4b2KFgkoBJwLiYoiQSWSYmgITNhK8f9gl424Fng4SzcPYgtCk/QXKFDqcjCuIAjye1UpWIADoLDDwSQqDTheURiE2w/Cgy9xNwZsg1OqDakIFXBuD7CDYjdYktQBZmeH4qrCAHp2CtB3dFQjGy04lZaPZgSgb+HPBfmYcAffcTbbEFsGC1gLuDqAS84RQurycKOkljsQSQcCnQZwA6koHWAdiRJNC0bMUVICwf95QLD6UFOGm7FQtgwwUKvjIA/eFCK7A3aaBp2atYAOknJHRiItgec2FFWmDTsBtHgE3A1QFQ/1pw3tESawNpkIhjM44ABeuACp73jLdBHGDH6tqKBWiC2YOwMR/tbXf92aDf1zXVKhZAs8yLMLGcmL7a1AkVwILdIpBiHmNlcr+KkArxei2UbJbwc7BQUsCbulAybM1NP+fzqm0Kx8ETOv2hQwtwvvLTTycYA/Tq0Fb51ZU12/L5SV0jbKbr+jNwWa5cfpQQt2aJlwI+tLoU3DBRLMlRylYtnu/J1w8UbpuzoV3BqlpkFBWzWbs0YtOUBUuEv74/I8QvRB2n2vrp7UC6hvEZz68yGW6jbpzUuTwPTqs2NuXgcf09AkUr2ho7R8tRsx77NmZAPd7Vcjj9B+j9wGhft0oRAAAAAElFTkSuQmCC");
        }
        a.text {
            margin-top: 30px;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC/UlEQVR4Xu1bPWhUQRD+ZmOEAyNiIRYiFgcH7uZFsRIjKIg/CJYWiiA2/jRWwVJTm17QIo02WogiKKJoEVMpHPcmmCYaLRQLQfzp4o1syIUjePeW7OYg72bh7uDe7MzO9958++3eHmGpOeeeARgBsA2AaX1fss8FAJ8BPGfmyz438m/OuU8AdpYs2aJ03jDzKDnnngA4WWRd0usTHoDvALaWNMGitOoegL8lrvkiAH55AKTIqsTX//Q7AHP9DsB0vwMwHgSAiMwT0XwiLhgFsKHA11sAvyPj7QGwpcBHGAAAxpn5RuSAFrsHku5hZn4dE8859wrAIQWgOwL6BARxgJaAcoCSYHlnAWvtRyLa1Y0siehCnueTMdNS28ZLyNojehq01k4S0fmivGh4ePiRiJzqZmiMOdJoNF6uJwCcc163XC/Ky88CXix40dCpTTHzwRTJ91IIVavVzZVKZVpEbIex32Xmc60tsUsAbgLY1G4sIrdnZmYupkq+lwAsxTq6lFe2IoeHAMaYeW4RAN+stSPGmBMA9gP44DcO8zx/mjL5XgPg49VqtaHBwcGzAA6IyIIx5kWe5/daeS0DkDrRTv56tRYIzUcBCEUqlZ0+AWF7kNE6IPSGaQmEIpXKTktASyDodwjlgNg9wdCSVRIMRSqVnZKgkqCSYE92hEJLVkkwFKlUdkqCSoJKgkqCAXyiawFdC0QekAh4yhZNVAeEIpXKTnWA6gDVAaoDAvhEdYDqANUBcSdFA8pMhdCaKUFr7UYAZ4hoL4CVpzOKzu/6cdUB/Fg+xED0tdls1gcGBmYbjcbj0LsbYpdcCmdZtkNE7ojI8ZABrMLmFjNfWUW//3ZJDoBzbsofR0k1wA5+Jph5LEWMtQDgJ4ChFIPr4sP/8fFYihhJAciyrNZsNmdTDKzAxzdm3p4ijgKQAsV2H865/i0BD0Tfk6C1drcx5n6XI6qxD90DZj4d62RZY6Ry1O7HgwDgKhHtA+BfUY2IvojIOyJ6n+f5tShnKzr/Aw++uiIa3/PhAAAAAElFTkSuQmCC");
        }
    }
    .main {
        flex: 1;
        position: relative;
        .export {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 30px;
            cursor: pointer;
        }
    }
    .zoom {
        display: flex;
        width: 300px;
        padding: 0 25px;
        align-items: center;
        /*border-left: 1px solid #aaa;*/
        background-color: #eee;
        user-select: none;
        &>div {
            height: 60%;
            overflow: auto;
            ul {
                li {
                    list-style: none;
                    display: flex;
                    align-items: center;
                    input[type="checkbox"]{
                        display: none;
                    }
                    .left {
                        label {
                            font-size: 20px;
                            cursor: pointer;
                        }
                    }
                    .right {
                        margin-left: 10px;
                        .name {
                            display: block;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        div {
                            i {
                                cursor: pointer;
                                font-size: 20px;
                                margin-right: 10px;
                            }
                            .up {
                                color: #42b983;
                            }
                            .down {
                                color: #42b983;
                            }
                            .delete {
                                color: red;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
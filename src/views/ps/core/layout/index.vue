<!--
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-16 14:36:05
 * @Description:
 * @FilePath: /demo/src/views/ps/core/layout/index.vue
-->
<template>
  <div class="edit">
    <div class="utils">
      <div>
        <i class="el-icon-edit" @click="dialog = true"></i>
      </div>
      <el-divider direction="vertical" />
      <div style="position: relative">
        <i style="position: relative" class="el-icon-document-add"> </i>
        <input
          type="file"
          accept=".jpg"
          @change="addImage"
          :style="{
            opacity: 0,
            width: '100%',
            top: 0,
            left: 0,
            position: 'absolute',
            zIndex: 2,
            height: '100%',
            display: 'block'
          }"
        />
      </div>
      <el-divider direction="vertical" />
      <div>
        <i class="el-icon-scissors"></i>
      </div>
    </div>
    <div class="wrapper">
      <el-row type="flex" class="container">
        <el-col :span="20" class="col">
          <div class="main">
            <canvas ref="canvas" class="bg"></canvas>
            <canvas class="top" ref="canvasTop" role="textbox"></canvas>
          </div>
        </el-col>
        <el-col :span="4" class="col">
          <div class="views">
            <ul>
              <li
                v-for="v in views"
                :key="v.ZIndex"
                @mousedown="mousedownHandler"
                @mousemove="mousemoveHandler"
              >
                <span>{{ v.options.NODETYPE === 1 ? "文本" : "图像" }}</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible="dialog" title="提示" :show-close="false">
      <div>
        <el-input v-model="text" placeholder="请输入文本内容" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="addText">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImageNode from "../node/image";
import TextNode from "../node/text";
import { devicePixelRatio } from "../utils";
import { initMouseEvent } from "../mouse";
export default {
  name: "editor",
  data() {
    return {
      views: [],
      ctx: null,
      dialog: false,
      text: ""
    };
  },
  methods: {
    mousedownHandler(e) {
      // const { offsetY } = e;
      isDown = true;
    },
    mousemoveHandler(e) {
      isDown = false;
    },
    addImage(e) {
      const [file] = e.target.files;
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      console.log(file.name);
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        this.views.push(new ImageNode(this.ctx, img, file.name));
      };
      img.src = url;
    },
    addText() {
      const { text = "" } = this;
      if (!text.trim()) {
        return;
      }
      this.dialog = false;
      this.views.push(new TextNode(this.ctx, text || "请输入文字"));
    },
    updata() {
      for (const view of this.views) {
        view.upgrade();
      }
    },
    start() {
      const { ctx } = this;
      const {
        DOMRect: { width, height }
      } = ctx;
      ctx.clearRect(0, 0, width * devicePixelRatio, height * devicePixelRatio);
      this.updata();
      window.requestAnimationFrame(this.start.bind(this));
    }
  },
  async mounted() {
    await this.$nextTick();
    const { canvas, canvasTop } = this.$refs;
    const DOMRect = canvas.parentNode.getBoundingClientRect();
    const width = parseInt(DOMRect.width, 10);
    const height = parseInt(DOMRect.height, 10);
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.cssText = `width: ${width}px; height:${height}px`;
    canvasTop.width = width;
    canvasTop.height = height;
    canvasTop.style.cssText = `width: ${width}px; height:${height}px`;
    // canvas.style.cssText = `width:${width}px;height:${height}px`;
    const ctx = canvas.getContext("2d");

    const event = initMouseEvent(canvasTop);
    console.log(event);
    // event.callback('mousemove', () => {

    // })

    // canvasTop.addEventListener("mousemove", mouseEvent => {
    //   Mouse.layerX = parseInt(mouseEvent.layerX, 10);
    //   Mouse.layerY = parseInt(mouseEvent.layerY, 10);
    //   const { views } = this;
    //   // 清除所有聚焦
    //   views.forEach(view => {
    //     view.deFocus();
    //     if (view.checkInPath()) {
    //       view.enFocus();
    //     }
    //   });
    // });

    // canvasTop.addEventListener("mousedown", e => {
    //   let { layerX, layerY } = e;
    //   layerX = layerX | 0;
    //   layerY = layerY | 0;
    //   Mouse.layerX = layerX;
    //   Mouse.layerY = layerY;
    //   const { views } = this;
    //   let clickView = null;
    //   // 获取最上面的焦点
    //   views.forEach(view => {
    //     if (view.checkInPath()) {
    //       clickView = view;
    //     }
    //   });
    //   // 激活图层
    //   if (clickView) {
    //     canvasTop.style.cursor = "move";
    //     clickView.enActive();
    //   }
    // });

    // canvasTop.addEventListener("mouseup", () => {
    //   const { views } = this;
    //   views.forEach(view => {
    //     view.deActive();
    //   });
    //   canvasTop.style.cursor = "";
    // });

    ctx.DOMRect = DOMRect;
    this.ctx = Object.freeze(ctx);
    this.start();
  },
  beforeDestroy() {
    window.cancelAnimationFrame(this.start);
  }
};
</script>

<style lang="less" scoped>
.edit {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  .utils {
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    justify-content: center;
    i {
      font-size: 30px;
      cursor: pointer;
    }
  }
  .wrapper {
    flex: 1;
    position: relative;
    .container {
      height: 100%;
      width: 100%;
      position: absolute;
      .col {
        height: 100%;
        .main {
          height: 100%;
          position: relative;
          // canvas.bg {
          //   transform: scale(2);
          //   transform-origin: left top;
          // }
          canvas.top {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 10;
            // transform: scale(0.5);
            // height: 100%;
            // width: 100%;
          }
        }
        .views {
          background-color: #666;
          height: 100%;
          &::before {
            content: "图层";
            display: block;
            background: #333;
            text-align: left;
            color: #bbb;
            padding: 0 12px;
          }
          ul {
            li {
              padding: 0 12px;
              user-select: none;
              list-style: none;
              background-color: #aaa;
              &::after {
                content: " ";
                display: block;
                border-top: 1px solid #fff;
                transform: scaleY(0.5);
              }
              &:nth-last-child(1)::after {
                display: none;
              }
              span {
                cursor: move;
              }
            }
          }
        }
      }
    }
  }
}
</style>

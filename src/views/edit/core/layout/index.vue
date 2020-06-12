<!--
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-12 15:50:57
 * @Description:
 * @FilePath: /demo/src/views/edit/core/layout/index.vue
-->
<template>
  <div class="edit">
    <div class="utils">
      <div>
        <i class="el-icon-edit" @click="addText"></i>
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
            <canvas ref="canvas"></canvas>
          </div>
        </el-col>
        <el-col :span="4" class="col">
          <div class="views">
            <ul>
              <li v-for="v in views" :key="v.ZIndex">
                <span>{{ v.NODETYPE === 1 ? "文本" : "图像" }}</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ImageNode from "../node/image";
import TextNode from "../node/text";
import Mouse from "../mouse";
export default {
  name: "editor",
  data() {
    return {
      views: [],
      ctx: null
    };
  },
  methods: {
    addImage(e) {
      const [file] = e.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        this.views.push(new ImageNode(this.ctx, img));
      };
      img.src = url;
    },
    addText() {
      this.views.push(new TextNode(this.ctx, "请输入文字"));
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
      ctx.clearRect(0, 0, width, height);
      this.updata();
      window.requestAnimationFrame(this.start.bind(this));
    }
  },
  async mounted() {
    await this.$nextTick();
    const { canvas } = this.$refs;
    const DOMRect = canvas.parentNode.getBoundingClientRect();
    canvas.width = parseInt(DOMRect.width, 10);
    canvas.height = parseInt(DOMRect.height, 10);
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("mousemove", mouseEvent => {
      Mouse.layerX = parseInt(mouseEvent.layerX, 10);
      Mouse.layerY = parseInt(mouseEvent.layerY, 10);
      const { views } = this;
      // let isInPath = [];
      views.forEach(view => {
        view.deFocus();
        if (view.checkInPath()) {
          view.enFocus();
        }
      });
    });

    canvas.addEventListener("mousedown", e => {
      let { layerX, layerY } = e;
      layerX = layerX | 0;
      layerY = layerY | 0;
      Mouse.layerX = layerX;
      Mouse.layerY = layerY;
      const { views } = this;
      let isInPath = [];
      views.forEach(view => {
        if (view.checkInPath()) {
          isInPath.push(view);
        }
      });
      if (isInPath.length) {
        const clickView = isInPath.pop();
        clickView.enActive();
      }
    });
    canvas.addEventListener("mouseup", () => {
      const { views } = this;
      console.log("起");
      views.forEach(view => {
        view.deActive();
      });
    });

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
          canvas {
            height: 100%;
            width: 100%;
          }
        }
        .views {
          background-color: #ddd;
          height: 100%;
          &::before {
            content: "图层";
            display: block;
            background: #ccc;
            text-align: right;
            padding: 0 12px;
          }
        }
      }
    }
  }
}
</style>

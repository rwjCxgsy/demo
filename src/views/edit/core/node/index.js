/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-12 15:48:15
 * @Description:
 * @FilePath: /demo/src/views/edit/core/node/index.js
 */

import Mouse from "../mouse";

const defaultOption = {
  width: 100,
  height: 100,
  left: 100,
  top: 100
};

let ZIndex = 0;
class Node {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.ZIndex = ZIndex++;
    this.options = Object.assign({}, defaultOption, options);
    this.focus = false;
    this.active = false;
    this.dashOffset = 0;
    this.mouseOffsetX = 0;
    this.mouseOffsetY = 0;
    this.scale = 1;
    this.color = "#3385ff";
  }

  drawNode() {
    const {
      ctx,
      focus,
      active,
      dashOffset,
      color,
      options: { left, top, width, height }
    } = this;
    ctx.save();
    ctx.strokeStyle = color;
    if (focus) {
      ctx.setLineDash([4, 2]);
      if (active) {
        ctx.lineDashOffset = -dashOffset;
      }
      ctx.strokeRect(left, top, width, height);
    }
    ctx.restore();
  }

  checkInPath() {
    const {
      ctx,
      options: { left, top, width, height }
    } = this;
    const { layerX, layerY } = Mouse;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left, top + height);
    ctx.closePath();
    const isInPath = ctx.isPointInPath(layerX, layerY);
    ctx.restore();
    return isInPath;
  }

  upgradeNode() {
    const { mouseOffsetX, mouseOffsetY, active } = this;
    const { layerX, layerY } = Mouse;
    if (active) {
      this.options.left = layerX - mouseOffsetX;
      this.options.top = layerY - mouseOffsetY;
    }
    this.dashOffset++;
    if (this.dashOffset > 16) {
      this.dashOffset = 0;
    }
    this.drawNode();
  }
  enActive() {
    const { layerX, layerY } = Mouse;
    this.active = true;
    this.mouseOffsetX = layerX - this.options.left;
    this.mouseOffsetY = layerY - this.options.top;
  }
  deActive() {
    this.active = false;
  }
  enFocus() {
    this.focus = true;
  }
  deFocus() {
    this.focus = false;
  }
}

export default Node;

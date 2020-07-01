/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-13 09:41:43
 * @Description:
 * @FilePath: /demo/src/views/edit/core/node/text.js
 */

import Node from "./index";

class Text extends Node {
  constructor(ctx, text) {
    const font = "20px Verdana";
    ctx.font = font;
    const measure = ctx.measureText(text);
    const {
      width,
      actualBoundingBoxAscent,
      actualBoundingBoxDescent
    } = measure;
    super(ctx, {
      width,
      height: actualBoundingBoxAscent + actualBoundingBoxDescent
    });
    this.text = text;
    this.options.NODETYPE = 1;
    this.font = font;
  }
  draw() {
    const { ctx, text, font } = this;
    const { left, top } = this.options;
    ctx.save();
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.fillText(text, left, top);
    ctx.restore();
  }
  upgrade() {
    this.draw();
    super.upgradeNode();
  }
}

export default Text;

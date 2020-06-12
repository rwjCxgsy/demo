/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-12 15:12:58
 * @Description:
 * @FilePath: /demo/src/views/edit/core/node/text.js
 */

import Node from "./index";

class Text extends Node {
  constructor(ctx, text) {
    super(ctx, { width: 100, height: 100 });
    this.options.text = text;
    this.options.NODETYPE = 1;
  }
  draw() {
    const { ctx } = this;
    const { left, top, text } = this.options;
    ctx.save();
    ctx.font = "16px SimSun, Songti SC";
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

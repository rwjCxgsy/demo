/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-12 15:12:51
 * @Description:
 * @FilePath: /demo/src/views/edit/core/node/image.js
 */

import Node from "./index";

class Image extends Node {
  constructor(ctx, img) {
    super(ctx, { width: img.width, height: img.height });
    this.options.img = img;
    this.options.NODETYPE = 2;
  }
  draw() {
    const { ctx } = this;
    const { left, top, img } = this.options;
    ctx.save();
    ctx.drawImage(img, left, top);
    ctx.restore();
  }
  upgrade() {
    this.draw();
    super.upgradeNode();
  }
}

export default Image;

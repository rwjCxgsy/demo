/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-15 18:38:26
 * @Description:
 * @FilePath: /demo/src/views/edit/core/node/image.js
 */

import Node from "./index";

class Image extends Node {
  constructor(ctx, img, name) {
    super(ctx, { width: img.width, height: img.height });
    this.options.img = img;
    this.options.name = name;
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

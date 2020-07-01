/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-16 14:37:44
 * @Description:
 * @FilePath: /demo/src/views/ps/core/mouse/index.js
 */

const Mouse = {};

let isDown = false;
const layer = {};

const mousemove = e => {
  Mouse.layerX = parseInt(e.layerX, 10);
  Mouse.layerY = parseInt(e.layerY, 10);
};

const mousedown = e => {
  if (isDown) {
    return;
  }
  let { layerX, layerY } = e;
  layerX = layerX | 0;
  layerY = layerY | 0;
  Mouse.layerX = layerX;
  Mouse.layerY = layerY;
  isDown = true;
};

const mouseup = e => {
  isDown = false;
};

export const initMouseEvent = canvasDOM => {
  // const { canvas } = ctx;
  canvasDOM.addEventListener("mousemove", mousemove);
  canvasDOM.addEventListener("mousedown", mousedown);
  canvasDOM.addEventListener("mouseup", mouseup);
  return {};
};

export default Mouse;

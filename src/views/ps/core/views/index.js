/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-16 14:40:29
 * @Description:
 * @FilePath: /demo/src/views/ps/core/views/index.js
 */

const views = [];

const addView = node => {
  views.push(node);
};

const delView = index => {
  views.splice(index, 1);
};

export default views;

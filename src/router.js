/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-15 18:54:24
 * @Description:
 * @FilePath: /demo/src/router.js
 */

import Vue from "vue";
import vueRouter from "vue-router";
Vue.use(vueRouter);

export default new vueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/range",
      component: () => import("./views/range/index")
    },
    {
      path: "/home",
      component: () => import("./views/home")
    },
    {
      path: "/cdsub",
      component: () => import("./views/subway/index")
    },
    {
      path: "/sheet",
      component: () => import("./views/sheet/index")
    },
    {
      path: "/fall",
      component: () => import("./views/fall/index")
    },
    {
      path: "/edit",
      component: () => import("./views/ps/index")
    },
    {
      path: "/canvasInput",
      component: () => import("./views/canvasInput/index")
    }
  ]
});

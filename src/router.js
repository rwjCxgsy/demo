/*
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-11 13:25:47
 * @Description: 
 * @FilePath: /demo/src/router.js
 */ 
import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)

export default new vueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/range',
            component: () => import('./views/range'),
        },
        {
            path: '/home',
            component: () => import('./views/home'),
        },
        {
            path: '/cdsub',
            component: () => import('./views/cdsub'),
        },
        {
            path: '/sheet',
            component: () => import('./views/sheet/index'),
        },
        // {
        //     path: '/scroll',
        //     component: () => import('./views/scroll'),
        // },
        {
            path: '/fall',
            component: () => import('./views/fall'),
        },
        // {
        //     path: '/three',
        //     component: () => import('./views/three'),
        // },
        {
            path: '/edit',
            component: () => import('./views/edit/index.vue'),
        }
    ]
})
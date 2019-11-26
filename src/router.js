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
            path: '/scroll',
            component: () => import('./views/scroll'),
        },
        {
            path: '/fall',
            component: () => import('./views/fall'),
        }
    ]
})
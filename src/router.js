import Vue from 'vue'
import vueRouter from 'vue-router'
import Range from './views/range'
import Home from './views/home'

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
            component: Range,
        },
        {
            path: '/home',
            component: Home,
        }
    ]
})
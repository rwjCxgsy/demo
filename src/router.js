import Vue from 'vue'
import vueRouter from 'vue-router'
import Range from './views/range'
import Home from './views/home'

Vue.use(vueRouter)

export default new vueRouter({
    mode: 'history',
    routes: [
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
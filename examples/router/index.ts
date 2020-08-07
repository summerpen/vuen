import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import(/* webpackChunkName: "about" */ '../views/Clickoutside.vue')
    },
    {
        path: '/news',
        name: 'News',
        component: () => import(/* webpackChunkName: "about" */ '../views/News.vue')
    },
    {
        path: '/directive',
        name: 'Directive',
        component: () => import(/* webpackChunkName: "about" */ '../views/Directive.vue')
    },
    {
        path: '/animation',
        name: 'Animation',
        component: () => import(/* webpackChunkName: "about" */ '../views/Animation.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

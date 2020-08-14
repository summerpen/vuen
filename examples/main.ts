// @ts-ignore
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/rem'
Vue.config.productionTip = false
//main.js
// @ts-ignore
import libs from "../packages"
console.log(libs)
Vue.use(libs)
// 全局指令
// @ts-ignore
// import animation from '@/directive/animation.js'
// Vue.directive('animation', animation)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

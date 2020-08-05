import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
//main.js
import libs from "../packages"
console.log(libs)
Vue.use(libs)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

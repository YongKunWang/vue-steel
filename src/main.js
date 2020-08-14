import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 引入全局样式表
import './assets/css/global.css'
// 引入icon图标
import './assets/fonts/iconfont.css'
// 引入自定义组件
import myComponent from './components'
// 引入粒子效果
import VueParticles from 'vue-particles'

import axios from 'axios'

Vue.use(myComponent)
Vue.use(VueParticles)

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://api.baosteel.com/api/'

Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

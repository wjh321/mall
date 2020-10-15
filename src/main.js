import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入element注册文件
import './plugins/element.js'

// 导入字体图标
import './assets/fonts/iconfont.css'
import './assets/fonts/iconfont.woff'
// 格式化样式表
import './assets/css/base.css'

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

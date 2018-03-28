// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import VueWechatTitle from 'vue-wechat-title'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex/store'

import './assets/css/reset.css'
import './assets/css/button.css'

import commonJs from './assets/js/common.js'

Vue.config.productionTip = false

Vue.use(VueWechatTitle)
Vue.use(ElementUI)
Vue.prototype.commonJs = commonJs
Axios.defaults.withCredentials = true 
Vue.prototype.$http = Axios
// 判断是开发环境还是生产环境,开发环境请求接口代理
Vue.prototype.api = process.env.NODE_ENV === 'development' ? '/dev' : ''


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

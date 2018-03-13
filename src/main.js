// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import VueWechatTitle from 'vue-wechat-title'

import './assets/css/reset.css'

import commonJs from './assets/js/common.js'


Vue.config.productionTip = false
Vue.use(VueWechatTitle)
Vue.prototype.commonJs = commonJs

Vue.prototype.$http = Axios
// 判断是开发环境还是生产环境,开发环境请求接口代理
Vue.prototype.api = process.env.NODE_ENV === 'development' ? '/dev' : ''


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

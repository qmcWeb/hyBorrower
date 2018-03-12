import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/index.vue'
import Register from '../views/register/register.vue'
import InfoCheck from '../views/register/infoCheck.vue'
import OpenAccount from '../views/register/openAccount.vue'
import ResetPassword from '../views/resetPassword/index.vue'
import ExtractMoney from '../views/extractMoney/index.vue'
import AccountCenter from '../views/accountCenter/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hy/login',
      name: '登录',
      component: Login,
      meta: { 
        title: '登录'
       }
    },
    {
      path: '/hy/register',
      name: '注册',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/hy/infoCheck',
      name: '短信验证',
      component: InfoCheck,
      meta: {
        title: '短信验证'
      }
    },
    {
      path: '/hy/openAccount',
      name: '开户',
      component: OpenAccount,
      meta: {
        title: '开户'
      }
    },
    {
      path: '/hy/resetPassword',
      name: '重置密码',
      component: ResetPassword,
      meta: {
        title: '重置密码'
      }
    },
    {
      path: '/hy/extractMoney',
      name: '提现',
      component: ExtractMoney,
      meta: {
        title: '提现'
      }
    },
    {
      path: '/hy/accountCenter',
      name: '我的账户',
      component: AccountCenter,
      meta: {
        title: '我的账户'
      }
    }
  ]
})
